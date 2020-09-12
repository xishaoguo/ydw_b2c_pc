<!--退货退款列表页 -->
<template>
  <div class="order-page order-return-page">
    <div class="order-tab">
      <ul>
        <li :class="{'active':statusId==''}" @click="changeStatus('')">
          全部
        </li>
        <li :class="{'active':statusId=='1'}" @click="changeStatus('1')">
          待审核<span v-if="orderInfo.orderReturnCaculatePO && orderInfo.orderReturnCaculatePO.returnImg>0">({{ orderInfo.orderReturnCaculatePO.returnImg }})</span>
        </li>
        <li :class="{'active':statusId=='3'}" @click="changeStatus('3')">
          待退货<span v-if="orderInfo.orderReturnCaculatePO && orderInfo.orderReturnCaculatePO.returnGood>0">({{ orderInfo.orderReturnCaculatePO.returnGood }})</span>
        </li>
        <li :class="{'active':statusId=='4'}" @click="changeStatus('4')">
          待退款<span v-if="orderInfo.orderReturnCaculatePO && orderInfo.orderReturnCaculatePO.returnMoney>0">({{ orderInfo.orderReturnCaculatePO.returnMoney }})</span>
        </li>
        <li :class="{'active':statusId=='5'}" @click="changeStatus('5')">
          已退款<span v-if="orderInfo.orderReturnCaculatePO && orderInfo.orderReturnCaculatePO.returnComplete>0">({{ orderInfo.orderReturnCaculatePO.returnComplete }})</span>
        </li>
        <li :class="{'active':statusId=='6'}" @click="changeStatus('6')">
          审核不通过<span v-if="orderInfo.orderReturnCaculatePO && orderInfo.orderReturnCaculatePO.returnNotpass>0">({{ orderInfo.orderReturnCaculatePO.returnNotpass }})</span>
        </li>
      </ul>
    </div>
    <div v-if="orderInfo.data&&orderInfo.data.length>0" class="order-list">
      <div v-for="(data,orderIndex) in orderInfo.data" :key="orderIndex" class="order-item">
        <div class="order-title">
          <div>
            <span class="font-px16 color-999 mg-right-px10">订单号：{{ data.orderId }}</span>
            <span class="font-px16 color-999">退款单号：{{ data.orderReturnId }}</span>
          </div>
          <div>
            <span class="font-px16 color-999 pd-lr-px30">申请时间：{{ data.applyDate }}</span>
            <span class="font-px16 color-FF7900 mg-left-px30">
              <span v-if="data.statusId=='RETURN_ING'">审核中</span>
              <span v-if="data.statusId=='RETURN_PASS' && data.returnType==true && data.refundType==false">待退货</span>
              <span v-if="data.statusId=='RETURN_PASS'&&(data.returnType==false||data.refundType==true)">待退款</span>
              <span v-if="data.statusId=='RETURN_COMPLETE'">已退款</span>
              <span v-if="data.statusId=='RETURN_NOTPASS'">审核不通过</span>
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
            <p class="font-px14 color-999">
              <span>商品总价：</span>
              <span>¥ {{ data.productTotal | numberTofixed }}</span>
            </p>
            <p v-if="data.orderMoneyVO.crossStoreTotal" class="font-px14 color-999">
              <span>跨店满减：</span>
              <span> -￥{{ data.orderMoneyVO.crossStoreTotal | numberTofixed }}</span>
            </p>
            <p v-if="data.orderMoneyVO.couponTotal" class="font-px14 color-999">
              <span>优惠券：</span>
              <span> -￥{{ data.orderMoneyVO.couponTotal | numberTofixed }}</span>
            </p>
            <p class="font-px14 color-999">
              <span>药神卡：</span>
              <span> -￥{{ data.orderMoneyVO.cardTotal | numberTofixed }}</span>
            </p>
            <p class="font-px14 color-999">
              <span>运费：</span>
              <span>+ ¥ {{ data.orderMoneyVO.freight | numberTofixed }}</span>
            </p>
            <p class="font-px14 color-999">
              <span>订单总价：</span>
              <span>¥ {{ data.grandTotal | numberTofixed }}</span>
            </p>
            <p class="font-px14 color-FF7900">
              <span>退还药神卡金额：</span>
              <span>￥{{ data.orderMoneyVO.cardTotal | numberTofixed }}</span>
            </p>
            <p class="font-px14 color-FF7900">
              <span>退款金额：</span>
              <span>¥ {{ data.grandTotal | numberTofixed }}</span>
            </p>
          </div>
          <div class="order-right">
            <div v-if="data.statusId=='RETURN_PASS'&&data.returnType==true&&data.shipmentList.length==0" class="btn-00A47C" @click="courierNum(data.orderReturnId)">
              快递单号
            </div>
            <div class="btn-FF7900" @click="goToOrderDetails(data)">
              详情
            </div>
          </div>
        </div>
        <div v-if="data.statusId=='RETURN_NOTPASS'" class="order-footer">
          {{ data.returnComments }}
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
    <!-- 新建/编辑地址弹窗 -->
    <el-dialog title="请输入快递单号" width="800px" top="25vh" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="请输入快递公司：" :label-width="formLabelWidth" required>
          <el-input v-model="expressCompany" type="text" placeholder="请输入快递公司" />
        </el-form-item>
        <el-form-item label="请输入快递单号：" :label-width="formLabelWidth" required>
          <el-input v-model="expressCode" type="text" placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item>
          <p class="font-px14 color-FF7900 text-cen">
            商家收货后，进入退款流程
          </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialog-btn-cancel" @click="dialogFormVisible=false">
          取消
        </el-button>
        <el-button type="primary" class="dialog-btn" @click="save()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, addShipment } from '~/api/order';
