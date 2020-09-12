<template>
  <div class="service">
    <h1>客服中心</h1>
    <ul>
      <li>有关商品、订单或售后服务等问题，我们建议您联系意向购买或已成交的商家客服，以便获得快速处理。 当然，您也都可以通过以下方式联系我们客服，我们都会为您处理，谢谢您的支持！</li>
      <li>
        客服电话：<span>400-1760-518</span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .service {
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
        & span {
          color: #00A47C;
        }
      }
      & li:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
</style>