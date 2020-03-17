// pages/shop/shop.js
var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
var timeFormatUtils = require("../../js/timeFormatUtils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGuan: false,
    detail2: [{
      guige: '个人',
      id: 1,
      titles: '个人单圈项目',
      money: 100,

    },
    {
      guige: '亲子',
      id: 2,
      titles: '亲子单圈项目',
      money: 188
    },
    ],
    isShowched: true,
    isShowched1: true,
    names: '',
    money: '',
    isshow: false,
    num: 1,
    count_pick: '',
    // op: "",
    multiArray: [
      ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
      ['00', '20', '40']
    ],
    multiIndex: '',
    // startDate:'',
    isFlock: false,
    isGuan: false,
    isSiuser: false,
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowOpst: true,
    isShowOps: false,
    checked: '',
    is_status: false,
    // id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    that.wxlogin()
    wx.hideTabBar({
      complete() {
        setTimeout(() => {
          that.setData({
            // 设置样式，显示自定义tabbar
            none: false
          })
        }, 500);
      }
    });
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,

      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,

        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.MyUserInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
    getOpenid(that)

    // console.log(dates)
    console.log(app.globalData.userInfo)
    console.log(app.globalData.user_id)
    console.log(app.globalData.all_price)
    // getProduct
    let url = app.globalData.url + '/api/index/getProduct';
    console.log(url)
    let data = {};
    console.log(data)

    app.wxRequest('POST', url, data, (res) => {
      wx.showLoading({
        title: '加载中'
      })
      console.log(res)
      var that = this;

      this.setData({
        detail: res.data.img,
        name: res.data.name,
        moneygren: res.data.parental_price,
        moneygqin: res.data.personal_price,
        id: res.data.id,
        is_status: true
      })
      wx.hideLoading()
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })

  },
  ggopfn:function(e){
    this.setData({
      isSiuser:false
    })
  },
  wxlogin: function () { //获取用户的openID和sessionKey

    var that = this;

    wx.login({

      //获取code 使用wx.login得到的登陆凭证，用于换取openid

      success: (res) => {

        console.log(res)
        // return;
        // wx.request({

        //   method: "GET",

        //   url:,

        //   data: {

        //     code: res.code,

        //     appId: "appIdSbcx",

        //     appKey: "appKeySbcx"

        //   },

        //   header: {

        //     'content-type': 'application/json' // 默认值

        //   },

        //   success: (res) => {

        //     console.log(res);

        //     that.setData({

        //       sessionKey: res.data.session_key

        //     });

        //   }

        // });


      }

    });

  },

  getPhoneNumber: function (e) { //点击获取手机号码按钮



    var that = this;



    wx.checkSession({

      success: function () {
        console.log(e)
        console.log(e.detail.errMsg)

        console.log(e.detail.iv)

        console.log(e.detail.encryptedData)



        var ency = e.detail.encryptedData;

        var iv = e.detail.iv;

        var sessionk = that.data.sessionKey;



        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

          that.setData({

            modalstatus: true

          });

        } else { //同意授权
          let url = app.globalData.url + '/api/User/getphone';
          console.log(url)
          let data = {
            encry: ency,

            iv: iv,

            sessionKey: that.data.session_key
          };
          console.log(data)

          app.wxRequest('POST', url, data, (res) => {
            wx.showLoading({
              title: '加载中'
            })
            console.log(res)
            that.setData({
              phoneNumber: res.data.phone.phoneNumber
            })
            wx.hideLoading()
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })

        }

      },

      fail: function () {

        console.log("session_key 已经失效，需要重新执行登录流程");

        that.wxlogin(); //重新登录

      }

    });



  },

  chekoed1: function (e) {
    if (this.data.isShowched) {
      this.setData({
        isShowched: false,
        isShowched1: true,

      })
    } else {
      this.setData({
        isShowched: true,
        isShowched1: true,

      })
    }


    this.setData({
      // id:1
      ids: e.currentTarget.dataset.id,
      money: e.currentTarget.dataset.moneygren
    })

    // console.log(this.data.isShowched)
    console.log(this.data.isShowched)
    console.log(e.currentTarget.dataset.id)
    console.log(this.data.id)
  },
  riods: function (e) {
    // console.log('1')
    this.setData({
      ridos: '1'
    })
    console.log(this.data.ridos)
  },
  riods1: function (e) {

    this.setData({
      ridos: '2'
    })
    console.log(this.data.ridos)
  },
  chekoed2: function (e) {
    if (this.data.isShowched1) {
      this.setData({
        isShowched: true,
        isShowched1: false,

      })
    } else {
      this.setData({
        isShowched: true,
        isShowched1: true,

      })
    }
    console.log(e.currentTarget.dataset.id)
    this.setData({
      // id:1
      ids: e.currentTarget.dataset.id,
      money: e.currentTarget.dataset.moneygqin
    })
    // console.log(this.data.isShowched)
    console.log(this.data.isShowched1)
    console.log(this.data.id)

  },
  guanfn: function (e) {
    this.setData({
      isGuan: false
    })
  },
  ycfp: function (e) {
    console.log(e)
    this.setData({
      ridos: e.detail.value
    })

  },
  getUserInfo(e) {

    console.log("ok")
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          wxuser: res.userInfo,
          hasUserInfo: true,
          canIUse: true,
          isSiuser: false,

          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function () { }
    })

    getOpenid(that)
  },
  goSumpot: function (e) {

    console.log(this.data.selectedArry)
    console.log(this.data.op)
    console.log(this.data.startDate)
    var times = this.data.op + " " + this.data.startDate
    console.log(times)
    var dates = timeFormatUtils.getDateFormat(new Date().getTime(), "yyyy-MM-dd-hh-mm-ss");
    console.log(new Date(times.replace(/-/g, "/")).getTime())
    var timesops = new Date(times.replace(/-/g, "/")).getTime()
    var timestamp = Date.parse(new Date());
    console.log(timestamp)
    console.log(dates)
    if (!app.globalData.userInfo) {
      var that = this

      that.setData({
        isSiuser: true
      })
    } else {
      // if (!this.data.selectedArry || !this.data.op || !this.data.startDate ) {
      if (this.data.isShowched && this.data.isShowched1) {
        console.log(this.data.id)
        wx.showToast({
          title: '请完善购买信息',
          icon: 'none'
        })
        //  (2019 < 2019 || 09 < 09 || 21 < 21 || (15 < 15 && 00 < 00))
      }
      // else if (timesops < timestamp){
      //   console.log(timesops)
      //   console.log(timestamp)

      //   wx.showToast({
      //     title: '请选择有效时间',
      //     icon: 'none'
      //   })
      // } 
      else {
        // this.getPhoneNumber()
        console.log(this.data.id)
        console.log(timesops)
        console.log(timestamp)
        var count_pick = this.data.num * this.data.money
        console.log(count_pick)
        this.setData({
          count_pick: count_pick
        })
        this.setData({
          isGuan: true
        })
      }
    }

  },
  submitbtn: function (e) {
    console.log(this.data.ridos) //支付方式
    // console.log(this.data.selectedArry[0].id) //项目规格
    console.log(this.data.id) //项目id
    console.log(this.data.money) //项目单价
    console.log(this.data.num) //购买数量
    // console.log(this.data.op) //日期
    // console.log(this.data.startDate + '-' + this.data.end) //时间
    console.log(this.data.count_pick) //订单金额
    if (!this.data.ridos) {
      wx.showToast({
        title: '选择支付方式',
        icon: 'none'
      })
    } else if (this.data.ridos == 1) {
      this.setData({
        isShowOpst: false,
        isShowOps: true
      })
      var that = this
      let url = app.globalData.url + '/api/index/addOrder3';
      let url1 = app.globalData.url + '/api/Wechat/pay';
      let url2 = app.globalData.url + '/api/index/editOrder2';
      console.log(url)
      let data = {
        user_id: app.globalData.user_id,
        product_id: this.data.id,
        product_status: this.data.ids,
        // subscribe_day: this.data.op,
        // subscribe_time: this.data.startDate + '-' + this.data.end,
        order_price: this.data.count_pick,
        product_num: this.data.num,
        product_price: this.data.money,
        buy_status: this.data.ridos,
        shop_id:app.globalData.shop_id
      };
      console.log(data)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.code)
        if (res.code == 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
          this.setData({
            isShowOpst: true,
            isShowOps: false
          })
          return false
        }
        this.setData({
          order_id: res.data.order_id,
          order_no: res.data.order_no,
          order_ids: res.data.order_ids
        })
        let data1 = {
          order_id: res.data.order_id,
          order_price: this.data.count_pick,
        };
        console.log(data1)
        app.wxRequest('POST', url1, data1, (res) => {
          console.log(res)
          wx.requestPayment({

            'timeStamp': res.timeStamp,
            'nonceStr': res.nonceStr,
            'package': res.package,
            'signType': 'MD5',
            'paySign': res.paySign,
            'success': function (res) {
              console.log(res);
              wx.showToast({
                title: "支付成功",
              })

              that.setData({
                isShowOpst: true,
                isShowOps: false
              })
              var data2 = {
                is_ok: 2,
                order_id: that.data.order_id,
                order_ids: that.data.order_ids
              }
              app.wxRequest('POST', url2, data2, (res) => {
                console.log(res)
                // var that = this;
                wx.navigateTo({
                  url: "../hexiao-shop/hexiao-shop?ridos=" + that.data.ridos + '&order_id=' + that.data.order_id
                });
              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            },
            complete: function (e) {
              console.log(e)
            },
            'fail': function (res) {
              wx.showToast({
                title: "支付失败",
              })
              that.setData({
                isShowOpst: true,
                isShowOps: false
              })
              var data2 = {
                is_ok: 1,
                order_id: that.data.order_id,
                order_ids: that.data.order_ids
              }
              app.wxRequest('POST', url2, data2, (res) => {
                console.log(res)
                var that = this;

              }, (err) => {
                wx.showToast({
                  title: '提交失败',
                })
                console.log(err.errMsg)
              })
            }
          })
        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
          console.log(err.errMsg)
        })
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    } else if (this.data.ridos == 2) {
      console.log(app.globalData.all_price)
      // if (app.globalData.all_price >= this.data.count_pick) {
      let url = app.globalData.url + '/api/index/addOrder3';
      let data = {
        user_id: app.globalData.user_id,
        product_id: this.data.id,
        product_status: this.data.ids,
        // subscribe_day: this.data.op,
        // subscribe_time: this.data.startDate + '-' + this.data.end,
        order_price: this.data.count_pick,
        product_num: this.data.num,
        product_price: this.data.money,
        buy_status: this.data.ridos,
          shop_id: app.globalData.shop_id
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        var that = this;
        if (res.code == 1) {
          this.setData({
            order_id: res.data.order_id,
            order_no: res.data.order_no
          })
          wx.navigateTo({
            url: "../hexiao-shop/hexiao-shop?ridos=" + this.data.ridos + '&order_id=' + that.data.order_id + '&order_no=' + that.data.order_no
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',

        })
        console.log(err.errMsg)
      })
      // } 
      // else {
      //   wx.showToast({
      //     title: '余额不足！',
      //     icon: 'none'
      //   })
      // }

    } else if (this.data.ridos == 3) {
      let url = app.globalData.url + '/api/index/addOrder3';
      let data = {
        user_id: app.globalData.user_id,
        product_id: this.data.id,
        product_status: this.data.ids,
        // subscribe_day: this.data.op,
        // subscribe_time: this.data.startDate + '-' + this.data.end,
        order_price: this.data.count_pick,
        product_num: this.data.num,
        product_price: this.data.money,
        buy_status: this.data.ridos
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
        var that = this;
        if (res.code == 1) {
          this.setData({
            order_id: res.data.order_id,
            order_no: res.data.order_no
          })
          wx.navigateTo({
            url: "../hexiao-shop/hexiao-shop?ridos=" + this.data.ridos + '&order_id=' + that.data.order_id + '&order_no=' + that.data.order_no
          });
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }

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
    wx.showLoading({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    getOpenid(that)
    this.setData({
      ridos: '',
      isGuan: false
    })
    wx.hideLoading()
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
    wx.showLoading({
      title: '加载中',
    })
    wx.hideLoading()
    this.onLoad()
    wx.stopPullDownRefresh();
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

function getOpenid(that) {
  var url = app.globalData.url + '/api/index/getOpenid';
  var url1 = app.globalData.url + '/api/user/getUserInfo';
  var url2 = app.globalData.url + '/api/user/addUser';
  // var url = 
  console.log(that)
  var params = {};
  params.appId = 'wxf90793b6b6ec6236';
  console.log(params.appId);
  var wxlogin = httpUtils.httpPromise(wx.login);
  wxlogin().then(function (res) {
    console.log(res)
    params.code = res.code;
    app.wxRequest('POST', url, params, (res) => {
      console.log(res)
      // var that = this;
      app.globalData.openId = res.data.openid
      that.setData({
        session_key: res.data.session_key
      })
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {

          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          app.globalData.all_price = res.data.all_price
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            all_price: res.data.all_price
          })
        }
        if (res.code == '0') {
          console.log(app.globalData.userInfo)
          // var params1 = {

          // };
          app.globalData.head_img = app.globalData.userInfo.avatarUrl
          params.openid = app.globalData.openId;
          params.headimg = app.globalData.userInfo.avatarUrl;
          params.user_name = app.globalData.userInfo.nickName;
          params.sex = app.globalData.userInfo.gender;
          console.log(params.headimg)
          console.log(params.user_name)
          app.wxRequest('POST', url2, params, (res) => {
            console.log(res)
            app.wxRequest('POST', url1, params, (res) => {
              console.log(res)
              app.globalData.user_id = res.data.id
              app.globalData.user_name = res.data.name
              app.globalData.head_img = res.data.head_img
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }, (err) => {
            wx.showToast({
              title: '提交失败',
            })
            console.log(err.errMsg)
          })
        }

      }, (err) => {
        wx.showToast({
          title: '提交失败',
        })
        console.log(err.errMsg)
      })
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    var params1 = {
      openid: app.globalData.openId
    }


  })

}