const app = getApp();
Component({
  properties: {
    //小程序页面的标题
    title: {
      type: String,
      default: '默认标题'
    },
    //是否展示返回和主页按钮
    showIcon: {
      type: Boolean,
      default: true
    }
  },

  data: {
    statusBarHeight: 0,
    titleBarHeight: 0,
  },

  ready: function () {
    // 因为每个页面都需要用到这连个字段，所以放到全局对象中
    if (app.globalData && app.globalData.statusBarHeight && app.globalData.titleBarHeight) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight
      });
    } else {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          if (!app.globalData) {
            app.globalData = {}
          }
          //安卓和ios导航栏高度不同，根据机型赋值导航栏高度
          if (res.model.indexOf('iPhone') !== -1) {
            app.globalData.titleBarHeight = 44
          } else {
            app.globalData.titleBarHeight = 48
          }
          app.globalData.statusBarHeight = res.statusBarHeight
          that.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
          });
        },
        failure() {
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      })
    }
  },

  methods: {
    headerBack() {
      wx.navigateBack({
        delta: 1,
        fail(e) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    },
    headerHome() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})