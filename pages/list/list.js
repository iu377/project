// miniprogram/pages/list/list.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
   goods:"",
   path:"https://7a6a-zjff-yry-n0fv5-1304174555.tcb.qcloud.la/img/"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init(
      {
        env:"zjff-yry-n0fv5"
      }
    )
    const db=wx.cloud.database();
    db.collection("goods").get({
      success:res=>{
        this.setData({
          goods:res.data
        });
        console.log(res.data)
      },
      fail:err=>{
        wx.showToast({
          title: '查询记录失败',
          icon:"none"
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  more:function(e){
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '../detail/detail?id='+e.target.dataset.id,
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