// pages/login/login.js
import {fetch} from '../../utils/fetch.js'

Page({
  // 微信授权登录
  wxLogin(e) {
    const { errMsg} = e.detail
    if (errMsg === 'getUserInfo:fail auth deny') return

    // 进行微信授权登录
    wx.login({
      success: async ({ code}) => {  
        const res = await fetch({
          url:'user/wxlogin',
          method:'POST',
          tip:'登录中...',
          isNeedAuth: false,
          data: {
            code,
            nickname: e.detail.userInfo.nickName,
            avatar: e.detail.userInfo.avatarUrl
          }
        })

        const {status} = res.data

        if (status === 0) {
          // 提示
          wx.showToast({
            title: '微信授权登录成功',
            icon:'none'
          })

          // 保存到本地
          wx.setStorageSync('my_token', res.data.token)

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
      url: '/pages/phone-login/phone-login',
    }) 
  }
})