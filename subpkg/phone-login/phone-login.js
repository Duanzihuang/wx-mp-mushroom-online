// pages/phone-login/phone-login.js
import {request} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'17704051019',
    vcode:'',
    tipName:'获取验证码',
    count:10,
    isCountdown: false,
    timer:null
  },
  changeValue(e){
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  // 获取验证码
  getVcode() {
    var reg = /^1[3456789][0-9]{9}$/
    if (!reg.test(this.data.phone)){
      wx.showToast({
        title: '手机号不合法',
        icon:'none'
      })
      return
    }

    // 倒计时
    // 是否正在倒计时
    if (this.data.isCountdown) return

    // 倒计时
    this.setData({
      isCountdown: true,
      tipName: `${this.data.count}`
    })

    this.data.timer = setInterval(() => {
      this.data.count--
      if (this.data.count > 0) {
        this.setData({
          tipName: `${this.data.count}`
        })
      } else {
        clearInterval(this.data.timer)
        this.data.count = 10
        this.setData({
          isCountdown: false,
          tipName: '获取验证码'
        })
      }
    }, 1000)

    // 发请求，获取验证码
    request({ url: 'user/vcode', data: { phone: this.data.phone } }).then(res => {
      const { status } = res

      if (status === 0) {
        wx.showToast({
          title: `${res.vcode}`,
          icon: 'none'
        })

        this.setData({
          vcode: res.vcode
        })
      }
    })
  },
  // 手机号登录
  phoneLogin() {
    var reg1 = /^1[3456789][0-9]{9}$/
    if (!reg1.test(this.data.phone)) {
      wx.showToast({
        title: '手机号不合法',
        icon: 'none'
      })
      return
    }

    var reg2 = /^[0-9]{4}$/
    if (!reg2.test(this.data.vcode)) {
      wx.showToast({
        title: '验证码格式不对',
        icon: 'none'
      })
      return
    }

    request({ 
      url:'user/login',
      method:'POST',
      tip:'登录中...',
      isNeedAuth: false,
      data:{
        phone: this.data.phone,
        vcode: this.data.vcode
      }
    }).then(res => {
      const { status } = res
      if (status === 0) {
        // 提示
        wx.showToast({
          title: '手机号登录成功',
          icon: 'none'
        })

        // 保存到本地
        wx.setStorageSync('my_token', res.token)

        // 跳转到首页去
        wx.reLaunch({
          url: '/pages/home/home',
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
  },
  onUnload: function () {
    // 页面销毁时执行
    clearInterval(this.data.timer)
  }
})