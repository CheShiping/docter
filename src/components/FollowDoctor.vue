<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import DoctorCard from './DoctorCard.vue'
import { useWindowSize } from '@vueuse/core'
import type { DoctorList } from '@/types/consult'
import { getDoctorPage } from '@/services/consult'
// 如果遇见一些常见的需求可以先看看 @vueuse/core 是否提供，这样可以提高开发效率。
// 如果：窗口尺寸，滚动距离，是否进入可视区，倒计时，...等等。
const { width } = useWindowSize()

const list = ref<DoctorList>()
const loadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  list.value = res.data.rows
}
onMounted(() => loadData())
</script>

<template>
  <div class="follow-docter">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;">重看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>
    <div class="body">
      <!-- 去除 指示器，关闭 无缝滚动，设置一次滚动一个卡片 -->
      <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <doctor-card :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
