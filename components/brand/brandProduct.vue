<template>
  <div class="brand-item">
    <nuxt-link :to="{name: 'commodity', query:{productId: data.productId}}">
      <div class="brand-item-box">
        <img :src="data.imageUrl" alt="" class="product-img">
        <ul>
          <li class="product-msg">
            <span>{{ data.productName }}</span>
          </li>
          <li class="manufactor">
            <span>厂家：{{ data.producer }}</span>
          </li>
          <li>
            <div>￥{{ data.price }}</div>
            <img src="~assets/img/shopping_cart_icon2.png" alt="" class="shopping-cart">
          </li>
          <li v-show="data.rx === '1'">
            <div>处方药</div>
          </li>
        </ul>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
  .brand-item {
    width: 220px;
    height: 345px;
    & .product-img {
      width: 220px;
      height: 220px;
    }
    & ul {
      & li {
        & img {
          width: 24px;
          height: 24px;
        }
        & .shopping-cart {
          display: none;
        }
      }
      & li:nth-child(1) {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      & li:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 17px;
      }
      & li:nth-child(3) {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        & div {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FF7900;
          line-height: 22px;
        }
      }
      & li:nth-child(4) {
        margin-top: 10px;
        & div {
          width: 44px;
          height: 18px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #F70C08;
          line-height: 18px;
          border: 1px solid #F70C08;
          text-align: center;
          border-radius: 2px;
        }
      }
      .manufactor {
        display: none;
      }
    }
  }
  .brand-item:hover {
    cursor: pointer;
    transform: scale(1.1);
    background: white;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    height: auto;
  }
  .brand-item:hover .brand-item-box {
    transform: scale(0.9);
  }
  .brand-item:hover .manufactor {
    display: block;
  }
  .brand-item:hover .shopping-cart {
    display: block;
  }
  .brand-item:hover .product-msg {
    overflow: inherit;
    -webkit-box-orient: inherit;
  }
</style>