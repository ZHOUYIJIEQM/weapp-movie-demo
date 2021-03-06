// pages/movieItem/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: null,
    tags: [],
    pubdates: '',
    isCollapse: false,
    actor: [],
    previewVideo: [],
    previewPhotos: [],
    popularReviews: [],
    popularComments: [],
    videoData: null,
    videoHeight: 0,
    videoShow: false,
    showReviews: [],
    showReviewsFlag: 3,
    moreText: '加载更多...',
  },

  showAll(){
    this.setData({
      isCollapse: !this.data.isCollapse
    });
  },

  previewCasts(event){
    let pic = this.data.actor;
    let urls = pic.map(photos => {
      // console.log(photos.avatars.large.replace(/s_/, 'l_'))
      return photos.avatars.large.replace(/s_/, 'l_');
    });
    wx.previewImage({
      current: urls[event.currentTarget.dataset.index],
      urls
    })
  },

  previewPic(event){
    let pic = this.data.previewPhotos;
    let urls = pic.map(photos => {
      return photos.image;
    });
    wx.previewImage({
      current: urls[event.currentTarget.dataset.index],
      urls
    })
  },

  handleVideo(event){
    let windowW = wx.getSystemInfoSync().windowWidth;
    let windowH = wx.getSystemInfoSync().windowHeight;
    let index = event.currentTarget.dataset.index;
    this.setData({
      ['videoData.videoUrl']: this.data.previewVideo[index].resource_url,
      ['videoData.pic']: this.data.previewVideo[index].medium,
      ['videoData.videoHeight']: 750 / windowW * windowH,
      videoShow: true,
    });
    // console.log('elem 报错是 基础库2.10.1的问题===========', this.data.videoData);
  },

  handleShow(e){
    this.setData({
      videoShow: e.detail.videoShow
    });
  },

  moreComment(){
    if(this.data.showReviewsFlag+3<=this.data.popularReviews.length){
      this.setData({
        showReviewsFlag: this.data.showReviewsFlag+3
      });
      // console.log('this.data.showReviewsFlag')
    }else{
      // console.log('超过了')
      this.setData({
        showReviewsFlag: this.data.popularReviews.length,
        moreText: '暂无更多'
      });
    }
    this.setData({
      showReviews: this.data.popularReviews.slice(0, this.data.showReviewsFlag),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    // console.log(params);
    wx.showLoading({
      title: '拼命加载中...'
    });

    app.douban.findById(params.id)
    // app.douban.findById("30176393")
      .then(data => {
        wx.setNavigationBarTitle({
          title: `${data.title} > 电影详情`
        });
        this.setData({
          movieDetail: data,
          tags: data.tags.slice(0, 3),
          actor: data.directors.concat(data.casts),
          previewVideo: data.trailers,
          previewPhotos: data.photos,
          popularReviews: data.popular_reviews,
          popularComments: data.popular_comments,
          showReviews: data.popular_reviews.slice(0, this.data.showReviewsFlag),
        });
        if(data.pubdates[1]){
          this.setData({
            pubdates: data.pubdates[1]
          });
        }else{
          this.setData({
            pubdates: data.pubdates[0]
          });
        }
        console.log(params.id, '=>', data);
        wx.hideLoading();
      })
      .catch(err => {
        wx.hideLoading();
        wx.showLoading({
          title: '获取数据异常'
        });
        console.log(err);
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