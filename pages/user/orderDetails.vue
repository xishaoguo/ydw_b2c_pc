<!-- 订单详情 -->
<template>
  <div class="order-container">
    <div class="order-details">
      <!-- 订单头 -->
      <div class="order-title">
        <div>
          <span class="font-px16 color-999 mg-right-px30">
            <span>订单号：</span>
            <span v-if="dataInfo.statusId=='ORDER_CREATE'">{{ dataInfo.parentOrderId }}</span>
            <span v-else>{{ dataInfo.orderId }}</span>
          </span>
          <span v-if="dataInfo.returnType==true" class="font-px16 color-999 mg-right-px30">退货单号：{{ dataInfo.orderReturnId }}</span>
          <span v-if="dataInfo.returnType==false" class="font-px16 color-999 mg-right-px30">退款单号：{{ dataInfo.orderReturnId }}</span>
          <span v-if="dataInfo.statusId!='RETURN_COMPLETE' && dataInfo.statusId!='RETURN_ING'&&dataInfo.statusId!='RETURN_PASS'&&dataInfo.statusId!='RETURN_COMPLETED'&&dataInfo.statusId!='RETURN_NOTPASS'" class="font-px16 color-999">
            <span>下单时间：{{ dataInfo.createDate }}</span>
          </span>
        </div>
        <div class="font-px16 color-FF7900 font-weight-bold">
          <!-- 退款时显示申请时间 -->
          <span v-if="dataInfo.statusId=='RETURN_COMPLETE' || dataInfo.statusId=='RETURN_ING'||dataInfo.statusId=='RETURN_PASS'||dataInfo.statusId=='RETURN_COMPLETED'||dataInfo.statusId=='RETURN_NOTPASS'" class="font-px16 color-999 mg-right-px30 font-weight-400">
            <span>申请时间：{{ dataInfo.createDate }}</span>
          </span>
          <span v-if="dataInfo.statusId=='ORDER_CREATE'">待付款</span>
          <span v-if="dataInfo.statusId=='ORDER_UNSHIPMENT'&&dataInfo.shipmentList.length==0">未发货</span>
          <span v-if="dataInfo.statusId=='ORDER_UNSHIPMENT'&&dataInfo.shipmentList.length!=0">部分发货</span>
          <span v-if="dataInfo.statusId=='ORDER_SHIPMENTED'">已发货</span>
          <span v-if="dataInfo.statusId=='ORDER_COMPLETED'&&dataInfo.commentStatus!==0">已完成</span>
          <span v-if="dataInfo.statusId=='ORDER_CANCELED'">已取消</span>
          <span v-if="dataInfo.statusId=='RETURN_ING'">待审核</span>
          <span v-if="dataInfo.statusId=='RETURN_NOTPASS'">审核失败</span>
          <span v-if="dataInfo.statusId=='RETURN_PASS'&& dataInfo.returnType==true && dataInfo.refundType==false">退货中</span>
          <span v-if="dataInfo.statusId=='RETURN_PASS'&& (dataInfo.returnType==false||dataInfo.refundType==true)">退款中</span>
          <span v-if="dataInfo.statusId=='RETURN_COMPLETE'">已退款</span>
        </div>
      </div>
      <!-- 物流动态 -->
      <div v-if="dataInfo.statusId=='ORDER_COMPLETED'||dataInfo.statusId=='ORDER_SHIPMENTED' || (dataInfo.statusId=='ORDER_UNSHIPMENT'&&dataInfo.shipmentList.length != 0)" class="order-logistics">
        <div class="title-info">
          物流动态
        </div>
        <div class="time-line">
          <div v-for="(item,index) in 5" :key="index" class="time-line-item">
            <div class="left-slot">
              <div>
                <p class="font-px14 color-666">
                  07-20
                </p>
                <p class="font-px12 color-999">
                  01:00
                </p>
              </div>
            </div>
            <div class="center-slot">
              <div v-if="index==0" class="center-spot-first" />
              <div v-if="index!=0" class="center-spot" />
            </div>
            <div class="right-slot">
              <div v-if="index==0">
                <p class="font-px16 color-FF7900 font-weight-bold">
                  最新物流动态
                </p>
                <p class="font-px14 color-666">
                  【北京市】北京市顺义区空港B区派件员：崔小旺 电话：18120123415 当前正在为您派件
                </p>
              </div>
              <div v-if="index!=0">
                <p class="font-px14 color-999">
                  北京市顺义区空港B区 已收入
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 收货地址 -->
      <div class="order-address">
        <div class="title-info">
          收货信息
        </div>
        <div>
          <p><span>收货人：</span><span>{{ dataInfo.toName }}</span></p>
          <p><span>手机号：</span><span>{{ dataInfo.phoneNum }}</span></p>
          <p><span>收货地址:</span><span>{{ dataInfo.address }}</span></p>
          <p v-if="dataInfo.statusId!='RETURN_COMPLETE' && dataInfo.statusId!='RETURN_ING'&&dataInfo.statusId!='RETURN_PASS'&&dataInfo.statusId!='RETURN_COMPLETED'&&dataInfo.statusId!='RETURN_NOTPASS'">
            <span>配送方式：</span><span>快递</span>
          </p>
        </div>
      </div>
      <!-- 订单商品 -->
      <div class="order-product">
        <div class="title-info">
          商品信息
        </div>
        <!-- 列表 -->
        <div class="shopping-list">
          <!-- 表头 -->
          <div class="shopping-title">
            <div class="width410 product-title">
              <span class="product-title_name">商品</span>
            </div>
            <div class="width210">
              <span>规格</span>
            </div>
            <div class="width210">
              <span>生产厂家</span>
            </div>
            <div class="width210">
              <span>单价</span>
            </div>
            <div class="width140">
              <span>数量</span>
            </div>
          </div>
          <!-- 列表商品 -->
          <div v-for="(storeList,index) in dataInfo.listOrderItemStoreBean" :key="index" class="shopping-product">
            <div class="store-info">
              <img class="store-icon" src="../../assets/img/common/store-prod.png" alt="店铺">
              <span>{{ storeList.storeName }}</span>
              <i class="el-icon-arrow-right" />
            </div>
            <div v-for="(store,i) in storeList.listOrderItem" :key="i" class="product-item">
              <!-- 商品 -->
              <div class="width410 product-info">
                <div class="product-img">
                  <img v-if="store.imageUrl" :src="store.imageUrl+'?x-oss-process=image/resize,m_mfit,h_142,w_142'" alt="商品图片">
                  <img v-else src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
                </div>
                <div class="product-content">
                  <div class="product-name txt-cut">
                    <p>{{ store.productName }}</p>
                  </div>
                </div>
              </div>
              <!-- 规格 -->
              <div class="width210 product-price">
                <span class="font-px14 color-999">{{ store.productSize }}</span>
              </div>
              <!-- 生产厂家 -->
              <div class="width210">
                <span class="font-px14 color-999">{{ store.producer }}</span>
              </div>
              <!-- 单价 -->
              <div class="width210 product-price">
                <span class="font-px18 color-FF7900">¥{{ store.unitPrice | numberTofixed }}</span>
              </div>
              <!-- 数量 -->
              <div class="width140">
                <span class="font-px14 color-999">{{ store.quantity }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单结算 -->
      <div class="order-account">
        <div>
          <span class="font-px16 color-999 mg-right-px30">商品总价：¥ {{ dataInfo.grandTotal | numberTofixed }}</span>
          <span v-if="dataInfo.adjustmentTotalVO&&(dataInfo.adjustmentTotalVO.couponTotal||dataInfo.adjustmentTotalVO.crossStoreTotal)" class="font-px16 color-999 mg-right-px30">优惠券：- ¥ {{ (dataInfo.adjustmentTotalVO.couponTotal + dataInfo.adjustmentTotalVO.crossStoreTotal)| numberTofixed }}</span>
          <span v-if="dataInfo.adjustmentTotalVO" class="font-px16 color-999 mg-right-px30">药神卡：- ¥ {{ dataInfo.adjustmentTotalVO.cardTotal | numberTofixed }}</span>
          <span v-if="dataInfo.adjustmentTotalVO&&dataInfo.adjustmentTotalVO.freight" class="font-px16 color-999 mg-right-px30">运费：+ ¥ {{ dataInfo.adjustmentTotalVO.freight | numberTofixed }} </span>
          <span v-if="dataInfo.statusId=='RETURN_COMPLETE' || dataInfo.statusId=='RETURN_ING'||dataInfo.statusId=='RETURN_PASS'||dataInfo.statusId=='RETURN_COMPLETED'||dataInfo.statusId=='RETURN_NOTPASS'">
            <span class="font-px16 color-999 mg-right-px30">订单总价：¥{{ dataInfo.remainningTotal | numberTofixed }} </span><br>
            <span v-if="dataInfo.adjustmentTotalVO&&dataInfo.adjustmentTotalVO.cardTotal!=0" class="font-px16 color-999 mg-right-px30">退还药神卡金额：+ ¥ {{ (dataInfo.adjustmentTotalVO.cardTotal) | numberTofixed }} </span>
            <span class="font-px16 color-999 mg-right-px30">退款金额：+ ¥ {{ dataInfo.returnTotal | numberTofixed }} </span>
          </span>
        </div>
        <div v-if="!(dataInfo.statusId=='RETURN_COMPLETE' || dataInfo.statusId=='RETURN_ING'||dataInfo.statusId=='RETURN_PASS'||dataInfo.statusId=='RETURN_COMPLETED'||dataInfo.statusId=='RETURN_NOTPASS')" class="order-num">
          <span class="font-px16 color-999">订单总价：</span>
          <span class="font-px30 color-FF7900 font-weight-bold">￥{{ dataInfo.remainningTotal | numberTofixed }}</span>
        </div>
      </div>
      <!-- 订单按钮 -->
      <div class="order-btn">
        <div v-if="dataInfo.statusId=='ORDER_CREATE'" class="btn-FF7900" @click="cancelOrder(dataInfo.parentOrderId)">
          取消订单
        </div>
        <div v-if="dataInfo.statusId=='ORDER_CREATE'" class="btn-00A47C" @click.stop="toPay(dataInfo.parentOrderId)">
          去付款
        </div>
        <div v-if="dataInfo.statusId=='ORDER_SHIPMENTED'" class="btn-00A47C" @click="sureReceive(dataInfo.orderId)">
          确认收货
        </div>
        <div v-if="dataInfo.statusId=='ORDER_UNSHIPMENT'&&dataInfo.shipmentList.length==0" class="btn-00A47C" @click="applyRefund(dataInfo)">
          申请退款
        </div>
        <div v-if="dataInfo.statusId=='ORDER_COMPLETED'" class="btn-00A47C" @click="applyReturn(dataInfo)">
          申请退货
        </div>
        <div v-if="dataInfo.statusId=='ORDER_CANCELED'" class="btn-00A47C" @click="againPurchase(dataInfo)">
          再次购买
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartAdd } from '~/api/shopping';
import { cancelOrder, orderInfo, returnProduct, confirmPro } from '~/api/order';
export default {
  layout: 'secondPage',
  name: 'OrderDetails',
  data() {
    return {
      dataInfo: {}, // 订单详情
    };
  },

  created() {
    this.getOrderInfo();
  },

  activated() {},

  mounted() {},

  methods: {
    // 查询订单详情
    getOrderInfo() {
      orderInfo({
        orderId: this.$route.query.parentOrderId,
        flag: this.$route.query.flag
      }).then(res => {
        // 判断 shipmentList
        if (!res.data.shipmentList || res.data.shipmentList.length == 0) {
          this.$set(res.data, 'shipmentList', []);
        } else if (res.data.shipmentList.length > 0) {
          console.log('物流单号未处理');
        }
        this.dataInfo = res.data;
      });
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$confirm('确认取消订单吗？', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
      }).then(() => {
        cancelOrder({
          orderId: orderId
        }).then(data => {
          if (data.code == '0000') {
            this.getOrderList();
          }
        });
      }).catch(() => {
      });
    },
    // 去支付
    toPay(parentOrderId) {
      this.$router.push({
        path: '/shoppingCart/payment',
        query: {
          orderId: parentOrderId,
          isUse: 1
        }
      });
    },
    // 再次购买
    againPurchase(order) {
      var shoppinList = [];
      order.listOrderItemStoreBean.map((list) => {
        list.listOrderItem.map((item) => {
          shoppinList.push({
            productId: item.productId,
            quantity: item.quantity+''
          });
        });
      });
      cartAdd({
        cartAddVos: shoppinList,
        isBuy: false
      }).then(res => {
        if (res.code=='0000') {
          this.$router.push({ path: '/shoppingCart' });
        }
      });
    },
    // 确认收货
    sureReceive(orderId) {
      this.$confirm('您是否已经收到全部商品？', '确认收货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
      }).then(() => {
        confirmPro({
          orderId: orderId
        }).then(res => {
          this.$message({
            type: 'success',
            message: '确认收货成功!'
          });
          this.$router.replace({
            path: '/user/orderPage',
            query: {
              statusId: 'ORDER_COMPLETED'
            }
          }).catch((err) => {});
        });
      }).catch(() => {

      });
    },
    // 申请退款
    applyRefund(order) {
      var arr = [];
      order.listOrderItemStoreBean.map((list) => {
        list.listOrderItem.map((item) => {
          arr.push({
            productId: item.productId,
            quantity: item.quantity
          });
        });
      });
      this.$confirm('<p>每种商品只可申请一次退款/退货</br>是否确定提交申请？</p>', '申请退款', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
        dangerouslyUseHTMLString: true
      }).then(() => {
        returnProduct({
          orderId: this.dataInfo.orderId,
          returnInfo: arr,
          flag: false,
          webTotal: ''
        }).then(res => {
          this.$router.push({
            path: '/user/orderReturn',
            query: {
              statusId: 1
            }
          });
        });

      }).catch(() => {

      });
    },
    // 申请退货
    applyReturn(order) {
      var arr = [];
      order.listOrderItemStoreBean.map((list) => {
        list.listOrderItem.map((item) => {
          arr.push({
            productId: item.productId,
            quantity: item.quantity
          });
        });
      });
      this.$confirm('<p>每种商品只可申请一次退款/退货</br>是否确定提交申请？</p>', '申请退货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
        dangerouslyUseHTMLString: true
      }).then(() => {
        returnProduct({
          orderId: this.dataInfo.orderId,
          returnInfo: arr,
          flag: true,
          webTotal: ''
        }).then(res => {
          this.$router.push({
            path: '/user/orderReturn',
            query: {
              statusId: 1
            }
          });
        });

      }).catch(() => {

      });
    }
  }
};

