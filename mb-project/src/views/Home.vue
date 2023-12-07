<template>
    <!-- header -->
    <Header></Header>


	<!-- Banner -->
	<div class="banner">
		<div class="swiper-container" >
			<div class="swiper-wrapper">
				<!-- <div class="swiper-slide">
					<video data-autoplay autoplay  src="static/video/banner_video.mp4" muted="" class="pc-video" poster="video/vb.jpg" webkit-playsinline="true" x-webkit-airplay="true" x5-playsinline="true" playsinline="true"></video>
				</div> -->
				<div class="swiper-slide">
					<img :src="sre_img" />
                    <div class="banner_text wrap">
                        <h2>用心服务1500+外贸出口企业</h2>
						<h3>安徽领聚拥有Google在安徽省的唯一的一家出海体验中心，
作为Google中国区核心合作伙伴，拥有专业的SEM团队，有多年Google推广经验， <br> 充分利用Google的力量， 
帮您开拓海外市场，建立国际品牌，帮企业实现高质量的询盘和订单转化。</h3>
						<div class="banner_text_search">
                            <input type="text" placeholder="请输入搜索关键词" v-model="inputValue">
							<button  @click="showInputValue()">点击搜索</button>
						</div>
						<ul class="banner_text_ul">
							<li v-for="obj in bannerListTop" :key="obj.title"  @click="search_list(obj)"><p>{{obj.title}}</p></li>
							
						</ul>
					</div>
				</div>
			</div>
			<!-- <div class="banner-button-prev"><i class="fal fa-arrow-left"></i></div>
			<div class="banner-button-next"><i class="fal fa-arrow-right"></i></div>
			<div class="banner-pagination"></div> -->
		</div>
	</div>
	<div class="clear"></div>
	

	<div class="fullMask"></div>

		
	<main>
		<div class="four_bac">
			<ul class="four wrap">
				<li v-for="obj in type1Objects" :key="obj.title">
					<div class="four_div">
						<p>{{ obj.title }}</p>
						<span>+</span>
					</div>
					<h2>{{ obj.description }}</h2>
				</li>
			</ul>
		</div>

		<!-- 最新模板 -->
		<div class="new_template">
            <div class="title">
				<p>最新模板</p>
				<span>最新行业模板，打造适合Google SEM/SEO的网站模板</span>
			</div>

			<div class="wrap new_template_swiper">
				<swiper
					:modules="modules"
					
					:slides-per-view="3"
					:space-between="30"
					
					:pagination="{ clickable: true }"
				
					@swiper="onSwiper"
					@slideChange="onSlideChange"
					:autoplay="{
						delay: 2500,
						disableOnInteraction: false,
					}"
					:breakpoints="{
						0: {
							slidesPerView: 1,
						},
						768: {
							slidesPerView: 3,
						},
					}"
				
				>   
					<swiper-slide v-for="obj in top_listTop1" :key="obj.title">
						<a :href="obj.url" class="swiper_a" target="_blank">
							<div class="img"><img :src="obj.img" /></div>
							<div class="i_partner_text">
								<h2>行业分类丨{{ obj.category }}</h2>
								<h3>编号：{{ obj.title }}</h3>
							</div>
						</a>
					</swiper-slide>
					

				</swiper>
			</div>
		</div>

		<!-- 优势 -->
		<div class="adavange_bac">
			<div class="adavange wrap">
                <ul class="adavange_ul">
					<li v-for="(item, index) in type0Objects" :key="index">
						<div class="adavange_txt">
							<img :src="item.icon" alt="">
							<p>{{ item.title }}</p>
						</div>
						<h2 class="adavange_ul_h2">{{ item.description }}</h2>
					</li>
				</ul>
				<div class="adavange_img">
					<img src="../assets/img/adavange_img.webp" alt="">
				</div>
			</div>

		</div>

		<!-- 列表 -->
		<div class="product_list_bac">
			<div class="title">
				<p>模板案例</p>
				<span>不定期上新行业模板，不定期上新行业模板</span>
			</div>
            <div class="product_list wrap">
                <ul class="product_list_ul">
					<li v-for="(obj, index) in bannerTop" :key="obj.title"  @click="selectItem(obj,index)"  :class="{ active: index === activeIndex }">
						<img :src="obj.icon" alt="">
						<p>{{ obj.title }}</p>
					</li>
				</ul>

				<div class="product_list_are">
					<dl class="product_list_dl" >
						<dt v-for="(obj, index) in moban_list" :key="index">
							<a :href="obj.url" target="_blank">
								<div class="product_list_img">
									<img :src="obj.img" alt="">
									<p>点击预览</p>
								</div>
								<div class="product_list_text">
									<h2>行业分类丨{{ obj.category }}</h2>
									<h3>编号：{{ obj.title }}</h3>
								</div>
							</a>
						</dt>
					</dl>
                    <button class="product_list_btn" @click="home_list()">查看更多</button>
				</div>
			</div>
		</div>


		<!-- 常见问题 -->
		<div class="home_faq_bac">
            <div class="home_faq wrap">
				<div class="home_faq_title">
					<h2>常见问题</h2>
					<button class="home_faq_btn" @click="goFaq">查看更多</button>
				</div>
				<ul class="home_faq_ul">
					<li v-for="(item, index) in faq_listTop1" :key="index" @click="faq_link">
						<p>{{ item.ask }}</p>
						<span>{{ item.created }}</span>
					</li>
					
				</ul>
			</div>
		</div>
		

		<!-- Footer -->
		<Footer></Footer>
	</main>

