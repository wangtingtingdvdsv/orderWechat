// 提交订单页面
const app = getApp();
Page({
  data:{
    mealOrderInfo: { 
    },
    address:{
    },
    items:[],
    nowTims:'',
  },
  // 用户选择送餐时间
  bindTimeChange: function (e) {
    var delivery = {};
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    this.setData({
      time: e.detail.value
    })
    if (app.globalData.deliveryTime === "") {
      app.globalData.deliveryTime = year + "-" + month + '-' + day + ' ' + this.data.time + ':12';
    }
    app.globalData.Time = Date.parse(new Date(app.globalData.deliveryTime));
    console.log("###", app.globalData.Time)
  },
  onLoad: function (e) {
    var nowDate = new Date();
    var that = this;
    var nowTime = nowDate.getHours() + ':' + nowDate.getMinutes();
    that.setData({
      mealOrderInfo: app.globalData.mealOrderInfo,
      total: app.globalData.total,
      nowTime: nowTime
    })
    console.log(app.globalData.mealOrderInfo);
    console.log(app.globalData.total);
    //地址
    that.setData({
      address: app.globalData.address
    })
  },
  submitOrder: function() {
    // 点击提交订单发送订单数据给后端
    var that = this;
    var items = [];
    if (app.globalData.Time == "") {
      wx.showModal({
        content: '请选择送货时间',
      })
      return;
    }
    for (var obj in that.data.mealOrderInfo) {
      if (that.data.mealOrderInfo[obj].num != 0) {
        console.log("提交", that.data.mealOrderInfo[obj]);
        let item = {};
        item.productId = that.data.mealOrderInfo[obj].product_id;
        item.productQuantity = that.data.mealOrderInfo[obj].num;
        items.push(item);
      }
    }
    wx.request({
      url: 'http://localhost:3008/buyer/createOrder',
      //https://wangtingting.top:9009
      method:'POST',

      data:{
        userName: app.globalData.address.userName,
        userPhone: app.globalData.address.userPhone,
        userAddress: app.globalData.address.userAddress,
        userOpenid: app.globalData.userOpenid,
        deliveryTime: app.globalData.Time,
        items: items,
        orderAmount: app.globalData.total
      },
      success:function(res){
        console.log("@@@@@", res);
        app.globalData.orderId = res.data.data;
        console.log(res);
        console.log("success", app.globalData.orderId)
      },
      error: function (error) {
        console.log("error", error)
      }
    })
    wx.navigateTo({
      url: '/pages/thePay/thePay',
    })
  },
  modifyAddress: function () {
    wx.reLaunch({
      url: '/pages/addAddress/addAddress',
    })
  },
})