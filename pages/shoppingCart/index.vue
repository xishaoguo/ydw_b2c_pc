<!-- 购物车页面 -->
<template>
  <div class="shopping-cart" @click="closePayPop($event)">
    <!-- 购物车 -->
    <div v-if="shoppingCart.normalList && shoppingCart.normalList.length != 0" class="shopping-list">
      <!-- 表头 -->
      <div class="shopping-title">
        <div class="width410 product-title">
          <div class="width80 select-all">
            <img v-if="shoppingCart.normalList.length !=0 && shoppingCart.checkAll" class="select-icon" src="../../assets/img/common/checked.png" alt="选中" @click="cartsSelectAll('PRO_ALL')">
            <img v-else-if="shoppingCart.normalList.length == 0" class="select-icon" src="../../assets/img/common/disabled-check.png" alt="禁用">
            <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="未选中" @click="cartsSelectAll('PRO_ALL')">
            <span>全选</span>
          </div>
          <span class="product-title_name">商品信息</span>
        </div>
        <div class="width210">
          <span>价格</span>
        </div>
        <div class="width210">
          <span>数量</span>
        </div>
        <div class="width210">
          <span>小计</span>
        </div>
        <div class="width140">
          <span>操作</span>
        </div>
      </div>
      <!-- 购物车商品 -->
      <div v-for="(item,normalIndex) in shoppingCart.normalList" :key="normalIndex" class="shopping-product">
        <div class="store-info">
          <!-- 店铺被选中 -->
          <img v-if="item.buyStatus && item.supplierChecked" class="select-icon" src="../../assets/img/common/checked.png" alt="选中" @click.stop="checkItemAll(normalIndex,item,'PRO_PARTY')">
          <!-- 店铺禁用 -->
          <img v-else-if="!item.buyStatus" class="select-icon" src="../../assets/img/common/disabled-check.png" alt="禁用">
          <!-- 店铺未被选中 -->
          <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="未选中" @click.stop="checkItemAll(normalIndex,item,'PRO_PARTY')">
          <img class="store-icon" src="../../assets/img/common/store-prod.png" alt="店铺" @click.stop="gotoStore(item)">
          <span @click.stop="gotoStore(item)">{{ item.groupName }}</span>
          <i class="el-icon-arrow-right" @click.stop="gotoStore(item)" />
        </div>
        <div v-for="(product,productIndex) in item.productList" :key="productIndex" class="product-item">
          <!-- 有效商品信息 -->
          <div class="width410 product-info">
            <!-- 商品被选中 -->
            <img v-if="!product.unableBuy && product.check" class="select-icon" src="../../assets/img/common/checked.png" alt="选中" @click="cartsSelectOne(product,'PRO_CHECKED')">
            <!-- 商品无货或下架 -->
            <img v-else-if="product.quantityOnHandTotal == 0 || !product.shelf || product.unableBuy" class="select-icon" src="../../assets/img/common/disabled-check.png" alt="禁用">
            <!-- 商品未被选中 -->
            <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="未选中" @click="cartsSelectOne(product,'PRO_CHECKED')">
            <div class="product-img">
              <!-- 商品图 -->
              <img v-if="product.imageUrl||product.imageUrl==''" :src="product.imageUrl+'?x-oss-process=image/resize,m_mfit,h_152,w_152'" alt="商品图">
              <!-- 商品默认图 -->
              <img v-else src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
            </div>
            <div class="product-content">
              <div class="product-name txt-cut">
                <p>
                  <span v-if="product.rx=='Y'" class="mark-rx">处方药</span>
                  <span>{{ product.internalName }}</span>
                </p>
              </div>
              <div class="product-size">
                <p>{{ product.productSize }}</p>
                <p>{{ product.producer }}</p>
              </div>
            </div>
          </div>
          <!-- 价格 -->
          <div class="width210 product-price">
            <span class="rmb">￥</span>
            <span class="num">{{ product.price }}</span>
          </div>
          <!-- 数量 -->
          <div class="width210">
            <div class="product-input">
              <div @click.stop="reduce(product,'PRO_QUANTITY')">
                <img v-if="product.goodsNum>1" src="../../assets/img/common/cardSub.png" alt="减">
                <img v-if="product.goodsNum<=1" src="../../assets/img/common/graycardSub.png" alt="不可减">
              </div>
              <input v-model="product.goodsNum" type="number" class="intoNumber" @change="changeNum(product,'PRO_QUANTITY')">
              <div @click.stop="add(product,'PRO_QUANTITY')">
                <img src="../../assets/img/common/cardAdd.png" alt="加">
              </div>
            </div>
            <div class="font-px14 color-999">
              库存{{ product.quantityOnHandTotal }}
            </div>
          </div>
          <!-- 小计 -->
          <div class="width210 product-price">
            <span class="rmb">￥</span>
            <span class="num">{{ product.totalPrice }}</span>
          </div>
          <!-- 操作 -->
          <div class="width140">
            <span class="product-del" @click="balanceDel('each',product.productId)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车总计 -->
    <div v-show="shoppingCart.normalList && shoppingCart.normalList.length != 0" id="shopping-account" />
    <div v-if="shoppingCart.normalList && shoppingCart.normalList.length != 0" class="shopping-account" :class="{'shopping-account-fixed':isfixed}">
      <div>
        <div class="width80 select-all">
          <img v-if="shoppingCart.normalList.length !=0 && shoppingCart.checkAll" class="select-icon" src="../../assets/img/common/checked.png" alt="选中" @click="cartsSelectAll('PRO_ALL')">
          <img v-else-if="shoppingCart.normalList.length == 0" class="select-icon" src="../../assets/img/common/disabled-check.png" alt="禁用">
          <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="未选中" @click="cartsSelectAll('PRO_ALL')">
          <span class="font-px16 color-666">全选</span>
        </div>
        <span class="font-px16 color-666" @click="balanceDel('all','')">删除选中项</span>
      </div>
      <div>
        <span class="font-px16 color-999 mg-right-px30">已选择{{ count }}件商品</span>
        <span class="font-px16 color-999">商品总价（不含运费）：</span>
        <span class="font-px30 color-FF7900 mg-right-px30">￥{{ shoppingCart.grandTotal }}</span>
        <div class="font-px16 color-fff font-weight-500 account-btn" @click="balance()">
          <p>去结算</p>
          <!-- 处方结算二维码 -->
          <div v-if="rxStatus" class="account-btn-ewm">
            <div class="ewm-tip">
              <p class="font-px14 color-666">
                您购买的商品中含有处方药
              </p>
              <p class="font-px12 color-999">
                请扫描二维码在手机端完成结算
              </p>
              <div class="ewm-img-box">
                <div class="ewm-img">
                  <img src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
                </div>
              </div>
              <div class="ewm-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车无数据 -->
    <div v-if="isCartEmpty" class="shopping-emtry">
      <img src="../../assets/img/common/emtry.png" alt="购物车无数据">
      <p>
        <span class="font-px14 color-666">您的购物车还没有商品哦</span><br>
        <span class="font-px14 color-00A47C" @click="goToHome()">去首页逛逛吧！</span>
      </p>
    </div>
    <!-- 失效商品 无货/下架商品列表-->
    <div v-if="shoppingCart.InvalidList && shoppingCart.InvalidList.length != 0" class="shopping-list">
      <div class=" shopping-headline">
        <span class="font-px20 color-666">失效商品</span>
        <span v-if="deteleList.length!=0" class="font-px16 color-00A47C" @click="deleteInvalid('all','')">删除选中项</span>
      </div>
      <!-- 表头 -->
      <div class="shopping-title invalid-list">
        <div class="width410 product-title">
          <div class="width80 select-all">
            <img v-if="deteleCheckAll" class="select-icon" src="../../assets/img/common/checked.png" alt="" @click="checkInvalidAll()">
            <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="" @click="checkInvalidAll()">
            <span>全选</span>
          </div>
          <span class="product-title_name">商品信息</span>
        </div>
        <div class="width210">
          <span>价格</span>
        </div>
        <div class="width210" />
        <div class="width210" />
        <div class="width140">
          <span>操作</span>
        </div>
      </div>
      <!-- 购物车商品 -->
      <div class="shopping-product">
        <div v-for="(product,productIndex) in shoppingCart.InvalidList" :key="'productsInvalid-' + productIndex" class="product-item">
          <!-- 商品信息 -->
          <div class="width410 product-info">
            <img v-if="product.deteleCheck" class="select-icon" src="../../assets/img/common/checked.png" alt="选中" @click="checkInvalid(product)">
            <img v-else class="select-icon" src="../../assets/img/common/no-check.png" alt="未选中" @click="checkInvalid(product)">
            <div class="product-img">
              <img v-if="product.imageUrl||product.imageUrl==''" :src="product.imageUrl+'?x-oss-process=image/resize,m_mfit,h_152,w_152'" alt="商品图">
              <img v-else src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
              <img class="sold-out" src="../../assets/img/common/sold-out.png" alt="无货">
            </div>
            <div class="product-content">
              <div class="product-name txt-cut">
                <p>{{ product.internalName }}</p>
              </div>
              <div class="product-size">
                <p>{{ product.productSize }}</p>
                <p>{{ product.producer }}</p>
              </div>
            </div>
          </div>
          <!-- 价格 -->
          <div class="width210 product-price">
            <span class="rmb">￥</span>
            <span class="num">{{ product.price }}</span>
          </div>
          <!-- 数量 -->
          <div class="width210" />
          <!-- 小计 -->
          <div class="width210 product-price" />
          <!-- 操作 -->
          <div class="width140">
            <span class="product-del" @click="deleteInvalid('each',product.productId)">删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShoppingCarts, cartEdit, orderBalance, cartDele } from '~/api/shopping';
