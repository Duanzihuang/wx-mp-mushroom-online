// pages/study/study.js
import {fetch} from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty:false, //是否为空【是否有学习记录】
    studyProgresses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 获取学习进度数据
    this.getStudyProgressData()
  },
    
  async getStudyProgressData(){
    const res = await fetch({url: 'study/progress'})
    this.setData({
      isEmpty: res.data.message.length  === 0,
      studyProgresses: res.data.message
    })
  }
})