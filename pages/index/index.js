Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:"https://7a6a-zjff-yry-n0fv5-1304174555.tcb.qcloud.la/img/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //页面开始加载 就会触发
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  go:function(e){
    wx.switchTab({
      url: '../add/add'
    })
  },
  more1:function(e){
    wx.navigateTo({
      url: '../class1/class1',
    })
  },
  more2:function(e){
    wx.navigateTo({
      url: '../class2/class2',
    })
  },
  more3:function(e){
    wx.navigateTo({
      url: '../class3/class3',
    })
  },
  more4:function(e){
    wx.navigateTo({
      url: '../class4/class4',
    })
  },
  more5:function(e){
    wx.navigateTo({
      url: '../class5/class5',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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