</template>



<script>

import { computed, reactive, ref, watch,onMounted,createApp, toRefs,getCurrentInstance,readonly,onBeforeUnmount,nextTick,onBeforeMount  } from 'vue'
import { useStore } from 'vuex'

import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useRoute, useRouter } from 'vue-router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

export default {
    name:'Home',
    components:{Header,Swiper,SwiperSlide,Footer},
    setup(){
		
		onMounted(() => {
			
			
			header();
			banner_list();
			home_four();
			faq();
			moban()
			
		})
		onMounted(async () => {
			await nextTick(); // 等待DOM更新完成
			top_list();
		});
		
        //从数据仓库取数据
        // const store = useStore()
        // const res = computed(() => {
        //     return store.state.name
        // })
		const {proxy} = getCurrentInstance()

		//banner图片
		const sre_img = ref('')
		const header = async()=>{
            
            const sre = await new proxy.$request(proxy.$urls.m().menu).modeget()
			
            
			sre_img.value = sre.data[0].img;
    
        }

        //banner搜索下面的分类
		const class_ids = ref(0)
		const bannerTop = ref([])
		const banner_list = async()=>{
            
            const bannerlist = await new proxy.$request(proxy.$urls.m().category).modeget()
			bannerTop.value = bannerlist.data
            class_ids.value = bannerlist.data[0].id
			moban(class_ids.value)
    
        }
		const bannerListTop = computed(() => readonly(bannerTop.value.filter(obj => obj.top === 1)));


		
		// 首页第一项四个参数
		const objects = ref([])
		const home_four = async()=>{
            const homeFour = await new proxy.$request(proxy.$urls.m().content).modeget()
			objects.value = homeFour.data;
			
			
        }

		const type0Objects = computed(() => readonly(objects.value.filter(obj => obj.type === 0)));
        const type1Objects = computed(() => readonly(objects.value.filter(obj => obj.type === 1)));

       

        // 最新产品
		const top_listTop = ref([])
		const top_list = async()=>{
            const topList = await new proxy.$request(proxy.$urls.m().template).modeget()
			top_listTop.value = topList.data;
		
        }
		const top_listTop1 = computed(() => readonly(top_listTop.value.filter(obj => obj.top === 1)));


		//轮播
		const onSwiper = (swiper) => {
			
		};
		const onSlideChange = () => {
			
		};


	    // 优势
		
		// 模板案例
        const selectedItem = ref(null);
		
		const activeIndex = ref(0); // 默认第一个li激活
		const selectItem = (item,index) => {
		   selectedItem.value = item.id;
		   //激活
		   activeIndex.value = index;
		   class_ids.value = item.id
		   moban(class_ids.value)
		};

		const moban_list = ref([])
		const moban = async(class_id)=>{
			const mobanList_urls = proxy.$urls.m().template
			const mobanList_url = `${mobanList_urls}?pid=${class_id}&limit=12&page=1`
            const mobanList = await new proxy.$request(mobanList_url).modeget();
			moban_list.value = mobanList.data;
	        console.log(mobanList);
			
        }

		
		
	

		//faq
		const faq_list = ref([])
		const faq = async()=>{
            const topList = await new proxy.$request(proxy.$urls.m().faq).modeget()
			faq_list.value = topList.data;
			// console.log(665656,topList);
        }
		const faq_listTop1 = computed(() => readonly(faq_list.value.filter(obj => obj.top === 1)));
		
   

	    //路由
	    const router = useRouter();
		

		const goList = () => {
			
		   
		   router.push({ name: 'List'});
		};

		const goFaq = () => {
		   router.push({ path: '/Faq' });
		};


		const home_list = () => {
         
		   const id = class_ids.value
		   
		   router.push({ name: 'List', query: { id } });
		  
		}

        const search_list = (e) => {
			const id = e.id
			router.push({ name: 'List', query: { id } });

		}


		// 搜索
		const inputValue = ref('')
		const showInputValue = () => {
			
            const content = inputValue.value
			router.push({ name: 'List', query: { content } });
		}

		const faq_link = () => {
			router.push({ path: '/Faq' });
		}
        return {
			header,
			sre_img,
			banner_list,
			home_four,
			bannerListTop,
			bannerTop,
			type0Objects,
			type1Objects,
			top_list,
			top_listTop1,
			onSwiper,
			onSlideChange,
			faq_list,
			faq,
			faq_listTop1,
			modules: [Navigation, Pagination, Scrollbar, A11y,Autoplay],
			selectedItem,
			selectItem,
			moban_list,
			moban,
			activeIndex,
			goList,
			goFaq,
			home_list,
			search_list,
			inputValue,
			showInputValue,
			faq_link
		}
    }
}
</script>


