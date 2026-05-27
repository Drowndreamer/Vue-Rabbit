<script setup>
import {ref, onMounted} from 'vue'
import { getHomeHotAPI } from '@/apis/home'
import HomePanel from './HomePanel.vue'


const newList = ref([])

onMounted(async () => {
  const res = await getHomeHotAPI()
  newList.value = res.result
})
</script>

<template>
  <HomePanel title="热门推荐" subTitle="热门商品 推荐用户">
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img v-m-lazy="item.picture" alt="" />
        <p class="name">{{ item.title }}</p>
        <p class="price">{{ item.alt }}</p>
      </RouterLink>
    </li>
  </ul>
</HomePanel>
 
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>