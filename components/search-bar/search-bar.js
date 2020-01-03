// components/search-bar/search-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: String
  },

  methods: {
    goToSearchPage() {
      // wx.navigateTo({
      //   url: '/pages/search/search',
      // })
      this.triggerEvent('myevent')
    }
  }
})
