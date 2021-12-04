<template>
  <n-list style="margin: 0">
    <n-list-item v-for="post in postList">
      <div class="post-user">
        {{ post.username }}
      </div>
      <div class="post-time">
        {{ getFormatTime(post.post_at) }}
      </div>
      <div class="post-title">
        {{ post.title }}
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div v-if="post.image" class="post-image">
        <img
          @click="bigImage = post.image"
          style="
            cursor: pointer;
            width: 160px;
            height: 160px;
            object-fit: contain;
          "
          :src="post.image"
        />
      </div>
    </n-list-item>
  </n-list>
  <n-modal
    :show="!!bigImage"
    :on-update:show="
      (v) => {
        v ? null : (bigImage = null)
      }
    "
    preset="card"
    :style="{ width: '700px' }"
  >
    <img
      style="
        max-width: 600px;
        max-height: 600px;
        object-fit: contain;
        margin: 0 auto;
        display: block;
      "
      :src="bigImage"
    />
  </n-modal>
</template>

<script setup>
import { NList, NListItem, NModal } from "naive-ui"
import dayjs from "dayjs"
import { ref } from "vue"
const { canLoadMore, postList } = defineProps({
  canLoadMore: Boolean,
  postList: Array,
})
const getFormatTime = (time) => {
  const timeObj = dayjs(time)
  return timeObj.format("MM/DD/YYYY HH:mm:ss")
}
const bigImage = ref(null)
</script>

<style scoped>
.post-user {
  color: rgb(146, 146, 146);
  font-size: 12px;
  display: inline-block;
}
.post-time {
  float: right;
}
.post-title {
  font-weight: 700;
  font-size: 20px;
}
</style>
