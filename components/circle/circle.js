// components/circle/circle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    canvasId: Number,
    width: {
      type: Number,
      value: 100
    },
    height: {
      type: Number,
      value: 100
    },
    backgroundColor: {
      type: String,
      value: '#f3f3f3'
    },
    foregroundColor: {
      type: String,
      value: '#B4D66E'
    },
    lineWidth: {
      type: Number,
      value: 5
    },
    progress: {
      type: Number,
      value: 100
    }
  },

  ready() {
    this.drawProgress()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 绘制进度
    drawProgress() {
      if (this.data.progress <= 30) {
        this.data.foregroundColor = '#ff0000'
      } else if (this.data.progress > 30 && this.data.progress < 50) {
        this.data.foregroundColor = '#FF783B'
      } else {
        this.data.foregroundColor = '#B4D66E'
      }
      // 背景色
      const backgroundCtx = wx.createCanvasContext('backgroundCanvas'+this.data.canvasId,this)
      // 前景色
      const foregroundCtx = wx.createCanvasContext('foregroundCanvas' + this.data.canvasId,this)
      // 绘制背景色
      backgroundCtx.setStrokeStyle(this.data.backgroundColor)
      backgroundCtx.setLineWidth(this.data.lineWidth)
      // 绘制圆
      backgroundCtx.arc(this.data.width/2 + this.data.lineWidth / 2, this.data.height/2 + this.data.lineWidth / 2, this.data.width/2 - this.data.lineWidth, 0, 2 * Math.PI, true)
      backgroundCtx.stroke()
      
      // 绘制前景色
      foregroundCtx.setStrokeStyle(this.data.foregroundColor)
      foregroundCtx.setLineWidth(this.data.lineWidth)
      foregroundCtx.setLineCap('round')
      foregroundCtx.arc(this.data.width / 2 + this.data.lineWidth / 2, this.data.height / 2 + this.data.lineWidth / 2, this.data.width / 2 - this.data.lineWidth, -0.5 * Math.PI, (this.data.progress / 100) * 2 * Math.PI - 0.5 * Math.PI, false)
      foregroundCtx.stroke()

      // 绘制文字
      foregroundCtx.setFillStyle(this.data.foregroundColor)
      // foregroundCtx.setFontSize(12)
      const font_size = 12
      foregroundCtx.font = font_size + 'px Helvetica'
      // // 获取文字的宽度
      // const text_width = foregroundCtx.measureText(parseInt(this.data.progress)+'%').width
      // foregroundCtx.fillText(parseInt(this.data.progress)+'%',this.data.width / 2 - text_width / 2,this.data.height / 2 + font_size / 2)
      if (this.data.progress >= 99){
        foregroundCtx.fillText(parseInt(this.data.progress)+'%',this.data.width / 2 - 13,this.data.height / 2 + 6)
      } else {
        foregroundCtx.fillText(parseInt(this.data.progress)+'%',this.data.width / 2 - 10,this.data.height / 2 + 6)
      }
      
      // 绘制
      backgroundCtx.draw()
      foregroundCtx.draw()
    }
  }
})
