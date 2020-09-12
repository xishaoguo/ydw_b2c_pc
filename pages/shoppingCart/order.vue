<!-- 确认订单 页面 -->
<template>
  <div class="order">
    <!-- 收货信息 -->
    <div class="address-box">
      <div class="color-666 font-px20 box-title">
        收货信息
      </div>
      <div class="address-list" :style="{'maxHeight': heightAddress}">
        <div v-for="(item,index) of contactList" :key="index" class="address-item" :class="{'address-active':orderInfo.postAddress.id==item.id}" @click="contactSelectDefault(item)">
          <div class="item-name">
            <div class="color-999 font-px18 item-name-left one-txt-cut">
              <span>{{ item.toName }}</span>
            </div>
            <div class="color-00A47C font-px16 item-default">
              <span v-if="!item.statusId" @click="editeAddressDefault(item)">设为默认地址</span>
              <span @click="editeAddress(item)">编辑</span>
              <!-- <span @click="deleteAddress(item.id)">删除</span> -->
            </div>
          </div>
          <div class="color-999 font-px14 item-phone">
            <span>{{ item.phone }}</span>
          </div>
          <div class="color-999 font-px16 item-details txt-cut">
            <span v-if="item.statusId" class="color-FF7900 font-px12 item-default-mark">默认地址</span>
            <span>{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }} {{ item.addressDetail }}</span>
          </div>
        </div>
        <div @click="addAddress()">
          <img src="../../assets/img/order/no-address.png" alt="">
        </div>
      </div>
      <div class="address-btn" @click="hideOrShow()">
        <span v-if="hideAddress">点击查看/添加更多收货地址</span>
        <span v-if="!hideAddress">收起</span>
        <span class="address-btn-icon">
          <img src="../../assets/img/common/open-arrow.png" alt="展开/收起" :class="{'toTurn':!hideAddress}">
        </span>
      </div>
    </div>
    <!-- 商品金额信息 -->
    <div class="product-account">
      <div class="color-666 font-px20 box-title">
        金额信息
      </div>
      <!-- 待结算商品 -->
      <div class="shopping-list">
        <!-- 表头 -->
        <div class="shopping-title">
          <div class="width410 product-title">
            <span class="product-title_name">商品信息</span>
          </div>
          <div class="width250">
            <span>价格</span>
          </div>
          <div class="width250">
            <span>数量</span>
          </div>
          <div class="width250">
            <span>小计</span>
          </div>
        </div>
        <!-- 订单商品 -->
        <div v-for="(item, index) of orderInfo.supplierList" :key="index" class="shopping-product">
          <!-- 店铺 -->
          <div class="store-info" @click.stop="gotoStore(item)">
            <img class="store-icon" src="../../assets/img/common/store-prod.png" alt="店铺">
            <span>{{ item.supplierName }}</span>
            <i class="el-icon-arrow-right" />
          </div>
          <!-- 商品 -->
          <div v-for="(product,productIndex) of item.productList" :key="productIndex" class="product-item">
            <!-- 商品信息 -->
            <div class="width410 product-info">
              <div class="product-img">
                <img v-if="product.imageUrl" :src="product.imageUrl" alt="商品图">
                <img v-else src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
              </div>
              <div class="product-content">
                <div class="product-name txt-cut">
                  <p>{{ product.internalName }}</p>
                </div>
                <div class="product-size ">
                  <p class="one-txt-cut">
                    {{ product.productSize }}
                  </p>
                  <p class="one-txt-cut">
                    {{ product.producer }}
                  </p>
                </div>
              </div>
            </div>
            <!-- 价格 -->
            <div class="width250 product-price">
              <span class="rmb">￥</span>
              <span class="num">{{ Number(product.currentPrice).toFixed(2) }}</span>
            </div>
            <!-- 数量 -->
            <div class="width250">
              <div class="font-px16 color-999">
                {{ product.quantity }}
              </div>
            </div>
            <!-- 小计 -->
            <div class="width250 product-price">
              <span class="rmb">￥</span>
              <span class="num">{{ Number(product.totalPrice ).toFixed(2) }}</span>
            </div>
          </div>
          <!-- 优惠信息 -->
          <div class="font-px16 color-999 discount-info">
            <!-- <div><span>优惠券：</span><span class="color-FF7900">-￥10</span></div> -->
            <div><span>运费：</span><span>+￥{{ Number(item.subFreightTotal).toFixed(2) }}</span></div>
            <div><span>订单小计：</span><span class="color-FF7900">￥{{ Number(item.subTotal).toFixed(2) }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算金额 -->
    <div id="shopping-account" />
    <div :class="{'shopping-account-fixed':isfixed}">
      <div class="shopping-account">
        <!-- <div class="account-left">
          <div>
            <img class="select-icon" src="../../assets/img/common/no-check.png" alt="">
            <div>
              <p class="font-px20 color-666">
                药神卡(可用余额:100)：
              </p>
              <p class="font-px14 color-999">
                药神卡余额可用于抵扣部分商品金额，暂不支持抵扣运费
              </p>
            </div>
          </div>
          <div class="font-px20 color-FF7900">
            -100
          </div>
        </div> -->
        <div class="account-right">
          <span class="font-px16 color-999">订单实付：</span>
          <span class="font-px30 color-FF7900 mg-right-px30">￥{{ Number(orderInfo.orderTotal).toFixed(2) }}</span>
          <div class="font-px16 color-fff font-weight-500 account-btn" @click="toPayment()">
            <p>提交订单</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建/编辑地址弹窗 -->
    <el-dialog :title="dialogTitle" width="800px" :visible.sync="dialogFormVisible">
      <el-form :model="contact">
        <el-form-item label="收货人" :label-width="formLabelWidth" required>
          <el-input v-model="contact.toName" type="text" autocomplete="off" maxlength="25" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="所在城市" :label-width="formLabelWidth" required>
          <el-cascader v-model="contact.address" :props="props" placeholder="请选择省/市/区(县)" @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" required>
          <el-input v-model="contact.addressDetail" type="textarea" maxlength="120" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" required>
          <el-input v-model="contact.phoneNum" type="tel" maxlength="11" placeholder="请输入手机号" oninput="this.value=this.value.replace(/[^0-9.]+/,'');" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <div style="display: flex;align-items: center;">
            <img v-if="contact.statusId" src="../../assets/img/common/checkbox.png" alt="选中" @click="changeStatus()">
            <img v-else src="../../assets/img/common/no-checkbox.png" alt="未选中" @click="changeStatus()">
            <span style="margin-left: 8px;">设为默认地址</span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialog-btn" @click="submit()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findProvCode, confirmOrder, getContactList, contactEdit, contactDele, contactSelectDefault, createOrder } from '~/api/shopping';
