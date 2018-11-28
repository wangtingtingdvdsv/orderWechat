const app = getApp();
Page({
  data: {
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
    //接受父页面传递过来的参数orderId,以orderId为返回参数
    var that = this;
    let orderId = options.orderId;
    console.log(orderId);
    wx.request({
      url: 'https://cxd.mynatapp.cc/buyer/comment/list',
      data: {
        orderId: orderId,
      },
      header: {
        'content-type': 'application/json',
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
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