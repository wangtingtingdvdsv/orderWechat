// 订单结束
const app = getApp()
Page({
  data:{
    total:"",
    delivery:{}
  },
  onLoad: function() {
    this.setData({
      total: app.globalData.total
    })

    //顾客各种信息
    var delivery = {};
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    delivery.time = app.globalData.deliveryTime ;
    delivery.name = app.globalData.address.userName;
    delivery.address = app.globalData.address.userAddress;
    this.setData({
      delivery: delivery
    })
  },
  Return:function(){
    wx.redirectTo({
      url: '../dishes/dishes',
    })
  }
})