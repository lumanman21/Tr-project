<template>
  <div class="category-table">
    <div v-for="item in categoryTable" :key="item.id" class="table-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'CategoryTable.',
  props:{
    categoryTable:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.category-table {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
}
.table-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 33%;
  height: 95px;
  /* margin-bottom: 10px; */
}
a img {
  text-align: center;
  width: 80%;
  padding-left: 13px;
  margin-bottom: 7px;
}
a p {
  text-align: center;
  font-size: 12px;
}
</style>