const app = getApp();
Page({
  data: {
    product_id:"",
    sortMoudlePraise: true,
    sortMoudlePrice: false,
    currentData: 0,
    total:'00.00',
    activeMenuId:'1', 
    mealOrderInfo: {},
    mealsInfo:{
    },
    vegetableClassification: []
  },
  onLoad: function(options) {
    var that = this;
    var sort = 1;
    if (this.data.sortMoudlePrice) {
      sort = 2;
    }
    wx.request({
      url: 'https://wangtingting.top:9009/buyer/product/list',
      method: 'GET',
      data:{
        sort: sort
      },
      header: {
        'content-type': 'text/html'
      },
      success: function (resInfo) {
        var data = resInfo.data.data;

        for(let i = 0; i < data.length; i++) {
         
          var end = that.data.vegetableClassification.some(function(currentValue){
                        //任意一项相等则不能push
            return currentValue.category_name == data[i].category_name ||    
              currentValue.category_type == data[i].category_id 
                    })
          if(!end) {
            that.data.vegetableClassification.push({
              'category_name': data[i].category_name,
              'category_type': data[i].category_id,
            });
          }
       
          that.data.mealsInfo[data[i].category_id] = data[i].products;
       
          for (let j = 0; j < data[i].products.length;j++) {
     
            that.data.mealOrderInfo[data[i].products[j].product_id] = {};
            that.data.mealOrderInfo[data[i].products[j].product_id].num = 0;
            that.data.mealOrderInfo[data[i].products[j].product_id].product_id = data[i].products[j].product_id;
            that.data.mealOrderInfo[data[i].products[j].product_id].product_name = data[i].products[j].product_name;
            that.data.mealOrderInfo[data[i].products[j].product_id].product_price = data[i].products[j].product_price;
          }
        }
  
        that.setData({
          mealOrderInfo: that.data.mealOrderInfo
        })
        app.globalData.mealOrderInfo = that.data.mealOrderInfo;   
        that.setData({
          mealsInfo: that.data.mealsInfo
        })
        that.setData({
          vegetableClassification: that.data.vegetableClassification
        })
   

        //页面传参
        var activeMenuId = that.data.activeMenuId;
        var mealsInfo = that.data.mealsInfo;

        var product_id = 'Id' + mealsInfo[activeMenuId][0].product_id;

        if (options.keywords) {
     
          product_id = 'Id'+options.keywords;
          //更改activeMenuId的值
          let activeMenuId = that.getActiveMenuIdByProductId(product_id)

          that.setData({
            activeMenuId: activeMenuId
          })
        }
        that.setData({
          product_id: product_id
        })
      
      }
    })
    //获取收获地址
    let userOpenid = app.globalData.userOpenid;
    wx.request({
      url: 'https://wangtingting.top:9009/user/info/search',
      method: 'GET',
      data: {
        openId: userOpenid
      },
      header: {
        'content-type': 'html/text'
      },
      success: function (resInfo) {
        var data = resInfo.data.data[0];
        app.globalData.address.userName = data.user_name;
        app.globalData.address.userAddress = data.user_address;
        app.globalData.address.userPhone = data.user_phone;
        app.globalData.address.userGender = data.user_gender;
        
      },
      error: function(){
        console.log("错误");
      }
    })
  },
  getActiveMenuIdByProductId: function (product_id) {
    var mealsInfo = this.data.mealsInfo;
    for(let item in mealsInfo) {
      let activeMenuId = item;
      for (let i = 0; i < mealsInfo[activeMenuId].length; i++) {
        if (product_id == 'Id' + mealsInfo[activeMenuId][i].product_id) {
      
          return activeMenuId;
        }
      }
    }

  },
  individualMeals: function(event) {
    var id = event.target.id;

    var _this = this;
    _this.setData(
      {
        activeMenuId:id
      }
    );  
  },
  addmeal: function(event) {
    var _this = this;
    var id = event.target.id;
   
    var activeMenuId = _this.data.activeMenuId; 
    var num = _this.data.mealOrderInfo[id].num;
    num++;
    _this.data.mealOrderInfo[id].num = num;
    _this.setData({
      mealOrderInfo: _this.data.mealOrderInfo
    })
    app.globalData.mealOrderInfo = _this.data.mealOrderInfo;   
  
    for (let i = 0; i < _this.data.mealsInfo[activeMenuId].length; i++) {
      if (_this.data.mealsInfo[activeMenuId][i].product_id == id) {
        var money = Number(_this.data.total) + Number(_this.data.mealsInfo[activeMenuId][i].product_price)
        _this.setData({
        total: money.toFixed(2)
        })   
      }
    }
    app.globalData.total = _this.data.total;
  },
  minusmeal: function(event) {
    
    var _this = this;
    var id = event.target.id;
    var activeMenuId = _this.data.activeMenuId;
    var num = _this.data.mealOrderInfo[id].num;
    num--;
    _this.data.mealOrderInfo[id].num = num;
    _this.setData({
      mealOrderInfo: _this.data.mealOrderInfo
    })
    app.globalData.mealOrderInfo = _this.data.mealOrderInfo;   
    for (let i = 0; i < _this.data.mealsInfo[activeMenuId].length; i++) {
      if (_this.data.mealsInfo[activeMenuId][i].product_id == id) {
        var money = Number(_this.data.total) - Number(_this.data.mealsInfo[activeMenuId][i].product_price)
        _this.setData({
          total: money.toFixed(2)
        })
      }
    }
  },
  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  //清空购物车
  deleteShopCar: function() {
    for(var item in this.data.mealOrderInfo) {
        this.data.mealOrderInfo[item].num = 0;
      this.setData({
        mealOrderInfo: this.data.mealOrderInfo
      })      
    }
    this.setData({
      total: '00.00'   
    })
    this.hideModal();
  },
  //商品评价页
  evaluation: function(event) {
    var product_id = event.currentTarget.dataset.in;

    if (event.currentTarget.id != "mealInfoTop") {
      return;
    }
    wx.navigateTo({
      url: '/pages/evaluation/evaluation?product_id=' + product_id,
    })
  },
  sortTheMoudlePraise: function () {
    if (this.data.sortMoudlePraise) {
      return;
    }
    this.setData({
      sortMoudlePrice: !this.data.sortMoudlePrice,
      sortMoudlePraise: !this.data.sortMoudlePraise
    })
    this.onLoad({});
  },
  sortTheMoudlePrice: function () {
    if (this.data.sortMoudlePrice) {
      return;
    }
    this.setData({
      sortMoudlePraise: !this.data.sortMoudlePraise,
      sortMoudlePrice: !this.data.sortMoudlePrice
    })
    this.onLoad({});
  },
  theOrder:function(){
    wx.navigateTo({
      url: '../Order/Order',
    })
  },
  theChoice:function(){
    this.setData({
      showModalStatus: !this.data.showModalStatus
    })
  },
  thePayIt:function(){
    if(this.data.total==0){
      wx.showToast({
        title: '请选择菜品',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
    else if (this.data.total>=0 && this.data.total <= 2) {
      wx.showToast({
        title: '此时不配送',
        icon: 'loading',
        duration: 2000,
        mask: true
      })
    }
    else{
      var url;
   
      if(app.globalData.address.userPhone &&
        app.globalData.address.userGender &&
        app.globalData.address.userName &&
        app.globalData.address.userAddress) {
        url = '../submit/submit';
      } else {
        url =  '../addAddress/addAddress';  
      }
      wx.navigateTo({
        url: url
      })
    }
  },
  theOrder: function () {
    wx.navigateTo({
      url: '../Order/Order',
    })
  },
  Search: function (t) {
    wx.navigateTo({
      url: "../Search/Search"
    })
  }
})
