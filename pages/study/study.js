// pages/study/study.js
import {request} from '../../utils/request'
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
    const res = await request({url: 'study/progress'})
    res.message.forEach(item => {
      if (item.study_progress <= 30) {
        item.color = '#ff0000'
      } else if (item.study_progress <=80){
        item.color = '#ff9a2a'
      } else {
        item.color = '#b4d66e'
      }
    })
    this.setData({
      isEmpty: res.message.length  === 0,
      studyProgresses: res.message
    })
  }
})