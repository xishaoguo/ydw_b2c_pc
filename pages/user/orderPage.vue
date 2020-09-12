<!-- 订单列表页 -->
<template>
  <div class="order-page">
    <div class="order-tab">
      <ul>
        <li :class="{'active':statusId==''}" @click="changeStatus('')">
          全部
        </li>
        <li :class="{'active':statusId=='ORDER_CREATE'}" @click="changeStatus('ORDER_CREATE')">
          待付款<span v-if="orderInfo.createOrderTotal && orderInfo.createOrderTotal>0">({{ orderInfo.createOrderTotal }})</span>
        </li>
        <li :class="{'active':statusId=='ORDER_UNSHIPMENT'}" @click="changeStatus('ORDER_UNSHIPMENT')">
          待收货<span v-if="orderInfo.shipmentOrderTotal && orderInfo.shipmentOrderTotal>0">({{ orderInfo.shipmentOrderTotal }})</span>
        </li>
        <li :class="{'active':statusId=='ORDER_COMPLETED'}" @click="changeStatus('ORDER_COMPLETED')">
          已完成<span v-if="orderInfo.completedTotal && orderInfo.completedTotal>0">({{ orderInfo.completedTotal }})</span>
        </li>
        <li :class="{'active':statusId=='ORDER_CANCELED'}" @click="changeStatus('ORDER_CANCELED')">
          已取消<span v-if="orderInfo.cancelTotal && orderInfo.cancelTotal>0">({{ orderInfo.cancelTotal }})</span>
        </li>
      </ul>
    </div>
    <div v-if="orderInfo.data&&orderInfo.data.length>0" class="order-list">
      <div v-for="(data,orderIndex) in orderInfo.data" :key="orderIndex" class="order-item">
        <div class="order-title">
          <div>
            <span v-if="data.statusId=='ORDER_CREATE'" class="font-px16 color-999 mg-right-px10">订单号：{{ data.parentOrderId }}</span>
            <span v-else class="font-px16 color-999 mg-right-px10">订单号：{{ data.orderId }}</span>
            <span class="font-px16 color-999">下单时间：{{ data.createDate }}</span>
          </div>
          <div>
            <span v-if="data.statusId=='ORDER_CREATE'" class="font-px16 color-FF7900 pd-lr-px30">剩余时间：26:24:12</span>
            <span class="font-px16 color-FF7900 mg-left-px30">
              <span v-if="data.statusId=='ORDER_CREATE'">待付款</span>
              <span v-if="data.statusId=='ORDER_UNSHIPMENT'&&data.shipmentList.length ==0">未发货</span>
              <span v-if="data.statusId=='ORDER_UNSHIPMENT'&&data.shipmentList.length !=0">部分发货</span>
              <span v-if="data.statusId=='ORDER_SHIPMENTED'">已发货</span>
              <span v-if="data.statusId=='ORDER_COMPLETED'">已完成</span>
              <span v-if="data.statusId=='ORDER_CANCELED'">已取消</span>
            </span>
          </div>
        </div>
        <div class="order-content">
          <div class="order-left">
            <div v-for="(item,index) in data.listOrderItemStoreBean" :key="index">
              <div class="store-info">
                <img class="store-icon" src="../../assets/img/common/store-prod.png" alt="店铺">
                <span>{{ item.storeName }}</span>
                <i class="el-icon-arrow-right" />
              </div>
              <div class="product-list">
                <div v-for="(proList,proIndex) in item.listOrderItem" :key="proIndex" class="product-item">
                  <div class="product-img">
                    <img v-if="proList.imageUrl" :src="proList.imageUrl +'?x-oss-process=image/resize,m_mfit,h_141,w_141/format,jpg'" alt="商品图">
                    <img v-else class="store-icon" src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
                  </div>
                  <div class="product-info">
                    <div class="product-name txt-cut">
                      <p>{{ proList.productName }}</p>
                    </div>
                    <div class="product-size">
                      <p class="font-px20 color-999">
                        <span class="font-px16 color-999">&yen;</span>{{ proList.unitPrice }}*{{ proList.quantity }}
                        <span class="font-px20 color-999" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="order-center">
            <p class="font-px16 color-999">
              商品总价：¥ {{ data.productTotal | numberTofixed }}
            </p>
            <p v-if="data.orderMoneyVO.crossStoreTotal" class="font-px16 color-999">
              跨店满减：- ¥ {{ data.orderMoneyVO.crossStoreTotal | numberTofixed }}
            </p>
            <p v-if="data.orderMoneyVO.couponTotal" class="font-px16 color-999">
              优惠券：- ¥ {{ data.orderMoneyVO.couponTotal | numberTofixed }}
            </p>
            <p class="font-px16 color-999">
              药神卡：- ¥ {{ data.orderMoneyVO.cardTotal | numberTofixed }}
            </p>
            <p class="font-px16 color-999">
              运费：+ ¥ {{ data.orderMoneyVO.freight | numberTofixed }}
            </p>
            <p class="font-px18 color-FF7900">
              订单总价：¥ {{ data.grandTotal | numberTofixed }}
            </p>
          </div>
          <div class="order-right">
            <div v-if="data.statusId=='ORDER_CREATE'" class="btn-00A47C" @click.stop="toPay(data.parentOrderId)">
              去付款
            </div>
            <div v-if="data.statusId=='ORDER_SHIPMENTED'" class="btn-00A47C" @click="sureReceive(data.orderId)">
              确认收货
            </div>
            <div v-if="data.statusId=='ORDER_CANCELED'" class="btn-00A47C" @click="againPurchase(data)">
              再次购买
            </div>
            <div class="btn-FF7900" @click="goToOrderDetails(data)">
              详情
            </div>
            <div v-if="data.statusId=='ORDER_CREATE'" class="btn-no-border" @click="cancelOrder(data.parentOrderId)">
              取消订单
            </div>
            <div v-if="data.statusId=='ORDER_COMPLETED'" class="btn-no-border" @click="applyReturn(data)">
              申请退货
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单无数据 -->
    <div v-else class="no-order">
      <img src="../../assets/img/common/no-order.png" alt="购物车无数据">
      <p>
        <span class="font-px14 color-666">暂无记录，</span>
        <span class="font-px14 color-00A47C" @click="goToHome()">去首页看看</span>
      </p>
    </div>
  </div>
