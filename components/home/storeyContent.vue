<template>
  <div class="storey-content">
    <storeyLeft :data="storeyData.childCategorys" :storey-index="storeyIndex" @leftClick="leftClick" />
    <div class="storey-content-right">
      <storeyRight v-for="(item,index) in rightData" :key="index" :right-item-data="item" />
    </div>
  </div>
</template>
<script>
import storeyLeft from './storeyLeft';
import storeyRight from './storeyRight';
export default {
  name: 'StoreyContent',
  components: {
    storeyLeft,
    storeyRight
  },
  props: {
    storeyData: {
      type: Object,
      default: function() {}
    },
    commodityList: {
      type: Object,
      default: () => {}
    },
    storeyIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rightData: []
    };
  },
  mounted() {
    this.rightData = this.storeyData.childCategorys[0].products;
  },
  methods: {
    leftClick(item) {
      this.rightData = item;
      console.log('这是item', this.rightData);
    }
  }
};
</script>
<style lang="scss" scoped>
  .storey-content {
    display: flex;
    &-right {
      width: 918px;
      background: white;
      height: 562px;
      padding: 20px 18px 20px 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>