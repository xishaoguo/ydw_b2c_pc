<!-- 确认支付 -->
<template>
  <div class="payment">
    <!-- 订单信息 -->
    <div class="order-info">
      <div>
        <span class="font-px14 color-666">订单号：{{ orderId }} ，订单提交后1小时内为您保留，请及时支付；</span>
      </div>
      <div>
        <span class="font-px16 color-999">应付金额：</span>
        <span class="font-px30 color-FF7900">￥{{ payObj.amount }}</span>
      </div>
    </div>
    <!-- 已选择支付方式 -->
    <div class="pay-methods">
      <div class="font-px16 color-666 pay-title">
        <div v-if="paySelected=='WXPay'">
          <img src="../../assets/img/common/wx.png" alt="微信支付">
          <span>已选择微信支付</span>
        </div>
        <div v-if="paySelected=='AliPay'">
          <img src="../../assets/img/common/ali.png" alt="微信支付">
          <span>已选择支付宝支付</span>
        </div>
      </div>
      <div class="pay-example">
        <!-- 微信 -->
        <div v-if="paySelected=='WXPay'" class="pay-example-details">
          <div class="details-left">
            <div class="details-ewm">
              <img src="../../assets/img/common/wx.png" alt="微信支付二维码">
            </div>
            <div><img src="../../assets/img/common/wx-tip.png" alt="微信支付提示"></div>
          </div>
          <div @click="toPaySuccess()">
            <img src="../../assets/img/common/wx-example.png" alt="微信示例">
          </div>
          <div class="change-selected" @click="changePaySelected('AliPay')">
            <img src="../../assets/img/common/left-green.png" alt="左箭头">
            <span class="font-px14 color-00A47C">选择支付宝支付</span>
          </div>
        </div>
        <!-- 支付宝 -->
        <div v-if="paySelected=='AliPay'" class="pay-example-details">
          <div class="details-left">
            <div class="details-ewm">
              <img src="../../assets/img/common/ali.png" alt="支付宝支付二维码">
            </div>
            <div><img src="../../assets/img/common/ali-tip.png" alt="支付宝支付提示"></div>
          </div>
          <div @click="toPaySuccess()">
            <img src="../../assets/img/common/ali-example.png" alt="支付宝示例">
          </div>
          <div class="change-selected" @click="changePaySelected('WXPay')">
            <img src="../../assets/img/common/left-green.png" alt="左箭头">
            <span class="font-px14 color-00A47C">选择微信支付</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSignCommon, payCommon } from '@/utils/pay';
export default {
  name: 'Payment',
  layout: 'secondPage',
  data() {
    return {
      paySelected: '',
      orderId: '',
      payObj: {}, // 支付对象
    };
  },

  created() {
    this.paySelected = this.$route.query.paySelected;
    this.orderId = this.$route.query.orderId;
  },

  mounted() {
    this.payObj.returnUrl = window.origin+'/shoppingCart/paySuccess?orderId='+ this.orderId;
    this.getSign();
  },

  methods: {
    // 改变已选择的支付方式
    changePaySelected(type) {
      this.$router.push({ path: '/shoppingCart/payment', query: {
        orderId: this.orderId
      }});
    },
    // 去支付成功页
    toPaySuccess() {
      this.$router.push({ path: '/shoppingCart/paySuccess', query: {
        orderId: this.orderId
      }});
    },
    // 订单验签
    getSign() {
      getSignCommon('get', '/order/getSign', { parentOrderId: this.orderId }, (data) => {
        this.payObj = JSON.parse((JSON.stringify(this.payObj)+JSON.stringify(data)).replace(/}{/, ','));
        this.payObj.amount = data.remainningTotal;
        this.payObj.Notify = data.notify;
        this.toPay();
      });
    },
    // 支付调用
    toPay() {
      if (this.paySelected=='WXPay') {
        this.payObj.payType = this.paySelected;
        this.payObj.productCode = 'CodeWxPayService';
        payCommon(this.payObj);
      }
    },
  }
};

</script>
<style  scoped lang="scss">
.payment{
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
}
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
//支付按钮
.pay-footer{
    &>div{
        margin: 10px auto 0px;
        text-align: center;
    }
    .pay-footer-btn{
        width: 160px;
        height: 40px;
        background: #D2D2D2;
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 40px;
    }
    .select-btn{
        background: rgba(255, 121, 0, 0.1) !important;
        border: 1px solid #FF7900 !important;
        color: #FF7900 !important;
    }
}
//选择支付方式
.pay-methods{
    width: 1200px;
    height: 497px;
    background: #FFFFFF;
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03), 0px 9px 28px 0px rgba(0, 0, 0, 0.05), 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    margin-bottom: 60px;
    padding: 0px 20px;
    .pay-title{
        height: 64px;
        line-height: 64px;
        div{
            display: flex;
            align-items: center;
        }
        img{
            width: 30px;
            height: 30px;
            border-radius: 2px;
            margin-right: 10px;
        }
    }
}
.pay-select{
    height: 300px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.pay-left{
    transform: translate(220px,40px);
    display: inline-block;
    transition: all 0.7s linear;
    div{
        transition: all 0.7s linear;
        width: 180px;
        height: 180px;
    }
}
.pay-right{
    transform: translate(600px, 40px);
    display: inline-block;
    transition: all 0.7s linear;
    div{
        transition: all 0.7s linear;
        width: 180px;
        height: 180px;
    }
}
.select-left{
    .pay-left{
        transform: translate(470px,20px);
        div{
            width: 220px;
            height: 220px;
        }
    }
    .pay-right{
        transform: translate(690px, 20px);
        div{
            width: 120px;
            height: 120px;
        }
    }
}
.select-right{
    .pay-left{
        transform: translate(150px,20px);
        div{
            width: 120px;
            height: 120px;
        }
    }
    .pay-right{
        transform: translate(350px, 20px);
        div{
            width: 220px;
            height: 220px;
        }
    }
}
//已选择支付方式
.pay-example-details{
    display: flex;
    justify-content: center;
    height: 377px;
    position: relative;
    .details-left{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-right: 85px;
    }
    .details-ewm{
        width: 286px;
        height: 286px;
        background: #FFFFFF;
        box-shadow: 0px 7px 16px 5px rgba(0, 0, 0, 0.18), 0px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px -3px rgba(0, 0, 0, 0.16);
        border: 1px solid #F6F6F6;
        img{
            width: 100%;
        }
    }
    .change-selected{
        display: flex;
        align-items: center;
        position: absolute;
        left: 0px;
        bottom: 0px;
    }
}
</style>