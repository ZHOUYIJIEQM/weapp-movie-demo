// pages/videoItem/index.js
const app = getApp();
let timer = null;
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
    showClose: true,
    wantToPlay: true,
    autoplay: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 处理改组件是否显示
    handleShow(){
      this.triggerEvent('handleShowVideo', {videoShow: false});
      this.setData({
        wantToPlay: true,
      });
      clearTimeout(timer);
    },

    // 显示/隐藏关闭图标
    handleShowClose(){
      // console.log('关闭图标')
      this.setData({
        showClose: !this.data.showClose
      });
      if(this.data.showClose){
        clearTimeout(timer);
        timer = setTimeout(() => {
          // console.log('执行隐藏');
          this.setData({
            showClose: false
          });
        }, 3000);
      }
    },

    // 点击后自动播放
    handlePlayVideo(){
      if(this.data.show){
        this.videoContext = wx.createVideoContext('myVideo', this)
        // console.log(this.videoContext, '开始播放');
      }
      this.setData({
        wantToPlay: !this.data.wantToPlay,
      });
      this.videoContext.play();
    },

  },


});
