const ws = require("nodejs-websocket")
const PORT = 8000

/**
 * 聊天信息
 * type: 消息类型，0用户进入 1用户离开 2正常消息
 * msg: 信息
 * time 信息发送的时间
 */
let count = 0 //记录用户数量
//每个连接上来的用户就是一个connect对象
const sever = ws.createServer((connect) => {
  count++
  connect.userName = `用户${count}`
  //1、告诉所有人有人新加进来了
  broadCast({
    time: getTime(),
    type: 0,
    msg: `${connect.userName}进来了`,
  })

  connect.on("text", (data) => {
    //2、当某一个用户发送了消息，我们需要告诉所有用户消息内容
    //connect.send给用户发信息只是给连接上来的那个人发消息，现在要给所有用户发消息，使用server.connections
    broadCast({
      time: getTime(),
      type: 2,
      msg: `${connect.userName}：${data}`,
    })
  })
  connect.on("close", () => {
    //3、告诉所有用户有人断开了连接
    broadCast({
      time: getTime(),
      type: 1,
      msg: `${connect.userName}离开了`,
    })
    count--
  })
  connect.on("error", () => {
    console.log("连接出错了")
  })
})

function broadCast(data) {
  //给所有用户发消息
  sever.connections.forEach((item) => {
    item.send(JSON.stringify(data)) //给浏览器发送信息只能是字符串
  })
}
function getTime() {
  return new Date().toLocaleTimeString()
}

sever.listen(PORT, () => {
  console.log("8000端口启动成功！")
})
