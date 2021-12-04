<template>
  <div class="content-body">
    <n-card
      :segmented="{
        content: 'hard',
      }"
      class="content-box"
      title="Posts"
      content-style="padding-top: 0; padding-bottom: 0; overflow: auto;"
    >
      <template #header-extra>
        <n-button @click="onNewPost" circle #icon size="large">
          <n-icon>
            <Plus></Plus>
          </n-icon>
        </n-button>
      </template>
      <post-list :post-list="postList" :can-load-more="canLoadMore"></post-list>
      <n-button class="loadmore" v-if="canLoadMore" @click="loadPosts">Load more</n-button>
      <div class="loadmore" v-else>You have reached the end~</div>
    </n-card>
    <new-post-form
      @success="onRefresh"
      v-model:showForm="showNewForm"
    ></new-post-form>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"
import { NCard, NButton, NIcon, useMessage } from "naive-ui"
import { Plus } from "@vicons/fa"
import newPostForm from "./newPostForm.vue"
import useNetwork from "../utils/network"
import { ref } from "vue"
import PostList from "./postList.vue"
const service = useNetwork()
const message = useMessage()
const postList = ref([])
const canLoadMore = ref(true)
const loadPosts = async () => {
  try {
    const pageSize = 10
    const res = await service({
      method: "get",
      url: "/posts",
      params: {
        from: postList.value.length,
      },
    })
    if (res.length < pageSize) {
      canLoadMore.value = false
    }
    postList.value.push(...res)
  } catch (err) {
    console.log(err)
    message.error("Failed to load post list")
  }
}
let showNewForm = ref(false)
onMounted(() => {
  loadPosts()
})
const onRefresh = () => {
  postList.value = []
  canLoadMore.value = true
  loadPosts()
}
const onNewPost = () => {
  showNewForm.value = true
}
</script>

<style scoped lang="less">
.content-box {
  margin: 32px auto;
  height: calc(100vh - 180px);
  width: 60%;
  min-width: 700px;
  border: 1px solid rgb(77, 69, 69);
}
.loadmore {
  text-align: center;
  margin: 12px auto;
  display: block;
}
</style>
