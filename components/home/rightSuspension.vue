<template>
  <div v-show="isShow" class="right-suspension">
    <ul>
      <li class="right-suspension-code">
        <img src="~assets/img/home/er_code.png" alt="二维码">
        <div>微信扫码</div>
        <div class="right-suspension-show">
          <div class="right-suspension-show_box">
            <div class="box-code">
              <img src="~assets/img/android_code.png" alt="">
              <p class="code-text1">
                关注药兜网公众号
              </p>
              <img src="~assets/img/android_code.png" alt="" style="margin-top: 15px;">
              <p class="code-text2">
                药兜网(安卓)App
              </p>
              <img src="~assets/img/android_code.png" alt="" style="margin-top: 15px;">
              <p class="code-text3">
                药兜网(IOS)App
              </p>
            </div>
            <i class="san-jiao" />
          </div>
        </div>
      </li>
      <li>
        <img src="~assets/img/home/shopping _cart.png" alt="购物车">
        <div>购物车</div>
      </li>
      <li>
        <img src="~assets/img/home/record.png" alt="足迹">
        <div>浏览记录</div>
      </li>
      <li @click="toTop">
        <img src="~assets/img/home/back_to_top.png" alt="回到顶部" style="width: 25px;">
        <div>返回顶部</div>
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
    }
  },
  data() {
    return {};
  },
  methods: {
    toTop() {
      this.$emit('toTop');
    }
  }
};
</script>
<style lang="scss" scoped>
  .right-suspension {
    width: 50px;
    background: #ffffff;
    position: fixed;
    top: 50%;
    transform: translateX(700px);
    right: 50%;
    margin-top: -100px;
    & ul {
      & li {
        border-top: 1px solid #F6F6F6;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        & div {
          display: none;
          width: 30px;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 20px;
          letter-spacing: 1px;
        }
        & img {
          width: 32px;
          height: 32px;
        }
        &:hover img{
          display: none;
        }
        &:hover div{
          display: block;
        }
        &:hover div img{
          display: inline-block;
        }
        &:hover{
          background: #00A47C;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 20px;
          letter-spacing: 1px;
        }
      }
      & li:nth-child(1) {
        border-top: none;
        position: relative;
        .right-suspension-show {
          width: 150px;
          height: 380px;
          position: absolute;
          left: -150px;
          &_box {
            display: block;
            width: 140px;
            height: 100%;
            background: white;
            box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            position: relative;
            padding: 10px 20px;
            & .box-code {
              display: block;
              height: 120px;
              width: 100%;
              & img {
                width: 100px;
                height: 100px;
              }
              & p {
                width: 100%;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: bold;
                color: #999999;
                line-height: 20px;
                position: absolute;
                right: 0px;
              }
              & .code-text1 {
                top: 110px;
              }
              & .code-text2 {
                top: 230px;
              }
              & .code-text3 {
                top: 350px;
              }
            }
            & .san-jiao {
              width: 10px;
              height: 10px;
              position: absolute;
              right: -5px;
              border-left: 5px solid white;
              border-top: 5px solid white;
              box-sizing: border-box;
              border-right: 5px solid transparent;
              border-bottom: 5px solid transparent;
              transform: rotateZ(135deg);
              top: 50%;
              margin-top: -4px;
            }
          }
        }
      }
    }
  }
</style>