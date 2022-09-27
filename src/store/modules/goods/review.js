import { getReviewsData } from "@/api/goods/review";

export default {
  namespaced: true,
  state: {
    reviews: [],
    total: 0,
  },
  mutations: {
    ["SET_REVIEWS"](state, payload) {
      state.reviews = payload.reviews;
      state.total = payload.total;
    },
  },
  actions: {
    getReviews(conText, payload) {
      getReviewsData(payload.gid).then((res) => {
        if (res.code === 200) {
          conText.commit("SET_REVIEWS", {
            reviews: res.data,
            total: res.pageinfo.total,
          });
          if (payload.success) {
            payload.success();
          }
        } else {
          conText.commit("SET_REVIEWS", { reviews: [], total: 0 });
        }
      });
    },
  },
};
