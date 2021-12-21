
Page({

  /**
   * 页面的初始数据
   */
  data: {
   imgurl:'',
   headImg:'',
   _id:'',
   details:'',
   author:'',
   area:'',
   brand:'',
   price:'',
   size:'',
   degree:''
  },
  chooseImage:function(e){
    var that=this;
    // 选择图片
    wx.chooseImage({
     count: 1,
     sizeType: ['compressed'],
     sourceType: ['album', 'camera'],
     success: function (res) {
       that.setData({
         imgurl:res.tempFilePaths[0]
       })
         },
     fail: e => {
       console.error(e)
     }
   })
  },


  chooseHeadImage:function(e){
    var that=this;
 // 选择图片
 wx.chooseImage({
  count: 1,
  sizeType: ['compressed'],
  sourceType: ['album', 'camera'],
  success: function (res) {
    that.setData({
      headImg:res.tempFilePaths[0]
    })
  },
  fail: e => {
    console.error(e)
  }
})
},

//提交数据
add:function(e){
  var that=this;
  const filePath=this.data.imgurl;
  const cloudPath = 'img/work' + new Date().getTime()+filePath.match(/\.[^.]+?$/)[0];
  wx.cloud.uploadFile({
    cloudPath,
    filePath,
    success: res => {
      console.log('[上传文件] 成功：', res);
    },
    fail: e => {
      console.error('[上传文件] 失败：', e)
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    },
    complete: () => {
      // wx.hideLoading()
    }
  })
  //上传作者照片
  const filePath1=this.data.headImg;
  const cloudPath1 = 'img/head' + new Date().getTime()+filePath1.match(/\.[^.]+?$/)[0];
  wx.cloud.uploadFile({
    cloudPath:cloudPath1,
    filePath:filePath1,
    success: res => {
      console.log('[上传文件] 成功：', res);
    },
    fail: e => {
      console.error('[上传文件] 失败：', e)
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    },
    complete: () => {
      // wx.hideLoading()
    }
  })

  //数据提交
  const db=wx.cloud.database();
  db.collection("goods").add({
    data:{
      details:e.detail.value.details,
      author:e.detail.value.author,
   imgurl:cloudPath.substr(4),//去除img/
   area:e.detail.value.area,
   brand:e.detail.value.brand,
   price:e.detail.value.price,
   headImg:cloudPath1.substr(4),
   size:e.detail.value.size,
   degree: e.detail.value.degree
    },
    success:res=>{
      this.setData({
      "_id":res._id
      });
      console.log('【新增记录】成功',res._id);
      wx.showToast({
      details: '新增记录成功',
        success:function(){
          //清空数据
          that.setData(
            {
              imgurl:'',
   headImg:'',
   _id:'',
   title:'',
   author:'',
   area:'',
   brand:'',
   price:'',
   size:'',
   degree:''
            }
          );
          setTimeout(function(){
            wx.switchTab({
              url: '../list/list',
            })
          },1000);//1秒钟后执行
        }
      })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init(
      {
        env:"zjff-yry-n0fv5"
      }
    )
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