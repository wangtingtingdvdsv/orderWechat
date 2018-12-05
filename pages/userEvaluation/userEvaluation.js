const app = getApp();
Page({
  data: {
    userIcon:'',
    orderId: "",
    product: [
      // {
      //   productId,
      //   productName,
      // }
    ],
    starNum: {
    },
    one_1: 5,
    two_1: 1,
    one_2: 5,
    two_2: 1,
    one_3: 5,
    two_3: 1
    // 给评价一个起始值
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userIcon: app.globalData.userIcon
    })
    //接受父页面传递过来的参数orderId,以orderId为返回参数
  
    let orderId = options.orderId;

    wx.request({
      url: 'https://wangtingting.top:9009/buyer/commentList',
      data: {
        orderId: orderId,
      },
      header: {
        'content-type': 'application/json',
      },
      method: 'GET',
      success: function(res) {

        that.setData({
          product: res.data.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
   
  },
  backToOrder:function(){
    wx.navigateBack({
    })
  }

})