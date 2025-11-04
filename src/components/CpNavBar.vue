<script setup lang="ts">
import { useRouter } from 'vue-router'

// 一定有的功能：返回图标，返回效果，固定定位（组件内部实现）
const router = useRouter()
const onClickLeft = () => {
  // 支持自定义返回，扩展 back 属性，如果有就执行 back 对应的函数。
  if (props.back) {
    return props.back()
  }
  // 判断历史记录是否有回退 避免了因为访问不存在的对象属性而引发的运行时错误。
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/') // 布局页面【‘/’】
  }
}

// 使用组件的时候才能确定的功能：标题，右侧文字，点击右侧文字行为（props）传入
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()
const emit = defineEmits<{
  (e: 'click-right'): void
}>()
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>
