<template>
    <swiper class="swiper-item">
        <swiper-item v-for="item in topImages" :key="item.id">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'DetailSwiper',
    components: { Swiper,SwiperItem},
    props:{
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    // mounted(){
    //     console.log(topImages);
    // }
}
</script>

<style scoped>
.swiper-item{
    height: 300px;
    overflow: hidden;
}
</style>