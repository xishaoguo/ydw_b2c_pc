<!-- 登录注册 -->
<template>
  <div class="login-container">
    <div class="login-box">
      <!-- logo -->
      <div class="login-logo">
        <img src="../../assets/img/logo.png" alt="药兜网">
      </div>
      <p class="font-px14 color-666">
        绑定手机号
      </p>
      <!-- 手机号 -->
      <div class="login-phone">
        <span>+86</span>
        <input type="tel" placeholder="手机号">
      </div>
      <!-- 验证码 -->
      <div class="login-code">
        <input type="tel" placeholder="短信验证码">
        <span>获取验证码</span>
      </div>
      <!-- 登录按钮 -->
      <div class="login-btn">
        登录
      </div>
    </div>
  </div>
</template>

<script>
import { fetchList } from '~/api/home';
export default {
  layout: 'customize',
  name: 'Login',
  async asyncData(context) {
    let [res2] = await Promise.all([
      // 获取数据
      // context.$axios
      //   .post('/mall/activity', {
      //     pageIndex: 1,
      //     pageSize: 20,
      //     type: 'PROMO'
      //   })
      //   .then((res) => {
      //     console.log('这是nuxt--axios');
      //     return res;
      //   }),
      // 获取数据
      fetchList({
        pageIndex: 1,
        pageSize: 20,
        type: 'PROMO'
      }).then((res) => {
        console.log('这是axios');
        return res;
      })
    ]);
    return {
      friendList: res2.data
    };
  },
  data() {
    return {

    };
  },
  // SEO优化
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  head() {
    return {
      title: '药兜网-登录',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            '很多登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            '很多登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录登录'
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  width: 100vw;
  background: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box{
  width: 800px;
  height: 481px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}
.login-logo{
  height: 40px;
  img{
    height: 100%;
  }
  margin-bottom: 32px;
}
.login-phone{
  width: 312px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  span{
    width: 60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333333;
    border-right: 1px solid rgba(0, 0, 0, 0.15)
  }
  input{
    flex: 1;
    padding: 0px 10px;
    font-size: 14px;
    color: #333333;
  }
}
.login-code{
  width: 312px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  span{
    width: 106px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #FF7900;
    border-left: 1px solid rgba(0, 0, 0, 0.15)
  }
  input{
    flex: 1;
    padding: 0px 10px;
    font-size: 14px;
    color: #333333;
  }
}
.login-btn{
  width: 312px;
  height: 40px;
  background: #00A47C;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  line-height: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.login-xieyi{
  font-size: 12px;
  color: #999999;
  display: flex;
  align-items: center;
}
.check-xieyi{
  width: 16px;
  height: 16px;
  background: #FFFFFF;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-right: 4px;
}
.check-xieyi-select{
  border: 0 !important;
  background: url('../../assets/img/common/checkbox.png');
}
.login-other{
  font-size: 14px;
  color: #999999;
  margin-top: 35px;
  .other-img{
    display: flex;
    justify-content: center;
    div{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-top: 10px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
}
</style>
