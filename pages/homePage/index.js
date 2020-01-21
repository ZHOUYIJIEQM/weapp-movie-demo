// pages/homePage/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    loading: true,
    indicatorDots: true,
    indicatorColor: '#6f6565',
    indicatorActiveColor: '#e4dada',
    duration: 500,
    interval: 3000,
    autoplay: true,
    circular: true,
  },

  /**
   * 跳转到tabbar页
   */
  handlerStart(){
    wx.switchTab({
      url: '../movieList/index'
    });
  },

  /**
   * 获取缓存
   * @return {[type]} [description]
   */
  getCache(){
    return new Promise(resolve => {
      app.wechat.getStorage('last_splash_data')
        .then(res => {
          console.log('getStorage', res);
          const {movies, expires} = res.data;
          if(movies && expires > Date.now()){
            return resolve(res.data);
          }else{
            return resolve(null);
          }          
        })
        .catch(e => resolve(null));
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCache().then(cache => {
      if(cache){
        return this.setData({
          movies: cache.movies,
          loading: false
        });
      }
      app.douban.find('coming_soon', 1, 3)
        .then(data => {
          console.log('coming_soon', data);
          // 返回的图片都是小的，改成大图地址
          data.subjects.forEach(item => {
            item.images.large = item.images.large.replace(/s_ra/, 'l_ra');
            item.images.medium = item.images.medium.replace(/s_ra/, 'm_ra');
          });
          this.setData({
            movies: data.subjects,
            loading: false
          });
          return app.wechat.setStorage('last_splash_data', {
            movies: data.subjects,
            expiress: Date.now() + 24 * 60 * 60 * 1000
          });
        });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})