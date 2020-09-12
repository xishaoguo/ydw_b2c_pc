<!-- 基本信息 -->
<template>
  <div class="base-info" @click="closePayPop($event)">
    <div class="title-info">
      基本信息
    </div>
    <div class="info-details">
      <div class="info-image">
        <span>头像:</span>
        <div class="info-img">
          <img v-if="userInfo.headImage" :src="userInfo.headImage+'?x-oss-process=image/resize,m_mfit,h_64,w_64/format,jpg'" alt="用户头像">
          <img v-else src="../../assets/img/login.jpg" alt="用户默认头像">
        </div>
      </div>
      <div>昵称：{{ userInfo.nickName ? userInfo.nickName : userInfo.mobile }}</div>
      <div>手机号：{{ userInfo.mobile }}</div>
      <div class="btn-FF7900 info-btn" @click.stop="openRwm()">
        <span>修改基本信息</span>
        <!-- 二维码 -->
        <div v-if="ewmStatus" class="account-btn-ewm">
          <div class="ewm-tip">
            <p class="font-px12 color-666">
              请到药兜网app上修改
            </p>
            <p class="font-px12 color-FF7901">
              （安卓）
            </p>
            <div class="ewm-img-box">
              <div class="ewm-img">
                <img src="../../assets/img/android_code.png" alt="安卓二维码">
              </div>
              <div class="ewm-line" />
            </div>
            <div class="ewm-arrow" />
          </div>
          <div class="ewm-tip">
            <p class="font-px12 color-666">
              请到药兜网app上修改
            </p>
            <p class="font-px12 color-FF7901">
              (iOS)
            </p>
            <div class="ewm-img-box">
              <div class="ewm-img">
                <img src="../../assets/img/ios_code.png" alt="iOS二维码">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLoginId } from '~/api/user';
export default {
  layout: 'secondPageUser',
  name: 'BaseInfo',
  async asyncData({ route }) {
    let [userInfo] = await Promise.all([
      // 获取结算数据
      getUserLoginId().then(res => {
        if (res.code=='0000') {
          return res.data;
        }
      }),
    ]);
    return {
      userInfo
    };
  },
  data() {
    return {
      ewmStatus: false
    };
  },

  created() {},

  mounted() {
    console.log(this.userInfo);
  },

  methods: {
    // 打开二维码
    openRwm() {
      this.ewmStatus = true;
    },
    // 点击二维码之外区域关闭
    closePayPop(event) {
      var btn = document.querySelector('.info-btn');
      if (btn) {
        if (!btn.contains(event.target)) {
          this.ewmStatus = false;
        }
      }
    },
  }
};

</script>
<style  scoped lang="scss">
.base-info{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.title-info{
    font-size: 20px;
    line-height: 28px;
    color: #666666;
    padding-bottom: 20px;
}
.info-details{
    flex: 1;
    background: #FFFFFF;
    padding: 20px 30px;
    font-size: 14px;
    color: #666666;
    &>div{
        margin-bottom: 30px;
    }
    .info-image{
        display: flex;
        align-items: center;
    }
}
.info-img{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-left: 20px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
}
.info-btn{
  margin: 210px auto 0px;
  position: relative;
}
//二维码
.account-btn-ewm{
    position: absolute;
    text-align: center;
    bottom: 65px;
    left: 50%;
    transform: translateX(-50%);
    width: 394px;
    height: 188px;
    background: #FFFFFF;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
  .ewm-tip{
    background-color: #FFFFFF;
    padding-top: 20px;
    flex: 1;
    p{
      line-height: 22px;
    }
  }
  .ewm-img{
    width: 100px;
    height: 100px;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ewm-img-box{
    padding-bottom: 20px;
    background-color: #FFFFFF;
    z-index: 10;
    position: relative;
    margin-top: 5px;
  }
  .ewm-arrow{
    width: 18px;
    height: 18px;
    background: #FFFFFF;
    transform: rotate(45deg);
    margin: 0 auto;
    position: absolute;
    bottom: -10px;
    z-index: 0;
    left: 190px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  }
  .ewm-line{
    position: absolute;
    right: 0;
    top: 0px;
    width: 1px;
    height: 100px;
    background: #F6F6F6;
    border-radius: 2px;
  }
}

</style>