<style scoped>





/*--------------------------------------------- home --------------------------------------------*/



/* banner */
.banner {
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 80.3vh;
	overflow: hidden;
}
.banner .swiper-container {
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	list-style: none;
	padding: 0;
	z-index: 1;
}
.banner .swiper-wrapper {
	display: flex;
	position: relative;
	width: 100%;
	z-index: 1
}
.banner .swiper-slide {
	height: 0;
	width: 100%;
	padding-bottom: 80.3vh;
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-shrink: 0;
	position: relative;
	overflow: hidden
}
.banner .swiper-slide>img,.banner .swiper-slide video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover
}


.banner-button-prev,
.banner-button-next {
	position: absolute;
	top: 48%;
	transform: translate(0, -50%);
	width: .5rem;
	height: .5rem;
	background: rgb(0 0 0 / 30%);
	z-index: 999;
	outline: none;
	cursor: pointer;
	-webkit-user-select: none;
	user-select: none;
	-webkit-border-radius: .05rem;
	border-radius: .05rem;
	overflow: hidden;
	-webkit-transition: all .3s ease;
	transition: all .3s ease
}
.banner-button-prev {
	left: -.6rem;
}
.banner-button-next {
	right: -.6rem;
}
.banner-button-prev i,
.banner-button-next i {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 0.24rem;
	color: #FFF;
}
.banner:hover .banner-button-prev {
	left: .3rem
}
.banner:hover .banner-button-next {
	right: .3rem
}
.banner-button-prev:hover,
.banner-button-next:hover {
	background-color: var(--i_color2)
}


.banner-pagination {
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	bottom: .4rem;
	width: auto;
	cursor: pointer;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	z-index: 3;
}

.banner-pagination .swiper-pagination-bullet {
	display: block;
	width: 0.16rem;
	height: 0.12rem;
	margin: 0 .08rem;
	background: rgb(255 255 255 / 50%);
	position: relative;
	outline: none;
	clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
}
.banner-pagination .swiper-pagination-bullet-active::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	background: var(--i_color);
}
.banner-pagination .swiper-pagination-bullet-active::before {
	animation: w100 0.3s ease;
}
@keyframes w100 {
	0% {
		width: 0%;
	}

	100% {
		width: 100%;
	}
}

@media screen and (max-width:1024px) {
	.banner {
		margin-top: var(--header_height);
		position: relative;
		top: initial;
		height: auto;
	}
	.banner .swiper-slide {
		padding-bottom: 46%
	}

	.banner-button-prev,
	.banner-button-next {
		display: none
	}

	
}
@media screen and (max-width:768px) {
	.banner .swiper-slide {
		padding-bottom: 64%
	}
	.banner-pagination {
		bottom: 0.3rem;
	}
}
@media screen and (max-width:560px) {
	.banner-pagination {
		bottom: 0.2rem;
	}
	
}






