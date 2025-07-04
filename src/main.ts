import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from "./router"
const vue = createApp(App)
setTimeout(() => {
    vue.use(router);

    vue.mount('#app')
}, 500)

