//index.js
//index.js
const app = getApp()
const amapFile = require('../../utils/amap-wx.js')
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
    var myAmapFun = new amapFile.AMapWX({ key: '' });
    myAmapFun.getRegeo({
      success: (res) => {
        this.setData({
          city: res[0].regeocodeData.addressComponent.city
        })
      }
    })
    //天气预报请求,第三方天气接口2019-08新增参数
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {
        version: '',
        appid: '',
        appsecret:'',
        city: rescity,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success(res) {
        console.log(res.data.data)
        that.setData({
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