</script>
<style  scoped lang="scss">
.order-container{
    background: #F0F0F0;
    margin-top: -30px;
    box-shadow: inset 0px 6px 10px -6px rgba(0, 0, 0, 0.1);
    padding-top: 30px;
    padding-bottom: 60px;
}
.order-details{
    width: 1200px;
    margin: 0 auto;
}
.order-title{
    height: 44px;
    background: #FFFFFF;
    border-bottom: 1px dashed #D2D2D2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
}
.title-info{
    height: 68px;
    line-height: 68px;
    font-size: 20px;
    color: #666666;
}
// 收货地址
.order-address{
    background: #FFFFFF;
    padding-left: 20px;
    color: #999999;
    font-size: 14px;
    p{
        padding-bottom: 10px;
        display: flex;
        word-break: break-all;
        padding-right: 20px;
        span:first-child{
          flex-shrink: 0;
          padding-right: 10px;
        }
    }
}
// 订单商品
.order-product{
    padding:0 20px;
    background: #FFFFFF;
}
.width410{
   width: 410px;
}
.width210{
  width: 210px;
}
.width140{
  width: 140px;
}
.store-icon{
  width:23px;
  height:23px;
  margin-right: 3px;
}
// 表头
.shopping-title{
  display: flex;
  align-items: center;
  text-align: center;
  height: 44px;
  font-size:16px;
  color: #999999;
  background-color: #F6F6F6;
  padding-left: 20px;
  .product-title{
    display: flex;
    align-items: center;
  }
  .product-title_name{
    flex: 1;
  }
}
//列表商品
.shopping-list{
    border-bottom: 1px dashed #D2D2D2;
}
// 店铺
.store-info{
  padding-left: 20px;
  font-size:16px;
  color: #999999;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 30px;
  i{
      margin-top: 2px;
   }
}
//商品信息
.product-item{
    display: flex;
    align-items: center;
    padding-left: 20px;
    text-align: center;
    padding-bottom: 20px;
    .product-info{
      display: flex;
      align-items: center;
    }
    .product-img{
      width:120px;
      height:120px;
      margin-right: 18px;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
      }
    }
    .product-content{
      width:221px;
      height: 120px;
      flex: 1;
      text-align: left;
      position: relative;
      .product-name{
        font-size: 16px;
        line-height: 22px;
        color: #666666;
        -webkit-line-clamp: 3;
      }
      .product-size{
        position: absolute;
        bottom: 0px;
        font-size: 12px;
        color: #999999;
      }
    }
    .product-price{
      color: #FF7900;
      .rmb{
        font-size: 16px;
        letter-spacing: -6px;
      }
      .num{
        font-size: 20px;
      }
    }
    .product-input{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      overflow: hidden;
      border: 1px solid #D2D2D2;
      width: 110px;
      height: 32px;
      margin: 0 auto 4px;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 32px;
      }
      img{
        width: 10px;
      }
      input{
        width: 65px;
        height: 32px;
        border-left: 1px solid #D2D2D2;
        border-right: 1px solid #D2D2D2;
        padding: 0px 5px;
        text-align: center;
      }
    }
    .product-del{
      color: #00A47C;
      font-size:16px;
    }
}
// 订单结算
.order-account{
    height: 58px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    .order-num{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
// 订单按钮
.order-btn{
    display: flex;
    justify-content: flex-end;
    padding: 12px 20px 30px;
    background: #FFFFFF;
    div{
        margin-left: 20px;
    }
}
//物流动态
.order-logistics{
  background: #FFFFFF;
  padding: 0px 20px;
}
//时间轴
.time-line{
  padding-top: 10px;
  .time-line-item{
    height: 74px;
    border-left: 1px solid #F6F6F6;
    position: relative;
    margin-left: 60px;
    &:last-child{
      border: 0;
    }
    .left-slot{
      position: absolute;
      width: 60px;
      left: -60px;
      top: -10px;
      padding-right: 15px;
      text-align: right;
    }
    .center-slot{
      position: absolute;
      top: 0px;
      left: -1px;
      transform: translate(-50%, -50%);
    }
    .right-slot{
      position: absolute;
      top: -10px;
      padding-left: 15px;
      line-height: 24px;
      p{
        margin-bottom: 2px;
      }
    }
    .center-spot{
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #D2D2D2;
    }
    .center-spot-first{
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #70CD7E;
    }
  }
}

</style>