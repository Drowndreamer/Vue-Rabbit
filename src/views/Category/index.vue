<script setup>
 import { getCategoryAPI } from '@/apis/category'
 import { onMounted, ref } from 'vue'
 import { useRoute } from 'vue-router'
 import { getHomeBannerAPI } from '@/apis/home'
 import GoodsItem from '../Home/components/GoodsItem.vue'

 const route = useRoute()
 const id = route.params.id
 const categoryData = ref({})
 onMounted(async () => {
  const res = await getCategoryAPI(id)
  categoryData.value = res.result
 })
//解决路由缓存问题
//方法1，使用onBeforeRouteUpdate钩子函数
onBeforeRouteUpdate((to) => {
  getCategoryAPI(to.params.id).then(res => {
    categoryData.value = res.result
  })
})
//方法2，使用watchAPI获取分类数据
// watch(() => route.params.id, (newVal) => {
//   getCategoryAPI(newVal).then(res => {
//     categoryData.value = res.result
//   })
// })


const bannerList = ref([])
 onMounted(async () => { 
  const res = await getHomeBannerAPI(
    {
      distributionSite: '2'
    }
  )
  bannerList.value = res.result
 })
 
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <!-- banner -->
        <div class="banner-container">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <img :src="item.imgUrl" alt="">  
            </el-carousel-item>
          </el-carousel>
        </div>
          <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img v-m-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
    </div>

    </div>
  </div>
</template>


<style scoped lang="scss">
  .home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>