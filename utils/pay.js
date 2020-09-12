import { getSignGet, getSignPost, paymentPay } from '~/api/shopping';
/**
 *  支付验签调用
 *  @param {string} methods  请求方式
 *  @param {string} url  请求接口
 *  @param {obj} data  请求参数
 *  @param {obj} cb  回调函数
 *
 */
export async function getSignCommon(methods, url, data, cb) {
  if (methods == 'get') {
    getSignGet(url, data).then(res => {
      if (res.code == '0000') {
        if (cb) {
          cb(res.data);
        }
      } else {
        console.log(res);
      }
    });
  } else if (methods == 'post') {
    getSignPost(url, data).then(res => {
      if (res.code == '0000') {
        if (cb) {
          cb(res.data);
        }
      } else {
        console.log(res);
      }
    });
  }
}

/**
 *  支付调用
 *  @param {obj} obj  支付请求参数
 *  @param {0 一般商品 1 统计商品} 商品类型
 */
// extend_params:{//支付扩展参数
//     openId:'',//公众号支付时（prodductCode =WXPayJsapi ）需要传入
//     body:'', //支付描述
//     fqNum:'', //花呗分期时（prodductCode =AliPayAppHB||AliPayWapHB）需要传入
//   },
export async function payCommon(obj) {
  paymentPay({
    payType: obj.payType, // required 支付类型: WXPay--微信支付;AliPay --阿里支付;
    productCode: obj.productCode, // required 支付渠道编码:CodeWxPayService--微信扫码支付;  AliPayPc--支付宝扫码支付
    amount: obj.amount, // required 支付金额
    orderId: obj.orderId, // required 订单编号
    sysCode: obj.sysCode, // required 系统应用编码
    returnUrl: obj.returnUrl, // 同步回调地址
    notifyUrl: obj.Notify, // required 异步回调地址
    sign: obj.sign, // required 请求签名
    extend_params: JSON.stringify(obj.extend_params) == '{}' ? undefined : JSON.stringify(obj.extend_params)
  }).then(data => {
    if (data.code == '0000') {
      // 如果是H5支付 后台返回json 表单数据
      var payForm = data.payForm;
      if (obj.productCode == 'AliPayPc') { // 支付宝扫码支付
        console.log(payForm);
        var parent = document.getElementById('payDiv');
        if (parent) { // 存在form时删除form
          parent.parentNode.removeChild(parent);
        }
        var formDiv = document.createElement('div'); // 动态创建div
        formDiv.id = 'payDiv';
        formDiv.innerHTML = payForm; // 把表单数据插入到div中
        document.body.appendChild(formDiv); // 将div插入到body中
        setTimeout(() => {
          document.forms['payForm'].submit(); // 提交表单数据
        }, 200);
        if (obj.productCode == 'CodeWxPayService') {
          console.log('微信扫码支付');
        }
      }
    }
  });
}

