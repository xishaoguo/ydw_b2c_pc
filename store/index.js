

import { setCookie } from '~/utils/storage';
// getCookie('userInfo')
const state = () => ({
  userToken: '', // 用户token
  userInfo: '', // 用户信息
});

const getters = {
  getUserToken: (state) => () => {
    return state.userToken;
  },
  getUserInfo: (state) => () => {
    return JSON.parse(decodeURIComponent(state.userInfo));
  }
};

const mutations = {
  SET_USER_TOKRN(state, value) {
    state.userToken = value;
    setCookie('userToken', value);
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
    setCookie('userInfo', userInfo);
  },
};

const actions = {
  setUserToken({ commit }, val) {
    commit('SET_USER_TOKRN', val);
  },
  setUserInfo({ commit }, val) {
    let userInfo = JSON.stringify(val);
    commit('SET_USER_INFO', userInfo);
  },
  nuxtServerInit({ commit, state }, { req }) {
    // console.log(req.headers.cookie);
    if (req.headers.cookie) {
      let cookieArr = req.headers.cookie.split(';');
      let obj = {};
      cookieArr.forEach((i) => {
        let arr = i.split('=');
        obj[arr[0].trim()] =arr[1];
      });
      commit('SET_USER_INFO', obj['userInfo']);
      commit('SET_USER_TOKRN', obj['userToken']);
    }

  },
};
export default {
  state,
  getters,
  mutations,
  actions
};