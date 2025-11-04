import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path'

// https://vite.dev/config/
// 解释：

// @ 是vite配置，基于node提供的API，得到 src 的绝对路径
// 说明：

// 不开起自动生成声明文件 dts: false
// 引入了 vue-router 和 vant 后就拥有了它们组件的类型
// 后期我们自己有全局组件的时候，教大家如何提供组件类型
export default defineConfig({
  plugins: [
    // 解析单文件组件的插件
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      // 自动导入的插件，解析器可以是 vant element and-vue
      dts: false,
      // 原因：Toast Confirm 这类组件的样式还是需要单独引入，样式全局引入了，关闭自动引入
      resolvers: [VantResolver({ importStyle: false })],
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
})
