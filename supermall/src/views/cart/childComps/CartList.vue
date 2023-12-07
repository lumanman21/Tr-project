<template>
  <div class="cart-list">
    <cart-list-item 
        v-for="(item,index) in $store.state.addCart.cartList" 
        :key="index" 
        :item-info="item" 
        />
 </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
export default {
    name:"CartList",
    components:{
        // Scroll,
        CartListItem
    },
    activated(){
        // console.log("---");
    }
}
</script>

<style scoped>
.cart-list{
    top: 49px;
    position: relative;
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>