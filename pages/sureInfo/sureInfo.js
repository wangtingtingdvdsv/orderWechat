var app = getApp();
const util = require('../../utils/util.js')
Page({
  data: {
    userName:"",
    userIcon:"",
    userId:""
  },
  onGotUserInfo: function (e) {
    var that = this;
    wx.getSetting({
      success: function() {
        wx.login({
          success: function(res) {
            console.log(res);
            wx.getUserInfo({
              success: function(res_user) {
                console.log(res_user);
                wx.request({
                  url: 'https://cxd.mynatapp.cc/wechat/login',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (resInfo) {
                    console.log(resInfo);
                    app.globalData['userId'] = resInfo.data.data.userId;
                    app.globalData['userOpenid'] = resInfo.data.data.userOpenid;
                    console.log(resInfo.data.data.userOpenid)
                    wx.redirectTo({
                      url: '../dishes/dishes',
                    })
                  }
                })
              }
            })
          }
        })
      } 
    })
  },

})