<template>
  <div class="complaint">
    <h1>我要投诉</h1>
    <ul>
      <li>
        <p>客诉电话：</p>
        <p>400-1760-518</p>
      </li>
      <li>
        <p>客诉邮箱：</p>
        <p>40367763@qq.com</p>
      </li>
      <li>
        <p>工作日：</p>
        <p>9:00  ——   18:00</p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .complaint {
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