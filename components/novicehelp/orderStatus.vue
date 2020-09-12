<template>
  <div class="order-status">
    <h1>订单状态</h1>
    <ul>
      <li>您可以在“我的订单”页面查看您订单的状态，以下是订单的各个主要状态及装简单说明：</li>
      <li>
        <p>1、等待买家付款（待付款）</p>
        <p>您成功的生成了一笔订单，但商家和药兜网还没有收到您的款项，为了不耽误您的收货时间，我们建议您尽快完成付款。</p>
      </li>
      <li>
        <p>2、等待商家发货（未发货/部分发货）</p>
        <p>你的订单款项已经支付成功，等待商家发货。</p>
      </li>
      <li>
        <p>3、等待买家收货（待收货）</p>
        <p>商家已经确认收货，您可以根据在订单详情查看该笔订单的物流配送情况。</p>
      </li>
      <li>
        <p>4、交易完成（已完成）</p>
        <p>您已经确认收货，交易完成。</p>
      </li>
      <li>
        <p>5、商家无货退款</p>
        <p>卖家无货、或者订单商品异常等原因，卖家与买家协商后发起的退款流程。</p>
      </li>
      <li>
        <p>6、取消订单</p>
        <p>在您待付款时，如果因为某些原因不再需要订单中的商品，可以取消订单。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .order-status {
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
      }
      & li:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
</style>