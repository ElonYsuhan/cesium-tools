import { createWebHashHistory, createRouter, type RouteRecordRaw } from "vue-router"
import { generateMarkdownRoutes } from "./markdown-routes";

const hu = Promise.all(await generateMarkdownRoutes())
let routes: RouteRecordRaw[] = [
    {
        name: "首页",
        path: "/",
        component: () => import("../views/Home.vue"),
    }
]

hu.then(r => {
    router.clearRoutes();
    router.addRoute({
        name: "首页",
        path: "/",
        component: () => import("../views/Home.vue"),
        children: r
    })
})

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

