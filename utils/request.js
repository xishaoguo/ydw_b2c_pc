


// // export default service
// /* eslint-disable no-empty */
import axios from 'axios';
import { Message } from 'element-ui';  // 引用饿了么UI消息组件
import { getCookie } from '~/utils/storage';
import qs from 'qs';
let baseurl = process.env.API_URL;
const service = axios.create({
  // baseURL node环境的不同，对应不同的baseURL   withCredentials  是否允许携带cookie   timeout请求的超时时间
  baseURL: baseurl,
  withCredentials: true,
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    // if (process.browser) { // 判断是否是客户端
    //   this.$loading.show() // 全局loading
    // }
    config.headers.Accept = 'application/json';
    config.responseType = 'json';
    let token = getCookie('userToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  response => {
    // if (response.status === 200) {
    //   return Promise.resolve(response.data);
    // } else {
    //   return Promise.reject(response.data);
    // }
    return Promise.resolve(response.data);
  },
  error => {
    Message({
      message: '网络异常，请刷新页面',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

// export default service
/**
 *
 * @param method 请求的方法
 * @param url 请求的url
 * @param data 请求的数据
 * @param isJson 请求的数据是否是json
 * @returns {AxiosPromise}
 */
function httpsomething(method, url, data, isJson, config) {
  let formdata = data;
  if (method.toLowerCase() === 'post') {
    if (!isJson) {
      formdata = qs.stringify(data);
    } else {
      formdata = JSON.stringify(data);
    }
  } else {
    if (!isJson) {
      formdata = qs.stringify(data);
      if (formdata) {
        url = url + '?' + formdata;
      }
    } else {
      formdata = JSON.stringify(data);
    }
  }
  return service({
    method: method,
    url: url,
    data: formdata,
    headers: {
      'Content-Type': isJson ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    config
  });
}
export default {
  http: async function(method, url, data, isJson, config) {
    try {
      let res = await httpsomething(method, url, data, isJson, config);
      return new Promise((resolve, reject) => {
        switch (res.code) {
        case '401':
          // 令牌为空
          if (res.msg !== null) {
            Message({
              message: res.msg,
              type: 'error',
              duration: 1500
            });
          } else {
            Message({
              message: '未知错误',
              type: 'error',
              duration: 3000
            });
          }
          break;
        case '1000':
          // 错误
          Message({
            message: res.msg,
            type: 'error',
            duration: 1500
          });
          break;
        default:
          resolve(res);
        }
        resolve(res);


        // if (res.code === 200) {
        //   // eslint-disable-next-line no-undef
        //   resolve(res);
        // }
        // else if (res.code === 2) {
        //   Message({
        //     message: res.message,
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   reject()
        // } else if (res.code === 3) {
        //   Message({
        //     message: res.message,
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   reject()
        // } else if (res.code === 2010) {
        //   Message({
        //     message: '登录已失效，需要重新登录',
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   localStorage.setItem('token', '')
        //   router.push({
        //     path: '/login'
        //   })
        //   reject()
        // } else if (res.code === -2) {
        //   Message({
        //     message: '系统异常',
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   reject()
        // } else {
        //   resolve(res)
        // }
      });
    } catch (err) {
      console.log(err.response.status);
    }
  }
};


/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
// import { Message } from 'element-ui';  // 引用饿了么UI消息组件
// import { getCookie } from '~/utils/storage';
// import axios from 'axios'; // 引用axios
// const service = axios.create({
//   baseURL: process.env.API_URL, // 所有异步请求都加上/api,nginx转发到后端Springboot
//   withCredentials: true, // send cookies when cross-domain requests
//   timeout: 30 * 1000 // request timeout
// });

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     let token = getCookie('userInfo');
//     if (token) {
//       config.headers['Authorization'] = token;
//     }
//     return config;
//   },
//   error => {
//     // do something with request error
//     console.log(error); // for debug
//     return Promise.reject(error);
//   }
// );

// // response interceptor
// service.interceptors.response.use(
//   /**
// 	 * If you want to get http information such as headers or status
// 	 * Please return  response => response
// 	 */

//   /**
// 	 * Determine the request status by custom code
// 	 * Here is just an example
// 	 * You can also judge the status by HTTP Status Code
// 	 */
//   response => {
//     // console.log('client===========',response.data)
//     // if (response.data && String(response.data.code) === '1000') {
//     //   if (response.data.msg == '无效的ssocode') {
//     //     store.dispatch('user/resetToken').then(() => {
//     //       Message({
//     //         message: '登录失效，请重新登录！',
//     //         type: 'error',
//     //         duration: 3 * 1000
//     //       });
//     //       window.location.href = `${location.origin}/#/login`;
//     //     });
//     //   } else {
//     //     Message({
//     //       message: response.data.msg,
//     //       type: 'error',
//     //       duration: 3 * 1000
//     //     });
//     //   }
//     // }
//     // if (response.data && String(response.data.code) === '1001') {
//     //   Message({
//     //     message: response.data.msg,
//     //     type: 'error',
//     //     duration: 3 * 1000
//     //   });
//     //   store.dispatch('user/resetToken').then(() => {
//     //     location.reload();
//     //   });
//     // }

//     // if (response.data && String(response.data.code) === '401') { // 401, token失效
//     //   store.dispatch('user/resetToken').then(() => {
//     //     window.location.href = `${location.origin}/#/login`;
//     //   });
//     // }
//     Message({
//       message: '喂喂喂，呼呼！！！',
//       type: 'error',
//       duration: 3 * 1000
//     });
//     return response.data;
//   },
//   error => {
//     console.log('err' + error); // for debug
//     // Message({
//     // 	message: error.message,
//     // 	type: 'error',
//     // 	duration: 5 * 1000
//     // })
//     return Promise.reject(error);
//   }
// );

// export default service; // 导出封装后的axios