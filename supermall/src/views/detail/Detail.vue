<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detailInfo="detailInfo"/>
    <detail-params-info :paramInfo="itemParams"/>
    <detail-comment-info :commentInfo='commentInfo'/>
    <goods-list :goods="recommends"/>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top/>
    <toast/>
  </div>
</template>

<script>
import { getDetail,Goods,Shop,getRecommend} from 'network/detail'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop.vue'
import Toast from 'components/common/toast/Toast'

export default {
  name:'Detail',
  components: { 
    DetailNavBar, 
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends:[]
    }
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid
    //2、根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res);
      const data = res.result
      //1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      //2 、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //3、获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //4、获取商品详细信息
      this.detailInfo = data.detailInfo
      //5、获取参数信息
      this.itemParams = data.itemParams
      // console.log(this.itemParams);
      //6、获取评论信息，有的没有评论需要做判断
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    }),
    //详情页推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })
  },
  methods:{
    addToCart() {
      //1、获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid;
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      //购物车里显示的价格
      product.price = this.goods.nowPrice;

      product.img = this.topImages[0];
      //2、将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 2000)
      })
    }
  }
}
</script>
<style scoped>

</style>