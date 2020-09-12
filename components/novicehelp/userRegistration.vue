<template>
  <div class="register">
    <h1>用户注册</h1>
    <div class="register-content">
      <ul>
        <li>
          <div class="step-number">
            1
          </div>
          <div class="step-text">
            您进入药兜网以后，如果您是个人用户，点击页面顶部左上角的“<span>免费注册</span>”字样进行注册；如果有账号则可以在左上角点击登录进行登录。
          </div>
        </li>
        <li style="align-items: flex-start;">
          <div class="step-line" />
          <div class="step-text">
            <img src="~assets/img/novicehelp/regist_1.png" class="regist-1">
          </div>
        </li>
        <li>
          <div class="step-number">
            2
          </div>
          <div class="step-text">
            点击注册
          </div>
        </li>
        <li>
          <div class="step-line" />
        </li>
        <li>
          <div class="step-number">
            3
          </div>
          <div class="step-text">
            输入<span>手机号</span>、<span>验证码</span>之后，认真阅读服务协议和隐私政策之后，点击“<span>同意并遵守相关协议</span>”
          </div>
        </li>
        <li>
          <div class="step-text">
            <img src="~assets/img/novicehelp/register_2.png" alt="" class="regist-2">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .register {
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
    &-content {
      width: 100%;
      padding: 30px 50px;
      & ul {
        & li {
          display: flex;
          align-items: flex-start;
          .step-number {
            width: 24px;
            height: 24px;
            background: #FFBE43;
            border-radius: 50%;
            text-align: center;
            line-height: 24px;
            color: white;
          }
          .step-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #666666;
            margin-left: 12px;
            margin-top: 3px;
            & .regist-1 {
              width: 330px;
              height: 178px;
              margin-top: 10px;
            }
            & .regist-2 {
              width: 330px;
              height: 330px;
              margin-top: 10px;
              margin-left: -10px;
            }
            span {
              color: #0FAA84;
              font-weight: bold;
            }
            span:hover {
              cursor: pointer;
            }
          }
          .step-line {
            width: 4px;
            border-left: 1px dashed #E5E5E5;
            margin-left: 11px;
          }
        }
        & li:nth-child(2) {
          .step-line {
            height: 278px;
          }
        }
        & li:nth-child(4) {
          .step-line {
            height: 80px;
          }
        }
        & li:nth-child(6) {
          .step-text {
            margin-left: 36px;
          }
        }
      }
    }
  }
</style>