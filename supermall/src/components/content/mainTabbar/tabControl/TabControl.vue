<template>
  <div class="tab-control">
    <!-- 文字不一样可以不用插槽，直接通过props把要展示的文字传过来就行了 -->
    <div v-for="(item,index) in titles" 
        :key="index" 
        class="tab-item" 
        :class="{active:index==currentIndex}" 
        @click="itemClick(index)"
        >
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name:"TabControl",
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex=index,
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
}
.tab-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
}
.tab-item span{
    padding: 5px;
}
.active{
    color: var(--color-tint);
    }
.active span{
    border-bottom: 2px solid var(--color-tint);
}
</style>