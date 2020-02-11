/**
 * 登录
 * @return {[type]} [description]
 */
function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取用户信息
 * @return {[type]} [description]
 */
function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取系统信息
 * @return {[type]} [description]
 */
function getSystemInfo () {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 设置本地缓存
 * @param {String} key 键
 * @param {any} value 值
 */
function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取本地缓存
 * @param  {String} key 键
 * @return {[type]}     [description]
 */ 
function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取当前地理位置
 * @param  {String} type 坐标
 * @return {[type]}      [description]
 */
function getLocation (type='wgs84') {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    });
  });
}

module.exports = {
  login,
  getUserInfo,
  getSystemInfo,
  setStorage,
  getStorage,
  getLocation,
  original: wx
};