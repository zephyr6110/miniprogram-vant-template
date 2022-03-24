// app.js
import Event from './utils/event.js';

// 发布/订阅模式来实现页面间通信(eventbus)
wx.event = new Event();

App({
  globalData: {
    token: null,
    isAuthLoading: true,

    unionid: '',
    miniProgramOpenid: '',

    userInfo: {},
    isLogin: false
  },
  onLaunch() {
    // 获取小程序更新机制兼容
    // this.autoUpdate();

    // 检查登录
    this.checkAuth();
  },
  autoUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            });
          });

          updateManager.onUpdateFailed(() => {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            });
          });
        }
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  },
  async checkAuth() {
    try {
      // 微信授权登录
      await this.miniprogramLogin();

      // 发送登录成功
      wx.event.emit('loginSuccess');
    } catch (error) {
      // console.log(error);

      // 发送登录失败
      wx.event.emit('loginFail');
    }

    this.globalData.isAuthLoading = false;
  },
  miniprogramLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: async (res) => {
          if (res.code) {
            // 引入API请求方法，不能在顶部引入，顶部引入时App未初始化
            const { miniprogramLogin, getToken } = require('./api/user');

            try {
              // 检查是否授权登录
              const params = {
                code: res.code
              };
              const result = await miniprogramLogin(params);
              const userInfo = result.data[0];
              this.globalData.userInfo = userInfo;

              // 获取Token
              const params2 = {
                requestType: 2,
                union_id: userInfo.unionid
              };
              const result2 = await getToken(params2);
              this.globalData.token = result2.data.token;
              this.globalData.isLogin = true;

              resolve(userInfo);
            } catch (error) {
              console.log('miniprogramLogin error:', error);

              if (error.data && error.data[0] && error.data[0].unionid) {
                const data = error.data[0];

                // 保存 unionid 和 miniProgramOpenid ，注册要使用
                this.globalData.unionid = data.unionid;
                this.globalData.miniProgramOpenid = data.miniProgramOpenid;
              }


              reject(error);
            }
          } else {

            reject(res);
          }
        }
      });
    });
  }
});
