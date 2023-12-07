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
                           <li v-for="obj in bannerListTop" :key="obj.title" @click="search_list(obj)"><p>{{obj.title}}</p></li>
                           
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
    <div class="content">
      <div class="right">
        <div righttop>
          <div class="tophead">
            <div class="cion">
              <div class="quenstion">?</div>
            </div>
            <div class="cionspan">常见问题</div>
          </div>
        </div>
        <ul class="ulist">
          <li
            @click="selectItem(item, index)"
            v-for="(item, index) in faqlist"
            :key="item.title"
            :class="{ active: item.id === activeIndex }"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>

      <!-- 右边 -->
      <div class="list">
        <div
          class="demo-collapse"
          v-for="(obj, index) in moban_list"
          :key="index"
        >
          <el-collapse v-model="activeNames" class="demo-item">
            <el-collapse-item :title="obj.ask" class="demo-el">
              <div class="answer">
                {{ obj.answer }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <div class="listleft">
            {{ obj.created }}
          </div>
        </div>
        <div class="product_list_fy">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="8"
            :pager-count="7"
            :total="moban_cont"
            @current-change="currentChange"
            :hide-on-single-page="true"
          />
        </div>
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
export default {
    name:'Faq',
    components:{Header,Footer},
    setup(){
        onMounted(() => {
            header();
            banner_list();
			headers();
            headerss();
        })

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
			
    
        }
		const bannerListTop = computed(() => readonly(bannerTop.value.filter(obj => obj.top === 1)));


		const router = useRouter();
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


		// faq接口

		const sre_imgs = ref([]);
    const headers = async () => {
      const sre = await new proxy.$request(proxy.$urls.m().faq).modepost();
      sre_imgs.value = sre.data;
    };

    // faqclass接口
    const activeIndex = ref(0);
    const class_id = ref(0);
    const faqlist = ref([]);
    const headerss = async () => {
      const sre = await new proxy.$request(proxy.$urls.m().faqclass).modeget();
      faqlist.value = sre.data;
      class_id.value = sre.data[0].id;
      activeIndex.value = sre.data[0].id;
      console.log(111, activeIndex.value);
      moban(class_id.value);
    };

    const selectItem = (item, index) => {
      //激活
      activeIndex.value = item.id;
      class_id.value = item.id;

      headers();
      moban(class_id.value);
    };
    const moban_list = ref([]);
    const moban_fy = ref(1);
    const moban_cont = ref(0);
    const moban = async (class_id) => {
      const mobanList_urls = proxy.$urls.m().faq;
      const mobanList_url = `${mobanList_urls}?pid=${class_id}&limit=8&page=${moban_fy.value}`;
      const mobanList = await new proxy.$request(mobanList_url).modepost();
      moban_list.value = mobanList.data;
      moban_cont.value = mobanList.count;
    };
    const currentChange = (val) => {
      moban_fy.value = val ;
      console.log(55, val);
      moban(class_id.value);
    };
    const activeNames = ref(["1"]);
    const handleChange = (val) => {
      
    };

        return{
            header,
			sre_img,
			banner_list,
			bannerListTop,
			search_list,
			inputValue,
			showInputValue,
			sre_imgs,
			faqlist,
			banner_list,
			bannerListTop,
			selectItem,
			moban,
			headerss,
			moban_cont,
			moban_list,
			activeIndex,
			activeNames,
			handleChange,
			currentChange,
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


.content {
  height: 1006px;
  padding: 100px 160px 61px 160px;
  display: flex;
}
.banner {
  width: 100vw;
  height: 348px;
  background-color: aqua;
}
.tophead {
  width: 232px;
  height: 32px;
  display: flex;
  padding-bottom: 17px;
  border-bottom: 1px solid #ccc;
}
.cion {
  width: 26px;
  height: 26px;
  line-height: 26px;
  margin-top: 5px;
  margin-right: 13px;
}
.cion div {
  width: 22px;
  height: 22px;
  border: 1px solid #295ed9;
  border-radius: 11px;
  text-align: center;
  color: #295ed9;
}
.cionspan {
  width: 198px;
  height: 32px;
  font-size: 24px;
  font-weight: normal;
  line-height: normal;
  color: #333333;
  border: 0;
}
.ulist {
  width: 232px;
}
.ulist li {
  width: 232px;
  height: 52px;
  border-bottom: 1px solid #ccc;
  /* margin-left: 39px; */
  list-style: none;
  line-height: 52px;
  box-sizing: border-box;
  padding-left: 39px;
  font-size: 14px;
}
.ulist li:hover {
  color: #295ed9;
  cursor: pointer;
}
.list {
  width: 1332px;
  margin-left: 35px;
  border-top: 1px solid #ccc;
  position: relative;
}

.listleft {
  width: 83px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  color: #333;
  position: absolute;
  top: 10px;
  right: 50px;
}
.answer {
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  line-height: 28px;
  color: #999;
}
::v-deep .el-collapse-item__header {
  font-size: 16px;
  color: #000;

  /* border-bottom: 1px solid #ccc; */
}
.demo-collapse {
  position: relative;
}

.quenstion {
  font-size: 20px;
}

.product_list_fy {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  margin-top: 0.5rem;
  position: absolute;
  left: 0;
  position: absolute;
  left: 35%;
  margin-top: 40px;
}
.active{
	color: #295ed9;
}




</style>


