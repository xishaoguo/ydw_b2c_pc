<template>
  <div class="storey-item">
    <nuxt-link :to="{name: 'brand-brandProductsList',query:{brandId:data.id}}">
      <div>
        <img v-if="data.productUrl" :src="data.productUrl" alt="商品">
        <img v-else src="~assets/img/login.jpg" alt="商品">
        <img :src="data.imageUrl" alt="商标">
        <div class="storey-item-pharmacy">
          {{ data.brandName }}
        </div>
        <div class="storey-item-trade">
          {{ data.slogan }}
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'StoreyItem',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
  .storey-item {
    width: 200px;
    & img:nth-child(1) {
      width: 190px;
      height: 189px;
    }
    & img:nth-child(2) {
      width: 120px;
      height: 52px;
    }
    &-pharmacy {
      height:28px;
      font-size:20px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:28px;
    }
    &-trade {
      height:17px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:17px;
    }
  }
</style>