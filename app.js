//app.js
App({
  onLaunch: function () {
    const my_token = wx.getStorageSync('my_token')

    if (my_token) { // 有，则直接跳转到首页
      this.globalData.my_token = my_token
      wx.reLaunch({
        url: '/pages/home/home',
      })
    }
  },
  globalData: {
    my_token: null
  }
})