<template>
  <div class="shortcut-container">
    <div class="shortcut-box yd-container flex-between">
      <ul class="flex-box">
        <!-- 替换用户名称 -->
        <li v-if="!userInfo">
          欢迎来到药兜网
        </li>
        <li v-else>
          你好:{{ userInfo.phone }}，欢迎回来
        </li>
        <!-- 隐藏 -->
        <li v-if="!userInfo">
          <nuxt-link to="/login">
            <span class="color-00A47C">请登录</span>
          </nuxt-link>
        </li>
        <!-- 隐藏 -->
        <li v-if="!userInfo">
          <nuxt-link to="/login">
            免费注册
          </nuxt-link>
        </li>
        <li v-if="userInfo" class="color-00A47C" @click="logOut()">
          [安全退出]
        </li>
      </ul>
      <ul class="flex-box">
        <li class="shopping-cart">
          <nuxt-link to="/shoppingCart">
            购物车(0)
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/orderPage">
            我的订单
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/user/baseInfo">
            用户中心
          </nuxt-link>
        </li>
        <li>商家中心</li>
        <li class="hover-box">
          手机版
          <div class="qr-code">
            <div class="qr-box" />
            <img src="../assets/img/gzh_code.png" alt="">
            <p class="font-px12 color-666">
              关注药兜网公众号
            </p>
            <img src="../assets/img/android_code.png" alt="" style="margin-top:10px;">
            <p class="font-px12 color-666">
              药兜网App<br>（安卓）
            </p>
            <img src="../assets/img/ios_code.png" alt="" style="margin-top:10px;">
            <p class="font-px12 color-666">
              药兜网App（IOS）
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Shortcut',
  components: {},
  data() {
    return {
      userInfo: null,
    };
  },
  watch: {},
  created() {},
  mounted() {
    if (this.$store.getters.getUserToken()) {
      this.userInfo = this.$store.getters.getUserInfo();
    }
  },
  methods: {
    ...mapActions(['setUserToken', 'setUserInfo']),
    // 安全退出
    logOut() {
      this.setUserToken('');
      this.setUserInfo(null);
      this.$router.push({ path: '/login' });
    }
  }
};
</script>

<style scoped lang="scss">
.shortcut-container {
  background: rgba(246, 246, 246, 1);
  .shortcut-box {
    & > ul {
      .shopping-cart {
        background-image: url('~assets/img/shopping_cart_icon.png');
        background-size: 16px;
        background-repeat: no-repeat;
        padding-left: 24px;
        background-position: 0;
      }
      & li {
        margin-right: 20px;
        padding: 6px 0;
        cursor: pointer;
        &:hover {
          color: #00A47C;
        }
        &:hover a{
          color: #00A47C;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      & li:nth-child(1) {
        cursor: auto;
        &:hover {
          color: #666;
        }
      }
      .hover-box {
        position: relative;
        &:hover .qr-code {
          display: block;
        }
        .qr-box {
          height: 100px;
          position: absolute;
          width: 100%;
          left: 0;
          top: -13px;
          &::before {
            content: '';
            display: block;
            position: absolute;
            top: 15px;
            left: 118px;
            transform: rotate(45deg) translateX(-50%);
            box-shadow: -4px -4px 5px -3px rgba(0, 0, 0, 0.1);
            z-index: 1;
            border-top: 9px solid white;
            border-left: 9px solid white;
            border-right: 9px solid rgba(0,0,0,0);
            border-bottom: 9px solid rgba(0,0,0,0);
          }
        }
        .qr-code {
          display: none;
          width: 140px;
          height: 430px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          text-align: center;
          padding: 10px 20px 20px 20px;
          position: absolute;
          top: 40px;
          left: -104px;
          z-index: 2;
          & > img {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            display: block;
          }
        }
      }
    }
  }
}
</style>
