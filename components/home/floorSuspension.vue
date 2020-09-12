<template>
  <div v-show="isShow" class="floor-suspension">
    <ul>
      <li :class="floorIndex === 0 ? 'is-floor': ''" @click="jumpFloor(0)">
        热门
      </li>
      <li :class="floorIndex === 1 ? 'is-floor': ''" @click="jumpFloor(1)">
        2F
      </li>
      <li :class="floorIndex === 2 ? 'is-floor': ''" @click="jumpFloor(2)">
        3F
      </li>
      <li :class="floorIndex === 3 ? 'is-floor': ''" @click="jumpFloor(3)">
        4F
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    floorIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    jumpFloor(index) {
      this.$emit('jumpFloor', index);
    }
  }
};
</script>
<style lang="scss" scoped>
  .floor-suspension {
    width: 50px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    transform: translateX(-700px);
    left: 50%;
    margin-top: -100px;
    & ul {
      & li {
        width: 50px;
        height: 50px;
        border-top: 1px solid #F6F6F6;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,164,124,1);
        line-height:50px;
        letter-spacing:1px;
        cursor: pointer;
      }
      & .is-floor {
        background: #00A47C;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>