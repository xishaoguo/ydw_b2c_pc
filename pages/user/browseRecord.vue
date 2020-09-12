<!-- 浏览记录 -->
<template>
  <div class="my-collection">
    <div class="title-info">
      浏览记录
    </div>
    <!-- 收藏 -->
    <div v-if="!noProductInfo" class="shopping-list">
      <!-- 表头 -->
      <div class="shopping-title">
        <div class="width300 product-title">
          <span class="product-title_name">商品</span>
        </div>
        <div class="width160">
          <span>店铺</span>
        </div>
        <div class="width160">
          <span>价格(元)</span>
        </div>
        <div class="width160">
          <span>库存</span>
        </div>
        <div class="width140">
          <span>操作</span>
        </div>
      </div>
      <!-- 收藏商品 -->
      <div class="shopping-product">
        <div v-for="(productObj,index) in productInfo" :key="index" class="product-item">
          <!-- 商品 -->
          <div class="width300 product-info">
            <div class="product-img">
              <img v-if="productObj.imageUrl" :src="productObj.imageUrl+'?x-oss-process=image/resize,m_mfit,h_346,w_346/format,jpg'" alt="商品图片">
              <img v-else src="../../assets/img/common/prod-default.jpg" alt="商品默认图">
            </div>
            <div class="product-content">
              <div class="product-name txt-cut">
                <p>{{ productObj.productName }}</p>
              </div>
            </div>
          </div>
          <!-- 店铺 -->
          <div class="width160 product-price">
            <span class="font-px14 color-999">{{ productObj.merchantInfo.merchantName }}</span>
          </div>
          <!-- 价格 -->
          <div class="width160">
            <div class="font-px16 color-FF7900">
              <span v-if="productObj.GROUP_PRICE && productObj.GROUP_PRICE.price">¥{{ productObj.GROUP_PRICE.price }}</span>
              <span v-else-if="productObj.PROMO_PRICE && productObj.PROMO_PRICE.price">¥{{ productObj.PROMO_PRICE.price }}</span>
              <span v-else-if="productObj.DEFAULT_PRICE && productObj.DEFAULT_PRICE.price">¥{{ productObj.DEFAULT_PRICE.price }}</span>
              <span v-else>¥{{ productObj.price }}</span>
            </div>
          </div>
          <!-- 库存 -->
          <div class="width160 product-price">
            <span class="font-px14 color-999">{{ productObj.kc }}</span>
          </div>
          <!-- 操作 -->
          <div class="width140 product-btn">
            <span class="btn-no-border">加入购物车</span>
          </div>
        </div>
      </div>
      <div v-if="productInfo&&productInfo.length>0" class="article-list-content-pag pagination">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, total, jumper"
          :total="totle"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 无数据 -->
    <div v-else class="no-order">
      <img src="../../assets/img/common/no-order.png" alt="购物车无数据">
      <p>
        <span class="font-px14 color-666">暂无记录，</span>
        <span class="font-px14 color-00A47C" @click="goToHome()">去首页看看</span>
      </p>
      </divclass="no-order">
    </div>
  </div>
</template>

<script>
import { getBrowseRecordList } from '~/api/user';
export default {
  layout: 'secondPageUser',
  name: 'MyCollection',
  async asyncData() {
    return {
    };
  },
  data() {
    return {
      currentPage: 1,
      totle: 0,
      productInfo: [],
      noProductInfo: false,
    };
  },

  created() {},

  activated() {},

  mounted() {
    this.getBrowseRecordList();
  },

  methods: {
    // 获取商品列表
    getBrowseRecordList() {
      getBrowseRecordList({
        pageIndex: this.currentPage,
        pageSize: 10
      }).then(res => {
        if (res.code=='0000') {
          this.productInfo= res.data.products;
          this.totle = res.data.count;
        }
        if (!res.data || this.totle==0) {
          this.noProductInfo = true;
        } else {
          this.noProductInfo = false;
        }
      });
    },
    // 页码切换
    handleCurrentChange(number) {
      this.currentPage = number;
      this.getBrowseRecordList();
    },
  }
};

</script>
<style  scoped lang="scss">
.my-collection{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.title-info{
    font-size: 20px;
    line-height: 28px;
    color: #666666;
    padding-bottom: 20px;
}
.width300{
   width: 300px;
}
.width160{
  width: 160px;
}
.width140{
  width: 140px;
}
.store-icon{
  width:23px;
  height:23px;
  margin-right: 3px;
}
.shopping-list{
    background: #FFFFFF;
    padding: 20px;
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
  .product-title{
    display: flex;
    align-items: center;
  }
  .product-title_name{
    flex: 1;
  }
}
//收藏商品
.shopping-product{
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
}
//商品信息
.product-item{
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    .product-info{
      display: flex;
    }
    .product-img{
      width:80px;
      height:80px;
      margin-right: 18px;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
      }
    }
    .product-content{
      width:221px;
      flex: 1;
      text-align: left;
      position: relative;
      .product-name{
        font-size: 16px;
        line-height: 22px;
        color: #666666;
        -webkit-line-clamp: 3;
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
.product-btn{
    display: flex;
    flex-direction: column;
    align-items: center;
}
// 无数据
.no-order{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  flex: 1;
  img{
    width: 145px;
    height: 190px;
    margin-right: 30px;
  }
}
.pagination{
  text-align: center;
    padding: 20px;
}
</style>