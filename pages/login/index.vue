<!-- 登录注册 -->
<template>
  <div class="login-container">
    <div class="login-box">
      <!-- logo -->
      <div class="login-logo">
        <img src="../../assets/img/logo.png" alt="药兜网">
      </div>
      <!-- 手机号 -->
      <div class="login-phone">
        <span>+86</span>
        <input v-model="loginId" type="tel" placeholder="手机号" autocomplete="off" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" :maxlength="11" @input="clearPassword()">
      </div>
      <!-- 验证码 -->
      <div class="login-code">
        <input v-model="password" type="tel" placeholder="短信验证码" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" :maxlength="6">
        <button :disabled="isDisable" :style="{'color':isDisable?'#999999':'#00A47C'}" @click.prevent="mobliecode">
          {{ content }}
        </button>
      </div>
      <div id="captcha" class="captcha" />
      <!-- 登录按钮 -->
      <div v-if="isInfo" class="login-btn submitColor">
        登录
      </div>
      <div v-else class="login-btn" @click="submitUserLogin()">
        登录
      </div>
      <!-- 登录协议 -->
      <div class="login-xieyi">
        <span class="check-xieyi" :class="{'check-xieyi-select':isSelect}" @click="changeSelect()" />
        <span>同意并遵守</span>
        <span class="color-FF7900">&nbsp;药兜网用户服务协议&nbsp;</span>
        <span>与</span>
        <span class="color-FF7900">&nbsp;药兜网隐私权政策&nbsp;</span>
      </div>
      <!-- 其他方式登录 -->
      <div class="login-other">
        <p>其他方式登录</p>
        <div class="other-img">
          <div @click="WXLogin()">
            <img src="../../assets/img/wx-logo.png" alt="药兜网">
          </div>
        </div>
      </div>
    </div>
    <!-- 微信登录 -->
    <el-dialog title="" :visible.sync="qrcodeStatus" width="280px" top="100px" style="text-align:center;background: rgba(0, 0, 0, 0.8) !important;color:#fff;" :close-on-click-modal="true" :show-close="false">
      <div id="qrcodeImg" />
    </el-dialog>
  </div>
</template>

<script>
import { userLogin, sendAuthCode } from '~/api/login';
import noCaptcha from '@/utils/noCaptcha';
import { mapActions } from 'vuex';
export default {
  layout: 'customize',
  name: 'Login',
  async asyncData(context) {
  },
  data() {
    return {
      qrcodeStatus: false,
      loginId: '', // 手机号
      password: '', // 验证码
      isDisable: false, // 不可点击 获取验证码
      content: '发送验证码',
      isSelect: false, // 是否同意协议
      isInfo: true, // 是否可以点击登录
      totalTime: 120,
      clock: null,
      fromUrl: '', // 路由来源
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromUrl = from.fullPath;
    });
  },
  watch: {
    password(curVal, oldVal) {
      if (this.loginId != '') {
        if (curVal != '') {
          if (this.isSelect) {
            this.isInfo = false;
          } else {
            this.isInfo = true;
          }
        } else {
          this.isInfo = true;
        }
      } else {
        this.isInfo = true;
      }
    },
    loginId(curVal, oldVal) {
      if (this.password != '') {
        if (curVal != '') {
          if (this.isSelect) {
            this.isInfo = false;
          } else {
            this.isInfo = true;
          }
        } else {
          this.isInfo = true;
        }
      } else {
        this.isInfo = true;
      }
    },
    isSelect(curVal, oldVal) {
      if (this.loginId!= '') {
        if (this.password != '') {
          if (curVal) {
            this.isInfo = false;
          } else {
            this.isInfo = true;
          }
        } else {
          this.isInfo = true;
        }
      } else {
        this.isInfo = true;
      }
    }
  },
  created() {},
  mounted() {

  },
  methods: {
    ...mapActions(['setUserToken', 'setUserInfo']),
    // 打开微信登录弹窗
    WXLogin() {
      this.qrcodeStatus = true;
    },
    // 是否同意协议
    changeSelect() {
      this.isSelect = !this.isSelect;
    },
    // 获得短信验证码
    mobliecode() {
      const reg1 = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!this.loginId) {
        this.$message({
          message: '请输入手机号',
          type: 'error',
          duration: 1500
        });
      } else if (!reg1.test(this.loginId)) {
        this.$message({
          message: '请输入11位手机号码',
          type: 'error',
          duration: 1500
        });
      } else {
        // 初始化滑动验证码
        noCaptcha().then((res) => {
          console.log(res);
          if (res.code==0) {
            this.isDisable = true;
            sendAuthCode({ // 这个是需要走阿里校验的发送验证码接口
              loginId: this.loginId,
              type: '1',
              phone: this.loginId,
              sessioId: res.csessionid,
              sig: res.sig,
              token: res.token,
              scene: res.scene,
            }).then(res => {
              if (res.code == '0000') {
                this.totalTime = 120;
                this.content = '重新获取('+this.totalTime + ')';
                this.clock = window.setInterval(() => {
                  this.totalTime--;
                  this.content = '重新获取('+ this.totalTime + ')';
                  if (this.totalTime < 0) {
                    window.clearInterval(this.clock);
                    this.content = '重新发送验证码';
                    this.isDisable = false;
                  }
                }, 1000);
              }
            });
          }
        }).catch((err) => {
          console.log(err);
          this.isDisable = false;
        });
      }
    },
    // 请求登录
    submitUserLogin() {
      const reg1 = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!this.loginId) {
        this.$message({
          message: '请输入正确的登录信息',
          type: 'error',
          duration: 1500
        });
      } else if (!reg1.test(this.loginId)) {
        this.$message({
          message: '请输入11位手机号码',
          type: 'error',
          duration: 1500
        });
      } else if (!this.password) {
        this.$message({
          message: '请发送验证码',
          type: 'error',
          duration: 1500
        });
      } else if (this.password.length < 6) {
        this.$message({
          message: '请输入6位验证码',
          type: 'error',
          duration: 1500
        });
      }  else {
        userLogin({
          code: this.password,
          loginId: this.loginId,
        }).then((res) => {
          if (res.code=='0000') {
            let obj = {
              'phone': this.loginId,
              'groupName': res.data.groupName,
              'partyId': res.data.partyId,
              'openId': res.data.openId
            };
            this.setUserInfo(obj); // 存储用户信息 必存
            this.setUserToken(res.data.userToken); // 存储Token  必存
            this.$router.push({ path: this.fromUrl });
            // console.log(this.$store.getters.getUserInfo());
            // console.log(this.$store.getters.getUserToken());
          }

        });
      }

    },
    // 改变手机号，清除密码
    clearPassword: function() {
      this.password = '';
      // eslint-disable-next-line no-undef
      NoCaptcha.hide();
    }
  },
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
  margin-bottom: 22px;
}
.login-phone{
  width: 312px;
  height: 40px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
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
  button{
    width: 106px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #00A47C;
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
.submitColor {
  background:rgba(210,210,210,1);
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
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-right: 4px;
}
.check-xieyi-select{
  border: 1px solid #FF7900 !important;
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
#captcha{
  display: block;
  width: 312px;
  margin-top: 10px;
}
</style>
