const socket = io("http://localhost:3000")
function $(e) {
  return document.querySelector(e)
}
const userinfo = {
  username: "",
}
//登录按钮点击
login_btn.addEventListener("click", () => {
  if (!username.value) {
    alert("请填写用户名")
    return
  }
  socket.emit("login", { username: username.value })
})

// init(){
//   const users=localStorage.getItem('users')
//   if()
// }
//登录失败
socket.on("loginError", (data) => {
  alert(data.msg)
})
//登录成功
socket.on("loginSuccess", (data) => {
  console.log(`${data.username}登录成功`)
  //更新界面
  $(".left .top").innerHTML = data.username
  login.style.display = "none"
  main.style.display = "flex"
  userinfo.username = data.username
})

//有人进入聊天室，通知所有人
socket.on("addUserIn", (data) => {
  $(
    ".right .content"
  ).innerHTML += `<div class="in_out">${data.username}加入了聊天室</div>`
})

//更新列表
socket.on("addUserlist", (data) => {
  const len = data.length
  $(".right .top").innerText = `聊天室(${len})`
  $(".left .bottom").innerHTML = ""
  data.forEach((element) => {
    $(
      ".left .bottom"
    ).innerHTML += `<div class="user_item">${element.username}</div>`
  })
  //
})
//用户离开
socket.on("userOut", (name) => {
  $(
    ".right .content"
  ).innerHTML += `<div class="in_out">${name}离开了聊天室</div>`
})

//聊天
submit.addEventListener("click", () => {
  const value = info_input.value
  socket.emit("send", { value, username: userinfo.username })
})

socket.on("sendMsgToAll", (data) => {
  if (data.username === userinfo.username) {
    $(".right .content").innerHTML += `<div class="me">
        <div class="info">${data.value}</div>
        <div class="avatar">${data.username}</div>
      </div>`
  } else {
    $(".right .content").innerHTML += `<div class="you">
        <div class="avatar">${data.username}</div>
        <div class="info">${data.value}</div>
      </div>`
  }
  info_input.value = ""
  console.dir($(".right .content"))
  $(".right .content").children[
    $(".right .content").children.length - 1
  ].scrollIntoView(false) //alignTop:为true表示滚动到可视区域顶端对齐
})
