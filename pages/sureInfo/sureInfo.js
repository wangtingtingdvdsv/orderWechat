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
                  url: 'https://wangtingting.top:9009/wechat/login',
                  data: {
                    code: res.code,
                    encryptedData: res_user.encryptedData,
                    iv: res_user.iv
                  },
                  method: 'get',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (resInfo) {
                    //console.log("sucess",resInfo);
                    app.globalData['userId'] = resInfo.data.data.user_id;
                    app.globalData['userOpenid'] = resInfo.data.data.user_openid ;
                    //console.log(resInfo.data.data.userOpenid)
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