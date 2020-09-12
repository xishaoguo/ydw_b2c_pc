<template>
  <div class="warning">
    <h1>网购警示</h1>
    <ul>
      <li>
        <p>网购警示</p>
        <p>网购的风险在于商品的破损、短缺、污染及与订购的商品名称或数量的不符，直接影响及时使用。主要原因是通过人工分拣、汽车运输等多方联动的配送服务，可能因为货物的挤压形成的破损、偷盗造成的短缺、仓储、运输的环境及天气等自然灾害造成的污染或是商品分拣过程的错误造成的商品不符或短缺增加网购维权的烦恼。不及时签收会大大增加维权的成本和难度。</p>
      </li>
      <li>
        <p>签收需要注意的几点；</p>
        <p>第一、目测包裹外观是否有挤压变形造成商品的破损、短缺、污染可能影响使用，如果有拒接签收并当配送人员在场的情况下及时与商家取得联系，说明包裹破损的情况并由配送人员现场佐证，如商家有要求请在物流单上注明拒收的理由。</p>
        <p>第二、目测包裹外观完好无损，不急于拆开包裹，先核对物流单上登载的发货商家的名称和地址是否与交易网站上的订单详情中登载的商家名称和发货地址一致，如果不一致请及时联系商家确认。</p>
        <p>第三、物流单上编号与交易网站上的订单详情中登载的物流单号不一致有两种情况；</p>
        <p>1、商家的订单比较多发货时填写的物流单号出现失误，遇此情况请及时联系商家确认。</p>
        <p>2、包裹有可能在配送过程中被重新包裹，包裹不是订购商品的商家发出的原包裹，遇到这种情况请直接拒收。</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .warning {
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