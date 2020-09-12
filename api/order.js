import request from '~/utils/request';


// 我的订单列表
export function orderList(data) {
  return request.http(
    'get', '/order/orderList', data, 0, {}
  );
}

// 取消订单
export function cancelOrder(data) {
  return request.http(
    'post', '/order/cancelOrder', data, 1, {}
  );
}

// 订单详情
export function orderInfo(data) {
  return request.http(
    'get', '/order/info', data, 0, {}
  );
}

// 申请退款 /退款
export function returnProduct(data) {
  return request.http(
    'post', '/order/return/returnProduct', data, 1, {}
  );
}

// 申请退款
export function confirmPro(data) {
  return request.http(
    'post', '/order/confirmPro', data, 1, {}
  );
}

// 快递单号
export function addShipment(data) {
  return request.http(
    'post', '/order/shipment/addShipment', data, 1, {}
  );
}