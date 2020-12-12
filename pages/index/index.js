//index.js
const year = new Date().getFullYear()
Page({
  onShareAppMessage: function (res) {
    return {
      title: '黄金三角估值计算器，动态生成图表，让贵贱一目了然！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    stockInfo: {
      name: '中国平安',
      price: '85.46',
      capital: '182.8',
      margin: '1392.55',
      lowestPE: '9',
      highestPE: '15',
      growth1: '-0.13',
      growth2: '0.2',
      growth3: '0.1',
      growth4: '0.1'
    },
    stockInfoFormList: [
      { title: '股票名称', placeholder: '请输入', maxlength: 10, name: 'name', type: 'text' },
      { title: '去年年末股价(元)', placeholder: '请输入', maxlength: 10, name: 'price', type: 'digit' },
      { title: '总股本数(亿)', placeholder: '请输入', maxlength: 10, name: 'capital', type: 'digit' },
      { title: '去年净利润(亿)', placeholder: '请输入', maxlength: 10, name: 'margin', type: 'digit' },
      { title: '最低市盈率(倍)', placeholder: '请输入', maxlength: 10, name: 'lowestPE', type: 'digit' },
      { title: '最高市盈率(倍)', placeholder: '请输入', maxlength: 10, name: 'highestPE', type: 'digit' },
      { title: year + '年净利润增长率(例如:0.1)', placeholder: '请输入', maxlength: 10, name: 'growth1', type: 'digit' },
      { title: year + 1 + '年净利润增长率(例如:0.1)', placeholder: '请输入', maxlength: 10, name: 'growth2', type: 'digit' },
      { title: year + 2 + '年净利润增长率(例如:0.1)', placeholder: '请输入', maxlength: 10, name: 'growth3', type: 'digit' },
      { title: year + 3 + '年净利润增长率(例如:0.1)', placeholder: '请输入', maxlength: 10, name: 'growth4', type: 'digit' }
    ],
  },
  handleDataVerify() {
    const stockInfo = this.data.stockInfo
    return Object.keys(stockInfo).every(key => stockInfo[key] !== '')
  },
  bindClearStockInfo() {
    const stockInfo = {
      name: '',
      price: '',
      capital: '',
      margin: '',
      lowestPE: '',
      highestPE: '',
      growth1: '',
      growth2: '',
      growth3: '',
      growth4: ''
    }
    this.setData({
      stockInfo: stockInfo
    })
    wx.setStorageSync('stockInfo', this.data.stockInfo)
  },
  // 生成表格事件
  bindGenerateExcel() {
    const verifyResult = this.handleDataVerify()
    if (!verifyResult) {
      wx.showToast({
        title: '请输入完整数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('stockInfo', this.data.stockInfo)
    wx.navigateTo({
      url: '../table/index'
    })
  },
  // 生成线形图事件
  bindGenerateGraph() {
    const verifyResult = this.handleDataVerify()
    if (!verifyResult) {
      wx.showToast({
        title: '请输入完整数据',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('stockInfo', this.data.stockInfo)
    wx.navigateTo({
      url: '../line/index'
    })
  },
  handleInput(e) {
    let name = e.currentTarget.dataset.name;
	  this.setData({
      stockInfo: {
        ...this.data.stockInfo,
        [name]: e.detail.value
      }
    })
  },
  handleGoHistory() {
    wx.navigateTo({ url: '../history/index' })
  },
  onLoad() {
    const stockInfo = wx.getStorageSync('stockInfo')
    if (stockInfo) {
      this.setData({
        stockInfo: stockInfo
      })
    }
  }
})
