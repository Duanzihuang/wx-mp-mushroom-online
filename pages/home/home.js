import {request} from '../../utils/request.js'

// pages/home/home.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    swipers: null, // 轮播图
    courses: null, // 推荐课程
    videos: null // 热门视频
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
    const res = await request({url: 'home/swipers'})
    this.setData({
      swipers: res.message
    })
  },
  // 获取推荐课程数据
  async getRecommendCoursesData() {
    const res = await request({ url: 'home/course' })

    this.setData({
        courses: res.message
    })
  },

  // 获取热门视频
  async getHotVideosData() {
    const res = await request({url: 'home/video'})
    this.setData({
      videos: res.message
    })
  },

  // 跳转到课程页面
  goToCoursePage(){
    wx.switchTab({
      url: '/pages/course/course',
    })
  },

  // 跳转到课程详情页面
  goToCourseDetail(e){
    // console.log(e.target.dataset.id)
    wx.navigateTo({
      url: `/subpkg/course-detail/course-detail?id=${e.target.dataset.id}`,
    })
  },
  
  // 跳转到搜索页面
  goToSearch(){
    // console.log('---goToSearch---')
    wx.navigateTo({
      url: '/subpkg/search/search',
    })
  }
})