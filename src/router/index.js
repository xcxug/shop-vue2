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
    path: "/order/end",
    name: "order-end",
    component: () => import("@/pages/home/order/end"),
    meta: { auth: true, title: "下单成功" },
  },
  {
    path: "/address",
    name: "address",
    component: () => import("@/pages/home/address/index"),
    meta: { auth: true, title: "选择收货地址" },
  },
  {
    path: "/address/add",
    name: "address-add",
    component: () => import("@/pages/home/address/add"),
    meta: { auth: true, title: "添加收货地址" },
  },
  {
    path: "/address/mod",
    name: "address-mod",
    component: () => import("@/pages/home/address/mod"),
    meta: { auth: true, title: "修改收货地址" },
  },
  {
    path: "/user/order",
    name: "my-order",
    component: () => import("@/pages/user/order"),
    redirect: "/user/order/list",
    meta: { auth: true },
    children: [
      {
        path: "list",
        name: "order-list",
        component: () => import("@/pages/user/order/list"),
        meta: { auth: true },
      },
      {
        path: "review",
        name: "order-review",
        component: () => import("@/pages/user/order/review"),
        meta: { auth: true },
      },
    ],
  },
  {
    path: "/user/order/details",
    name: "order-details",
    component: () => import("@/pages/user/order/details"),
    meta: { auth: true, title: "订单详情" },
  },
  {
    path: "/user/order/add_review",
    name: "order-add-review",
    component: () => import("@/pages/user/order/add_review"),
    meta: { auth: true, title: "评价" },
  },
  {
    path: "/user/profile",
    name: "profile",
    component: () => import("@/pages/user/profile"),
    meta: { auth: true, title: "个人资料" },
  },
  {
    path: "/user/address",
    name: "user-address",
    component: () => import("@/pages/user/address"),
    meta: { auth: true, title: "收货地址管理" },
  },
  {
    path: "/user/address/add",
    name: "user-address-add",
    component: () => import("@/pages/user/address/add"),
    meta: { auth: true, title: "添加收货地址" },
  },
  {
    path: "/user/address/mod",
    name: "user-address-mod",
    component: () => import("@/pages/user/address/mod"),
    meta: { auth: true, title: "修改收货地址" },
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
