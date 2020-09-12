<template>
  <div class="acceptance">
    <h1>验收标准</h1>
    <ul>
      <li>
        <p>验收标准</p>
        <p>药兜网在售商品均由正规实体签约药房供货，质量保证。商品配送服务由实体药房、签约快递公司和邮政快递公司承担。</p>
        <p>请您收到药品时，签字确认前一定要对药品进行开箱检验，检验商品信息是否一致、商品数量、外包装是否破损、邮政包裹包装是否破损。如其中一项不符合要求，您有权拒绝签字。</p>
      </li>
      <li>
        <p>特别提醒：</p>
        <p>如果您未当场对商品进行验收，一旦商品数量缺少、破损等问题出现，事后将会有较为繁琐复杂的调查流程进行责任调查。同时，也会延长您的订购周期，责任无法确定的将无法补偿您的损失。因此您在签收包裹时务必认真清点商品！</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .acceptance {
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