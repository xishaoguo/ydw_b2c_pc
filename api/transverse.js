import request from '~/utils/request';

/**
 * 药兜好店
 * @param {Object}} data
 */
export function storeList(data) {
  return request.http(
    'get', '/supplier/h5/index/storeList', data, 0, {}
  );
}