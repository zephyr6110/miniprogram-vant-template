// 获取应用实例
const app = getApp();

Component({
  data: {
    visible: true,
    selected: 1,
    color: '#1e1e1e',
    selectedColor: '#ff505e',
    list: [
      {
        selectedIconPath: '../images/home_active.png',
        iconPath: '../images/home.png',
        pagePath: '/pages/index/index',
        text: '首页'
      },
      {
        selectedIconPath: '../images/user_active.png',
        iconPath: '../images/user.png',
        pagePath: '/pages/user/index',
        text: '个人中心'
      }
    ],

    count: 0
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;

      if (app.globalData.isAuthLoading) {
        return;
      }

      if (!app.globalData.isLogin) {
        wx.navigateTo({
          url: '/pages/login/index'
        });
        return;
      }

      wx.switchTab({
        url
      });

      this.setData({
        selected: data.index
      });
    }
  }
});
