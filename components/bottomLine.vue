<template>
  <div class="container-bottom">
    <div class="container-bottom-line" :style="lineStyle" />
    <div class="container-bottom-text" :style="textStyle">
      {{ text }}
    </div>
    <div class="container-bottom-line" :style="lineStyle" />
  </div>
</template>
<script>
export default {
  name: 'BottomLine',
  props: {
    text: {
      type: String,
      default: '已经到底了'
    },
    lineStyle: {
      type: Object,
      default: () => {
        return {
          height: '1px',
          background: '#D2D2D2'
        };
      }
    },
    textStyle: {
      type: Object,
      default: _ => {
        return {
          fontSize: '14px',
          paddingLeft: '92px',
          paddingRight: '92px',
          color: 'rgba(153,153,153,1)'
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
  .container-bottom {
    padding: 30px 0 60px 0px;
    width: 1200px;
    color: #D2D2D2;
    display: flex;
    align-items: center;
    &-line {
      flex-grow: 1;
    }
    &-text {
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      line-height:20px;
    }
  }
</style>