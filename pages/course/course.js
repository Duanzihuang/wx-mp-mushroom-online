// pages/course/course.js
import { fetch } from '../../utils/fetch.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取课程列表数据
    this.getCoursesData()
  },

  getCoursesData() {
    fetch({ url: 'course/list' }).then(res => {
      this.setData({
        courses: res.data.message
      })
    })
  }
})