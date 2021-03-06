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
        text: '即将上映'
      }, 
      {
        text: '更多电影'
      }
    ], 
    loading: true,    
    currentTab: 0,
    navScrollLeft: 0,
    navFlagLeft: 0,
    navLength: 0,
    navTitle: '正在上演的电影',
    boards: [
      // { key: 'in_theaters' },
      { key: 'top250' },
      { key: 'new_movies' },
      { key: 'coming_soon' },
    ],
    inTheaters: null,

  },

  // 跳转到电影详情 
  goItem(event){
    // console.log(event.currentTarget.dataset.gid)
    wx.navigateTo({
      url: `/pages/movieItem/index?id=${event.currentTarget.dataset.gid}`
    });
  },

  // 点击查看更多 电影列表
  watchMore(event){
    // console.log(event.currentTarget.dataset.type)
    wx.navigateTo({
      url: `/pages/typeList/index?type=${event.currentTarget.dataset.type}&title=${event.currentTarget.dataset.title}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '拼命加载中...'
    });

    app.wechat.getUserInfo()
      .then(res => {
        // console.log('userInfo', res);
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      });

    app.wechat.getSystemInfo()
      .then(res => {
        // console.log('systemInfo', res);
        var wWidth = res.windowWidth;
        var ratio = 750 / wWidth;
        // console.log(ratio);
        this.setData({
          pixelRatio: ratio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      });
      this.setData({
        navLength: this.data.navData.length,
      });

    // 获取正在上映的电影
    // app.douban.find('in_theaters', 1, 10)
    app.douban.find('coming_soon')
      .then(res => {
        // console.log('in_theaters', res)
        this.setData({
          inTheaters: res,
          // navTitle: res.title
        });
        wx.setNavigationBarTitle({title: res.title});
      });
    
    // 获取更多电影
    const tasks = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 3)
        .then(data => {
          board.title = data.title;
          board.movies = data.subjects.slice(0, 3);
          return board;
        });
    });
    Promise.all(tasks).then(boards => {
      this.setData({
        boards: boards,
        loading: false
      });
      wx.hideLoading();
      // console.log('boards', this.data.boards)
    });
  },

  // 设置标题
  setTitle(cur){
    if(cur==0){
      wx.setNavigationBarTitle({title: this.data.navTitle});
    }else if (cur==1) {
      wx.setNavigationBarTitle({title: '榜单 > 更多电影'});
    }
  },

  // 点击tab标签
  switchNav(event){
    var cur = event.currentTarget.dataset.current; 
    //每个tab选项宽度占1/长度
    var singleNavWidth = this.data.windowWidth / this.data.navLength;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    });      
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      });
    }
    this.setTitle(cur)
  },

  // 滑动切换
  switchTab(event){
    var cur = event.detail.current;
    // console.log(cur)
    var singleNavWidth = this.data.windowWidth / this.data.navLength;
    // 设置滚动距离
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur-2) * singleNavWidth,
    });
    this.setData({
      navFlagLeft: this.data.currentTab * singleNavWidth * this.data.pixelRatio
    });
    this.setTitle(cur)
  },

  // 滑动切换过程触发
  switchTransition(event){
    if(this.data.currentTab==0){
      // console.log('0');
      if(event.detail.dx>0){
        this.setData({
          navFlagLeft: event.detail.dx
        });
      }
    }else if(this.data.currentTab == 1){
      // console.log('1');
      if(event.detail.dx<0){
        this.setData({
          navFlagLeft: this.data.windowWidth + event.detail.dx
        });
        if(this.data.navFlagLeft<0){
          this.setData({
            navFlagLeft: 0
          });
        }
      }
    }
  },

  // 滑动切换结束
  animationFinish(event){
    // console.log(event);
    if(event.detail.current == 0){
      this.setData({
        navFlagLeft: 0
      });
    }else{
      this.setData({
        navFlagLeft: this.data.windowWidth * this.data.pixelRatio / this.data.navLength
      });
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