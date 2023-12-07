<template>
  <nav-bar class="detail-nav-bar">
    <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center">
        <div v-for="item,index in titles" 
            :key="index" class="title-item" 
            :class="{active:index == currentIndex}" 
            @click="itemClick(index)"
            >{{item}}
        </div>
    </div>
    <div slot="right"></div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
 components: { NavBar },
 name:'DetailNavBar',
 data(){
    return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
    }
 },
 methods:{
    itemClick(index){
        this.currentIndex=index
    },
    backClick(){
        this.$router.go(-1)
    }
 }
}
</script>

<style scoped>
.detail-nav-bar{
    background-color: #fff;
}
.center{
    display: flex;
    font-size: 14px;
    color: #666;
}
.title-item{
    flex:1
}
.active{
    color: var(--color-tint);
}
.back img{
    vertical-align: middle;
    width: 18px;
}
</style>