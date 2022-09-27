import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/home/main"), // 路由懒加载解决首屏加载慢，性能优化
    meta: { keepAlive: false },
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/pages/home/index"),
        meta: { keepAlive: true, title: "商城" },
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/pages/home/cart"),
        meta: { keepAlive: false, title: "购物车" },
      },
      {
        path: "my",
        name: "my",
        component: () => import("@/pages/user/ucenter"),
        meta: { keepAlive: false, title: "我的" },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/home/login"),
    meta: { keepAlive: false },
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import("@/pages/home/reg"),
    meta: { keepAlive: false },
  },
  {
    path: "/ucenter",
    name: "ucenter",
    component: () => import("@/pages/user/ucenter"),
  },
  {
    path: "/goods/classify",
    name: "goods-classify",
    component: () => import("@/pages/home/goods/classify"),
    redirect: "/goods/classify/item", // 页面重定向
    children: [
      {
        path: "item",
        name: "goods-classify-item",
        component: () => import("@/pages/home/goods/classify_item"),
        meta: { title: "商品分类" },
      },
    ],
  },
  {
    path: "/goods/search",
    name: "goods-search",
    component: () => import("@/pages/home/goods/search"),
  },
  {
    path: "/goods/details",
    name: "goods-details",
    component: () => import("@/pages/home/goods/details"),
    redirect: "/goods/details/item",
    children: [
      {
        path: "item",
        name: "goods-item",
        component: () => import("@/pages/home/goods/details_item"),
      },
      {
        path: "content",
        name: "goods-content",
        component: () => import("@/pages/home/goods/details_content"),
      },
      {
        path: "review",
        name: "goods-review",
        component: () => import("@/pages/home/goods/details_review"),
      },
    ],
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/pages/home/order/index"),
    meta: { auth: true, title: "确认订单" },
  },
  {
    path: "/address",
    name: "address",
    component: () => import("@/pages/home/address/index"),
  },
  {
    path: "/address/add",
    name: "address-add",
    component: () => import("@/pages/home/address/add"),
  },
  {
    path: "/address/mod",
    name: "address-mod",
    component: () => import("@/pages/home/address/mod"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  // 解决白屏
  scrollBehavior: (to, from, position) => {
    if (position) {
      return position;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (localStorage["isLogin"]) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
