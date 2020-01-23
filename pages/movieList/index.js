// pages/movieList/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'hello world',
    userInfo: {},
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // navData: [
    //   {
    //     text: '正在热映'
    //   },
    //   {
    //     text: '电影榜单'
    //   },
    //   {
    //     text: '正在热映1'
    //   },
    //   {
    //     text: '电影榜单1'
    //   },
    //   {
    //     text: '正在热映2'
    //   },
    //   {
    //     text: '电影榜单2'
    //   },
    //   {
    //     text: '正在热映3'
    //   },
    //   {
    //     text: '电影榜单3'
    //   },
    // ],
    navData: [
      {
        text: '首页'
      }, 
      {
        text: '健康'
      }, 
      {
        text: '情感'
      }, 
      {
        text: '职场'
      }, 
      {
        text: '育儿'
      }, 
      {
        text: '纠纷'
      }, 
      {
        text: '青葱'
      }, 
      {
        text: '上课'
      }, 
      {
        text: '下课'
      }
    ],     
    currentTab: 0,
    navScrollLeft: 0,
    navFlagLeft: 0,
    navLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.wechat.getUserInfo()
      .then(res => {
        console.log('userInfo', res);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      });

    app.wechat.getSystemInfo()
      .then(res => {
        console.log('systemInfo', res);
        var wWidth = res.windowWidth;
        var ratio = 750 / wWidth;
        console.log(ratio);
        this.setData({
          pixelRatio: ratio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      });
      this.setData({
        navLength: this.data.navData.length,
      })
  },

  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
        navScrollLeft: (cur - 2) * singleNavWidth
    })      
    if (this.data.currentTab == cur) {
        return false;
    } else {
        this.setData({
            currentTab: cur
        })
    }
  },

  switchTab(event){
    var cur = event.detail.current;
    // console.log(cur)
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur-2) * singleNavWidth,
    });
    if(cur<3){
      this.setData({
        navFlagLeft: this.data.currentTab * singleNavWidth * this.data.pixelRatio
      });
    }else if(cur>=this.data.navLength-3){
      console.log('-', this.data.navLength - this.data.currentTab);
      this.setData({
        navFlagLeft: (5 - (this.data.navLength - this.data.currentTab)) * singleNavWidth * this.data.pixelRatio
      })
    }
  },

  switchtransition(event){
    // // console.log('dx', event.detail.dx);
    // var singleNavWidth = this.data.windowWidth / 5;
    // var w = event.detail.dx/this.data.windowWidth * singleNavWidth / this.data.pixelRatio;
    // console.log('+=', w);
    // var navL = this.data.navFlagLeft + w;
    // this.setData({
    //   navFlagLeft: navL
    // });
    
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