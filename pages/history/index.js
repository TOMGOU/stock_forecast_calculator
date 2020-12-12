const COS = require('../../utils/cos-wx-sdk-v5');

Page({
  tapPreviewImage(e) {
    wx.previewImage({
      current: this.data.imageList[e.target.dataset.index],
      urls: this.data.imageList
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '黄金三角估值计算器，动态生成图表，让贵贱一目了然！',
      path: '/pages/history/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    cdn: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/',
    images: [],
    imageList: []
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    var cos = new COS({
      ...getApp().globalData.secret
    });
    cos.getBucket({
      Bucket: 'public-1304544538',
      Region: 'ap-chengdu',
      Prefix: 'upload/',
    }, (err, data) => {
      const img = data.Contents || [];
      const images = img.filter((item, index) => index !== 0).map(item => {
        return {
          ...item,
          url: this.data.cdn + item.Key,
          time: item.LastModified.replace(/T/, ' ').replace(/.000Z/, ''),
          times: item.LastModified.replace(/^(\d.*)T(.*)\.000Z$/g, '$1 $2'),
          bg: '#' + Math.random().toString(16).substr(2, 6).toUpperCase()
        }
      }).sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
      this.setData({
        images: images,
        imageList: images.map(item => this.data.cdn + item.Key)
      })
      wx.hideLoading()
    });
  },
});
