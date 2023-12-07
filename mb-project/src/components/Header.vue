<template>
    <!-- header -->
    <header>

        <div class="top_cont">
            <div class="top wrap_top">

                <!-- Logo -->
                <div class="logo"><a><img :src="sre_logo" /></a></div>

                <!-- Nav -->
                <ul class="i_nav" :class="{ 'on': isNavOpen }">
                    <li class="menu-item current-menu-item" @click="goHome">
                        <a>网站首页</a>
                    </li>
                    <li class="menu-item menu-item-has-children" @click="newsLink">
                        <a >新品上线</a>
                    </li>
                    <li class="menu-item" @click="goList">
                        <a >所有模板</a>
                    </li>
                    <li class="menu-item" @click="sucsessLink">
                        <a>成功案例</a>
                    </li>
                    <li class="menu-item menu-item-has-children" @click="goFaq">
                        <a>常见问答</a>
                    </li>
                </ul>

                <!-- Mobile nav button -->
                <div class="nav_menu" @click="toggleNav" :class="{ 'on': isNavOpen }"><i></i></div>

            </div>
        </div>

    </header>

<div class="clear"></div>

    
</template>

<script>
import { computed, reactive, ref, watch,onMounted, toRefs,getCurrentInstance   } from 'vue'
import { useRouter } from 'vue-router';
export default {
    name:'Header',
    components:{},
    setup(){
		onMounted(() => {
			header();
			
			
		})

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
		//头部
		const sre_logo = ref('')
        const {proxy} = getCurrentInstance()
        const header = async()=>{
            
            const sre = await new proxy.$request(proxy.$urls.m().website).modeget()
			sre_logo.value = sre.data.logo

        }




        const isNavOpen = ref(false);
        const toggleNav = () => {
           isNavOpen.value = !isNavOpen.value;
        };


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
        return {header,toggleNav,isNavOpen,sre_logo,goHome,goList,goFaq,newsLink,sucsessLink}
    }
}
</script>


<style scoped>
/* header */
header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 2014;
	transition: all 1s ease;
}
header::before {
	content: '';
	position: absolute;
	left: 50%;
	bottom: 0;
	width: 90%;
	transform: translate(-50%,0%);
	height: 1px;
	background: var(--border_color);
	z-index: 2014;
}

.top_cont {
	position: relative;
	background: transparent;
	z-index: 2013;
	width: 90%;
	margin: 0 auto;
	transition: all 0.7s ease;
}
.mouseHeader{
	top: -30%;
	transition: all 1s ease;
}
.top {
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	position: relative;
}
.TopHeader .top_cont {
	background: rgba(38,80,178,0.8);
}

@media screen and (max-width:1024px) {
	header {
		top: 0;
		top: 0;
		width: 100%;
		box-shadow: 0 4px 10px rgba(0, 0, 0, .1);
	}
	.top_cont {
		background: #333 !important;
	}
	.top_cont {width: 100%;}
    .top {justify-content: space-between;}
}



/* logo */
.logo {
	display: -webkit-flex;
	display: flex;
	align-items: center;
	height: var(--header_height);
}
.logo a {
	display: -webkit-flex;
	display: flex;
	align-items: center;
	height: 100%;
}
.logo img {
	height: 50%;
}

@media screen and (max-width:1440px) {
	
}
@media screen and (max-width:1024px) {
	
}