.fullMask {
	width: 100%;
	height: 80.3vh;
}
.fullMask_about{
	width: 100%;
	height: 63.7vh;
}
@media screen and (max-width:1024px) {
	.fullMask,.fullMask_about{
		display: none;
	}
}

.banner_text{
    position: absolute;
    top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
} 
.banner_text h2{
    font-size: 0.46rem;
	color: #fff;
	font-weight: bold;
	text-align: center;
}

.banner_text h3{
    font-size: 0.16rem;
	line-height: 0.32rem;
	color: #FFF;
	text-align: center;
	margin: 0.2rem 0 0.4rem 0;
}


.banner_text_search{
    width: 50%;
	position: relative;
}
.banner_text_search input{
    width: 100%;
	background: #fff;
	border-radius: 0.4rem;
	height: 0.66rem;
	box-sizing: border-box;
	padding: 0.15rem 1.8rem 0.15rem 0.2rem;
	color: #333;
	font-size: 0.16rem;
	box-shadow: 0 0 0.1rem rgba(225,225,225,0.8);
}
.banner_text_search button{
    position: absolute;
	top: 50%;
	right: 0.1rem;
	transform: translate(0,-50%);
	width: 1.6rem;
	height: 0.5rem;
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	font-size: 0.18rem;
	color: #fff;
	background: var(--i_color);
	border-radius: 0.3rem;
	cursor: pointer;
}


.banner_text_ul{
    display: flex;
	display: -webkit-flex;
	justify-content: center;
	margin-top: 0.3rem;
}

.banner_text_ul li{
   
	box-sizing: border-box;
	padding: 0 0.4rem;
	border-right: 1px solid #fff;
}
.banner_text_ul li:last-child{
	border-right: 0px;
}
.banner_text_ul li p{
	font-size: 0.14rem;
	color: #FFF;
	display: inline-block;
	border-bottom: 1px solid transparent;
	transition: all 0.3s ease;
	cursor: pointer;
}
.banner_text_ul li p:hover{
	border-bottom: 1px solid #fff;
}


@media screen and (max-width:1600px) {

}
@media screen and (max-width:1440px) {
	.banner_text h2 {font-size: 0.4rem;}
}
@media screen and (max-width:1366px) {

}
@media screen and (max-width:1200px) {
	.banner_text h2 {font-size: 0.35rem;}
}
@media screen and (max-width:1024px) {

}
@media screen and (max-width:960px) {
	.banner_text h2 {font-size: 0.3rem;}
	.banner_text_search input { height: 0.6rem;}
}
@media screen and (max-width:768px) {
	.banner_text h3{display: none;}
	.banner_text h2 {font-size: 0.3rem;margin-block: 0.2rem;}
	.banner_text_search { width: 80%;}
	.banner_text_search button { right: 0.05rem;}

}
@media screen and (max-width:560px) {
	.banner_text_search { width: 100%;}
	.banner_text_ul li { padding: 0 0.2rem;}
}
@media screen and (max-width:425px) {

}




/* @media screen and (max-width:1600px) {

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

}
@media screen and (max-width:768px) {

}
@media screen and (max-width:560px) {

}
@media screen and (max-width:425px) {

} */





/* -----------------------------main------------------------ */
.four_bac{
	box-sizing: border-box;
	padding: 0.5rem 0 0.3rem 0;
	border-bottom: 1px solid #D8D8D8;
}
.four{
    display: flex;
	display: -webkit-flex;
    justify-content: space-between;
	box-sizing: border-box;
	flex-wrap: wrap;
}
.four li{
    display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
}
.four_div{
    display: flex;
	display: -webkit-flex;

}
.four_div p{
    font-size: 0.5rem;
	color: #333;
	font-weight: bold;
}
.four_div span{
	font-size: 0.5rem;
	color: #333;
	font-weight: bold;
}
.four h2{
	font-size: 0.18rem;
	color: #333;
}

@media screen and (max-width:768px) {
	.four li{width: 50%;}
	.four{gap: 0.2rem 0;}
}
@media screen and (max-width:560px) {
	.four h2 {font-size: 0.16rem;text-align: center;}
}
@media screen and (max-width:425px) {

}


/* 最新模板 */

