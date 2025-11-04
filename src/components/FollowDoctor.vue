<script setup lang="ts"></script>

<template>
  <div class="follow-dockter">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;">重看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>
    <div class="body">
      <van-swipe>
        <van-swipe-item v-for="item in 5" :key="item">
          {{ item }}
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
