<template>
  <nuxt-link :to="{name:'commodity',query:{productId: rightItemData.productId}}">
    <div class="storey-right">
      <img :src="rightItemData.imageUrl" alt="商品">
      <div class="storey-right-name">
        {{ rightItemData.productName }}
      </div>
      <div class="storey-right-price">
        <span>￥</span>{{ rightItemData.price }}
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  name: 'StoreyRight',
  props: {
    rightItemData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
  .storey-right {
    display: flex;
    flex-direction: column;
    width: 190px;
    margin-left: 35px;
    & img {
      width: 190px;
      height: 190px;
    }
    &-name {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:22px;
    }
    &-price {
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:bold;
      color:rgba(255,121,0,1);
      line-height:18px;
      margin-top: 5px;
      & span {
        font-size: 12px;
      }
    }
  }
</style>