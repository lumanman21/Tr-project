<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"/>
    <!-- 首页推荐 -->
    <recommend :recommends="recommends"/>
    <!-- 本周流行 -->
    <feature-view/>
    <!-- 控制拦 -->
    <tab-control :titles="['流行','新款','精选']" @itemClick="itemClick"/>
    <goods-list :goods="goods[currentType].list"/>
    <back-top/>
  </div>
</template>

<script>
import HomeSwiper from './chidComps/HomeSwiper'
import Recommend from './chidComps/Recommend';
import FeatureView from './chidComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop.vue';


import {getHomeMultidata,getHomeGoods} from "network/home";
export default {
    name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      Recommend,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
      }
    },
    activated(){
    },
    deactivated(){
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods:{
      //事件监听
      itemClick(index) {
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
      },

      //网络请求相关
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
    }
}
</script>

<style scoped>
.home-nav{
  color: #fff;
}
</style>