/* 导航 */
@media screen and (min-width:1025px) {
	.i_nav {
		margin-left: auto;
		display: -webkit-flex;
		display: flex;
		flex-wrap: nowrap;
		z-index: 2014;
		height: var(--header_height);
	}

	.i_nav>li {
		position: relative;
		margin: 0 .4rem;
	}

	.i_nav>li>a {
		
		font-size: .18rem;
		color: #fff;
		line-height: var(--header_height);
		white-space: nowrap;
		-webkit-border-radius: .08rem;
		border-radius: .08rem;
		text-transform: capitalize;
		box-sizing: border-box;
		position: relative;
        padding-bottom: 0.07rem;
        cursor: pointer;
	}
	/* .i_nav>li>a::after{
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0;
		height: 0.04rem;
		border-radius: 2px;
		background-color: var(--i_color);
        transition: all 0.4s ease;
	} */
	.i_nav>.current-menu-item>a,
	.i_nav>.current-category-ancestor>a,
	.i_nav>.current-post-ancestor>a,
	.i_nav>.current-menu-ancestor>a,
	.i_nav>.current-menu-parent>a,
	.i_nav>li:hover>a,
	.i_nav .curr>a {
		color: #fff !important;
	}



	.i_nav>.current-menu-item>a::after,
	.i_nav>.current-category-ancestor>a::after,
	.i_nav>.current-post-ancestor>a::after,
	.i_nav>.current-menu-ancestor>a::after,
	.i_nav>.current-menu-parent>a::after,
	.i_nav>li:hover>a::after,
	.i_nav .curr>a::after{
		width: 100%;
		right: auto;
		left: 0;

	}




	.i_nav .sub-menu {
		display: none;
		position: absolute;
		border-top: 2px solid var(--i_color);
		background: rgb(255 255 255 / 100%);
		min-width: 1.6rem;
		overflow: hidden;
	}
	.i_nav .sub-menu li {
		position: relative;
	}
	.i_nav .sub-menu li::before,
	.i_nav .sub-menu li::after {
		content: '';
		position: absolute;
		bottom: 0;
		height: 1px;
	}
	.i_nav .sub-menu li::before {
		left: 0;
		width: 100%;
		background: rgb(0 0 0 / 8%);
	}
	.i_nav .sub-menu li::after {
		right: 0;
		width: 0;
		background: var(--i_color);
	}

	.i_nav .sub-menu a {
		display: block;
		padding: 0 .8rem 0 .2rem;
		font-size: 0.15rem;
		color: #444;
		line-height: 0.44rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		position: relative;
		left: 0;
	}
	.i_nav .sub-menu a::before {
		content: "\f324";
		font-family: "Font Awesome 5 Pro";
		font-weight: 300;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		left: -.16rem;
		font-size: 0.14rem;
		color: var(--i_color);
	}
	.i_nav .sub-menu li:hover::after {
		right: initial;
		left: 0;
		width: 100%;
	}
	.i_nav .sub-menu li:hover a {
		left: .16rem;
	}
	.i_nav .sub-menu li:hover a {
		color: var(--i_color);
	}
	.i_nav .sub-menu li:hover a::before {
		left: 0;
	}
	.i_nav .sub-menu li,
	.i_nav .sub-menu li::after,
	.i_nav .sub-menu a,
	.i_nav .sub-menu a::before {
		-webkit-transition: all .5s ease;
		transition: all .5s ease
	}


}

@media screen and (max-width:1440px) {
	.i_nav>li {
		margin: 0 .2rem;
	}
}
@media screen and (max-width:1366px) {
	.i_nav>li {
		margin: 0 .16rem;
	}
	.i_nav>li>a {
		font-size: 0.15rem;
	}
}
@media screen and (max-width:1200px) {
	.i_nav>li {
		margin: 0 .14rem;
	}
	.i_nav>li>a {
		font-size: 0.14rem;
	}
}
@media screen and (max-width:1024px) {
	.i_nav {
		
		position: fixed;
		top: var(--header_height);
		left: 102%;
		width: 100%;
		width: 100vw;
		max-height: calc(100vh - var(--header_height));
		background: #FFF;
		overflow-y: auto;
		z-index: 2;
        transition: all 1s ease;
	}
	/*滚动条*/
	.i_nav::-webkit-scrollbar {
		width: 3px;
		height: 8px
	}
	.i_nav::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: #555
	}
	.i_nav::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: #F1F1F1
	}

	.i_nav>li {
		margin: 0 0 !important;
		border-bottom: 1px solid var(--border_color);
		position: relative
	}
	.i_nav>.menu-item-has-children i {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		width: .44rem;
		height: .44rem;
		background: #F1F1F1;
	}
	.i_nav>.menu-item-has-children i::before {
		content: '\f107';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.26rem;
		color: #222;
	}

	.i_nav>.menu-item-has-children i.on::before {
		content: '\f106';
	}

	.i_nav>li>a {
		padding: 0 .2rem;
		font-size: .15rem;
		color: #222;
		line-height: .44rem;
		text-transform: uppercase;
	}

	.i_nav>li>.sub-menu {
		display: none
	}
	.i_nav>li>.sub-menu li {
		position: relative;
	}
	.i_nav .sub-menu a {
		padding: 0 .4rem;
		font-size: .14rem;
		color: #555;
		line-height: .4rem;
		position: relative
	}
	.i_nav .sub-menu li:not(:last-child) {
		border-bottom: 1px solid var(--border_color)
	}

	.i_nav>li>.sub-menu b {
		position: absolute;
		top: 0;
		right: 0;
		width: .4rem;
		height: .4rem;
		background: url(static/imgs/public/arrow_down_hollow_hei.svg) no-repeat center;
		background-size: .16rem;
	}
	.i_nav>li>.sub-menu b.on {
		background: url(static/imgs/public/arrow_up_hollow_hei.svg) no-repeat center;
		background-size: .16rem;
	}

	.i_nav .sub-menu .sub-menu {
		display: none;
	}

	.i_nav .sub-menu .sub-menu a {
		padding: 0 .6rem;
		font-size: .13rem;
		color: #888;
		line-height: .36rem;
		position: relative;
	}

	.i_nav a {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis
	}
    .i_nav.on{
        left: 0;
    }
}
@media screen and (max-width:768px) {}
@media screen and (max-width:560px) {}






