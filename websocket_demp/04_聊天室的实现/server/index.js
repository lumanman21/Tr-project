const { createServer } = require("http")
const express = require("express")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)
//创建io对象
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "*", //跨域
    credentials: true,
  },
})

const users = [] //保存已经登录的用户
//监听用户连接
io.on("connection", (socket) => {
  socket.on("login", (data) => {
    const user = users.find((item) => item.username == data.username)
    //用户已经登录
    if (user) {
      socket.emit("loginError", { msg: "登录失败，该用户已经登录" })
    } else {
      users.push(data)
      socket.emit("loginSuccess", data)
      //告诉所有人有人进入,使用io.emit
      io.emit("addUserIn", data)
      //加载用户列表
      io.emit("addUserlist", users)
      //将用户名保存到实例当中，断开连接时使用
      socket.username = data.username
    }
    // console.log(data)
    //把消息发送至客户端
    // socket.emit("send1", data)
  })

  //监听用户断开连接
  socket.on("disconnect", (reason) => {
    const i = users.findIndex((user) => user.username === socket.username)
    users.splice(i, 1)
    io.emit("userOut", socket.username) //离开时的广播
    io.emit("addUserlist", users) //更新列表
  })

  //聊天事件监听
  socket.on("send", (data) => {
    io.emit("sendMsgToAll", data)
  })
})

httpServer.listen(3000)
