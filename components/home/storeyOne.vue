<template>
  <div class="storey">
    <div class="storey-title">
      <div class="storey-title-left">
        <img src="~assets/img/home/ellipse.png" alt="图标">
        <h3>热卖品牌</h3>
        <span>/1F</span>
      </div>
      <nuxt-link :to="{name:'brand-brandList'}" class="storey-title-right">
        查看更多 <span class="el-icon-arrow-right" />
      </nuxt-link>
    </div>
    <div class="storey-content">
      <storey-item v-for="(item,index) in hotBrand" :key="index" :data="item" />
    </div>
  </div>
</template>
<script>
import storeyItem from '../storeyItem';
export default {
  name: 'StoreyOne',
  components: {
    storeyItem
  },
  props: {
    hotBrand: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      data: {}
    };
  }
};
</script>
<style lang="scss" scoped>
  .storey {
    width: 1200px;
    display: flex;
    flex-flow: column;
    margin-top: 63px;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        font-size:30px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:42px;
        & h3 {
          font-size: 30px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
        & img {
          width: 36px;
          height: 36px;
          margin-right: 16px;
        }
        & span {
          font-size: 20px;
          line-height:20px;
          margin-top: 8px;
        }
      }
      &-right {
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:22px;
        cursor: pointer;
      }
    }
    &-content {
      display: flex;
      margin-top: 20px;
      background: white;
      padding: 18px 0 20px 18px;
    }
  }
</style>