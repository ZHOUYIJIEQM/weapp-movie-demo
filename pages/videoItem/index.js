// pages/videoItem/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoData: Object,
    show: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    wantToPlay: true,
    autoplay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleShow(){
      this.triggerEvent('handleShowVideo', {videoShow: false});
      // console.log(this.data.show);
      this.setData({
        wantToPlay: !this.data.wantToPlay,
      });
    },

    handlePlayVideo(){
      if(this.data.show){
        this.videoContext = wx.createVideoContext('myVideo', this)
        console.log(this.videoContext, '开始播放');
      }
      this.setData({
        wantToPlay: !this.data.wantToPlay,
        // autoplay: true,
      });
      // console.log(this.videoContext, '开始播放');
      this.videoContext.play();
    },

  },

  ready(){
    console.log('===', this.videoContext = wx.createVideoContext('myVideo'))
  }

});
