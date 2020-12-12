Page({
    // 定义转发
    onShareAppMessage: function (res) {
        return {
          title: '股票相关知识了解一下！',
          path: '/pages/about/index',
          success: function () { },
          fail: function () { }
        }
    },
    data: {
        isRedDot1: false,
        isRedDot2: false,
        isRedDot3: false,
        img: 'https://public-1304544538.cos.ap-chengdu.myqcloud.com/images/lesson.png',
        faqList: [{
            title: '什么是市盈率？',
            content: '市盈率通常被用来衡量一只股票的投资价值，它是当前股票市场价格与每股收益的比值。'
        }, {
            title: '这个计算器的核心原理是什么？',
            content: '股价 * 总股本 = 总市值 = 净利润 * 市盈率'
        }, {
            title: '为什么要做这个计算器？',
            content: '相信很多投资者都有阅读年报季报的习惯，每次发季报的时候，就是我们对自己投资的股票多一份确定性的时候，同时也要做一定得调整，而每次都要重复计算买卖的价格，这就是这个计算器诞生的来由'
        },
        // {
        //     title: '公众号关联本小程序',
        //     content: '欢迎关联本小程序，AppID(小程序ID): wxc53b8fcb9acdd6c7'
        // }
        ]
    },
    showHelp(e) {
        let index = e.currentTarget.dataset.index,
            faqList = this.data.faqList,
            item = faqList[index];

        wx.showModal({
            title: item.title,
            content: item.content,
            showCancel: false,
            confirmText: 'Soga'
        })
    },
    handleGoHelp() {
        wx.setStorageSync('isRedDot1', true)
        wx.navigateTo({ url: '../steps/index' })
    },
    handleGoInvestSystem() {
        wx.setStorageSync('isRedDot2', true)
        wx.navigateTo({ url: '../system/index' })
    },
    handleGoHistory() {
        wx.setStorageSync('isRedDot3', true)
        wx.navigateTo({ url: '../history/index' })
    },
    // 检查是否需要出现红点
    resetBadgeDot() {
        const isRedDot1 = wx.getStorageSync('isRedDot1')
        const isRedDot2 = wx.getStorageSync('isRedDot2')
        const isRedDot3 = wx.getStorageSync('isRedDot3')
        this.setData({
            'isRedDot1': isRedDot1,
            'isRedDot2': isRedDot2,
            'isRedDot3': isRedDot3,
        })
    },
    onShow() {
        this.resetBadgeDot()
    },
    handlePreviewImage() {
        wx.previewImage({
            current: this.data.img, // 当前显示图片的http链接
            urls: [this.data.img] // 需要预览的图片http链接列表
        })
    }
})
