<template>
  <div class="header">
    <n-gradient-text type="success" class="header-title"
      >Socials</n-gradient-text
    >
    <n-dropdown @select="onSelect" :options="options">
      <n-button size="large" class="header-user" circle #icon quaternary>
        <n-icon>
          <UserCircle></UserCircle>
        </n-icon>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup>
import { UserCircle } from "@vicons/fa"
import { NIcon, NButton, NGradientText, NDropdown, useMessage } from "naive-ui"
const options = [
  // {
  //   label: "Log Out",
  //   key: "logout",
  // },
]
const message = useMessage()
const onSelect = (key) => {
  console.log(key)
  message.info("Not yet implemented...")
}
</script>

<style scoped lang="less">
.header {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 42px;
  box-sizing: border-box;
  &-title {
    font-size: 32px;
  }
  &-user {
    margin-left: auto;
  }
}
</style>
