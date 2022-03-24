const app = getApp();

const API_URL = '';

const request = (config) => {
  const defaults = {
    url: '',
    data: {},
    header: {
      authorization: 'Bearer ' + app.globalData.token
    },
    timeout: 10000,
    method: 'Get'
  };

  config = Object.assign(defaults, config);
  config.url = API_URL + config.url;
  // GET传入的是 params
  if (config.params) {
    config.data = config.params;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success: (response) => {
        const res = response.data;

        if (res.code == 0) {
          resolve(res);
        } else if (res.code) {
          reject(res);
        } else {
          reject({ code: response.statusCode, message: '网络开小差了，请联系客服' });
        }
      },
      fail: (error) => {
        reject({ code: -1, message: error.errMsg });
      }
    });
  });
};

module.exports = request;