.new_template{
	box-sizing: border-box;
	padding: 0.7rem 0 0.5rem 0;
}
.new_template_swiper{
	box-sizing: border-box;
}
.title{
    display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 0.3rem;
}
.title p{
    font-size: 0.36rem;
	color: #333;
	text-align: center;
}

.title span{
   font-size: 0.16rem;
   color: #333;
   line-height: 0.32rem;
   text-align: center;
   margin-top: 0.1rem;
}



.swiper_a{
	display: block;
	width: 100%;
}

.swiper_a .img{width:100%; box-sizing:border-box; border-radius: 0.1rem ;box-shadow: 0 0 0.2rem rgba(51,112,255,0.1); position:relative; overflow:hidden}
.swiper_a .img:before{content:""; display:block; padding-bottom:50%}
.swiper_a .img img{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:100%; height:100%; object-fit:contain}


.swiper_a .img img{-webkit-transition:all .5s ease; -moz-transition:all .5s ease; -ms-transition:all .5s ease; -o-transition:all .5s ease; transition:all .5s ease}

.i_partner_text{
    margin-top: 0.2rem;
	box-sizing: border-box;
	padding-bottom: 0.5rem;
}
.i_partner_text h2{
    font-size: 0.18rem;
	line-height: 0.32rem;
	text-align: center;
}

.i_partner_text h3{
	font-size: 0.18rem;
	line-height: 0.32rem;
	text-align: center;
}

.swiper-pagination{
	position: relative;
	box-sizing: border-box;
	margin-top: 40px;
}


/* 优势 */
.adavange_bac{
	box-sizing: border-box;
	background: url('../assets/img/adavange_bac.webp') center no-repeat;
	background-size: cover;
	padding: 1.2rem 0;
}
.adavange{
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
	align-items: flex-start;
}
.adavange_ul{
	width: 50%;
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	min-height: 5.8rem;
}
.adavange_ul li{
    box-sizing: border-box;
	padding: 0.2rem 0;
	border-bottom: 1px solid rgba(51,51,51,0.1);
	position: relative;
}
.adavange_ul li::after{
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 1px;
	background: var(--i_color);
	transition: all 0.5s ease;
}
.adavange_ul li:hover::after{
	width: 50%;
}
.adavange_ul li:hover .adavange_ul_h2{
	display: block;
}
.adavange_txt{
    display: flex;
	display: -webkit-flex;
    align-items: center;
}
.adavange_txt img{
    width: 0.6rem;
	height: 0.6rem;
	object-fit: contain;
}
.adavange_txt p{
    font-size: 0.24rem;
	color: #333;
	width: calc(100% - 0.6rem);
	box-sizing: border-box;
	padding-left: 0.2rem;
}
.adavange_ul_h2{
    font-size: 0.16rem;
	line-height: 0.32rem;
	color: #333;
	margin-top: 0.1rem;
	display: none;
}








.adavange_img{
	width: 50%;
	position: relative;
	overflow: hidden;
}

.adavange_img::after{
   content: '';
   display: block;
   padding-bottom: 70%;
}
.adavange_img img{
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   width: 100%;
   height: 100%;
   object-fit: contain;
}

@media screen and (max-width:960px) {
   .adavange_img{display: none;}
   .adavange_ul{width: 100%;}
   .adavange_bac {padding: 1rem 0;}
   .adavange_ul{min-height: unset;}
}
@media screen and (max-width:768px) {
	.adavange_bac {padding: 0.8rem 0;}
	.adavange_txt p{font-size: 0.2rem;}
}
@media screen and (max-width:560px) {
	
}
@media screen and (max-width:425px) {

} 


/* 列表 */

