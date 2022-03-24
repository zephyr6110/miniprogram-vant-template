// pages/login/index.js
import { login, getToken, sendCode } from '../../api/user';

// 获取应用实例
const app = getApp();

Page({
  data: {
    mobile: '',
    code: '',

    sendBtnText: '获取验证码',
    timer: 0,

    agree: false,

    isSubmitLoading: false
  },
  onLoad() {},

  sendCode() {
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请先填写手机号',
        icon: 'none',
        duration: 1500
      });

      return;
    }

    wx.showLoading({
      title: '加载中',
      mask: true
    });

    let params = {
      mobile: this.data.mobile
    };
    sendCode(params)
      .then((res) => {
        wx.hideLoading();

        wx.showToast({
          title: res.data.message || '发送成功',
          icon: 'none',
          duration: 1500
        });

        let num = 60;
        let timer = setInterval(() => {
          if (num <= 0) {
            clearInterval(timer);

            this.setData({
              timer: 0,
              sendBtnText: '获取验证码'
            });
          } else {
            this.setData({
              timer: timer,
              sendBtnText: `重新发送(${num}秒)`
            });
          }

          num--;
        }, 1000);
      })
      .catch((error) => {
        console.log(error);

        wx.showToast({
          title: error.message || '提交失败',
          icon: 'none',
          duration: 1500
        });
      });
  },

  onSubmitBtnTap() {
    if (this.data.mobile == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      });
      return;
    }

    if (this.data.isSubmitLoading) {
      return;
    }

    this.setData({
      isSubmitLoading: true
    });

    let params = {
      mobile: this.data.mobile,
      code: this.data.code,
      unionid: app.globalData.unionid,
      miniProgramOpenId: app.globalData.miniProgramOpenid
    };
    login(params)
      .then(({ data }) => {
        app.globalData.userInfo = data[0];

        // 获取Token
        const params2 = {
          requestType: 2,
          union_id: app.globalData.unionid
        };
        getToken(params2).then(({ data }) => {
          app.globalData.token = data.token;
          app.globalData.isAuthLoading = false;
          app.globalData.isLogin = true;

          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500,
            mask: true
          });

          wx.switchTab({
            url: '/pages/index/index'
          });
        });
      })
      .catch((error) => {
        this.setData({
          isSubmitLoading: false
        });

        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 1500
        });
      });
  }
});
