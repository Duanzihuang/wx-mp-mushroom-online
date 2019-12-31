import {fetch} from '../../utils/fetch.js'

// pages/home/home.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    swipers: [], // 轮播图
    courses: [], // 推荐课程
    videos: [] // 热门视频
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwipersData()
    this.getRecommendCoursesData()
    this.getHotVideosData()
  },

  // 获取轮播图数据
  async getSwipersData() {
    const res = await fetch({url: 'home/swipers'})
    this.setData({
      swipers: res.data.message
    })
  },
  // 获取推荐课程数据
  async getRecommendCoursesData() {
    const res = await fetch({url: 'home/course'})

    this.setData({
      courses: res.data.message
    })
  },
  // 获取热门视频
  async getHotVideosData() {
    const res = await fetch({url: 'home/video'})
    this.setData({
      videos: res.data.message
    })
  }
})