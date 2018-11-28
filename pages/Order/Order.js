const app = getApp();
var time = require('../../utils/util.js');
// 将将后端请求的时间戳转化为事件
Page({
  data: {
    orderList:"",
    products:{
      //orderId:[{productId, productName}]
    } 
  },
  onLoad:function(options){
    if (options.commentStatus == 0) {
      this.setData({
        commentStatus: 1
      })
    } 
    // 请求后端数据库，向后端返回本用户的openid,取到订单数据
    let userOpenid = app.globalData.userOpenid;
    console.log(userOpenid)
    var that = this;
    wx.request({
      url: 'https://cxd.mynatapp.cc/buyer/order/' + userOpenid,
      method:'GET',
      header: {
        'content-type': 'application/json'
      },
      success:function(resInfo){
        console.log("订单详情", resInfo.data.data);
        var deliveryOrder = resInfo.data.data
        for (var i = 0; i < resInfo.data.data.length; i++){
          deliveryOrder[i].deliveryTime = time.formatTimeTwo(resInfo.data.data[i].deliveryTime, 'Y-M-D h:m')
        }
        that.setData({
          orderList: deliveryOrder
        })
        for (let i = 0; i < deliveryOrder.length; i++) {
          that.data.products[deliveryOrder[i].orderId] = [];
          let orderDetailList = deliveryOrder[i].orderDetailList;
          for (let j = 0; j < orderDetailList.length; j++) {
            let product = {};
            product.productId = orderDetailList[j].productId;
            product.productName = orderDetailList[j].productName;
            that.data.products[deliveryOrder[i].orderId].push(product);
          }
        }
        that.setData({
          products: that.data.products
        })
        console.log(that.data.products)
      }
    })
  },
  // 跳转页面到订单首页面
  orderAgain:function(){
    wx.navigateBack({
    })
  },
  // 查看我的评论
  lookComment: function (event) {
    let orderId = event.target.id;
    let str = JSON.stringify(this.data.products[orderId])
    console.log(this.data.products[orderId])
    wx.navigateTo({
      url: '../userEvaluation/userEvaluation?jsonStr=' + str + '&orderId=' + orderId,
    })
  },
  // 点击按钮去评论
  goToComment:function(event){
    let orderId = event.target.id;
    let str = JSON.stringify(this.data.products[orderId])
    console.log(this.data.products[orderId])
    wx.navigateTo({
      url: '../Comment/Comment?jsonStr=' + str + '&orderId=' + orderId,
    })
  },
})