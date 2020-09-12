import request from '~/utils/request';

// 用户登录接口
export function userLogin(data) {
  return request.http(
    'post', '/user/pc/codeLogin', data, 1, {}
  );
}

// 这个是需要走阿里校验的发送验证码接口
export function sendAuthCode(data) {
  return request.http(
    'post', '/user/sendCode/authCode', data, 1, {}
  );
}
