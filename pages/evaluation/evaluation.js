Page({
  data: {
    evaluatons:[],
    one_1: 0,
    two_1: 5,
    one_2: 0,
    two_2: 5,
    one_3: 0,
    two_3: 5,
  },
  onLoad: function (options) {
    var that = this;
    var product_id = options.product_id;

    //展示后台给的评分
    wx.request({
      url: 'https://wangtingting.top:9009/buyer/searchComment/',
      method: 'GET',
      data: {
        product_id:product_id
      },
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
       
        var data = res.data.data;

        for(let i = 0; i < data.length; i++) {
          let time = new Date(data[i].create_time);
        
          data[i].createTime = time.getFullYear() + "-" + Number(time.getMonth() + 1) + "-" + time.getDate() + " "+ time.getHours() +":"+time.getMinutes();
       
          data[i].one_1= data[i].quality_score
          data[i].two_1= 5 - data[i].quality_score
          data[i].one_2 = data[i].taste_score,
          data[i].two_2 = 5 - data[i].taste_score
          data[i].one_3 = data[i].packing_score,
          data[i].two_3 = 5 - data[i].packing_score
        }
        that.setData({
          evaluatons:data
        })
      }
    })
  },
})