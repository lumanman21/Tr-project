<template>
  <div id="login">
    <label for="username">
      用户名：
      <input type="text" name="" id="username" v-model="username" />
      <button @click="login_btn">登录</button>
    </label>
  </div>
</template>

<script>
import { useCounterStore } from "../stores/index"
import { useRouter } from "vue-router"
import { ref } from "vue"

export default {
  setup() {
    let username = ref("")
    const store = useCounterStore()
    const router = useRouter()

    function login_btn() {
      if (username.value === "111") {
        //这里将username模拟为token,存到本地
        localStorage.setItem("token", username.value)
        // 在此处可以使用 store.setInput 方法更新 inputMessage 的值
        store.setInput(username.value)

        console.log(store)

        // 进行其他操作或导航
        router.push("/")
      } else {
        alert("请填写用户名")
        return
      }
    }

    return {
      username,
      login_btn,
    }
  },
}
</script>

<style scoped>
#login {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 52px;
  background: #fec8c8;
  box-shadow: 20px 20px 60px #d8aaaa, -20px -20px 60px #ffe6e6;
}
</style>
