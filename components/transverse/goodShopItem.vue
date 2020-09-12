<template>
  <nuxt-link :to="{name:'shop',query:{partyId:itemData.storeId}}">
    <div class="good-shop-item" :style="{background:colorList[colorIndex]}">
      <div class="good-shop-item-img">
        <img :src="itemData.sotreLogoUrl" alt="">
      </div>
      <p class="good-shop-item-company">
        {{ itemData.storeName }}
      </p>
      <!-- <p style="margin-top: 10px;">
        {{ itemData.number }}
      </p> -->
      <!-- <p>{{ itemData.address }}</p> -->
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    },
    colorIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      colorList: [
        '#E6F7FF',
        '#E6FFFB',
        '#F0F5FF',
        '#FFFBE6',
        '#F6FFED',
        '#FFF0F6',
        '#F9F0FF',
        '#FFF1F0',
        '#FFF2E8',
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
  .good-shop-item {
    width: 393px;
    height: 152px;
    background: pink;
    margin-top: 11px;
    text-align: center;
    padding-top: 15px;
    &:hover {
      cursor: pointer;
    }
    &-img {
      width: 116px;
      height: 44px;
      background: white;
      margin: 0 auto 4px;
      & img {
        width: 116px;
        height: 44px;
      }
    }
    & p {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 20px;
    }
    & &-company {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>