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
                        <div class="banner_text_search">
                            <input type="text" placeholder="请输入搜索关键词" v-model="inputValue">
                            <button @click="showInputValue()">点击搜索</button>
                        </div>
                        <ul class="banner_text_ul">
                            <li v-for="(obj, index) in bannerListTop" :key="obj.title" @click="selectItem(obj,index)"><p>{{obj.title}}</p></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>


    <div class="fullMask fullMasktwo"></div>


    <!-- main -->
    <main>
         <!-- 列表 -->
		<div class="product_list_bac">
			<div class="title">
				<p>模板案例</p>
				<span>不定期上新行业模板，不定期上新行业模板</span>
			</div>
            <div class="product_list wrap">
                <ul class="product_list_ul">
					<li v-for="(obj, index) in bannerTop" :key="obj.title"  @click="selectItem(obj,index)"  :class="{ active: obj.id == activeIndex }">
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
					<div class="product_list_fy">
						<el-pagination background layout="prev, pager, next" 
						:page-size="12"
                        :pager-count="7"
						:total="moban_cont" 
						@current-change="currentChange"
						:hide-on-single-page="true"
						/>
					</div>
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

    </main>

    
    <!-- Footer -->
	<Footer></Footer>
</template>

<script>
import { computed, reactive, ref, watch,onMounted,createApp, toRefs,getCurrentInstance,readonly,onBeforeUnmount,nextTick,onBeforeMount } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useRoute, useRouter } from 'vue-router';
import { ElDescriptions } from 'element-plus';
export default {
    name:'List',
    components:{Header,Footer},
    setup(){
        onMounted(() => {
            header();
			faq();
            banner_list();
			
        })

        const {proxy} = getCurrentInstance()
  
		//banner图片
		const sre_img = ref('')
		const header = async()=>{
            
            const sre = await new proxy.$request(proxy.$urls.m().menu).modeget()
			

			sre_img.value = sre.data[0].img;
    
        }

		const activeIndex = ref(0); // 默认第一个li激活
        //banner搜索下面的分类
		const class_ids = ref(0)
		const bannerTop = ref([])
		const banner_list = async()=>{
            
            const bannerlist = await new proxy.$request(proxy.$urls.m().category).modeget()
			bannerTop.value = bannerlist.data
            class_ids.value = bannerlist.data[0].id
			activeIndex.value = bannerlist.data[0].id
	
			// moban(class_ids.value)
			
			router_id();
			setTimeout(()=>{
				search_other();
			},100)
			
			order_data();
			successTop();
        }
		const bannerListTop = computed(() => readonly(bannerTop.value.filter(obj => obj.top === 1)));


        // 模板案例
      
		
	    //点击
		const selectItem = (item,index) => {
			
		   //激活
		   activeIndex.value = item.id;
		   class_ids.value = item.id
		   moban(class_ids.value)
		   
		};

		const moban_list = ref([])
		const moban_fy = ref(1)
		const moban_cont = ref(0)
	
		const moban = async(class_id)=>{
			const mobanList_urls = proxy.$urls.m().template
			const mobanList_url = `${mobanList_urls}?pid=${class_id}&limit=12&page=${moban_fy.value}`
            const mobanList = await new proxy.$request(mobanList_url).modeget();
			moban_list.value = mobanList.data;
			moban_cont.value = mobanList.count
	       
			
        }

		//分页
		const currentChange = (val) => {
			moban_fy.value = val
			
			moban(class_ids.value)
			
		}



		const route = useRoute();

        const chushi_id = route.query.id
		const router_id = () => {

			if(chushi_id){
				//存在
				activeIndex.value = chushi_id;
				class_ids.value = chushi_id;
				
				console.log('activeIndex', activeIndex.value);
			}else{
				//不存在 默认第一个分类
				class_ids.value = activeIndex.value 
			}
			moban(class_ids.value)
		}


		//faq
		const faq_list = ref([])
		const faq = async()=>{
            const topList = await new proxy.$request(proxy.$urls.m().faq).modeget()
			faq_list.value = topList.data;
			// console.log(665656,topList);
        }
		const faq_listTop1 = computed(() => readonly(faq_list.value.filter(obj => obj.top === 1)));
		
   


		// 搜索
		const searchMoban = async(e)=>{
			
			const mobanList_urls = proxy.$urls.m().template
			const mobanList_url = `${mobanList_urls}?title=${e}&limit=12&page=${moban_fy.value}`
            const mobanList = await new proxy.$request(mobanList_url).modeget();
			moban_list.value = mobanList.data;
			moban_cont.value = mobanList.count
	       
			console.log('search',mobanList);
			
        }
        const inputValue = ref('')
		const showInputValue = () => {
			activeIndex.value = ''
			searchMoban(inputValue.value)
		}


		//其他页搜索
		const search_content = route.query.content
        const search_other = () => {
            if(search_content){
				
				activeIndex.value = ''
				searchMoban(search_content)
			}else{

			}
		}

        // 新品上线
		const order = route.query.order
		const order_data = () => {
			if(order) {
				activeIndex.value = '';
				console.log(order);
				Newsmoban(order)
			}else{

			}

		}

		const Newsmoban = async()=>{
			const mobanList_urls = proxy.$urls.m().template
			const mobanList_url = `${mobanList_urls}?limit=12&page=1&order=${order}`
            const mobanList = await new proxy.$request(mobanList_url).modeget();
			moban_list.value = mobanList.data;
			moban_cont.value = mobanList.count
	       
			
        }


		//成功案例

		const top = route.query.top
		const successTop = () => {
			if(top){
				activeIndex.value = '';
				Succseemoban()
				console.log(top);
			}else{

			}
		}

		const Succseemoban = async()=>{
			const mobanList_urls = proxy.$urls.m().template
			const mobanList_url = `${mobanList_urls}?limit=12&page=1&top=${top}`
            const mobanList = await new proxy.$request(mobanList_url).modeget();
			moban_list.value = mobanList.data;
			moban_cont.value = mobanList.count
	       
			
        }
		//路由
		const router = useRouter();
		const faq_link = () => {
			router.push({ path: '/Faq' });
		}
		const goFaq = () => {
		   router.push({ path: '/Faq' });
		};

        return{
            header,
			sre_img,
			banner_list,
			bannerListTop,
            activeIndex,
            selectItem,
            moban,
            moban_list,
            bannerTop,
            currentChange,
			moban_cont,
			router_id,
			chushi_id,
			
			searchMoban,
			showInputValue,
			inputValue,
			search_content,
			search_other,
			faq_listTop1,
			order_data,
			successTop,
			faq_link,
			goFaq
			
        }
    }
}
</script>


