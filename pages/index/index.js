
var app = getApp()
var httpUtils = require('../../js/httpUtils.js');
var Map = require('../../js/qqmap-wx-jssdk');
var QQMapWX = require('../../js/qqmap-wx-jssdk.min.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    // selected: 0,
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isUser: false,
    isSiuser:false,
    isSiuseradd:false,
    locationadd:false,
    pickerMaterielData:[],
    op:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    getLocation(that)
    let url = app.globalData.url + '/api/index/getAllShop';
    console.log(url)
    let data = {

    };
    console.log(data)
    var that = this;
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      var pickerMateriel = that.data.pickerMaterielData
    
        that.setData({
          pickerMaterielData: pickerMateriel.concat(res.data)
        })
      
      
      console.log(that.data.pickerMaterielData)
    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
    setTimeout(function () {
      if (app.globalData.userInfo == null) {
        that.setData({
          hasUserInfo: false,
          isUser: false
        })
      }
    }, 1000)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isUser: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isUser: true
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
            isUser: true
          })
        }
      })
    }
    getOpenid(that)
   
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
          isUser: true,
          headimg: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      },
      fail: function () { }
    })

    getOpenid(that)
  },
  ggopfn:function(e){
    this.setData({
        isSiuser: false
    })
  },
  bindPickerChange: function (e) {
   this.setData({
     idx: e.detail.value
   })
   console.log(this.data.idx)
    console.log(this.data.pickerMaterielData[this.data.idx].shop_name)
    this.setData({
      op: true
    })
    console.log(this.data.materialItems)
    var that = this;
    getOpenid(that)
   
   
  },
  clickFn:function(e){
    let url = app.globalData.url + '/api/index/getAllShop';
    console.log(url)
    let data = {
   
    };
    console.log(data)
    var that =this;
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.code == 1) {
        let url = app.globalData.url + '/api/User/editUser';
        console.log(url)
        let data = {
          user_id: app.globalData.user_id,
          shop_id: res.data.shop_id
        };
        console.log(data)
        app.wxRequest('POST', url, data, (res) => {
          console.log(res)
      
          if (res.code == 1) {


          } else {

          }

        }, (err) => {
          wx.showToast({
            title: '提交失败',
          })
          console.log(err.errMsg)
        })
     
        that.setData({
         
        })
      } else {
       
      
      }

    }, (err) => {
      wx.showToast({
        title: '提交失败',
      })
      console.log(err.errMsg)
    })
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
            let url = app.globalData.url + '/api/User/editUser';
            console.log(url)
            let data = {
              user_id: app.globalData.user_id,
              phone: res.data.phone.phoneNumber,
            };
            console.log(data)
            app.wxRequest('POST', url, data, (res) => {
              console.log(res)
              if (res.code == 1) {
                getOpenid(that)
                wx.showToast({
                  title: '获取成功',
                  // icon: 'none'
                })
                that.setData({
                  isSiuser: false,
                  // isadd:true
                })
              } else {
                that.setData({
                  isSiuser: true,
                  // isadd:false
                })
                wx.showToast({
                  title:'获取失败',
                  icon: 'none'
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

        }

      },

      fail: function () {

        console.log("session_key 已经失效，需要重新执行登录流程");

        that.wxlogin(); //重新登录

      }

    });



  },

  chuFn:function(e){
    wx.navigateTo({
      url: "../vipFn-index/vipFn-index"
    });
  
  },
  statusFn:function(e){
    wx.showToast({
      title: '暂未开放',
      icon:'none'
    })
  },
  changFn: function (e) {
    wx.showToast({
      title: '暂未开放',
      icon: 'none'
    })
  },
  tueFn: function (e) {
    wx.showToast({
      title: '暂未开放',
      icon: 'none'
    })
  },
  goshop:function(e){
    var that = this;
    getOpenid(that)
    if (!this.data.hasUserInfo){
      wx.showToast({
        title: '请先授权登陆',
        icon:'none'
      })
      return;
    }
    if (!this.data.op){
      wx.showToast({
        title: '需要先绑定门店才可以进行购票',
        icon: 'none',
        duration: 3000
      })
      // setTimeout(function () {
      //   that.setData({
      //     isSiuser: true
      //   })
      // }, 2500)
      return;
    }
    if (this.data.isphone_user == 1){
      wx.showToast({
        title: '需要先授权手机号才可以进行购票',
        icon:'none',
        duration:3000
      })
      var that = this
      setTimeout(function(){
        that.setData({
          isSiuser:true
        })
      },2500)
    }else{
      wx.navigateTo({
        url: "../shop/shop"
      });
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
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 500
    })
    var that = this
    // that.onLoad()
    getLocation(that);
    getOpenid(that)
    console.log(this.data.province)
    console.log(this.data.locationName)
    this.setData({
      user_id: app.globalData.user_id
    })
   
  console.log(this.data.user_id)
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
    // this.onLoad()
    this.onShow()
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
    
  },
  ggopfns:function(e){
    this.setData({
      isSiuseradd:false
    })
  },
  adderFn: function (e) {
    var that = this;
    console.log(11)
    getLocation(that)
  },
})

