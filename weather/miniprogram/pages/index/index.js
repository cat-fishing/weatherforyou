//index.js
//index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    update_time: '',
    data: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var rescity = ""
    //微信信息
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        //根据经纬度去百度地图查所在城市名字
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=01RqeOtj8bXS9vlmHUGKNBNPbnESnzvv&location=' + latitude + ',' + longitude + '&output=json',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            rescity = res.data.result.addressComponent.city;
          },
          fail: function () { },
          complete: function () { }
        })
      }
    })
    //天气预报请求
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {
        version: 'v1',
        city: rescity,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success(res) {
        console.log(res.data.data)
        that.setData({
          city: res.data.city,
          update_time: res.data.update_time,
          data: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
