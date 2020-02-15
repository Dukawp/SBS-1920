import Vue from "vue"
import VueRouter from "vue-router"
import home from "@/components/home"


Vue.use(VueRouter)

const routes = [

    { name: "home",     path: "/",                  props: true, component: home}
  ]

export default new VueRouter({
    mode: "history",
    routes
})