import config from "@/assets/js/conf/config";
import { request } from "@/assets/js/utils/request";

// 会员登录
function loginData(data) {
  return request(
    config.baseApi + "/home/user/pwdlogin?token=" + config.token,
    "post",
    data
  );
}

// 会员安全认证
function safeUserData(data) {
  return request(
    config.baseApi + "/home/user/safe?token=" + config.token,
    "post",
    data
  );
}

// 安全退出
function safeOutLoginData(data) {
  return request(
    config.baseApi + "/home/user/safeout?token=" + config.token,
    "post",
    data
  );
}

// 检测图文验证码是否正确
function checkVCodeData(vcode) {
  return request(
    config.baseApi + "/home/user/checkvcode?token=" + config.token,
    "post",
    { vcode: vcode }
  );
}

// 是否注册过会员
function isRegData(username) {
  return request(
    config.baseApi + "/home/user/isreg?token=" + config.token,
    "post",
    { username: username }
  );
}

// 会员注册
function regUserData(data) {
  return request(
    config.baseApi + "/home/user/reg?token=" + config.token,
    "post",
    data
  );
}

// 获取会员信息
function getUserInfoData(uid) {
  return request(
    config.baseApi +
      "/user/myinfo/userinfo/uid/" +
      uid +
      "?token=" +
      config.token
  );
}

// 上传头像
function uploadHeadData(data) {
  return request(
    config.baseApi + "/user/myinfo/formdatahead?token=" + config.token,
    "file",
    data
  );
}

// 修改会员信息
function updateUserInfoData(data) {
  return request(
    config.baseApi + "/user/myinfo/updateuser?token=" + config.token,
    "post",
    data
  );
}

// 修改手机号
function updateCellphoneData(data) {
  return request(
    config.baseApi + "/user/myinfo/updatecellphone?token=" + config.token,
    "post",
    data
  );
}

// 修改密码
function updatePasswordData(data) {
  return request(
    config.baseApi + "/user/myinfo/modpwd?token=" + config.token,
    "post",
    data
  );
}

// 我的收藏
function getFavData(data) {
  return request(
    config.baseApi +
      "/user/fav/index?uid=" +
      data.uid +
      "&token=" +
      config.token +
      "&page=" +
      data.page
  );
}

// 删除收藏
function delFavData(data) {
  return request(
    config.baseApi +
      "/user/fav/del?uid=" +
      data.uid +
      "&fid=" +
      data.fid +
      "&token=" +
      config.token
  );
}

export {
  loginData,
  safeUserData,
  safeOutLoginData,
  checkVCodeData,
  isRegData,
  regUserData,
  getUserInfoData,
  uploadHeadData,
  updateUserInfoData,
  updateCellphoneData,
  updatePasswordData,
  getFavData,
  delFavData,
};
