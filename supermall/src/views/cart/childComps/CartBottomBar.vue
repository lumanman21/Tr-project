<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :isActived="isSelectAll" class="check-button" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate">
            去计算:({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return this.$store.state.addCart.cartList.filter(item=>{
                return item.isChecked
            }).reduce((preValue,item)=>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.addCart.cartList.filter(item=>item.isChecked).length
        },
        isSelectAll(){
            //使用filter，也需要if判断购物车为0的情况
            // return !(this.$store.state.cartList.filter(item => !item.checked).length)
            //使用find函数
            // if(this.$store.state.cartList.length===0) return false
            // return !this.$store.state.cartList.find(item => !item.checked)
            //3、普通遍历
            if(this.$store.state.addCart.cartList.length===0) return false
            for(let item of this.$store.state.addCart.cartList){
                if(!item.isChecked){
                    return false
                }
            }
            return true
        }
    },
    methods:{
        //全选按钮点击
        checkClick(){
            // console.log("---");
            if(this.isSelectAll){
                //全部选中变成全部不选中
                this.$store.state.addCart.cartList.forEach(item => item.isChecked =false);
            }else{
                //部分或全部不选中的时候让他全部选中
                this.$store.state.addCart.cartList.forEach(item => item.isChecked =true);
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    background-color: #eee;
    position: absolute;
    line-height: 40px;
    bottom: 49px;
    left: 0;right: 0;
    display: flex;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
}
.check-button{
    width: 21px;height: 21px;line-height: 20px;
    margin-right: 5px;
}
.price{
    margin-left: 20px;
    flex: 1;
}
.calculate{
    width: 90px;
    margin-right: 10px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>