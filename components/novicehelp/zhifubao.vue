<template>
  <div class="zhi-fu-bao">
    <h1>支付宝支付</h1>
    <ul>
      <li>
        <p>支付宝支付</p>
        <p>商品结算提交订单-选择支付宝支付，跳转支付宝平台用支付宝APP扫码支付</p>
      </li>
      <li>
        <div class="zhi-fu-bao-icon">
          <img src="~assets/img/novicehelp/zhifubao.png" alt="">
        </div>
        <div class="wei-xin-icon">
          <img src="~assets/img/novicehelp/weixin.png" alt="">
        </div>
      </li>
      <li>
        <p>支付宝支付：有关支付宝注册、激活、充值等流程的疑问，您可咨询支付宝客服中心获悉权威答复。</p>
        <p>支付宝7×24小时服务热线：95188或登录支付宝帮助中心</p>
        <p><a href="http://help.alipay.com/lab/index.htm"><span>http://help.alipay.com/lab/index.htm</span></a></p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .zhi-fu-bao {
    h1 {
      height: 49px;
      width: 100%;
      text-align: center;
      line-height: 49px;
      border-bottom: 1px dashed #E5E5E5;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    ul {
      width: 100%;
      padding: 30px 50px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      & li {
        margin-top: 50px;
        & p:nth-child(1) {
          color: #FF7900;
          font-weight: bold;
        }
        .zhi-fu-bao-icon {
          width: 108px;
          height: 108px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        .wei-xin-icon {
          width: 54px;
          height: 54px;
          margin-left: 120px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        span {
          color: #0FAA84;
        }
      }
      & li:nth-child(1) {
        margin-top: 0px;
      }
      & li:nth-child(2) {
        display: flex;
        align-items: flex-end;
      }
      & li:nth-child(3) {
        & p:nth-child(1) {
          color: #666666;
          font-weight: normal;
        }
      }
    }
  }
</style>