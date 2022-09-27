import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";

// 收货地址列表
function getAddresData(uid) {
  return request(
    config.baseApi + "/user/address/index?uid=" + uid + "&token=" + config.token
  );
}

// 删除收货地址
function delAddressData(params) {
  return request(
    config.baseApi +
      "/user/address/del?uid=" +
      params.uid +
      "&aid=" +
      params.aid +
      "&token=" +
      config.token
  );
}

// 添加收货地址
function addAddressData(params) {
  return request(
    config.baseApi + "/user/address/add?token=" + config.token,
    "post",
    params
  );
}

export { getAddresData, delAddressData, addAddressData };
