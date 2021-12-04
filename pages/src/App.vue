<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/header.vue"
import content from "./components/content.vue"
import { NMessageProvider } from "naive-ui"
</script>

<template>
  <n-message-provider>
    <Header></Header>
    <content></content>
  </n-message-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f3eadc;
  min-height: 100vh;
}
body {
  margin: 0;
}
</style>
