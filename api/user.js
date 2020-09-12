import request from '~/utils/request';

// 用户信息查询
export function getUserLoginId(data) {
  return request.http(
    'get', '/user/pc/baseInfo', data, 0, {}
  );
}

// 我的收藏
export function getCollectionInfo(data) {
  return request.http(
    'post', '/product/pharmacy/info', data, 1, {}
  );
}

// 取消收藏
export function getCollectionDelete(data) {
  return request.http(
    'post', '/product/pharmacy/delete', data, 1, {}
  );
}
// 浏览记录
export function getBrowseRecordList(data) {
  return request.http(
    'get', '/product/pharmacy/browseRecordList', data, 0, {}
  );
}

