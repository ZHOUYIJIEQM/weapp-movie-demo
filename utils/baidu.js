/**
 * 根据传入的经纬度得出是哪个城市
 * @param  {Number} latitude  纬度
 * @param  {Number} longitude 经度
 * @return {Promise}          返回请求
 */
function getCityName (latitude = 39.90403, longitude = 116.407526) {
  const URL = 'https://api.map.baidu.com/reverse_geocoding/v3/';
  const AK = '9GPefSvLGqV4oO14PpQktNTOynGjBGFF';
  const PARAMS = {
    location: `${latitude},${longitude}`,
    ak: AK,
    output: 'json'
  };
  return new Promise((resolve, reject) => {
    // 要用jsonp
    wx.request({
      url: URL,
      data: PARAMS,
      dataType: 'jsonp',
      success: resolve,
      fail: reject
    });
  });
}

module.exports = {
  getCityName
}