</template>

<script>
import { cartAdd } from '~/api/shopping';
import { orderList, cancelOrder, confirmPro, returnProduct } from '~/api/order';
export default {
  layout: 'secondPageUser',
  name: 'OrderPage',
  data() {
    return {
      statusId: '', // 订单状态
      pageIndex: 1,
      pageSize: 10,
      orderInfo: {}// 订单列表
    };
  },

  created() {},

  activated() {},

  mounted() {
    this.statusId = this.$route.query.statusId?this.$route.query.statusId:'';
    this.getOrderList();
  },

  methods: {
    // 获取我的订单列表
    getOrderList() {
      let status = '', commentStatus='';
      if (this.statusId=='') { // 查询全部状态
        status='ORDER_CREATE,ORDER_SHIPMENTED,ORDER_UNSHIPMENT,ORDER_COMPLETED,ORDER_CANCELED';
        commentStatus = undefined;
      } else if (this.statusId == 'ORDER_UNSHIPMENT') { // 待发货 /部分发货
        status='ORDER_SHIPMENTED,ORDER_UNSHIPMENT';
        commentStatus = undefined;
      } else if (this.statusId == 'ORDER_COMPLETED') { // 已完成 commentStatus==1
        status = this.statusId;
        commentStatus = '';
      } else {
        status = this.statusId;
        commentStatus = undefined;
      }
      orderList({
        statusId: status,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        commentStatus: commentStatus,
        groupFlag: 'N'
      }).then(res => {
        if (res.code=='0000') {
          this.orderInfo = res;
          // 判断 shipmentList
          for (var i = 0; i < res.data.length; i++) {
            if (
              !res.data[i].shipmentList ||
                res.data[i].shipmentList.length == 0
            ) {
              this.$set(res.data[i], 'shipmentList', []);
            }
          }
        }
      });
    },
    loadMore() {
      this.pageIndex++;
      this.getOrderList();
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
      console.log(order);
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
    // 切换订单状态查询订单列表
    changeStatus(status) {
      this.statusId = status;
      this.pageIndex = 1;
      this.getOrderList();
      this.$router.replace({
        path: '/user/orderPage',
        query: {
          statusId: status
        }
      }).catch((err) => {});
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
          this.changeStatus('ORDER_COMPLETED');// 状态切换
        });
      }).catch(() => {

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
          orderId: order.orderId,
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
    },
    // 跳转订单详情
    goToOrderDetails(data) {
      if (data.statusId=='ORDER_CREATE') {
        this.$router.push({ path: '/user/orderDetails', query: { parentOrderId: data.parentOrderId, flag: 'parent' }});
      } else {
        this.$router.push({ path: '/user/orderDetails', query: { parentOrderId: data.orderId, flag: 'child' }});
      }
    },

    // 跳转首页
    goToHome() {
      this.$router.push({ path: '/' });
    }
  }
};

</script>
<style  scoped lang="scss">
.order-page{
  .order-tab ul{
    height: 48px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    line-height: 48px;
    color: #999999;
    font-size: 16px;
    li{
      min-width: 122px;
      text-align: center;
      height: 22px;
      border-right: 1px solid #D2D2D2;
      line-height: 22px;
      padding: 0px 5px;
      position: relative;
    }
    .active{
      font-weight: bold;
      font-size: 16px;
      color: #FF7900;
      &::after{
        content: '';
        width: 38px;
        height: 2px;
        background: #FF7900;
        position: absolute;
        bottom: -13px;
        left: 50%;
        transform: translateX(-19px);
      }
    }
  }
}
.order-list{
  margin-top: 30px;
  .order-item{
    background: #FFFFFF;
    margin-bottom: 20px;
  }
  .order-title{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    border-bottom: 1px dashed #D2D2D2;
  }
  .order-content{
    display: flex;
  }
  .order-left{
    width: 409px;
    padding-bottom: 10px;
    border-right: 1px solid #F6F6F6;
  }
  .order-center{
    width: 260px;
    border-right: 1px solid #F6F6F6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0px;
    p{
      line-height: 24px;
      margin-bottom: 10px;
      padding-left: 55px;
    }
  }
  .order-right{
    width: 297px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div{
      margin-bottom: 10px;
    }
  }
  .store-info{
    font-size:16px;
    color: #999999;
    display: flex;
    align-items: center;
    margin: 20px 0px;
    padding-left:20px;
    i{
      margin-top: 2px;
    }
  }
  .store-icon{
    width:23px;
    height:23px;
    margin-right: 3px;
  }
}
.product-list{
  .product-item{
    padding-left: 20px;
    margin-bottom: 20px;
    display: flex;
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
    .product-info{
      width: 221px;
      height: 120px;
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
  }
}
// 订单无数据
.no-order{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 118px;
  img{
    width: 145px;
    height: 190px;
    margin-right: 30px;
  }
}


</style>