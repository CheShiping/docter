// 怎么给全局的组件提供类型？
// 写一个类型声明文件，declare module 'vue' 声明一个 vue 类型模块
// 然后 interface GlobalComponents 书写全局组件的类型
// key组件名称支持大驼峰，value是组件类型,通过 typeof 组件实例得到

// 核心代码
// 1. 导入组件实例
import type CpIcon from '@/components/CpIcon.vue'
import type CpNavBar from '@/components/CpNavBar.vue'
import type CpRadioBtn from '@/components/CpRadioBtn.vue'
import type KnowledgeCard from '@/components/KnowledgeCard.vue'
import type KnowledgeList from '@/components/KnowledgeList.vue'

declare module 'vue' {
  // 3. 给 vue  添加全局组件类型，interface 和之前的合并
  interface GlobalComponents {
    // 4. 定义具体组件类型，typeof 获取到组件实例类型
    // typeof 作用是得到对应的TS类型
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
    KnowledgeCard: typeof KnowledgeCard
    KnowledgeList: typeof KnowledgeList
  }
}
