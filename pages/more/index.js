// pages/more/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //当前版本能否用 某个api 
  },

  getUserInfo(e){
    let userInfo = e.detail.userInfo;
    console.log(userInfo)
    // setStorageSync('userInfo', userInfo);
    app.wechat.setStorage('userInfo', userInfo)
    app.wechat.setStorage('hasUserInfo', true)
    
    this.setData({
      userInfo
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo.nickName){
      console.log(userInfo)
      this.setData({
        userInfo
      })
    }else{

    }
    
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