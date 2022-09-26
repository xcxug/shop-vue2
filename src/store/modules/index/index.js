import {
  getSwiperData,
  getNavsData,
  getGoodsData,
  getRecomGoodsData,
} from "@/api/index";

export default {
  namespaced: true,
  state: {
    swipers: [],
    navs: [],
    goods: [],
    recomGoods: [],
  },
  mutations: {
    ["SET_SWIPER"](state, payload) {
      state.swipers = payload.swipers;
    },
    ["SET_NAVS"](state, payload) {
      state.navs = payload.navs;
      // console.log(state.navs);
    },
    ["SET_GOODS"](state, payload) {
      state.goods = payload.goods;
    },
    ["SET_RECOMGOODS"](state, payload) {
      state.recomGoods = payload.recomGoods;
    },
  },
  actions: {
    getSwiper(conText, payload) {
      getSwiperData().then((res) => {
        if (res.code === 200) {
          conText.commit("SET_SWIPER", { swipers: res.data });
          if (payload.success) {
            payload.success();
          }
        }
      });
    },
    getNavs(conText, payload) {
      getNavsData().then((res) => {
        // console.log(res);
        if (res.code === 200) {
          conText.commit("SET_NAVS", { navs: res.data });
          if (payload.success) {
            payload.success();
          }
        }
      });
    },
    getGoods(conText, payload) {
      getGoodsData().then((res) => {
        if (res.code === 200) {
          conText.commit("SET_GOODS", { goods: res.data });
          if (payload.success) {
            payload.success();
          }
        }
      });
    },
    getRecomGoods(conText, payload) {
      getRecomGoodsData().then((res) => {
        if (res.code === 200) {
          conText.commit("SET_RECOMGOODS", { recomGoods: res.data });
          if (payload.success) {
            payload.success();
          }
        }
      });
    },
  },
};
