/**
 * 合并请求地址，并发起请求
 * @param  {String} api    api地址
 * @param  {String} path   请求路径
 * @param  {Object} params 请求参数
 * @return {Promise}        返回请求
 */
function fetch (api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({}, params),
      header: {'Content-Type': 'json'},
      success: resolve,
      fail: reject
    });
  });
}

module.exports = fetch;