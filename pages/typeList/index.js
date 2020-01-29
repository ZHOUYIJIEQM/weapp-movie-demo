// pages/typeList/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    moviesList: [],
    page: 1,
    subTitle: '',
    loading: true,
    hasMore: true,
  },

  loadMore(){
    // 如果没有更多数据
    if(!this.data.hasMore) return;

    // 加载框
    wx.showLoading({title: '拼命加载中...'});
    // this.setData({
    //   loading: true
    // })
    
    // console.log(this.data.type)
    // 获取数据
    return app.douban.find(this.data.type, this.data.page++)
      .then(data => {
        // console.log('typelist->data', data);
        // 如果获取到的电影长度为0说明没有更多电影了
        if(data.subjects.length){
          this.setData({
            subTitle: data.title,
            moviesList: this.data.moviesList.concat(data.subjects),
            loading: false,
            hasMore: true,
          });
        }else{
          this.setData({
            loading: false,
            hasMore: false,
          });
        }
        wx.hideLoading();
      })
      .catch(e => {
        console.error(e);
        wx.hideLoading();
        wx.showLoading({
          title: '获取数据异常！'
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    console.log(params);
    this.setData({
      type: params.type,
      subTitle: params.title
    });
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({title: this.data.subTitle });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    this.setData({
      moviesList: [],
      page: 1,
      loading: true,
      hasMore: true
    });
    this.loadMore()
      .then(() => {
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉加载！')
    this.loadMore();
  },

})