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

// 我的订单
function getMyOrderData(data) {
  return request(
    config.baseApi +
      "/user/myorder/index?uid=" +
      data.uid +
      "&status=" +
      data.status +
      "&token=" +
      config.token +
      "&page=" +
      data.page
  );
}

// 取消订单
function cancelOrderData(data) {
  return request(
    config.baseApi +
      "/user/myorder/clearorder?uid=" +
      data.uid +
      "&ordernum=" +
      data.orderNum +
      "&token=" +
      config.token
  );
}

// 确认订单
function sureOrderData(data) {
  return request(
    config.baseApi +
      "/user/myorder/finalorder?uid=" +
      data.uid +
      "&ordernum=" +
      data.orderNum +
      "&token=" +
      config.token
  );
}

// 获取订单详情
function getOrderInfoData(data) {
  return request(
    config.baseApi +
      "/user/myorder/desc?uid=" +
      data.uid +
      "&ordernum=" +
      data.orderNum +
      "&token=" +
      config.token
  );
}

export {
  addOrderData,
  getOrderNumData,
  getMyOrderData,
  cancelOrderData,
  sureOrderData,
  getOrderInfoData,
};