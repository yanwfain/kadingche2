// pages/loganmiut/loganmiut.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      time:setInterval(function() {

         var nums = that.data.num
        nums--
        if (nums == 0) {
          wx.switchTab({
            url: "../index/index"
          });
        }
        console.log(nums)
        that.setData({
          num: nums
        })
      }, 1000)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  imgFn:function(e){
    console.log(1)
    wx.switchTab({
      url: "../index/index"
    });
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
    clearInterval(this.data.time)
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