import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "./assets/js/conf/config";
import utils from "@/assets/js/utils";

Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$utils = utils;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
