<template>
  <div class="weixin">
    <h1>微信支付</h1>
    <ul>
      <li>
        <p>支付方式</p>
        <p>商品结算提交订单-选择微信支付，跳转药房网平台微信二维码扫码支付</p>
      </li>
      <li>
        <div class="wei-xin-icon">
          <img src="~assets/img/novicehelp/weixin.png" alt="">
        </div>
        <div class="zhi-fu-bao-icon">
          <img src="~assets/img/novicehelp/zhifubao.png" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .weixin {
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
        .wei-xin-icon {
          width: 108px;
          height: 108px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
        .zhi-fu-bao-icon {
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
          font-weight: bold;
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
        }
      }
    }
  }
</style>