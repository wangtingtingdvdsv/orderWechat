const app = getApp();
Page({
  data: {
    orderId:"",
    product:[
      // {
      //   productId,
      //   productName,
      // }
    ],
    starNum:{
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
    //接受父页面传递过来的参数
    let orderId = options.orderId;
    let object = JSON.parse(options.jsonStr);
    this.setData({ product: object });
    this.setData({ orderId: orderId });
    console.log(orderId);
    //初始化starNum
    for (let i = 0; i < this.data.product.length; i++) {
      this.data.starNum[this.data.product[i].productId] = {}
      this.data.starNum[this.data.product[i].productId].one_1 = 5;
      this.data.starNum[this.data.product[i].productId].two_1 = 0;
      this.data.starNum[this.data.product[i].productId].one_2 = 5;
      this.data.starNum[this.data.product[i].productId].two_2 = 0;
      this.data.starNum[this.data.product[i].productId].one_3 = 5;
      this.data.starNum[this.data.product[i].productId].two_3 = 0;
    }
    this.setData({
      starNum: this.data.starNum
    })
    //情况一:展示后台给的评分
    // this.setData({
    //   one_10: this.data.num10,
    //   two_10: 5 - this.data.num10
    // })
    // this.setData({
    //   one_20: this.data.num20,
    //   two_20: 5 - this.data.num20
    // })
    // this.setData({
    //   one_30: this.data.num30,
    //   two_30: 5 - this.data.num30
    // })
  },

  //情况二:用户给评分
  // 商品质量
  in_xin1: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_1 = this.data.starNum[productId].one_1;
    if (in_xin === 'use_sc2' && one_1 !==1) {
      one_1--;
    } else {
      one_1++;
    }
    this.data.starNum[productId].one_1 = one_1;
    this.data.starNum[productId].two_1 = 5 - one_1;
    this.setData({
      starNum: this.data.starNum
    })
  },
  // 商品口味
  in_xin2: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_2 = this.data.starNum[productId].one_2;
    if (in_xin === 'use_sc2' && one_2 !== 1) {
      one_2--;
    } else {
      one_2++;
    }
    this.data.starNum[productId].one_2 = one_2;
    this.data.starNum[productId].two_2 = 5 - one_2;
    this.setData({
      starNum: this.data.starNum
    })
  },
  // 商品包装
  in_xin3: function (e) {
    let productId = e.target.id;
    var in_xin = e.currentTarget.dataset.in;
    var one_3 = this.data.starNum[productId].one_3;
    if (in_xin === 'use_sc2' && one_3 !== 1) {
      one_3--;
    } else {
      one_3++;
    }
    this.data.starNum[productId].one_3 = one_3;
    this.data.starNum[productId].two_3 = 5 - one_3;
    this.setData({
      starNum: this.data.starNum
    })
  },
  // 评价提交信息
  submitCommentButton: function() {
    var that = this;
    console.log("------------", that.data.starNum);
    let i = 0;
    var arr = [];
    for (let producted in that.data.starNum) {
      arr[i] = {};
      arr[i].orderId = that.data.orderId;
      arr[i].productId = producted;
      arr[i].userOpenid = app.globalData.userOpenid;
      arr[i].qualityScore = that.data.starNum[producted].one_1;
      arr[i].tasteScore = that.data.starNum[producted].one_2;
      arr[i].packingScore = that.data.starNum[producted].one_3;
      i++
    }



    wx.request({
        url: 'https://cxd.mynatapp.cc/buyer/comment/',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: arr,
        success: function (res) {
         
          wx.showToast({
            title: '评价成功',
            icon: 'success',
            duration: 2000
          })
          wx.reLaunch({
            url: '../dishes/dishes',
          })
        },
        error: function (error) {
          console.log("error", error)
        }
      })
    }

    // for (let obj in that.data.starNum) {
    //   console.log("obj", obj);
    //   wx.request({
    //     url: 'https://cxd.mynatapp.cc/buyer/comment/',
    //     method: 'POST',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     data: [
    //       {
    //         orderId: that.data.orderId,
    //         productId: obj,
    //         userOpenid: app.globalData.userOpenid,
    //         qualityScore: that.data.starNum[obj].one_1,
    //       },
    //       {
    //         orderId: that.data.orderId,
    //         productId: obj,
    //         userOpenid: app.globalData.userOpenid,
    //         tasteScore: that.data.starNum[obj].one_2,
    //       },
    //       {
    //         orderId: that.data.orderId,
    //         productId: obj,
    //         userOpenid: app.globalData.userOpenid,
    //         packingScore: that.data.starNum[obj].one_3
    //       }
          
    //     ],
    //     success: function (res) {
    //       console.log(that.data.starNum[obj].one_1)
    //       wx.showToast({
    //         title: '评价成功',
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       wx.reLaunch({
    //         url: '../dishes/dishes',
    //       })
    //     },
    //     error: function (error) {
    //       console.log("error", error)
    //     }
    //   })
    // }
  
})