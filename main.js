import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

// 全局事件
Vue.prototype.$eventHub = new Vue();

const app = new Vue({
    ...App
})
app.$mount()
