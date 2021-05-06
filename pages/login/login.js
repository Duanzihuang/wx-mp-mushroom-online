// pages/login/login.js
import {
  request
} from '../../utils/request.js'

Page({
  // 微信授权登录
  async wxLogin() {
    const res = await wx.getUserProfile({
      desc: '为了给你提供更好的服务~'
    }).catch(err => {
      console.log('err is ', err)
    })

    if (!res) return

    // 进行微信授权登录
    wx.login({
      success: async ({
        code
      }) => {
        const res1 = await request({
          url: 'user/wxlogin',
          method: 'POST',
          tip: '登录中...',
          isNeedAuth: false,
          data: {
            code,
            nickname: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl
          }
        })

        const {
          status
        } = res1

        if (status === 0) {
          // 提示
          wx.showToast({
            title: '微信授权登录成功',
            icon: 'none'
          })

          // 保存到本地
          wx.setStorageSync('my_token', res1.token)

          // 跳转到首页去
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }
      }
    })
  },

  // 跳转到手机号登录
  phoneLogin() {
    wx.navigateTo({
      url: '/subpkg/phone-login/phone-login'
    })
  }
})