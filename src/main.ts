import './styles/main.scss'
// 样式全局引用
import 'vant/lib/index.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { Toast } from 'vant'

import App from './App.vue'
import pinia from './stores'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Toast)
app.mount('#app')