.product_list_bac{
    box-sizing: border-box;
	padding: 0.7rem 0;
}
.product_list{
    display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
}
.product_list_ul{
    display: flex;
	display: -webkit-flex;
	flex-direction: column;
	width: 2.3rem;
}
.product_list_ul li{
    display: flex;
	display: -webkit-flex;
	align-content: center;
	box-sizing: border-box;
	padding: 0.13rem 0;
	border-bottom: 1px solid rgba(51,51,51,0.1);
	cursor: pointer;
}
.product_list_ul li img{
    width: 0.2rem;
	height: 0.2rem;
	object-fit: contain;
	display: block;
}
.product_list_ul li p{
    font-size: 0.14rem;
	color: #333;
	margin-left: 0.1rem;
}
.product_list_ul .active p{
	color: var(--i_color) !important;
}
.product_list_are{
	width: calc(100% - 2.3rem);
	box-sizing: border-box;
	padding-left: 2%;
}
.product_list_dl{
    display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
	gap: 0.3rem;
}
.product_list_dl dt{
    width: calc((100% - 0.9rem) / 4);
}
.product_list_dl dt a{
    display: block;
	width: 100%;
}
.product_list_img{
    width: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 0.1rem;
} 
.product_list_img::after{
    content: '';
	display: block;
	padding-bottom: 62%;
}
.product_list_img img{
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 100%;
	height: 100%;
	object-fit: contain;
} 

.product_list_img p{
    position: absolute;
	top: 115%;
	left: 50%;
	transform: translate(-50%,-50%);
	display: inline-block;
	box-sizing: border-box;
	color: #fff;
	background: var(--i_color);
	border-radius: 0.2rem;
	font-size: 0.14rem;
	padding: 0.07rem 0.2rem;
	z-index: 2;
	transition: all 0.5s ease;
}
.product_list_dl dt:hover .product_list_img p{
	top: 50%;
}
.product_list_text{
    margin-top: 0.1rem;
}
.product_list_text h2{
    font-size: 0.16rem;
	line-height: 0.3rem;
	color: #333;
}
.product_list_text h3{
	font-size: 0.16rem;
	line-height: 0.3rem;
	color: #333;
}
.product_list_btn{
	display: inline-block;
	color: #999;
	font-size: 0.14rem;
	box-sizing: border-box;
	padding: 0.1rem 0.5rem;
	border: 1px solid #999;
	border-radius: 0.2rem;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	margin-top: 0.5rem;
}
.product_list_btn:hover{
	color: #fff;
	background: var(--i_color);
	border: 1px solid var(--i_color);
}

.home_faq_bac{
    box-sizing: border-box;
	padding: 0.6rem 0;
}
.home_faq{
    
}
.home_faq_title{
    display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	align-content: center;
}
.home_faq_title h2{
    font-size: 0.36rem;
	color: #333;
}
.home_faq_btn{
	display: inline-block;
	color: #999;
	font-size: 0.14rem;
	box-sizing: border-box;
	padding: 0.1rem 0.5rem;
	border: 1px solid #999;
	border-radius: 0.2rem;
	background: transparent;
	cursor: pointer;
	transition: all 0.3s ease;
	
}
.home_faq_btn:hover{
	color: #fff;
	background: var(--i_color);
	border: 1px solid var(--i_color);
}
.home_faq_ul{
    margin-top: 0.4rem;
	display: flex;
	display: -webkit-flex;
	flex-wrap: wrap;
	justify-content: space-between;
} 
.home_faq_ul li{
    width: 49%;
	display: flex;
	display: -webkit-flex;
	box-sizing: border-box;
	padding: 0.15rem 0;
	border-bottom: 1px solid rgba(51,51,51,0.1);
	cursor: pointer;
}
.home_faq_ul li:hover p{
	color: var(--i_color);
}
.home_faq_ul li p{
	font-size: 0.16rem;
	color: #333;
	width: calc(100% - 0.9rem);
	overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    transition: all 0.3s ease;
}
.home_faq_ul li span{
	font-size: 0.14rem;
	color: #333;
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
	.product_list_ul{width: 100%;}
	.product_list_are {width: 100%; padding-left: 0%;margin-top: 0.4rem;}
	.product_list_ul li{width: 24%;}
	.product_list_ul {flex-direction: row;flex-wrap: wrap;gap:0 1% ;}
}
@media screen and (max-width:1024px) {

}
@media screen and (max-width:960px) {
	.product_list_dl dt {width: calc((100% - 0.6rem) / 3);}
}
@media screen and (max-width:768px) {
	.home_faq_ul li { width: 100%;}
	.home_faq_title h2 {font-size: 0.3rem}
}
@media screen and (max-width:560px) {
	.product_list_ul li{width: 49%;}
	.product_list_dl dt {width: calc((100% - 0.3rem) / 2);}
}
@media screen and (max-width:425px) {

}








/* 常见问题 */
.home_faq_bac{
	background: #F9FAFD;
}
.home_faq{
    
}



















</style>

