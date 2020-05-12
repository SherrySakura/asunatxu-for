import VueRouter from 'vue-router'
import Login from "../src/components/Login.vue"
import TextBody from "../src/components/TextBody.vue"
import Register from "../src/components/Register.vue"

import Vue from "vue"

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {path: "/login", component: Login},
        {path: "/", component: TextBody},
        {path: "/register", component: Register}
    ],
    mode: "history"
})