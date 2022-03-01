import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "首页",
        }
    }, 
    {
        path: "/funddetail",
        name: "funddetail",
        component: () => import("../views/FundDetail.vue"),
        meta: {
            title: "基金详情",
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title =
            to.meta.title + " - FUND MASTER";
    }
    next();
});


export default router;
