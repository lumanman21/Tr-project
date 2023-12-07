const ws = require("nodejs-websocket")
const PORT = 8000

//每次用户连接上来，这个函数就会执行，给当前用户创建一个connect对象
const sever = ws.createServer(
  (connect) => {
      console.log("有用户连接上来了")
      //每次接收到用户传递过来的数据，就会jiantingtext函数
      connect.on("text", (data) => {
        console.log(data)
        // 给用户添加数据响应
        connect.send(data) //或者使用connect.sendText，内部用的是一个方法
      })
      connect.on("close", () => {
        console.log("连接断开")
      })
      //处理用户错误信息是必要的，一个用户有错误会直接捕获错误，不会影响到其他用户
      connect.on("error", () => {
        console.log("连接出错了")
      })
    }
)

sever.listen(PORT, () => {
  console.log("8000端口启动成功！")
})
