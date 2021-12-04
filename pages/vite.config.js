import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/posts": {
        target: "http://127.0.0.1:8787",
      },
      "/upload": {
        target: "http://127.0.0.1:8787",
      },
    },
  },
})
