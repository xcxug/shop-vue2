import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";

// 提交订单
function addOrderData(data) {
  return request(
    config.baseApi + "/order/add?token=" + config.token,
    "post",
    data
  );
}

// 获取订单编号
function getOrderNumData(uid) {
  return request(
    config.baseApi + "/order/lastordernum?uid=" + uid + "&token=" + config.token
  );
}

export { addOrderData, getOrderNumData };
