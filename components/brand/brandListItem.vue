<template>
  <div class="brand-item">
    <nuxt-link :to="{name: 'brand-brandProductsList',query:{brandId:brandData.id}}">
      <div class="brand-item-box">
        <div class="brand-item-box_img">
          <img :src="brandData.imageUrl" alt="">
        </div>
        <p>{{ brandData.brandName }}</p>
        <div class="brand-whter">
          <div class="brand-whter-1" />
          <div class="brand-whter-2" />
          <div class="brand-whter-3" />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: {
    brandData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
  .brand-item {
    margin-top: 30px;
    margin-left: 35px;
    &-box {
      width: 265px;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: white;
      &_img {
        width: 163px;
        height: 70px;
        margin-top: 16px;
        & img {
          width: 100%;
          height: 100%;
        }
      }
      &>p {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 33px;
      }
      .brand-whter {
        width: 100%;
        height: 25px;
        overflow: hidden;
        position: relative;
        &-1 {
          width: 200%;
          height: 100%;
          //background-image: url('~assets/img/whter/aaa.png');
          background-size: cover;
          background-repeat: no-repeat;
          animation: whter1 15s infinite linear;
          position: absolute;
        }
        &-2 {
          width: 200%;
          height: 100%;
          margin-top: -2px;
          //background-image: url('~assets/img/whter/bbb.png');
          background-size: cover;
          background-repeat: no-repeat;
          animation: whter1 10s infinite linear;
          position: absolute;
        }
        &-3 {
          width: 200%;
          height: 100%;
          margin-top: -5px;
          //background-image: url('~assets/img/whter/ccc.png');
          background-size: cover;
          background-repeat: no-repeat;
          animation: whter1 18s infinite linear;
          position: absolute;
        }
      }
    }
  }
  .brand-item:nth-child(1),.brand-item:nth-child(2),
  .brand-item:nth-child(3),.brand-item:nth-child(4) {
    margin-top: 0;
  }
  .brand-item:nth-child(4n+1) {
    margin-left: 0px;
  }
  .brand-item:hover {
    cursor: pointer;
  }
  @keyframes whter1
  {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-265px);
  }
  }
  @keyframes whter2
  {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-265px);
  }
  }
  @keyframes whter3
  {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-265px);
  }
  }
</style>