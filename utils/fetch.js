const BASEURL = 'http://localhost:3000/api/'
// const BASEURL = 'http://huangjiangjun.top:3000/api/'

const app = getApp()

export const fetch = ({url,method="GET",data,tip='数据加载中...',isNeedAuth=true}) => {
  return new Promise((resolve,reject) => {
    wx.showLoading({
      title: tip,
    })

    // 处理请求头
    const header = {}
    if (isNeedAuth) { // 是否需要授权
      if (app.globalData.my_token) {
        header.Authorization = app.globalData.my_token
      } else {
        const my_token = wx.getStorageSync('my_token')
        header.Authorization = my_token
        app.globalData.my_token = my_token
      }
    }
    wx.request({
      url: `${BASEURL}${url}`,
      data,
      method,
      header,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete:() => {
        wx.hideLoading()
      }
    })
  })
}