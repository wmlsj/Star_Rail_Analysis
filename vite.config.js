import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        // 默认打开的端口和本地
        // host: '0.0.0.0',
        port: 5173,
        https: false, // 不支持https
        proxy: {          //设置代理
            "/proxy_api": {
                target: "https://api-takumi.mihoyo.com",   //代理的网址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy_api/, '') // 对什么类的服务器匹配
            },
            "/account": {
                target: "https://webapi.account.mihoyo.com/",   //代理的网址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/account/, '') // 对什么类的服务器匹配
            }
        }
    }
})
