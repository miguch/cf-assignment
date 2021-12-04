import { Router } from 'itty-router'

// Create a new router
const router = Router()

/*
Our index route, a simple hello world.
*/
router.get('/', () => {
    return new Response('Hello, Socials!', {
        headers: { ...corsHeader },
    })
})

const corsHeader = {
    'Access-Control-Allow-Origin': 'https://8ca93336.cf-assignment-4fg.pages.dev',
}

router.get('/posts', async request => {
    let from = decodeURIComponent(request.query.from)
    if (!from) {
        from = 0
    }
    // each load has ten posts
    const pageSize = 10
    const total = await SOCIALS_DATA.get('posts_count')
    const lower = Math.max(0, total - from - pageSize)
    const upper = total - from
    const fetches = []
    for (let i = upper - 1; i >= lower; i--) {
        fetches.push(SOCIALS_DATA.get('posts:' + i))
    }
    const res = await Promise.all(fetches)

    // Return the HTML with the string to the client
    return new Response(JSON.stringify(res.map(JSON.parse)), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeader,
        },
    })
})

router.post('/posts', async request => {
    // Create a base object with some fields.
    let fields = {
        asn: request.cf.asn,
        colo: request.cf.colo,
    }

    // If the POST data is JSON then attach it to our response.
    if (request.headers.get('Content-Type') === 'application/json') {
        const newPost = await request.json()
        newPost.post_at = Date.now()

        if (newPost.title && newPost.username) {
            let post_index = await SOCIALS_DATA.get('posts_count')
            if (!post_index) {
                post_index = 0
            }
            await SOCIALS_DATA.put(
                'posts:' + post_index,
                JSON.stringify(newPost)
            )
            await SOCIALS_DATA.put('posts_count', ++post_index)
            return new Response(JSON.stringify({ success: true }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        } else {
            return new Response(
                JSON.stringify({
                    msg: 'Post title or username is missing',
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        }
        return new Response(JSON.stringify({ msg: 'Invalid request' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeader,
            },
        })
    }
})

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }))

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', e => {
    e.respondWith(router.handle(e.request))
})
