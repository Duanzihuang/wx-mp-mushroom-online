// pages/search/search.js
import {request} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    keyword: '',
    courses: []
  },

  search(e) {
    this.setData({
      keyword: e.detail
    },() => {
      this.getCoursesData()
    })
  },

  // 聚焦
  focus() {
    this.setData({
      isFocus: true
    })
  },

  // 取消搜索
  cancel() {
    this.setData({
      isFocus: false,
      keyword: ''
    },async () => {
      const res = await request({url:'course/search',data: {
        name:this.data.keyword
      }})
  
      this.setData({
        courses: res.message
      })
    })
  },

  /**
   * 根据关键字搜索课程
   */
  async getCoursesData() {
    const res = await request({url:'course/search',data: {
      name:this.data.keyword
    }})

    this.setData({
      courses: res.message
    })
  }
})