<template>
  <div class="profile">
    <nav-bar class="profile-nav"><div slot="center">我的商城</div></nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00 </span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0 </span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0 </span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import UserInfo from './childProfile/UserInfo.vue'
import ListView from './childProfile/ListView.vue'

export default {
  components: { 
    NavBar,
    UserInfo,
    ListView,
  },
  name:"Profile",
}
</script>

<style scoped>
.profile-nav{
  color: #fff;
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account-item .number{
  margin: 3px;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}
</style>