<template>
  <div class="backtop" @click="backClick">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
 name:'BackTop',
 methods:{
    backClick(){
        console.log('回到顶部');
    }
 }
}
</script>

<style scoped>
.backtop{
    position: fixed;
    right: 8px;
    bottom: 50px;
}
.backtop img{
    width: 43px;
    height: 43px;
}
</style>