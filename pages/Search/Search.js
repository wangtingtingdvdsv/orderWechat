// 搜索菜品信息
Page({
  data: {
    searchdish:false,
    productJson:[],
    tips:[]
  },
  // 点击搜索事件
  Search:function(t){
    var that = this;
    wx.request({
      url:"https://wangtingting.top:9009/buyer/product/key",
      method:'GET',
      header: {
        'content-type': 'application/json' ,
      },
      data: {
        key: t.detail.value,
      },
      success:function(t){
        var data = t.data.data;
        if(data != ''){
          console.log("搜索", data);
          that.setData({
            productJson: t.data.data
          })
        } else {
          wx.showToast({
            title: '未找到该菜品',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }
      },
      fail:function(t){
       // console.log(t.data)``
      }
    })
  },
  // 页面传值keywords即菜品信息
  bindSearch: function (e) {
    var keywords = e.target.id;
    console.log("keywords", keywords);
    var url = '../dishes/dishes?keywords=' + keywords;
    wx.reLaunch({
      url: url
    })
  }
})