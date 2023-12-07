<template>
  <div class="check-button" :class="{active:isActived}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
    props:{
        isActived:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
}
.active{
    background-color: rgb(250, 126, 147);
    border-color: pink;
}
</style>