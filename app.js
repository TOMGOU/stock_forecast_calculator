//app.js
App({
  globalData: {
    secret: {
      SecretId: '1AKIDzmV3QsB3kOQIzPBFW6TxrVt77sNbESWc1',
      SecretKey: '1zBpIWiLioeEagVG6h5C4QXQ3XUBcrlQo1'
    }
  },
  onLaunch: function () {
    wx.setStorageSync('isRedDot1', false)
    wx.setStorageSync('isRedDot2', false)
    wx.setStorageSync('isRedDot3', false)
    // 版本检查更新
    if (wx.canIUse('getUpdateManager')) {
      this.checkUpdateVersion()
    }
  },
  /**
   * 检测当前的小程序
   * 是否是最新版本，是否需要下载、更新
   */
  checkUpdateVersion() {
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      // 检测版本更新
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // 监听小程序有版本更新事件
          updateManager.onUpdateReady(() => {
            wx.showModal({
              confirmColor: '#1890FF',
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              showCancel: false, // 是否显示取消按钮,
              confirmText: '确定',
              success: res => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(() => {
            // 新版本下载失败
            wx.showModal({
              confirmColor: '#1890FF',
              content: '小程序更新失败，请关闭后再次开启！',
              showCancel: false // 是否显示取消按钮,
            })
          })
        }
      })
    }
  }
})