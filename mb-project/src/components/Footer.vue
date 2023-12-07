<template>
    <div class="footer_bac">
        <div class="footer wrap">
            <div class="footer_top">
                <img :src="footer_logo" alt="">
                <ul class="footer_top_ul">
                    <li @click="goHome">首页</li>
                    <li @click="newsLink">新品上线</li>
                    <li @click="goList">所有模板</li>
                    <li @click="sucsessLink">成功案例</li>
                    <li @click="goFaq">常见问答</li>
                </ul>
            </div>


            <div class="footer_bottom">
                <div class="footer_bottom_left">
                    <h2>{{ footer_tel }}</h2>
                    <ul class="footer_bottom_ul">
                        <li><a href="">电话：{{ footer_phone }} ( 24小时在线 )</a></li>
                        <li><a>地址：{{ footer_add }}</a></li>
                        <li><a>Google出海体验中心</a></li>
                    </ul>

                </div>
                <div class="footer_bottom_right">
                    <ul class="footer_bottom_img">
                        <li>
                            <img :src="footer_website" alt="">
                            <p>扫一扫，手机浏览</p>
                        </li>
                        <li>
                            <img :src="footer_wechat" alt="">
                            <p>扫一扫，关注领聚</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import { computed, reactive, ref, watch,onMounted, toRefs,getCurrentInstance  } from 'vue'
import { useRouter } from 'vue-router';
export default {
    name:'Footer',
    components:{},
    setup(){
        //路由
        const router = useRouter();
		const goHome = () => {
		   router.push({ path: '/' }); 
		};

		const goList = () => {
		   router.push({ path: '/List' }); 
		};

		const goFaq = () => {
		   router.push({ path: '/Faq' });
		};




        onMounted(() => {
			footer()
		})




        const footer_logo = ref('')
        const footer_phone = ref('')
        const footer_tel = ref('')
        const footer_add = ref('')
        const footer_website = ref('')
        const footer_wechat = ref('')
        const {proxy} = getCurrentInstance()
        const footer = async()=>{
              
            const sre = await new proxy.$request(proxy.$urls.m().website).modeget()
			footer_logo.value = sre.data.logo
            footer_phone.value = sre.data.phone
            footer_tel.value = sre.data.tel
            footer_add.value = sre.data.address
            footer_website.value = sre.data.website
            footer_wechat.value = sre.data.wechat
         
            
    
        }

        // 新品上线
		const newsLink = () => {
            const order = 'asc'
			router.push({  name: 'News', query: { order }  });
		}

		//成功案例
		const sucsessLink = () => {
            const top = '1'
			router.push({  name: 'Success', query: { top }  });
		}

        return{
            footer,
            footer_logo,
            footer_phone,
            footer_tel,
            footer_add,
            footer_website,
            footer_wechat,
            goHome,
            goList,
            goFaq,
            newsLink,
            sucsessLink
        }
    }
}
</script>


<style scoped>


.footer_bac{
    background: url('../assets/img/footer.webp') no-repeat center;
    background-size: cover;
    box-sizing: border-box;
    padding: 0.6rem  0 0 0;
}
.footer{

}
.footer_top{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
}
.footer_top img{
    height: 0.54rem;
}
.footer_top_ul{
    display: flex;
    display: -webkit-flex;
    gap: 0 0.5rem;
}
.footer_top_ul li{
    font-size: 0.18rem;
    color: #fff;
    cursor: pointer;
}
.footer_bottom{
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.footer_bottom_left{

}
.footer_bottom_left h2{
    font-size: 0.36rem;
    color: #fff;
    font-weight: bold;
}
.footer_bottom_ul{
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
}
.footer_bottom_ul li{

}
.footer_bottom_ul li a{
    font-size: 0.14rem;
    line-height: 0.28rem;
    color: #fff;
}


.footer_bottom_right{
    width: 3.85rem;
    background: url('../assets/img/footer_vx.webp') no-repeat top;
    background-size: cover;
    box-sizing: border-box;
    padding: 0.5rem 0;
}

.footer_bottom_img{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    gap: 0 0.2rem;
}
.footer_bottom_img li{

}
.footer_bottom_img li img{
    width: 1.13rem;
}
.footer_bottom_img li p{
    font-size: 0.12rem;
    color: #fff;
    margin-top: 0.2rem;
    text-align: center;
}




@media screen and (max-width:1600px) {

}
@media screen and (max-width:1440px) {

}
@media screen and (max-width:1366px) {

}
@media screen and (max-width:1200px) {

}
@media screen and (max-width:1024px) {

}
@media screen and (max-width:1024px) {

}
@media screen and (max-width:960px) {
    .footer_bottom_right{display: none;}
}
@media screen and (max-width:768px) {
    .footer_top_ul{display: none;}
}
@media screen and (max-width:560px) {

}
@media screen and (max-width:425px) {

}





</style>

