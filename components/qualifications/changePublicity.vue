<template>
  <div class="publicity">
    <div>
      <img src="~assets/img/fail.png" alt="">
      <p>暂无公示信息</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .publicity {
    text-align: center;
    font-size: 30px;
    height: 100%;
    &>div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      & img {
        width: 218px;
        height: 239px;
      }
      & p {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
        margin-left: 60px;
      }
    }
  }
</style>