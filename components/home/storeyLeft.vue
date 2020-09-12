<template>
  <div class="store-left">
    <img src="~assets/img/home/floor_1.png" alt="图像">
    <ul>
      <li v-for="item in data" :key="item.categoryId" @click="leftClick(item.products)">
        <span>「&nbsp;</span>{{ item.categoryName }}<span>&nbsp;」</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'StoreyLeft',
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
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
    leftClick(item) {
      this.$emit('leftClick', item);
    }
  }
};
</script>
<style lang="scss" scoped>
  .store-left {
    width: 282px;
    height: 562px;
    & img {
      width: 100%;
      height: 378px;
      display: block;
    }
    & ul {
      height: 184px;
      background: #70CD7E;
      & li {
        font-size:18px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        height: 46px;
        line-height: 46px;
        cursor: pointer;
        & span {
          display: none;
        }
        &:hover {
          color: #333333;
          font-size: 21px;
        }
        &:hover span{
          display: inline;
        }
      }
    }
  }
</style>