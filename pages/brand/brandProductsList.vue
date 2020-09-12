<template>
  <div class="brand-product">
    <div class="brand-product-list">
      <ul>
        <li :class="screen===0? 'is-click':''" @click="screeningProducts(0)">
          综合
        </li>
        <li :class="screen===1? 'is-click':''" @click="screeningProducts(1)">
          销量
        </li>
        <li :class="screen===2? 'is-click':''" @click="screeningProducts(2)">
          价格
          <div class="price-icon">
            <div :class="priceType===false && screen===2 ?'price-icon-one-true price-icon-one':'price-icon-one'" />
            <div :class="priceType && screen===2?'price-icon-two-true price-icon-two':'price-icon-two'" />
          </div>
        </li>
      </ul>
      <div class="brand-product-list_item">
        <div v-for="(item,index) in productList" :key="index" class="f-box">
          <brandProduct :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { esSearch } from '~/api/home';
import brandProduct from '../../components/brand/brandProduct';
export default {
  components: {
    brandProduct
  },
  data() {
    return {
      screen: 0,
      priceType: true,
      productList: [],
      formData: {
        pageIndex: 1,
        pageSize: 20,
        brandId: '',
        salesTotal: 'Y'
      }
    };
  },
  created() {
    this.formData.brandId = this.$route.query.brandId;
    this.getProductList();
  },
  methods: {
    /**
     * 获取品牌商品列表
     */
    getProductList() {
      esSearch(this.formData).then((data) => {
        if (data.code === '0000') {
          this.productList = data.data.products;
        }
      });
    },
    screeningProducts(index) {
      this.screen = index;
      if (index === 2) {
        this.priceType = !this.priceType;
        this.priceType?this.formData.isAscending = 'Y': this.formData.isAscending = 'N';
      } else {
        this.priceType = true;
        this.formData.isAscending = undefined;
      }
      this.getProductList();
    }
  }
};
</script>
<style lang="scss" scoped>
  .brand-product {
    background: #F6F6F6;
    &-list {
      width: 1200px;
      margin: 0 auto;
      &>ul {
        padding-top: 30px;
        display: flex;
        & li {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-left: 40px;
          & .price-icon {
            margin-left: 2px;
            &-one {
              width: 8px;
              height: 8px;
              border-left: 4px solid #D2D2D2;
              border-top: 4px solid #D2D2D2;
              border-right: 4px solid transparent;
              border-bottom: 4px solid transparent;
              transform: rotateZ(45deg);
              margin-bottom: -6px;
            }
            &-two {
              width: 8px;
              height: 8px;
              border-left: 4px solid transparent;
              border-top: 4px solid transparent;
              border-right: 4px solid #D2D2D2;
              border-bottom: 4px solid #D2D2D2;
              transform: rotateZ(45deg);
              margin-top: -6px;
            }
            &-one-true {
              border-left: 4px solid #FF7900;
              border-top: 4px solid #FF7900;
            }
            &-two-true {
              border-right: 4px solid #FF7900;
              border-bottom: 4px solid #FF7900;
            }
          }
        }
        & li:nth-child(1) {
          margin-left: 0;
        }
        & li:nth-child(3) {
          display: flex;
          align-items: center;
        }
        & li:hover {
          cursor: pointer;
        }
        .is-click {
          font-weight: 600;
          color: #FF7900;
        }
      }
      &_item {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20px;
        .f-box {
          margin-left: 25px;
          width: 220px;
          height: 345px;
          margin-top: 30px;
        }
        .f-box:nth-child(5n+1) {
          margin-left: 0;
        }
      }
    }
  }
</style>