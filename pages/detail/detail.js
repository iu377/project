Page({
  /**
   * 页面的初始数据
   */  
  data: {
    goods:"",
    openId:"",
    path:"https://7a6a-zjff-yry-n0fv5-1304174555.tcb.qcloud.la/img/"
  },
   add:function(e){
    var that=this;
    console.log(that.data.goods);
    // console.log(that.data.goods[0].area);
  //    //数据提交
  const db=wx.cloud.database();
  db.collection("carts").add({
    data:{
      imgurl:that.data.goods[0].imgurl,//去除img/
      details: that.data.goods[0].details,
      price:that.data.goods[0].price,
      num:1,
      selected:true,
    },
    success:res=>{
      wx.showToast({
    title: '加购成功',
      })
    },
    fail:err=>{
      wx.showToast({
        title: '加购失败',
        icon:"none"
      })
    }
  });
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.options.id);
    wx.cloud.init(
      {
        env:"zjff-yry-n0fv5"
      }
    )
    const db=wx.cloud.database();
    db.collection("goods").where({
      _id:this.options.id
    }).get({
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


    var that=this;
    wx.login({
      success:res =>{
        //发送res.code到后台换取openid,sessionkey,unionld
        wx.cloud.callFunction(
          {
          name:'login',
          data:{},
          success:res=>{
            console.log('[login] user openid',res.result.openid)
            that.setData({
              openId:res.result.openId
            })
            if(this.usercallback){
              this.usercallback(res)
            }
          }
          }
        );
      }
    })
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