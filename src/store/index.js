import Vue from "vue";
import Vuex from "vuex";
import index from "./modules/index";
import goods from "./modules/goods";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index,
    goods,
    search,
  },
});
