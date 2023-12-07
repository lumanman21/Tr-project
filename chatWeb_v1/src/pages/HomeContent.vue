<template>
  <div id="main">
    <div class="left">
      <div class="top">{{ lefttop }}</div>
      <div class="bottom"></div>
    </div>
    <div class="right">
      <div class="top"></div>
      <div class="content"></div>

      <div class="bottom">
        <div class="input">
          <input type="textarea" id="info_input" />
        </div>
        <div class="submit">
          <button id="submit" @click="submit">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
export default {
  data() {
    return {
      lefttop: [],
    }
  },
  setup() {
    const router = useRouter()

    const submit = () => {
      const token = localStorage.getItem("token")
      if (token) {
        //有token,说明用户已登录,可以同gpt对话
        alert("已经登录,对话")
      } else {
        alert("先去登录")
        router.push("/login")
      }
    }
    return {
      submit,
    }
  },
}
</script>

<style scoped>
#main {
  /* display: none; */
  width: 800px;
  height: 100%;
}

#main .left {
  flex: 1;
  height: 100%;
  background-color: rgb(220, 218, 217);
}

.user_item {
  width: 100%;
  line-height: 40px;
  padding-left: 10px;
}

#main .left .top {
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid rgb(192, 192, 192);
}

#main .right {
  flex: 3;
  background-color: rgb(245, 245, 245);
  height: 100%;
}

.right .top {
  height: 60px;
  border-bottom: 1px solid rgb(239, 239, 239);
  line-height: 60px;
  padding-left: 20px;
}

.right .content {
  height: calc(100% - 60px - 150px);
  border-bottom: 1px solid rgb(239, 239, 239);
  overflow: auto;
}

.right .bottom .input {
}

.right .bottom .submit {
  float: right;
  color: rgb(22, 194, 102);
}

.in_out {
  width: 100%;
  text-align: center;
  color: rgb(218, 218, 218);
  padding: 10px auto;
}

.me,
.you {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
}

.me {
  justify-content: flex-end;
  /* flex-wrap: wrap-reverse; */
}

.me .avatar,
.you .avatar {
  width: 30px;
  height: 30px;
  background-color: rgb(106, 99, 89);
}

.me .info,
.you .info {
  max-width: 50%;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
}

.me .avatar {
  width: 30px;
  height: 30px;
  background-color: rgb(237, 114, 223);
}

.me .info {
  max-width: 50%;
  padding: 10px;
  border-radius: 5px;
  background-color: rgb(149, 236, 105);
}
</style>
