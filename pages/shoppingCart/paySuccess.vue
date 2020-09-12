<!-- 支付成功 -->
<template>
  <div class="pay-success">
    <!-- 订单信息 -->
    <div class="order-info">
      <div>
        <span class="font-px14 color-666">订单号：156689562326486</span>
      </div>
      <div>
        <span class="font-px16 color-999">应付金额：</span>
        <span class="font-px30 color-FF7900">￥35.00</span>
      </div>
    </div>
    <!-- 支付成功 -->
    <div class="pay-success-tip">
      <div class="success-img">
        <img src="../../assets/img/common/success.png" alt="支付成功图">
        <span>支付成功，我们会尽快为您发货！</span>
      </div>
      <div class="success-btn">
        <div>查看订单</div>
        <span class="font-px14 color-00A47C">返回首页</span>
      </div>
    </div>
    <!-- 安全提示 -->
    <div class="safe-tip">
      <div class="tip-left">
        <p>安全提醒：</p>
        <p class="font-px14 color-666">
          药兜网不会以您的购物信息被清楚导致“无法发货”、“订单异常”、“系统异常”为由让您点击任何网址链接进行退款操作。如遇此种情况，请认真核实。
        </p>
      </div>
      <div class="tip-right">
        <div class="tip-right-item">
          <div><img src="../../assets/img/common/success.png" alt="支付成功图"></div>
          <p>扫码关注药兜网公众号</p>
        </div>
        <div class="tip-right-item">
          <div><img src="../../assets/img/common/success.png" alt="支付成功图"></div>
          <p>扫码下载药兜网app</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  layout: 'secondPage',
  data() {
    return {

    };
  },

  created() {},

  mounted() {},

  methods: {}
};

</script>
<style  scoped lang="scss">
.pay-success{
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
    //订单信息
    .order-info{
        width: 100%;
        height: 53px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div{
            display: flex;
            align-items: center;
        }
    }
    //支付成功提示
    .pay-success-tip{
        width: 1200px;
        height: 430px;
        background: #FFFFFF;
        box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
      .success-img{
        display: flex;
        align-items: center;
        color: #FF7900;
        font-size: 24px;
        font-weight: bold;
        padding: 60px 0px 60px 300px;
        img{
          margin-right: 30px;
        }
      }
      .success-btn{
        width: 160px;
        height: 40px;
        background: rgba(255, 121, 0, 0.1);
        border: 1px solid #FF7900;
        color: #FF7900;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        margin: 0 auto 10px;
      }
    }
    .safe-tip{
      display: flex;
      justify-content: space-between;
      margin: 30px 0px 60px 0px;
      .tip-left{
        color: #F70C08;
        font-size: 14px;
        width: 340px;
        line-height: 20px;
        p{
          margin-bottom: 10px;
        }
      }
      .tip-right{
        display: flex;
        font-size: 12px;
        color: #999999;
        line-height: 20px;
        .tip-right-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 70px;
          div{
            width: 60px;
            height: 60px;
            margin-bottom: 13px;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
}

</style>