<template>
  <div id="category">
    <nav-bar class="home-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="menu">
      <tab-menu class="tab-menu" :category-list="categoryList" @menuClick="menuClick"/>
    </div>
    <div class="tab-content">
      <category-table :category-table="categoryTable"/>
      <tab-control :titles="titleList" @itemClick="itemClick" />
      <goods-list :goods="categoryGoods"/>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu.vue'
import TabControl from '@/components/content/tabControl/TabControl'
import CategoryTable from './childComps/CategoryTable'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {
  getCategoryList,
  getCategoryTable,
  getCategoryGoods,
} from "network/category";

export default {
  components: { 
    NavBar,
    TabMenu,
    TabControl,
    CategoryTable,
    GoodsList,
  },
  data() {
    return {
      //右边分类商品的列表
      categoryTable: [],
      //左边分类名字列表
      categoryList: [],
      //goods
      categoryGoods: [],
      //tabcontrol
      titleList: ["流行", "新款", "精选"],
      currentIndex: 0,
    }
  },
  name: "Category",
  methods: {
    //方法类
    menuClick(index) {
      // 阻止反复请求
      if (this.currentIndex === index) return;

      this.currentIndex = index;
      this.getCategoryTable(this.categoryList[this.currentIndex].maitKey);
      this.getCategoryGoods(
        this.categoryList[this.currentIndex].miniWallkey,
        "pop"
      );
    },
    itemClick(index) {
      const typeList = ["pop", "new", "sell"];
      this.getCategoryGoods(
        this.categoryList[this.currentIndex].miniWallkey,
        typeList[index]
      );
    },
    //数据类
    //请求数据
    getCategoryList() {
      //分类名字列表
      getCategoryList().then((res) => {
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          this.getCategoryTable(this.categoryList[0].maitKey);
          this.getCategoryGoods(this.categoryList[0].miniWallkey, "pop");
        })
      })
    },
    getCategoryGoods(miniWallkey, type){
      //请求goods
      getCategoryGoods(miniWallkey, type).then((res)=>{
        // console.log(res);
        this.categoryGoods = res;
        // console.log(this.getCategoryGoods);
      })
    },
    getCategoryTable(maitKey) {
      //请求右边分类商品中的列表商品
      getCategoryTable(maitKey).then((res) => {
        // console.log(res);
        this.categoryTable = res.data.list;
      });
    },
  },
  created(){
    //请求分类页面相关数据
    this.getCategoryList()
  }
}
</script>

<style scoped>
 #category {
  width: 100vw;
  height: 100vh;
  display: flex;
  margin-top: 40px;
  }
.home-nav{
  color: #fff;
}
.menu{
  flex: 20;
  height: 600px;
  overflow: auto;
}
.tab-content{
  flex: 80;
  height: 600px;
  overflow: auto;
} 
</style>