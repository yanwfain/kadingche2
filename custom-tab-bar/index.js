Component({
  data: {
    selected: 0,
    color: "#E1FF37",
    selectedColor: "#E1FF37",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/001.png",
      selectedIconPath: "/images/001.png",
      text: "首页"
    },
    {
      pagePath: "/pages/sotrtFn-index/sotrtFn-index",
      iconPath: "/images/002.png",
      selectedIconPath: "/images/002.png",
      text: "排位",
    },
    {
      pagePath: "/pages/Index-ime/Index-ime",
      iconPath: "/images/003.png",
      selectedIconPath: "/images/003.png",
      text: "车手",
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})