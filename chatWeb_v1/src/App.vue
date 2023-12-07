<template>
  <div>
    <!-- <Login></Login>
    <HomeContent></HomeContent> -->
    <router-view></router-view>
  </div>
</template>

<script>
import WebSocket from "websocket"

import Login from "./pages/Login.vue"
import HomeContent from "./pages/HomeContent.vue"
export default {
  components: {
    HomeContent,
    Login,
  },
}
</script>

<style scoped></style>
