<template>
  <div class="userinfo">
    <div class="left">
        <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="center">
        <span class="s-top">登陆/注册</span>
        <div class="s-bottom">
            <img src="~assets/img/profile/phone.svg" alt="">
            <span>暂无绑定手机号</span>
        </div>
    </div>
    <div class="right">&gt;</div>
  </div>
</template>

<script>
export default {
 name:'UserInfo'
}
</script>

<style scoped>
.userinfo{
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: 44px;
    display: flex;
    text-align: center;
    align-items: center;
}
.left{
    width: 60px;
    margin-right: 20px;
}
.left img{
    width: 60px;height: 60px;
}
.center{
    flex: 1;
    display: flex;
    flex-direction:column;
    color: #fff;
    align-items:flex-start;
}
.s-bottom{
    font-weight: normal;
    font-size: 14px;
    margin-top: 5px;
}
.s-bottom img{
    width: 18px;
    height: 18px;
    vertical-align: middle;   
}
.right{
    width: 10px;
    height: 10px;
}
</style>