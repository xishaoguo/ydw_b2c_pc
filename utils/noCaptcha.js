const noCaptcha = function() {
  return new Promise((resolve, reject) => {
    var nc_token = ['CF_APP_1', (new Date()).getTime(), Math.random()].join(':');
    // eslint-disable-next-line no-undef
    let nc = NoCaptcha.init({
      renderTo: '#captcha',
      appkey: 'FFFF0N0000000000962F', // 这个参数需要后台返回
      scene: 'nc_login', // 这个也是
      token: nc_token, // 这个同理
      trans: { 'key1': 'code0' },
      // elementID: ["usernameID"],
      is_Opt: 0,
      language: 'cn',
      timeout: 10000,
      retryTimes: 5,
      apimap: {
        // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
        // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
      },
      bannerHidden: true, // 验证通过后，验证码组件是否自动隐藏，默认不隐藏（false）
      initHidden: false,
      callback: function(data) {
        if (data.code === 0) {
          data.token= nc_token;
          data.scene = this.scene;
          resolve(data);
        } else {
          reject(data);
        }
      },
      error: function(s) {
        reject(s);
      }
    });
    // eslint-disable-next-line no-undef
    NoCaptcha.setEnabled(true);
    nc.reset();// 请务必确保这里调用一次reset()方法
    // eslint-disable-next-line no-undef
    NoCaptcha.upLang('cn', {
      'LOADING': '加载中...', // 加载
      'SLIDER_LABEL': '请向右滑动验证', // 等待滑动
      'CHECK_Y': '验证通过', // 通过
      'ERROR_TITLE': '非常抱歉，这出错了...', // 拦截
      'CHECK_N': '验证未通过', // 准备唤醒二次验证
      'OVERLAY_INFORM': '经检测你当前操作环境存在风险，请输入验证码', // 二次验证
      'TIPS_TITLE': '验证码错误，请重新输入'// 验证码输错时的提示
    });
  });
};

export default noCaptcha;