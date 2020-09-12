<template>
  <div class="storey">
    <div class="storey-title">
      <div class="storey-title-left">
        <img src="~assets/img/home/heart.png" alt="图标">
        <h3>{{ storeyData.categoryName }}</h3>
        <span>/{{ storeyIndex+2 }}F</span>
      </div>
    </div>
    <storeyContent :storey-data="storeyData" @leftClick="leftClick" />
  </div>
</template>
<script>
import storeyContent from './storeyContent';
export default {
  name: 'Storey',
  components: {
    storeyContent
  },
  props: {
    storeyData: {
      type: Object,
      default: function() {}
    },
    storeyIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 楼层左侧文案点击
     */
    leftClick(item) {
      this.$emit('leftClick', item);
    }
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
          height: 48px;
          margin-right: 16px;
          margin-top: 20px;
        }
        & span {
          font-size: 20px;
          line-height:20px;
          margin-top: 8px;
        }
      }
    }
  }
</style>