import Vue from 'vue'
import App from './App.vue'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
//import request from "../js/http.js"

//Vue.prototype.httpUtil = request
Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
