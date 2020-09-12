<template>
  <div class="exchange-process">
    <h1>退换货流程</h1>
    <ul>
      <li>
        <p>退换货流程：</p>
        <p>1、联系药店客服或自行确认符合退换货政策。</p>
        <p>2、在线提交退换货申请及相关证明。</p>
        <p>3、退换货申请通过后寄回商品。</p>
        <p>4、确认药房为您重寄的商品或退款。</p>
      </li>
      <li>
        <p>费用说明：</p>
        <p>商品质量问题退换货产生的相关运费由商家承担；买家自身问题导致的退换货，买家需承担来回运费（其中，退货还需买家承担该商品订单金额的20%做为商品损耗费）。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .exchange-process {
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