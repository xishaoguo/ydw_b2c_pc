<!-- 个人中心左侧栏 -->
<template>
  <div class="user-left">
    <div class="user-info">
      <div class="user-img">
        <img v-if="userInfo.headImage" :src="userInfo.headImage+'?x-oss-process=image/resize,m_mfit,h_64,w_64/format,jpg'" alt="用户头像">
        <img v-else src="../../assets/img/login.jpg" alt="用户头像">
      </div>
      <div class="font-px14 color-666">
        {{ userInfo.mobile || userInfo.nickName }}
      </div>
    </div>
    <div class="user-nav">
      <div class="nav-item">
        <div>
          <span class="font-px14 color-666">订单中心</span>
          <span class="font-px12 color-999">/Order center</span>
        </div>
        <ul>
          <li :class="{'active':activePath=='/user/orderPage'}" @click="changlinTope($event,'/user/orderPage')">
            我的订单
          </li>
          <li :class="{'active':activePath=='/user/orderReturn'}" @click="changlinTope($event,'/user/orderReturn')">
            退款/退货
          </li>
        </ul>
      </div>
      <div class="nav-item">
        <div>
          <span class="font-px14 color-666">个人中心</span>
          <span class="font-px12 color-999">/Personal Center</span>
        </div>
        <ul>
          <li :class="{'active':activePath=='/user/baseInfo'}" @click="changlinTope($event,'/user/baseInfo')">
            基本信息
          </li>
          <li :class="{'active':activePath=='/user/myCollection'}" @click="changlinTope($event,'/user/myCollection')">
            我的收藏
          </li>
          <li :class="{'active':activePath=='/user/browseRecord'}" @click="changlinTope($event,'/user/browseRecord')">
            浏览记录
          </li>
          <li :class="{'active':activePath=='/user/myAddress'}" @click="changlinTope($event,'/user/myAddress')">
            收货地址
          </li>
        </ul>
      </div>
      <div class="line-active" :style="{'top':lineTop+'px'}" />
    </div>
  </div>
</template>

<script>
import { getUserLoginId } from '~/api/user';
export default {
  name: 'UserLeft',
  async asyncData() {
    return {
    };
  },
  data() {
    return {
      lineTop: 40,
      activePath: '/user/orderPage',
      userInfo: {}
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        // 监听进入页面选中
        this.activePath = val.path;
        this.$nextTick(() => {
          if (process.browser) {
            this.lineTop = document.getElementsByClassName('active')[0].offsetTop;
          }
        });
      },
      immediate: true
    }
  },
  created() {},

  activated() {},

  mounted() {
    this.getUserInfo();
  },

  methods: {
    changlinTope(event, path) {
      this.lineTop = event.currentTarget.offsetTop;
      this.activePath = path;
      this.$router.push({ path: path });
    },
    // 获取用户信息
    getUserInfo() {
      getUserLoginId().then(res => {
        if (res.code=='0000') {
          this.userInfo =  res.data;
        }
      });
    }
  }
};

</script>
<style  scoped lang="scss">
.user-left{
    .user-info{
        width: 207px;
        height: 171px;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .user-img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-bottom: 10px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }
    .user-nav{
        background: #FFFFFF;
        margin-top: 10px;
        position: relative;
        padding-bottom: 20px;
        .nav-item{
            text-align: center;
            div{
                height: 40px;
                line-height: 40px;
                background: rgba(0, 0, 0, 0.02);
            }
            li{
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #999999;
                &:hover{
                    background: rgba(255, 121, 0, 0.1);
                }
            }
        }
    }
    .active{
        color: #FF7900 !important;
        background: rgba(255, 121, 0, 0.1) !important;
    }
    .line-active{
        width: 3px;
        height: 41px;
        background: #FF7900;
        position: absolute;
        top: 40px;
        right: 0px;
        transition:all 0.3s ease-in-out;
    }
}
</style>