function getLocation(that) {
  console.log(111)
  let QQmap = new QQMapWX({
    key: 'CO5BZ-3DPCX-PSG44-7O2NN-UYBQJ-MGFXE' // 必填
  });

  // 获取当前的地理位置
  wx.getLocation({
    type: 'gcj02',
    altitude: true,
    success: function (res) {
      console.log(res)
      QQmap.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },

        success: function (res) {
          
          console.log(res)
          app.globalData.city = res.result.address;
          that.setData({
            locationadd: false,
            isSiuseradd:false,
            locationName: res.result.address,
            province: res.result.address_component.province,
            city: res.result.address_component.city,
            area: res.result.address_component.district
          })
          app.globalData.province = res.result.address_component.province
          app.globalData.city = res.result.address_component.city
          app.globalData.area = res.result.address_component.district
          app.globalData.latitude = res.result.ad_info.location.lat;
          app.globalData.longitude = res.result.ad_info.location.lng;
          console.log(that.data.province)
          console.log(app.globalData.province)
          getOpenid(that)
          // 添加位置信息到app.globalData
          //默认加载综合排序
          // req.getshortDistance(that, page, pageSize);
          // 发送请求
          // let url = constantFields.GETLOCATION;
          let data = {
            'lat': app.globalData.latitude,
            'lng': app.globalData.longitude
          };
        },
        fail: function (res) {
          console.log(res)
          // wx.showToast({
          //   title: '获取位置失败',
          //   icon: 'success',
          //   duration: 2000
          // })
          that.setData({
            locationName: "重新定位"
          })
        }
      })
    },
    fail: function (res) {
      console.log(res)
      // wx.showToast({
      //   title: '获取位置失败',
      //   icon: 'success',
      //   duration: 2000
      // })
      that.setData({
        locationNameadd: "点击绑定门店",
        locationadd:true
      })
    }
  })
}
function getOpenid(that) {
  var url = app.globalData.url + '/api/index/getOpenid';
  var url1 = app.globalData.url + '/api/user/getUserInfo';
  var url2 = app.globalData.url + '/api/user/addUser';
  let url0 = app.globalData.url + '/api/user/getNowShop';
  console.log(url0)
  console.log(that.data.province)
  console.log(app.globalData.province)
  // app.globalData.province
  
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
      that.setData({
        session_key: res.data.session_key
      })
      // var that = this;
      app.globalData.openId = res.data.openid
      params.openid = res.data.openid;
      app.wxRequest('POST', url1, params, (res) => {
        console.log(res)
        if (res.code == '1') {
      
          if (!res.data.shop_id){
            // getLocation(that)
            that.setData({
              isSiuseradd:true,
             
            })
          }else{
            app.globalData.shop_id = res.data.shop_id
            that.setData({
             
              isSiuseradd: false,
               shop_name: res.data.shop_name,
               op:true
            })
            let url0 = app.globalData.url + '/api/index/getAllRank2';
            console.log(url0)
            let data0 = {
              limit: 100,
              shop_id: app.globalData.shop_id
            };
            console.log(data0)
            app.wxRequest('POST', url0, data0, (res) => {
              console.log(res)

              var that = this;
              if (res.code == 1) {
                that.setData({
                  movieList: res.data.rows,

                })
                if (res.data.my.all_tim) {
                  that.setData({
                    all_tim: res.data.my.all_tim,
                    rank: res.data.my.rank,
                    user_name: res.data.my.user_name,
                    create_time: res.data.my.create_time,

                  })
                } else {
                  that.setData({
                    all_tim: '暂无',
                    rank: '暂无',
                    // user_name: res.data.my.user_name,
                    create_time: '暂无',
                  })
                }
              }
            }, (err) => {
              wx.showToast({
                title: '提交失败',
              })
              console.log(err.errMsg)
            })
          }
          if (!res.data.phone ||res.data.phone=="" ){
            that.setData({
              isSiuser:true,
              isphone_user:1

            })
          }else{
            that.setData({
              isSiuser: false,
              isphone_user: 0
            })
          }
          
          app.globalData.user_id = res.data.id
          app.globalData.user_name = res.data.name
          app.globalData.head_img = res.data.head_img
          that.setData({
            headimg: res.data.head_img,
            nickName: res.data.name,
            birthday: res.data.birthday,
            phone: res.data.phone,
            real_name: res.data.real_name,
            one: res.data.one,
            two: res.data.two,
            uid: app.globalData.user_id,
            user_id: res.data.id
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

              that.setData({
                user_id:res.data.id,
                isphone_user: 1
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
        }
        if ( that.data.locationadd) {
          let url = app.globalData.url + '/api/User/editUser';
          console.log(url)
          let data = {
            user_id: app.globalData.user_id,
            shop_id: that.data.pickerMaterielData[that.data.idx].shop_id
          };
          console.log(data)
          app.wxRequest('POST', url, data, (res) => {
            console.log(res)
      
            if (res.code == 1) {
              that.setData({
                shop_name:app.globalData.shop_name
              })

            } else {

            }

          }, (err) => {

            console.log(err.errMsg)
          })
        }
        if (!that.data.locationadd){
          let data0 = {
            province: that.data.province,
            city: that.data.city,
            area: that.data.area
          };
          console.log(data0)
          app.wxRequest('POST', url0, data0, (res) => {
            console.log(res)
            if (res.code == 0) {

            }
            console.log(that.data.locationadd)
            if (res.code == 1 && !that.data.locationadd) {
              let url = app.globalData.url + '/api/User/editUser';
              console.log(url)
              let data = {
                user_id: app.globalData.user_id,
                shop_id: res.data.shop_id
              };
              console.log(data)
              app.wxRequest('POST', url, data, (res) => {
                console.log(res)
                var that = this;
                if (res.code == 1) {


                } else {

                }

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