export default {
  name: 'Order',
  layout: 'secondPage',
  async asyncData({ route }) {
    let buyNowed = route.query.buyNowed, isNormal = true;
    isNormal = buyNowed && buyNowed == 'NO' ? true :false;
    let [orderInfo, contactList] = await Promise.all([
      // 获取结算数据
      confirmOrder({
        isNormal: isNormal
      }).then((res) => {
        if (res.code=='0000') {
          return res.data;
        }
      }),
      // 获取收货地址列表
      getContactList({
        index: 1,
        page: 1000
      }).then((res) => {
        if (res.code=='0000') {
          return res.data;
        }
      })
    ]);
    return {
      orderInfo, contactList
    };
  },
  data() {
    return {
      hideAddress: true, // 展开地址 默认展开
      heightAddress: '160px', // 地址高度（单个地址区域高度）
      isfixed: false,
      dialogFormVisible: false, // 新建/编辑地址弹框
      formLabelWidth: '80px', // 编辑地址表单标签宽度
      contact: { // 地址表单
        toName: '',
        address: [],
        addressDetail: '',
        phoneNum: '',
        statusId: false,
      },
      dialogTitle: '新增收货地址',
      id: '', // 编辑的联系人id
      productId: '', // H5字段 作用未知
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          setTimeout(() => {
            // 获取地址码
            findProvCode({
              provCode: value
            }).then((res) => {
              const nodes = res.data.map(item => ({
                value: item.provCode,
                label: item.name,
                leaf: level >= 2
              }));
              resolve(nodes);
            });
          }, 100);
        }
      }
    };
  },

  created() {
    this.getContactList();
    this.productId = this.$route.query.productId;
    console.log(this.orderInfo);
  },

  activated() {},

  mounted() {
    this.heightAddress = '160px';
    window.addEventListener('scroll', this.scrollListener);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.scrollListener);
    });
  },

  methods: {
    // 获取确认订单信息
    confirmOrder() {
      let buyNowed = this.$route.query.buyNowed, isNormal = true;
      isNormal = buyNowed && buyNowed == 'NO' ? true :false;
      confirmOrder({
        isNormal: isNormal
      }).then((res) => {
        if (res.code=='0000') {
          this.orderInfo = res.data;
        }
      });
    },
    // 获取收货地址列表
    getContactList() {
      getContactList({
        index: 1,
        page: 1000
      }).then((res) => {
        if (res.code=='0000') {
          this.contactList = res.data;
        }
      });
    },
    // 切换是否默认地址状态
    changeStatus() {
      this.contact.statusId =  !this.contact.statusId;
    },
    // 改变地址信息
    handleChange(data) {
      console.log(this.contact.address);
    },
    // 删除地址
    deleteAddress(id) {
      this.$confirm('确认删除地址？', '删除地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'cancelButtonClass',
        confirmButtonClass: 'confirmButtonClass',
      }).then(() => {
        contactDele({ id }).then(res => {
          if (res.code=='0000') {
            this.confirmOrder();
            this.getContactList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 设为默认地址
    editeAddressDefault(item) {
      let { toName, phone, province, city, area, addressDetail } = item;
      this.id = item.id;
      this.contact.toName = toName;
      this.contact.phoneNum = phone;
      this.contact.addressDetail = addressDetail;
      this.contact.statusId = true;
      this.contact.address[0]=province;
      this.contact.address[1]=city;
      this.contact.address[2]=area;
      this.submit();
    },
    // 新建地址
    addAddress() {
      this.dialogTitle='新增收货地址';
      this.id = '';
      this.contact.toName = '';
      this.contact.phoneNum = '';
      this.contact.addressDetail = '';
      this.contact.statusId = false;
      this.contact.address=[];
      this.dialogFormVisible = true;
    },
    // 编辑地址
    editeAddress(item) {
      this.dialogTitle='编辑收货地址';
      let { toName, phone, province, city, area, addressDetail, statusId } = item;
      this.id = item.id;
      this.contact.toName = toName;
      this.contact.phoneNum = phone;
      this.contact.addressDetail = addressDetail;
      this.contact.statusId = statusId;
      this.contact.address[0]=province;
      this.contact.address[1]=city;
      this.contact.address[2]=area;
      this.dialogFormVisible = true;
    },
    // 添加/编辑联系人
    submit() {
      let { toName, phoneNum, addressDetail, statusId } = this.contact, province='', city='', area='';
      const regPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!toName) {
        this.$message({
          message: '请输入收货人',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!this.contact.address || this.contact.address.length==0) {
        this.$message({
          message: '请选择所在城市',
          type: 'error',
          duration: 1500
        });
        return;
      } else {
        province=this.contact.address[0];
        city=this.contact.address[1];
        area=this.contact.address[2];
      }
      if (!addressDetail) {
        this.$message({
          message: '请输入详细地址',
          type: 'error',
          duration: 1500
        });
        return;
      }
      if (!phoneNum) {
        this.$message({
          message: '请输入手机号码',
          type: 'error',
          duration: 1500
        });
        return;
      } else if (!regPhone.test(phoneNum)) {
        this.$message({
          message: '请输入正确手机号码',
          type: 'error',
          duration: 1500
        });
        return;
      }
      let url, params;

      if (this.id) { // 编辑
        url = '/user/contact/editUse';
        params = { id: Number(this.id), toName, phoneNum, province, city, area, addressDetail, statusId };
      } else { // 添加
        url = '/user/contact/addUse',
        params = { toName, phoneNum, province, city, area, addressDetail, statusId: this.contact.statusId?'1':'0' };
      }
      contactEdit(url, params).then(res => {
        if (res.code == '0000') {
          let msg = '';
          if (this.id) {
            msg = '地址编辑成功';
          } else {
            msg = '地址添加成功';
          }
          this.dialogFormVisible = false;
          this.confirmOrder();
          this.getContactList();
          this.$message({
            message: msg,
            type: 'success',
            duration: 1500
          });
        }
      });
    },
    // 选择收货地址
    contactSelectDefault(item) {
      let { id, toName, phone, province, provinceName, city, cityName, area, areaName, addressDetail } = item;
      contactSelectDefault({
        id,
        fullAddress: provinceName+cityName+areaName+addressDetail,
        receiverName: toName,
        mobile: phone,
        provCode: province,
      }).then(res => {
        if (res.code=='0000') {
          this.confirmOrder();
          this.getContactList();
        }
      });
    },
    // 提交订单 选择支付方式
    toPayment() {
      if (!this.orderInfo.postAddress.id) {
        this.$message({
          message: '您没有选择收货地址!',
          type: 'error',
          duration: 1500
        });
      } else {
        createOrder({
          id: '',
          rxType: '',
          groupFlag: 'N',
          medicationReason: undefined,
          userFamilyName: undefined,
          userFamilyIdCard: undefined,
          reason: undefined,
        }).then(res => {
          if (res.code=='0000') {
            this.$router.push({
              path: '/shoppingCart/payment',
              query: {
                orderId: res.data.orderId,
                productId: this.productId,
                // buyType: res.data.buyType
              }});
          }
        });
      }

    },
    // 展开收起地址列表
    hideOrShow() {
      let num = (this.contactList.length/3)+1;
      if (this.hideAddress) { // 展开
        this.heightAddress = 160*num + 'px';
        this.hideAddress = false;
      } else { // 收起
        this.heightAddress = '160px';
        this.hideAddress = true;
      }
    },
    // 去店铺
    gotoStore(item) {
      console.log('去店铺');
      // this.$router.push({
      //   name: 'storeIndex',
      //   query: {
      //     partyId: item.supplierId,
      //   }
      // });
    },
    // 监听滚动
    scrollListener() {
      let domTop= document.getElementById('shopping-account').offsetTop;// shopping-account 距离顶部的高度
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域高度
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop; // 页面滚动高度
      if (domTop>clientHeight) {
        this.isfixed = true;
        if (domTop-scrollTop<clientHeight) {
          this.isfixed = false;
        }
      }
    },
  }
};

</script>
<style>
/* 覆盖 dialog 样式 */
.order .el-dialog__title{
  font-size:16px !important;
  color:rgba(0,0,0,0.85) !important;
  line-height:24px !important;
}
.order .el-dialog__body{
  width: 500px;
  margin: 0 auto;
}
.order .el-form-item__label{
  color: #333333;
}
.order .el-textarea__inner{
  height: 80px;
}
.order .el-cascader{
  width: 100%;
}
.order .dialog-footer{
  text-align: center;
}
.order .dialog-btn{
  width:160px;
  height:40px;
  background:#00A47C;
  font-size:16px;
  font-weight:500;
  border: 1px solid #00A47C;
}
</style>
<style  scoped lang="scss">
.order{
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
}
// 模块标题
.box-title{
    height: 48px;
}
//收货地址列表
.address-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-height:160px;
    transition: all 1s;
    overflow: hidden;
    &::after{
        content: '';
        width: 390px;
    }
    &>div{
      cursor: pointer;
    }
    .address-item{
        width:390px;
        height:140px;
        background:#FFFFFF;
        border:2px dashed #D2D2D2;
        padding: 12px 20px 20px;
        margin-bottom: 20px;
        .item-name{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                margin-right: 15px;
                &:last-child{
                    margin-right: 0px;
                }
            }
        }
        .item-phone{
            margin: 5px 0px;
        }
        .item-name-left{
          flex: 1;
        }
        .item-default{
          display: none;
          width: 215px;
          text-align: right;
          line-height: 25px;
          height: 27px;
        }
        .item-details{
          word-break: break-all;
        }
        .item-default-mark{
            padding: 1px 5px;
            line-height: 18px;
            background:rgba(255,121,0,0.2);
            box-shadow:0px 6px 12px 0px rgba(74,35,0,0.1);
            border-radius:2px;
            text-align: center;
            text-shadow:0px 6px 12px rgba(74,35,0,0.1);
        }
        &:hover{
          border:2px dashed #FF7900 !important;
          box-shadow:0px 6px 12px 0px rgba(74,35,0,0.1),0px 2px 12px 0px rgba(0,0,0,0.1);
          .item-name-left{
              color: #666666!important;
          }
          .item-details{
              color: #666666!important;
          }
          .item-default{
            display: inline;
          }
        }
    }
    .address-active{
      border:2px dashed #FF7900 !important;
      box-shadow:0px 6px 12px 0px rgba(74,35,0,0.1),0px 2px 12px 0px rgba(0,0,0,0.1);
      .item-name-left{
          color: #666666!important;
      }
      .item-details{
          color: #666666!important;
      }
    }
}
//展开收起按钮
.address-btn{
    width: 1200px;
    height: 50px;
    background: white;
    color: #999999;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    .address-btn-icon{
        width: 16px;
        height: 16px;
        padding-top: 2px;
        padding-left: 5px;
    }
    img{
        transition: all 1s;
    }
    .toTurn{
        transform: rotate(180deg);
    }
}
//商品金额信息
.product-account{
    margin-top: 35px;
    margin-bottom: 60px;
}
.width80{
  width: 80px;
}
.width410{
   width: 410px;
}
.width250{
  width: 250px;
}
.select-icon{
  width:24px;
  height:24px;
  margin-right: 10px;
}
.store-icon{
  width:23px;
  height:23px;
  margin-right: 3px;
}
.select-all{
  height: 44px;
  display: flex;
  align-items: center;
  margin-top: 3px;
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
//订单商品
.shopping-product{
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
    margin-bottom: 30px;
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
        width: 100%;
      }
    }
    .product-price{
      color: #999999;
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
//优惠信息
.discount-info{
    width: 1200px;
    height: 44px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    &>div{
      margin-left: 40px;
    }
}
//结算金额
.shopping-account{
  width: 1200px;
  height: 80px;
  background: rgba(246,246,246,1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  &>div{
    display: flex;
    align-items: center;
    flex: 1;
    height: 80px;
  }
  .account-left{
    border-right:2px solid #FFFFFF;
    justify-content: space-between;
    padding-right: 20px;
    &>div{
      display: flex;
    }
  }
  .account-right{
    justify-content: flex-end;
  }
  .account-btn{
    width:160px;
    height:40px;
    background:#00A47C;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
}
.shopping-account-fixed{
    position: fixed;
    bottom: 0px;
}
</style>