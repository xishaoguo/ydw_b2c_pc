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
    <!-- 选择支付方式 -->
    <div class="pay-methods">
      <div class="font-px16 color-666 pay-title">
        请选择支付方式
      </div>
      <div class="pay-select" :class="{'select-left':payMethods=='WXPay','select-right':payMethods=='AliPay'}">
        <!-- 微信 -->
        <div class="pay-left" @click="changePayMethods('WXPay')">
          <div>
            <img src="../../assets/img/common/wx.png" alt="微信支付">
          </div>
        </div>
        <!-- 支付宝 -->
        <div class="pay-right" @click="changePayMethods('AliPay')">
          <div>
            <img src="../../assets/img/common/ali.png" alt="支付宝支付">
          </div>
        </div>
      </div>
      <div class="pay-footer font-px14 color-999">
        <div class="pay-footer-btn" :class="{'select-btn':payMethods!=''}" @click="toPay()">
          立即支付
        </div>
        <div>
          <span v-if="payMethods=='WXPay'">已选择微信支付</span>
          <span v-else-if="payMethods=='AliPay'">已选择支付宝支付</span>
          <span v-else>请选择支付方式</span>
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
      payMethods: '',
      paySelected: '',
      orderId: '',
      payObj: {}, // 支付对象
    };
  },

  created() {
    this.orderId = this.$route.query.orderId;
    this.getSign();
  },

  mounted() {
    this.payObj.returnUrl = window.origin+'/shoppingCart/paySuccess?orderId='+ this.orderId;
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == '/shoppingCart/order') {
      next({ path: '/user/orderPage', query: { statusId: 'ORDER_CREATE' }});
    } else {
      next(); // 默认跳转
    }
  },

  methods: {
    // 切换支付方式
    changePayMethods(type) {
      this.payMethods = type;
    },
    // 选好支付方式，立即支付
    toPay() {
      if (this.payMethods) {
        if (this.payMethods=='WXPay') {
          this.$router.push({ path: '/shoppingCart/paymentSelect', query: {
            paySelected: this.payMethods,
            orderId: this.orderId
          }});
        } else if (this.payMethods=='AliPay') {
          this.payObj.payType = this.payMethods;
          this.payObj.productCode = 'AliPayPc';
          console.log(this.payObj);
          payCommon(this.payObj);
        }

      }
    },
    // 订单验签
    getSign() {
      getSignCommon('get', '/order/getSign', { parentOrderId: this.orderId }, (data) => {
        this.payObj = JSON.parse((JSON.stringify(this.payObj)+JSON.stringify(data)).replace(/}{/, ','));
        this.payObj.amount = data.remainningTotal;
        this.payObj.Notify = data.notify;
      });
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