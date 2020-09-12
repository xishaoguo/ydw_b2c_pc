<template>
  <div class="refund-instructions">
    <h1>退款说明</h1>
    <ul>
      <li>
        <p>目前药兜网支持支付宝，微信支付，退款金额会原路返回相应的银行卡和信用卡。</p>
      </li>
      <li>
        <p>如何查看订单的退款：</p>
        <p>1、使用支付宝进行支付的订单</p>
        <p>在用户收到退款通知后，即可登录当时支付订单款项的支付宝帐号进行查看退款。</p>
        <p>2、使用微信支付进行支付的订单</p>
        <p>在用户收到退款通知后，即可登录当时支付订单款项的微信帐号进行查看退款。</p>
      </li>
      <li>
        <p>退款流程如下：</p>
      </li>
      <li>
        <div class="step-number">
          1
        </div>
        <div class="step-text">
          使用支付宝支付的用户收到退款通知后，访问支付宝APP，点击账单查看，如下图：
        </div>
      </li>
      <li>
        <div class="step-text">
          <img src="~assets/img/novicehelp/refund1.png" alt="" class="step-img">
        </div>
      </li>
      <li>
        <div class="step-number">
          2
        </div>
        <div class="step-text">
          使用微信支付的用户收到退款通知后，访问微信APP，点击账单查看，如下图：
        </div>
      </li>
      <li>
        <div class="step-line" />
        <div class="step-text">
          <img src="~assets/img/novicehelp/refund2.png" alt="" class="step-img2">
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .refund-instructions {
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
        .step-number {
            width: 24px;
            height: 24px;
            background: #FFBE43;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            color: white;
          }
          .step-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            margin-left: 12px;
            .step-img {
              width: 300px;
              height: 649px;
              margin-bottom: 50px;
            }
            .step-img2 {
              width: 642px;
              height: 454px;
            }
            span {
              color: #0FAA84;
              font-weight: bold;
            }
            span:hover {
              cursor: pointer;
            }
          }
          .step-line {
            width: 4px;
            border-left: 1px dashed #E5E5E5;
            margin-left: 11px;
          }
      }
      & li:nth-child(1) {
        margin-top: 0px;
      }
      & li:nth-child(4) {
        display: flex;
        align-items: flex-start;
        margin-top: 20px;
        .step-text {
          margin-top: 2px;
        }
      }
      & li:nth-child(5) {
        display: flex;
        margin-top: 0px;
        .step-text {
          margin-left: 25px;
        }
      }
      & li:nth-child(6) {
        display: flex;
        align-items: flex-start;
        margin-top: 0;
        .step-text {
          margin-top: 2px;
        }
      }
      & li:nth-child(7) {
        margin-top: 10px;
        .step-text {
          margin-left: 25px;
        }
      }
    }
  }
</style>