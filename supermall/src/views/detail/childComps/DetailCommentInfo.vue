<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
        <div class="header-comment">
            <div class="header-title">用户评价</div>
            <div class="header-more">更多
                <i class="arroe-right"></i>
            </div>
        </div>

        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{ commentInfo.user.uname }}</span>
        </div>

        <div class="info-detail">
            <p>{{ commentInfo.content }}</p>
            <div class="info-other">
                <span class="date">{{ showDate(commentInfo.created) }}</span>
                <span>{{ commentInfo.style }}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
    name: "DetailCommentInfo",
    props: {
        commentInfo: {
            typpe: Object,
            default() {
                return {}
            }
        }
    },
    methods:{
        showDate(value){
            //1、创建时间戳date对象
            const date =new Date(value*1000)
            //2、将date格式化
            return formatDate(date,'yyyy-MM-dd')
        }
    }
}
</script>

<style scoped>
.comment-info{
    padding: 5px 12px;
    color: #333;
    height: 100%;
    line-height: 50px;
}

.header-comment{
    height: 50px;
    border-bottom: 2px solid #f2f5f8;
}
.header-title{
    float: left;
    font-size: 15px;
}
.header-more{
    float: right;
    margin-right: 10px;
    font-size: 13px;
}
.info-user{
    /* border-bottom: 5px solid #f2f5f8; */
    vertical-align: middle;
    padding: 0;
    height: 50px;
}
.info-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.info-user span{
    position: relative;
    font-size: 13px;
    top:-15px;
    margin-left: 10px;
}
.info-detail{
    padding: 0 5px 15px;
}
.info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
.info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}
.info-detail.info-other{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}
.info-detail.date{
    margin-right: 8px;
}
.info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
</style>