import request from '~/utils/request';

/**
 * 获取商品信息
 * @param {Object}} data
 */
export function getProductDetails(data) {
  return request.http(
    'get', '/product/info', data, 0, {}
  );
}
/**
 * 获取商品详情
 * @param {Object} data
 */
export function selectContact(data) {
  return request.http(
    'get', '/product/selectContact', data, 0, {}
  );
}
