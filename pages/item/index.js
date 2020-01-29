// pages/item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goItem(event){
      // console.log(event.currentTarget.dataset.gid);
      wx.navigateTo({
        url: `/pages/movieItem/index?id=${event.currentTarget.dataset.gid}`
      });
    },

    watchMore(event){
      // console.log(event.currentTarget.dataset.type);
      wx.navigateTo({
        url: `/pages/typeList/index?type=${event.currentTarget.dataset.type}`
      });
    },

  }
});
