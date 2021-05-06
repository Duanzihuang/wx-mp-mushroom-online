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
      console.log('---search-bar---click')
      // 触发自定义事件
      this.triggerEvent('myevent')
    }
  }
})
