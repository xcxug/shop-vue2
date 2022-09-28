import { addOrderData, getOrderNumData } from "@/api/order";

export default {
  namespaced: true,
  state: {
    orderNum: "",
  },
  mutations: {
    ["SET_ORDERNUM"](state, payload) {
      state.orderNum = payload.orderNum;
    },
  },
  actions: {
    // 提交订单
    addOrder(conText, payload) {
      addOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 获取订单编号
    getOrderNum(conText) {
      getOrderNumData(conText.rootState.user.uid).then((res) => {
        if (res.code === 200) {
          conText.commit("SET_ORDERNUM", { orderNum: res.data.ordernum });
        }
      });
    },
  },
};
