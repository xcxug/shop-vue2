import {
  addOrderData,
  getOrderNumData,
  getMyOrderData,
  cancelOrderData,
  sureOrderData,
  getOrderInfoData,
  getReviewOrderData,
  getReviewServiceData,
  addReviewData,
} from "@/api/order";

export default {
  namespaced: true,
  state: {
    orderNum: "",
    orders: [],
    orderInfo: {},
    reviewOrders: [],
    reviewServices: [],
  },
  mutations: {
    ["SET_ORDERNUM"](state, payload) {
      state.orderNum = payload.orderNum;
    },
    // 我的订单
    ["SET_ORDERS"](state, payload) {
      state.orders = payload.orders;
    },
    // 我的订单分页
    ["SET_ORDERS_PAGE"](state, payload) {
      state.orders.push(...payload.orders);
    },
    // 取消订单
    ["DEL_ORDERS"](state, payload) {
      state.orders.splice(payload.index, 1);
    },
    // 改变订单状态
    ["SET_STATUS"](state, payload) {
      state.orders[payload.index].status = payload.status;
    },
    // 设置订单详情
    ["SET_ORDER_INFO"](state, payload) {
      state.orderInfo = payload.orderInfo;
    },
    // 设置待评价订单
    ["SET_REVIEW_ORDERS"](state, payload) {
      state.reviewOrders = payload.reviewOrders;
    },
    // 设置待评价订单
    ["SET_REVIEW_ORDERS_PAGE"](state, payload) {
      state.reviewOrders.push(...payload.reviewOrders);
    },
    // 设置评价服务选项
    ["SET_REVIEW_SERVICES"](state, payload) {
      state.reviewServices = payload.reviewServices;
    },
    // 设置评价分数
    ["SET_REVIEW_SCORE"](state, payload) {
      if (state.reviewServices.length > 0) {
        for (
          let i = payload.index2 + 1;
          i < state.reviewServices[payload.index].scores.length;
          i++
        ) {
          state.reviewServices[payload.index].scores[i].active = false;
        }

        for (let i = 0; i <= payload.index2; i++) {
          state.reviewServices[payload.index].scores[i].active = true;
        }

        state.reviewServices[payload.index].score = payload.score;
      }
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
    // 获取我的订单
    getMyOrder(conText, payload) {
      getMyOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          let pageNum = 0;
          if (res.code === 200) {
            pageNum = parseInt(res.pageinfo.pagenum);
            conText.commit("SET_ORDERS", { orders: res.data });
          } else {
            pageNum = 0;
            conText.commit("SET_ORDERS", { orders: [] });
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    // 我的订单分页
    getMyOrderPage(conText, payload) {
      getMyOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            conText.commit("SET_ORDERS_PAGE", { orders: res.data });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 取消订单
    cancelOrder(conText, payload) {
      cancelOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            conText.commit("DEL_ORDERS", { index: payload.index });
          }
        }
      );
    },
    // 确认订单
    sureOrder(conText, payload) {
      sureOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          // console.log(res);
          if (res.code === 200) {
            conText.commit("SET_STATUS", {
              index: payload.index,
              status: payload.status,
            });
          }
        }
      );
    },
    // 订单详情
    getOrderInfo(conText, payload) {
      getOrderInfoData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            conText.commit("SET_ORDER_INFO", {
              orderInfo: {
                ordernum: res.data.ordernum,
                name: res.data.name,
                cellphone: res.data.cellphone,
                status: res.data.status,
                province: res.data.province,
                city: res.data.city,
                area: res.data.area,
                address: res.data.address,
                freight: res.data.freight,
                total: res.data.total,
                truetotal: res.data.truetotal,
                ordertime: res.data.ordertime,
                goods: res.data.goods,
              },
            });
          }
        }
      );
    },
    // 待评价订单
    getReviewOrder(conText, payload) {
      getReviewOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          let pageNum = 0;
          if (res.code === 200) {
            pageNum = parseInt(res.pageinfo.pagenum);
            conText.commit("SET_REVIEW_ORDERS", { reviewOrders: res.data });
          } else {
            pageNum = 0;
            conText.commit("SET_REVIEW_ORDERS", { reviewOrders: [] });
          }
          if (payload.success) {
            payload.success(pageNum);
          }
        }
      );
    },
    getReviewOrderPage(conText, payload) {
      getReviewOrderData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            conText.commit("SET_REVIEW_ORDERS_PAGE", {
              reviewOrders: res.data,
            });
            if (payload.success) {
              payload.success();
            }
          }
        }
      );
    },
    // 评价服务选项
    getReviewService(conText) {
      getReviewServiceData().then((res) => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].score = 5;
            res.data[i].scores = [
              { value: 1, active: true },
              { value: 2, active: true },
              { value: 3, active: true },
              { value: 4, active: true },
              { value: 5, active: true },
            ];
          }
          conText.commit("SET_REVIEW_SERVICES", { reviewServices: res.data });
        }
      });
    },
    // 提交评价
    addReview(conText, payload) {
      addReviewData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
  },
};
