import request from '~/utils/request';

// 获取地区码表
export function findProvCode(data) {
  return request.http(
    'get', '/user/contact/findProvCode', data, 0, {}
  );
}

// 获取购物车列表
export function getShoppingCarts(data) {
  return request.http(
    'get', '/shopping/cart/info', data, 0, {}
  );
}

// 购物车信息编辑
export function cartEdit(data) {
  return request.http(
    'post', '/shopping/cart/edit', data, 1, {}
  );
}

// 购物车点击结算
export function orderBalance(data) {
  return request.http(
    'get', '/shopping/cart/confirm/validate', data, 0, {}
  );
}

// 购物车删除商品
export function cartDele(data) {
  return request.http(
    'post', '/shopping/cart/dele', data, 1, {}
  );
}

// 确认订单订单查询
export function confirmOrder(data) {
  return request.http(
    'get', '/shopping/cart/confirm/order', data, 0, {}
  );
}

// 获取收货地址列表
export function getContactList(data) {
  return request.http(
    'get', '/user/contact/list', data, 0, {}
  );
}

// 确认订单新增、编辑收货地址
export function contactEdit(url, data) {
  return request.http(
    'post', url, data, 1, {}
  );
}

// 删除收货地址
export function contactDele(data) {
  return request.http(
    'get', '/user/contact/dele', data, 0, {}
  );
}

// 选择收货地址
export function contactSelectDefault(data) {
  return request.http(
    'post', '/shopping/cart/selectDefault', data, 1, {}
  );
}

// 创建订单
export function createOrder(data) {
  return request.http(
    'post', '/order/createOrder', data, 1, {}
  );
}

// 验签公共函数 post
export function getSignGet(url, data) {
  return request.http(
    'get', url, data, 0, {}
  );
}

// 验签公共函数 get
export function getSignPost(url, data) {
  return request.http(
    'post', url, data, 1, {}
  );
}

// 支付方法
export function paymentPay(data) {
  return request.http(
    'post', '/payment/pay', data, 1, {}
  );
}

// 加入购物车接口
export function cartAdd(data) {
  return request.http(
    'post', '/shopping/cart/add', data, 1, {}
  );
}
// 店铺主页全部商品分类
export function pcPartyProductCategorys(data) {
  return request.http(
    'get', '/product/category/pcPartyProductCategorys', data, 0, {}
  );
}
// 获取店铺信息
export function getShopInfo(data) {
  return request.http(
    'get', '/user/shop/getShopInfo', data, 0, {}
  );
}