/* 移动端导航按钮 */
.nav_menu {
	/* position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%); */
	position: relative;
	width: 22px;
	height: 16px;
	display: none;
	cursor: pointer
}
.nav_menu i {
	display: block;
	width: 100%;
	height: 3px;
	position: absolute;
	top: 50%;
	margin-top: -2px;
	background: #fff;
	border-radius: .1rem;
	transition: 0.5s
}
.nav_menu::before,
.nav_menu::after {
	content: "";
	width: 100%;
	height: 3px;
	background: #fff;
	position: absolute;
	left: 0;
	border-radius: .1rem;
	transition: 0.5s
}
.nav_menu::before {
	top: 0;
}
.nav_menu::after {
	bottom: 0;
}


.nav_menu.on i {
	opacity: 0
}

.nav_menu.on::before {
	transform: rotate(45deg);
	top: 50%;
	margin-top: -2px
}

.nav_menu.on::after {
	transform: rotate(-45deg);
	top: 50%;
	margin-top: -2px
}

@media screen and (max-width:1024px) {
	.nav_menu {
		display: block !important
	}

}


.top_r {
	--size: .22rem
}
.top_r {
	margin-left: 0.3rem;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: var(--header_height)
}

.top_search_ico {
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: var(--header_height);
	margin-right: 0.3rem;
	position: relative;
}
.top_search_ico::after{
	content: '';
	position: absolute;
	top: 50%;
	right: -0.15rem;
	transform: translate(0,-50%);
	width: 0.01rem;
	height: 0.2rem;
	background-color: #222;
}
.top_search_ico i {
	font-size: var(--size);
	cursor: pointer;
}
.top_search_ico.on i {
	color: var(--i_color);
}


.top_language {
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	height: var(--header_height);
	position: relative;
}
.top_language>i {
	font-size: var(--size);
	cursor: pointer;
}
.top_language.on>i {
	color: var(--i_color);
}


.top_language_list {
	visibility: hidden;
	opacity: 0;
	position: absolute;
	top: calc(var(--header_height) - .2rem);
	right: 0;
	z-index: 2;
	-webkit-transition: all .3s ease;
	transition: all .3s ease
}
.top_language_list.on {
	visibility: visible;
	opacity: 1;
	top: var(--header_height);
	box-shadow: .04rem .06rem .1rem rgb(0 0 0 / 10%);
}

.top_language_list ul {
	overflow: hidden;
}

.top_language_list li {
	background: #FFF;
}
.top_language_list a>span {
	display: block;
	padding: 0 14px;
	min-width: 100px;
	overflow: hidden
}
.top_language_list img,
.top_language_list .trp-ls-language-name {
	display: inline-block;
	vertical-align: middle;
	margin-left: 8px;
	font-size: .12rem;
	color: #666;
	line-height: .3rem
}

.top_language_list li:hover {
	background: var(--i_color)
}
.top_language_list li:hover .trp-ls-language-name {
	color: #FFF;
}
.top_language,
.top_language>i {
	-webkit-transition: all .3s ease;
	-moz-transition: all .3s ease;
	-ms-transition: all .3s ease;
	-o-transition: all .3s ease;
	transition: all .3s ease
}
@media screen and (max-width:1024px) {
	.top_language {
		margin-left:  .2rem;
	}
}
@media screen and (max-width:768px) {}
@media screen and (max-width:560px) {}



header,
.top_cont,
.logo,
.logo img,
.i_nav>li,
.i_nav>li>a,
.top_r {
	-webkit-transition: all .7s ease;
	-moz-transition: all .7s ease;
	-ms-transition: all .7s ease;
	-o-transition: all .7s ease;
	transition: all .7s ease
}



</style>

