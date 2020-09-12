<template>
  <div class="report">
    <h1>我要举报</h1>
    <ul>
      <li>
        <p>一、违法和不良信息举报电话：</p>
        <p>4001760518</p>
      </li>
      <li>
        <p>一、举报邮箱：</p>
        <p>40367763@qq.com</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .report {
    h1 {
      height: 49px;
      width: 100%;
      text-align: center;
      line-height: 49px;
      border-bottom: 1px dashed #E5E5E5;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
    ul {
      width: 100%;
      padding: 30px 50px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      & li {
        margin-top: 50px;
        & p:nth-child(1) {
          color: #FF7900;
          font-weight: bold;
        }
      }
      & li:nth-child(1) {
        margin-top: 0px;
      }
    }
  }
</style>