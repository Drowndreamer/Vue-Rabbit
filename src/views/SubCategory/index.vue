<script setup>
import { getCategoryFilterAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue'
const route = useRoute()
const id = route.params.id
const categoryData = ref({})
onMounted(async () => {
  const res = await getCategoryFilterAPI(id)
  categoryData.value = res.result
})

//获取基础商品列表数据
const goodsList = ref([])
const reqData = ref({
  categoryId: id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(
    reqData.value
  )
  goodsList.value = res.result.items
}
onMounted(getGoodsList)
//获取分页数据
const tabChange = () => {
  reqData.value.page = 1
  getGoodsList()
}
const isDisabled = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getGoodsList(reqData.value)
  goodsList.value = [...goodsList.value, ...res.result.items]
  //push方法会改变原数组，导致页面刷新
  //goodsList.value.push(...res.result.items)
  if(res.result.items.length === 0) {
    isDisabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="isDisabled">
         <!-- 商品列表-->
         <GoodsItem v-for="item in goodsList" :key="item.id" :good="item" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>