import request from '~/utils/request';

export function fetchList(data) {
  return request.http(
    'get', '/mall/activity', data, 0, {}
  );
}
/**
 * 首页全部商品分类
 * @param {Object} data
 */
export function categoryList(data) {
  return request.http(
    'get', '/product/category/categoryList', data, 0, {}
  );
}
/**
 * 首页轮播图、公告等接口
 * @param {Object} data
 */
export function homeBanner(data) {
  let params = '?typeIds=ROTATION_BANNER&typeIds=KING_KONG_ICON&typeIds=YDW_NEWS&typeIds=INDEX_BANNER_LEFT&typeIds=INDEX_BANNER_RIGHT&typeIds=INDEX_BANNER_R_UP&typeIds=INDEX_BANNER_R_DOWN';
  return request.http(
    'get', `/supplier/h5/index/banner/list${params}`, data, 0, {}
  );
}
/**
 * 首页获取楼层数据
 * @param {Object} data
 */
export function homeProductCategorys(data) {
  return request.http(
    'get', '/product/category/pcHomeProductCategorys', data, 0, {}
  );
}
/**
 * 首页获取热卖品牌
 * @param {Object} data
 */
export function brandList(data) {
  return request.http(
    'get', '/product/brands/list?pageIndex=1&pageSize=10', data, 0, {}
  );
}
/**
 * 查询楼层右侧商品列表
 * @param {Object} data
 */
export function esSearch(data) {
  return request.http(
    'get', '/es/esSearch', data, 0, {}
  );
}
/**
 * 热搜列表
 * @param {Object} data
 */
export function recordText(data) {
  return request.http(
    'get', '/product/getRecordText', data, 0, {}
  );
}
