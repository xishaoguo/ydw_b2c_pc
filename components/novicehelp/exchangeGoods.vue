<template>
  <div class="exchange-goods">
    <h1>退换货保障</h1>
    <ul>
      <li>
        <p>退换货保障</p>
        <p>因药品是特殊商品，依据中华人民共和国《药品经营质量管理规范》及其实施细则（GSP）、《互联网药品交易服务审批暂行规定》等法律、法规的相关规定：一经售出，无质量问题，不退不换。</p>
      </li>
      <li>
        <p>具备退换货条件的情况：</p>
        <p>1、因物流配送导致外包装污损、破损的商品。</p>
        <p>2、经质量管理部门检验，确属产品本身存在质量问题。</p>
        <p>3、国家权威管理部门发布公告的产品（如停售、召回等）。</p>
        <p>4、因卖家失误造成发货错误如商品的品名、规格、数量、生产日期等信息与所订商品不符。</p>
        <p>注：为了证实情况是否属实，期间可能需要快递人员证明或要求您提供实物照片等，以便卖家快速为您做出判断及时处理。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .exchange-goods {
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