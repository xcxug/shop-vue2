import {
  getAddresData,
  delAddressData,
  addAddressData,
  getAddressInfoData,
  modAddressData,
  getDefaultAddressData,
} from "@/api/address";

export default {
  namespaced: true,
  state: {
    address: [],
  },
  mutations: {
    ["SET_ADDRESS"](state, payload) {
      state.address = payload.address;
    },
    // 删除收货地址
    ["DEL_ADDRESS"](state, payload) {
      state.address.splice(payload.index, 1);
    },
  },
  actions: {
    // 获取收货地址
    getAddress(conText) {
      getAddresData(conText.rootState.user.uid).then((res) => {
        if (res.code === 200) {
          conText.commit("SET_ADDRESS", { address: res.data });
        }
      });
    },
    // 删除收货地址
    delAddress(conText, payload) {
      delAddressData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            conText.commit("DEL_ADDRESS", { index: payload.index });
          }

          if (payload.success) {
            payload.success();
          }
        }
      );
    },
    // 添加收货地址
    addAddress(conText, payload) {
      addAddressData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 收货地址详情
    getAddressInfo(conText, payload) {
      getAddressInfoData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (res.code === 200) {
            if (payload.success) {
              payload.success(res);
            }
          }
        }
      );
    },
    // 修改收货地址
    modAddress(conText, payload) {
      modAddressData({ uid: conText.rootState.user.uid, ...payload }).then(
        (res) => {
          if (payload.success) {
            payload.success(res);
          }
        }
      );
    },
    // 获取默认收货地址
    getDefaultAddress(conText, payload) {
      getDefaultAddressData(conText.rootState.user.uid).then((res) => {
        if (res.code === 200) {
          if (payload.success) {
            payload.success(res);
          }
        }
      });
    },
  },
};