export default {
  layout: 'secondPageUser',
  name: 'OrderPage',
  data() {
    return {
      statusId: 'ALL', // 1 审核中 3 退货 4 退款 5 已退款 6 审核不通过
      pageIndex: 1,
      pageSize: 10,
      orderInfo: {}, // 订单列表
      dialogFormVisible: false, // 快递弹框
      formLabelWidth: '150px', // 快递表单标签宽度
      orderReturnId: '', // 退款单号
      expressCompany: '', // 快递公司
      expressCode: '', // 快递单号
    };
  },

  created() {},

  activated() {},

  mounted() {
    this.statusId = this.$route.query.statusId?this.$route.query.statusId:'';
    this.getOrderList();
  },

  methods: {
    // 订单号弹框
    courierNum(orderReturnId) {
      this.dialogFormVisible = true;
      this.orderReturnId = orderReturnId;
      this.expressCompany= ''; // 快递公司
      this.expressCode=''; // 快递单号
    },
    // 填写快递信息
    save() {
      if (!this.expressCompany) {
        this.$message({
          message: '快递公司不能为空！',
          type: 'error',
          duration: 1500
        });
      } else if (!this.expressCode) {
        this.$message({
          message: '快递单号不能为空！',
          type: 'error',
          duration: 1500
        });
      } else {
        addShipment({
          orderId: this.orderReturnId,
          expressCompany: this.expressCompany,
          expressCode: this.expressCode,
        }).then(data => {
          if (data.code == '0000') {
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 1500
            });
            this.dialogFormVisible = false;
            this.expressCompany = '';
            this.expressCode = '';
            this.changeStatus('3');
          }
        });
      }
    },
    // 获取我的订单列表
    getOrderList() {
      let status = this.statusId;
      orderList({
        statusId: 'ORDER_RETURN',
        returnStatusId: status,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        groupFlag: 'N'
      }).then(res => {
        if (res.code=='0000') {
          this.orderInfo = res;
        }
      });
    },
    // 切换订单状态查询订单列表
    changeStatus(status) {
      this.statusId = status;
      this.pageIndex = 1;
      this.getOrderList();
      this.$router.replace({
        path: '/user/orderReturn',
        query: {
          statusId: status
        }
      }).catch((err) => {});
    },
    // 跳转订单详情
    goToOrderDetails(data) {
      this.$router.push({ path: '/user/orderDetails', query: { parentOrderId: data.orderReturnId, flag: 'return' }});
    },
    // 跳转详情
    goToHome() {
      this.$router.push({ path: '/' });
    }
  }
};

</script>
<style>
/* 覆盖 dialog 样式 */
.order-return-page .el-dialog__title{
  font-size:16px !important;
  color:rgba(0,0,0,0.85) !important;
  line-height:24px !important;
}
.order-return-page .el-dialog__body{
  width: 500px;
  margin: 0 auto;
}
.order-return-page .el-form-item__label{
  color: #333333;
}
.order-return-page .el-textarea__inner{
  height: 80px;
}
.order-return-page .el-cascader{
  width: 100%;
}
.order-return-page .dialog-footer{
  text-align: center;
}
.order-return-page .dialog-btn-cancel{
  width: 49px;
  height: 24px;
  background: #FFFFFF;
  border-radius: 2px;
  font-size:14px;
  font-weight:400;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.65);
  line-height: 0px;
  text-align: center;
  padding: 0;
}
.order-return-page .dialog-btn{
  width: 49px;
  height: 24px;
  background: #00A47C;
  border-radius: 2px;
  font-size:14px;
  font-weight:400;
  border: 1px solid #00A47C;
  line-height: 0px;
  text-align: center;
  padding: 0;
}
</style>
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
      min-width: 123px;
      text-align: center;
      height: 22px;
      border-right: 1px solid #D2D2D2;
      line-height: 22px;
      padding: 0px 20px;
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
  .order-footer{
    background: #FE9E24;
    font-size: 16px;
    color: #FFFFFF;
    padding: 10px 20px;
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
      padding: 0px 20px;
      display: flex;
      justify-content: space-between;
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