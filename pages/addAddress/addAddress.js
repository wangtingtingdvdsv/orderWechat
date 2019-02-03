var app = getApp();
// 设置订单地址信息 
Page({
  data: {
  },
  bindCancel: function () {
    wx.reLaunch({
      url: '/pages/submit/submit',
    })
  },
  fromSubmit: function(e) {
    var value = e.detail.value;
    // 判断表单是否为空
    if(value.userName === "" || value.userAddress === "" || value.userPhone === "") {
      wx.showModal({
        content: '请完善信息',
      })
    } else {
      let openId = app.globalData.userOpenid;
      value.openId=openId;
      wx.request({
        url: 'https://wangtingting.top:9009/user/info/modify',
        method: 'POST',
        data:value,

        success: function (resInfo) {
          wx.navigateTo({
             url: '/pages/submit/submit',
          })
        },
        error: function(){
          console.log("错误");
        }
      })
      app.globalData.address = value;
    }
  }
});