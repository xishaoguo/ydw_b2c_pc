<template>
  <div class="freight">
    <h1>运费说明</h1>
    <ul>
      <li>
        <p>运费说明</p>
        <p>您订购的商品由商家各自出货，其配送方式及运费均以各商家设置而定。</p>
        <p>由于药品的特殊性，我们建议您在订单付款前与商家联系确认运费，以免耽误您的收货时间。</p>
        <p>液体商品、特殊条件保存（低温、冷冻等）商品、特殊包装商品可能在费用上所有不同，我们也建议您在购买前与商家联系确认。如果您的订单已付款，卖家可能会联系您补付运费，您只要在“订单管理”里面继续支付运费即可。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .freight {
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