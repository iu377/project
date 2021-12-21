Page({
  /**
   * 页面的初始数据 
   */
  data: {
    carts:"",
    path:"https://7a6a-zjff-yry-n0fv5-1304174555.tcb.qcloud.la/img/",
    hasList:false,//列表是否有数据
    totalPrice:0,//总价，初始为0
    selectAllStatus:true,//全选状态，默认全选
    obj:{
      name:"hello"
    }
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
    db.collection("carts").get({
      success:res=>{ 
        this.setData({
          carts:res.data
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hasList: true,//既然有数据了，那设为true吧
    });
  this.getTotalPrice();
  },

//选择事件
selectList(e) {
  const index = e.currentTarget.dataset.index;//获取data-传进来的index
  let carts = this.data.carts;//获取购物车列表
  const selected = carts[index].selected;//获取当前商品的选中状态
  carts[index].selected = !selected;//改变状态
  this.setData({
  carts: carts
  });
  this.getTotalPrice();//重新获取总价
},

//全选事件
selectAll(e) {
  let selectAllStatus=this.data.selectAllstatus;//是否全选状态
  selectAllStatus = !selectAllStatus;
  let carts = this.data.carts;
  for (let i = 0; i < carts.length; i++) {
  carts[i].selected = selectAllStatus;//改变所有商品状态
  }
  this.setData( {
  selectAllstatus: selectAllStatus,
  carts: carts
  });
  this. getTotalPrice();//重新获取总价
  },
  

 //增加数量
 addCount(e) {
  const index = e.currentTarget.dataset.index;
  let carts = this.data.carts;
  let num = carts[index].num;
  num=num + 1;
  carts[index].num = num;
  this.setData({
  carts: carts
  });
  this.getTotalPrice();
  },
  //减少数量
  minusCount(e) {
  const index = e.currentTarget.dataset.index;
  const obj = e.currentTarget.dataset.obj;
  let carts = this.data.carts;
  let num = carts[index].num;
  if(num <= 1){
  return false;
  }
  num=num - 1;
  carts[index].num = num;
  this.setData({
  carts: carts 
  });
  this.getTotalPrice();
},

//总价
getTotalPrice() {
  let carts = this.data.carts;//获取购物车列表
  let total = 0;
  for(let i = 0; i < carts.length; i++) { //循环列表得到每个数据
  if(carts[i].selected) {//判断选中才会计算价格
  total += carts[i].num * carts[i].price;//所有价格加起来
  }
}
  this.setData({//最后赋值到data中渲染到页面
  carts: carts,
  totalPrice: total.toFixed(2)
  });
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