<style scoped>
/* banner */
.banner {
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 37.3vh;
	overflow: hidden;
}
.fullMasktwo{
    height: 37.3vh !important;
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
	padding-bottom: 37.3vh;
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
    top: 62%;
	left: 50%;
	transform: translate(-50%,-50%);
	display: flex;
	display: -webkit-flex;
	flex-direction: column;
	align-items: center;
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
	
}
@media screen and (max-width:1366px) {

}
@media screen and (max-width:1200px) {

}
@media screen and (max-width:1024px) {
    .banner .swiper-slide{padding-bottom: 30% !important;}
    .banner_text{ top: 50% !important;}
}
@media screen and (max-width:960px) {
	
	.banner_text_search input { height: 0.6rem;}
}
@media screen and (max-width:768px) {

	.banner_text_search { width: 80%;}
	.banner_text_search button { right: 0.05rem;}
    .banner .swiper-slide{padding-bottom: 40% !important;}
}
@media screen and (max-width:560px) {
	.banner_text_search { width: 100%;}
	.banner_text_ul li { padding: 0 0.2rem;}
    .banner .swiper-slide{padding-bottom: 50% !important;}
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
}
.home_faq_ul li p{
	font-size: 0.16rem;
	color: #333;
	width: calc(100% - 0.9rem);
	overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;

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

/* 分页 */
.product_list_fy{
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	margin-top: 0.5rem;
}



/* faq */

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

@media screen and (max-width:768px) {
	.home_faq_ul li { width: 100%;}
}
</style>