export default {
  layout: 'secondPage',
  name: 'ShoppingCart',
  async asyncData() {
    return { };
  },
  data() {
    return {
      isfixed: false, // 结算按钮是否悬浮
      shoppingCart: {
        // 购物车列表
        normalList: [], // 有效商品
        InvalidList: [], // 下架商品
        supplierList: [], // 总商品
        grandTotal: 0, // 总计
        checkAll: false, // 有效商品全选状态
      },
      cartSize: 0, // 购物车商品条数
      deteleCheckAll: false, // 失效商品全选状态
      deteleList: [], // 失效商品删除
      rxStatus: false, // 当前选择中是否有处方药
      count: 0, // 已选择商品统计
      isCartEmpty: false, // 有效商品列表为空
    };
  },
  created() {
    this.getShoppingCarts();
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.scrollListener);
    });
  },
  methods: {
    // 获取购物车
    getShoppingCarts() {
      getShoppingCarts().then(res => {
        if (res.code == '0000') {
          console.log(res);
          this.resetShoppingCart(res);// 购物车列表数据改造
        }
      });
    },
    // 购物车列表数据改造
    resetShoppingCart(res) {
      // 初始化数组
      this.shoppingCart.normalList = [];
      this.shoppingCart.InvalidList = [];
      this.deteleCheckAll = false;
      this.deteleList = [];
      // 请求结果判断
      this.shoppingCart.supplierList = res.supplierList;
      if (res.supplierList && res.supplierList.length != 0) {
        let goodsList = [];
        // 全选状态
        this.shoppingCart.checkAll = res.checkAll;
        res.supplierList.forEach((item) => {
          // 店铺遍历
          this.$set(item, 'productListcopy', []);
          item.productList.forEach((product) => {
            // 商品遍历
            this.$set(product, 'goodsNum', product.quantity); // set属性goodsNum，用于存放输入框数据
            goodsList.push(product.productId);
            // 选中状态
            if (product.maxQuantity && product.goodsNum > product.maxQuantity) {
              product.goodsNum = product.maxQuantity;
            }
            if (product.goodsNum <= product.minQuantity) {
              product.goodsNum = product.minQuantity;
            }
            // 失效商品 true 不可选择商品
            if (product.unableBuy) {
              this.$set(product, 'deteleCheck', false); // 失效商品删除状态
              this.shoppingCart.InvalidList.push(product);
            } else {
              item.productListcopy.push(product);
            }
          });
          // 有效商品遍历true 是可选商品
          this.$set(item, 'productList', item.productListcopy); // 处理不可选择商品
          if (item.buyStatus) {
            this.shoppingCart.normalList.push(item);
          }
        });
        this.cartSize = goodsList.length;
      } else {
        this.cartSize = 0;
      }
      this.isCartEmpty = this.shoppingCart.normalList.length==0 ? true :false;
      // 添加浮点数
      this.shoppingCart.grandTotal = res.grandTotal ?
        parseFloat(res.grandTotal).toFixed(2) :
        '0.00';
      this.checkCount(); // 已选中商品统计
      console.log(this.shoppingCart);
    },
    // 购物车有效商品 全选
    cartsSelectAll(modifyType) {
      this.shoppingCart.checkAll = !this.shoppingCart.checkAll;
      var obj = {
        modifyType: modifyType,
        ischecked: this.shoppingCart.checkAll
      };
      this.editShopping(obj);
    },
    // 购物车商品数量修改公共方法 加/减/改变输入值/全选
    editShopping(obj) {
      cartEdit(obj).then(res => {
        if (res.code=='0000') {
          this.getShoppingCarts();// 购物车列表数据改造
        }
      });
    },
    // 店铺内有效商品 全选
    checkItemAll(index, data, modifyType) {
      data.supplierChecked = !data.supplierChecked;
      var obj = {
        modifyType: modifyType,
        supplieId: data.supplierId,
        ischecked: data.supplierChecked
      };
      this.editShopping(obj);
    },
    // 购物车有效商品 单选
    cartsSelectOne(item, modifyType) {
      item.check = !item.check;
      var obj = {
        modifyType: modifyType,
        productId: item.productId,
        ischecked: item.check,
        quantity: item.goodsNum
      };
      this.editShopping(obj);
    },
    // 增加
    add(product, modifyType) {
      product.goodsNum++;
      var obj = {
        modifyType: modifyType,
        productId: product.productId,
        quantity: product.goodsNum,
        ischecked: product.check
      };
        // 大于限购
      if (product.maxQuantity && product.goodsNum > product.maxQuantity) {
        product.goodsNum = product.maxQuantity;
        this.editShopping(obj);
        // 大于用户可购买
      } else if (product.userBuyedQuantity && product.goodsNum > product.userBuyedQuantity) {
        product.goodsNum = product.userBuyedQuantity;
        this.editShopping(obj);
        // 大于库存
      } else if (product.goodsNum > product.quantityOnHandTotal) {
        product.goodsNum = product.quantityOnHandTotal;
        this.editShopping(obj);
      } else {
        this.editShopping(obj);
      }
    },
    // 减
    reduce(product, modifyType) {
      if (product.goodsNum <= 1) return;
      product.goodsNum--;
      if (product.goodsNum < product.minQuantity) {
        product.goodsNum = product.minQuantity;
        var obj = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj);
      } else {
        var obj1 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj1);
      }
    },
    // 修改输入值
    changeNum(product, modifyType) {
      this.productChangeNum = product.goodsNum;
      this.productChangeId = product.productId;
      let reg = /^[1-9]\d*$/;
      if (product.goodsNum <= 0) {
        product.goodsNum = 1;
      }
      if (!reg.test(product.goodsNum)) {
        product.goodsNum = 1;
      }
      // 订单限购和用户限购同时存在
      if (product.maxQuantity && product.userBuyedQuantity) {
        // 用户限购小于订单限购并数量大于用户限购
        if (product.userBuyedQuantity < product.maxQuantity && product.goodsNum > product.userBuyedQuantity) {
          product.goodsNum = product.userBuyedQuantity;
          var obj = {
            modifyType: modifyType,
            productId: product.productId,
            quantity: product.goodsNum,
            ischecked: product.check
          };
          this.editShopping(obj);
          // 用户限购大于订单限购并数量大于订单限购
        } else if (product.userBuyedQuantity > product.maxQuantity && product.goodsNum > product.maxQuantity) {
          product.goodsNum = product.maxQuantity;
          var obj1 = {
            modifyType: modifyType,
            productId: product.productId,
            quantity: product.goodsNum,
            ischecked: product.check
          };
          this.editShopping(obj1);
        } else {
          var obj2 = {
            modifyType: modifyType,
            productId: product.productId,
            quantity: product.goodsNum,
            ischecked: product.check
          };
          this.editShopping(obj2);
        }
        // 只存在订单限购 并 数量大于订单限购
      } else if (product.maxQuantity && product.goodsNum > product.maxQuantity) {
        product.goodsNum = product.maxQuantity;
        var obj3 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj3);
        // 只存在用户限购并且数量大于用户限购
      } else if (product.userBuyedQuantity && product.goodsNum > product.userBuyedQuantity) {
        product.goodsNum = product.userBuyedQuantity;
        var obj4 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj4);
        // 存在起购数量并数量小于起购
      } else if (product.minQuantity && product.goodsNum < product.minQuantity) {
        product.goodsNum = product.minQuantity;
        var obj5 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj5);
        // 数量大于库存时
      } else if (product.quantityOnHandTotal < product.goodsNum) {
        this.$message({
          message: '库存不足，当前库存' + product.quantityOnHandTotal,
          type: 'error',
          duration: 1500
        });
        product.goodsNum = product.quantityOnHandTotal;
        var obj6 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj6);
      } else {
        var obj7 = {
          modifyType: modifyType,
          productId: product.productId,
          quantity: product.goodsNum,
          ischecked: product.check
        };
        this.editShopping(obj7);
      }
    },
    // 有效商品删除
    balanceDel(type, productId) {
      var arr = [];
      if (type=='each') {
        arr.push(productId);
      } else {
        this.shoppingCart.normalList.forEach((item, itemIndex) => {
          const { productList } = item;
          productList.forEach((product, productIndex) => {
            if (product.check) {
              arr.push(product.productId);
            }
          });
        });
      }
      if (arr.length < 1) {
        this.$message({
          message: '请选择删除商品',
          type: 'error',
          duration: 1500
        });
      } else {
        this.$confirm('确认删除宝贝吗？, 是否继续?', '删除宝贝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelButtonClass',
          confirmButtonClass: 'confirmButtonClass'
        })
          .then(() => {
            cartDele({ productIds: arr }).then(res => {
              if (res.code=='0000') {
                this.getShoppingCarts();// 购物车列表数据改造
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            });

          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }
    },
    // 失效商品单选
    checkInvalid(item) {
      // 编辑删除
      item.deteleCheck = !item.deteleCheck;
      if (item.deteleCheck) {
        if (this.deteleList.indexOf(item.productId) == -1) {
          this.deteleList.push(item.productId);
        }
        let flag =this.shoppingCart.InvalidList.every(item => {
          return item.deteleCheck == true;
        });
        if (flag) {
          this.deteleCheckAll = true;
        }
      } else {
        this.deteleCheckAll = false;
        this.deteleList.splice(this.deteleList.indexOf(item.productId), 1);
      }
      console.log(this.deteleList);
    },
    // 失效商品全选
    checkInvalidAll() {
      this.deteleCheckAll = !this.deteleCheckAll;
      this.shoppingCart.InvalidList.forEach(product => {
        if (this.deteleCheckAll) {
          product.deteleCheck = true;
          if (this.deteleList.indexOf(product.productId) == -1) {
            this.deteleList.push(product.productId);
          }
        } else {
          product.deteleCheck = false;
          this.deteleList.splice(this.deteleList.indexOf(product.productId), 1);
        }
      });
      console.log(this.deteleList);
    },
    // 失效商品删除
    deleteInvalid(type, productId) {
      var arr = [];
      if (type=='each') {
        arr.push(productId);
      } else {
        arr = this.deteleList;
      }
      if (arr.length < 1) {
        this.$message({
          message: '请选择删除商品',
          type: 'error',
          duration: 1500
        });
      } else {
        this.$confirm('确认删除宝贝吗？, 是否继续?', '删除宝贝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancelButtonClass',
          confirmButtonClass: 'confirmButtonClass'
        })
          .then(() => {
            cartDele({ productIds: arr }).then(res => {
              if (res.code=='0000') {
                this.getShoppingCarts();// 购物车列表数据改造
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            });

          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }

    },
    // 判断已选商品中是否有处方药
    checkRx() {
      let flag = false;
      this.shoppingCart.normalList.forEach((item, itemIndex) => {
        const { productList } = item;
        productList.forEach((product, productIndex) => {
          if (product.check&&product.rx=='Y') {
            flag =  true;
          }
        });
      });
      return flag;
    },
    // 有效商品选择个数
    checkCount() {
      this.count = 0;
      this.shoppingCart.normalList.forEach((item, itemIndex) => {
        const { productList } = item;
        productList.forEach((product, productIndex) => {
          if (product.check) {
            this.count++;
          }
        });
      });
    },
    // 结算
    balance() {
      // 有效商品
      var arr = [];
      var isBalance = true;
      this.shoppingCart.normalList.forEach((item, itemIndex) => {
        const { productList } = item;
        productList.forEach((product, productIndex) => {
          arr.push(product.check);
          if (product.check) {
            // 防止修改数量直接跳转
            if (this.productChangeId == product.productId) {
              if (this.productChangeNum != product.goodsNum) {
                this.productChangeNum = product.goodsNum;
                isBalance = false;
                return;
              }
            }
          }
        });
      });
      if (arr.indexOf(true) < 0) {
        this.$message({
          message: '请选择结算商品',
          type: 'error',
          duration: 1500
        });
      } else if (this.checkRx()) { // 判断是否有处方药
        // 展示处方药二维码
        this.rxStatus = true;
      } else {
        if (isBalance) {
          orderBalance().then((res) => {
            if (res.code=='0000') {
              if (res.data.error) {
                this.$message({
                  message: res.data.error,
                  type: 'error',
                  duration: 1500
                });
                this.getShoppingCarts();// 购物车列表数据改造
              } else {
                this.$router.push({
                  path: '/shoppingCart/order',
                  query: {
                    buyNowed: 'NO',
                    flag: 'false'
                  }
                });
              }
            }
          });
        }
      }
    },
    // 点击处方药二维码之外区域关闭
    closePayPop(event) {
      var btn = document.querySelector('.account-btn');
      if (btn) {
        if (!btn.contains(event.target)) {
          this.rxStatus = false;
        }
      }
    },
    // 跳转首页
    goToHome() {
      this.$router.push({ path: '/' });
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
      let domTop = document.getElementById('shopping-account').offsetTop; // shopping-account 距离顶部的高度
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight; // 可视区域高度
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 页面滚动高度
      if (domTop > clientHeight) {
        this.isfixed = true;
        if (domTop - scrollTop < clientHeight) {
          this.isfixed = false;
        }
      }
    }
  }
};
</script>
<style>
</style>
<style scoped lang="scss">
.width80 {
  width: 80px;
}
.width410 {
  width: 410px;
}
.width210 {
  width: 210px;
}
.width140 {
  width: 140px;
}
.select-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.store-icon {
  width: 23px;
  height: 23px;
  margin-right: 3px;
}
.select-all {
  height: 44px;
  display: flex;
  align-items: center;
}
.shopping-cart {
  min-width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
}
//大字标题
.shopping-headline {
  margin: 40px 0px 20px 0px;
  display: flex;
  align-items: center;
  span {
    margin-right: 30px;
  }
}
// 表头
.shopping-title {
  display: flex;
  align-items: center;
  text-align: center;
  height: 44px;
  font-size: 16px;
  color: #999999;
  background-color: #f6f6f6;
  padding-left: 20px;
  .product-title {
    display: flex;
    align-items: center;
  }
  .product-title_name {
    flex: 1;
  }
}
.invalid-list{
  margin-bottom: 30px;
}
//购物车商品
.shopping-product {
  border-bottom: 1px dashed #d2d2d2;
  &:last-child{
    border: 0;
  }
}
// 店铺
.store-info {
  padding-left: 20px;
  font-size: 16px;
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
.product-item {
  display: flex;
  align-items: center;
  padding-left: 20px;
  text-align: center;
  margin-bottom: 30px;
  .product-info {
    display: flex;
    align-items: center;
  }
  .product-img {
    width: 120px;
    height: 120px;
    margin-right: 18px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sold-out {
      position: absolute;
      width: 80px;
      height: 80px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .product-content {
    width: 221px;
    height: 120px;
    flex: 1;
    text-align: left;
    position: relative;
    .product-name {
      font-size: 16px;
      line-height: 22px;
      color: #666666;
      -webkit-line-clamp: 3;
    }
    .product-size {
      position: absolute;
      bottom: 0px;
      font-size: 12px;
      color: #999999;
    }
  }
  .product-price {
    color: #ff7900;
    .rmb {
      font-size: 16px;
      letter-spacing: -6px;
    }
    .num {
      font-size: 20px;
    }
  }
  .product-input {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #d2d2d2;
    width: 110px;
    height: 32px;
    margin: 0 auto 4px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 32px;
    }
    img {
      width: 10px;
    }
    input {
      width: 65px;
      height: 32px;
      border-left: 1px solid #d2d2d2;
      border-right: 1px solid #d2d2d2;
      padding: 0px 0px 0px 12px;
      text-align: center;
    }
  }
  .product-del {
    color: #00a47c;
    font-size: 16px;
  }
}
//去结算
.shopping-account {
  width: 1200px;
  height: 80px;
  background: rgba(246, 246, 246, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  & > div {
    display: flex;
    align-items: center;
  }
  .account-btn {
    width: 160px;
    height: 40px;
    background: #00a47c;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
}
.shopping-account-fixed {
  position: fixed;
  bottom: 0px;
}
//结算二维码
.account-btn-ewm {
  position: absolute;
  width: 208px;
  height: 220px;
  right: -20px;
  bottom: 35px;
  text-align: center;
  .ewm-tip {
    padding-top: 20px;
    background-color: #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    p {
      line-height: 22px;
    }
  }
  .ewm-img {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ewm-img-box {
    padding-bottom: 20px;
    background-color: #ffffff;
    z-index: 10;
    position: relative;
  }
  .ewm-arrow {
    width: 18px;
    height: 18px;
    background: #ffffff;
    transform: rotate(45deg);
    margin: 0 auto;
    position: absolute;
    bottom: 17px;
    z-index: 0;
    left: 95px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  }
}
//购物车无数据
.shopping-emtry {
  padding: 80px 0px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 22px;
  img {
    margin-right: 30px;
  }
}

</style>
