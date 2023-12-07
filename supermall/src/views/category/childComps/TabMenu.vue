<template>
  <div class="menu">
    <div 
    v-for="(item,index) in categoryList" 
    :key="index" 
    :class="{active:index===currentIndex}"
    @click="menuClick(index)"
    class="tab-menu">{{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
 name:'TabMenu',
 data(){
  return {
    currentIndex:0
  }
 },
 props:{
  categoryList:{
    type:Array,
      default(){
        return []
      }
  }
 },
 methods:{
  menuClick(index){
    this.currentIndex=index
    this.$emit('menuClick',index)
  }
 }
}
</script>

<style scoped>
.tab-menu {
  font-size: 12px;
  line-height: 45px;
  width: 70px;
  height: 45px;
  text-align: center;
  /* padding-left: 3px; */
  color: #666666;
}
.active {
  font-weight: 700;
  color: #ff5777;
  border-left: 3px solid #ff5777;
  background-color: #ffffff;
}
</style>