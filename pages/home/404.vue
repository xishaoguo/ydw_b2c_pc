<template>
  <div class="error-page">
    <div class="error-page-404">
      <div>
        <img src="~assets/img/fail.png" alt="">
        <ul>
          <li>很抱歉，您浏览的网页不存在！</li>
          <li>
            <p>可能原因：</p>
            <p>1、输入网址有误</p>
            <p>2、该网页已过期或者不存在</p>
          </li>
          <li>
            <p>您可以</p>
            <p>1、检查网址是否正确</p>
            <p>
              2、去其它地方逛逛：  <nuxt-link to="/">
                <span class="to-home">药兜网首页</span>
              </nuxt-link>
            </p>
          </li>
        </ul>
      </div>
      <p class="count-down">
        <span style="color: #FF7900;">{{ countDownNumber }}</span>&nbsp;秒后自动返回药兜网首页
      </p>
    </div>
  </div>
</template>
<script>
export default {
  fetch() {
    this.countDown();
  },
  data() {
    return {
      countDownNumber: 5
    };
  },
  methods: {
    countDown() {
      let timer = setInterval(() => {
        this.countDownNumber -= 1;
        if (this.countDownNumber === 0) {
          this.$router.push('/');
          clearInterval(timer);
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
  .error-page {
    background: #F6F6F6;
    &-404 {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-bottom: 60px;
      &>div {
        display: flex;
        margin-top: 64px;
        & img {
          width: 218px;
          height: 239px;
        }
        &>ul {
          & li {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.85);
            line-height: 24px;
            margin-top: 30px;
          }
          & li:nth-child(1) {
            margin-top: 0;
          }
          & li:nth-child(2),& li:nth-child(3) {
            & p {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              .to-home {
                color: #00A47C;
                font-weight: bold;
              }
            }
            & p:nth-child(1) {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.85);
              line-height: 24px;
            }
          }
        }
      }
      & .count-down {
        margin-top: 65px;
      }
    }
  }
</style>