const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer()
//创建io对象
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin: "*", //跨域
    credentials: true,
  },
})

//服务器端socket实例：Socket是与客户端交互的基础类。它继承了 Node.jsEventEmitter的所有方法，例如emit, on, once 或 removeListener.⭐
/**
 * socket.emit(eventName, payload) 触发事件，给浏览器发送数据时
 * socket.on(eventName, callback) 注册事件，需要获取浏览器发出的数据时
 */
//监听用户连接
io.on("connection", (socket) => {
  console.log("新用户连接了")
  //每个新连接都分配有一个随机的 20 个字符的标识符。⭐
  console.log(socket.id)

  socket.on("to-server", (data) => {
    console.log(data)
    //把消息发送至客户端
    socket.emit("send1", data)
  })
})

httpServer.listen(3000)
