import { followOrUnfollow } from '@/services/consult'
import type { FollowType } from '@/types/consult'
import { ref } from 'vue'

/**
 * 关注或取消关注功能组合式函数
 * 是组合API封装逻辑复用的函数，一般叫 hook 函数，是一种逻辑复用的思想
 * 对象类型多的可以传递给少的，叫：类型兼容
 * @param type 关注类型，默认为'doc'(医生)，可选'knowledge'(健康知识),'topic'(话题),'disease'(疾病)
 * @returns 返回包含loading状态和follow方法的对象
 */
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  // 关注/取消关注操作函数
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow(item.id, type)
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}
