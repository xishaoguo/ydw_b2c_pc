<template>
  <div class="business-settlement">
    <div class="business-settlement-content">
      <transverseTop />
      <div class="settlement-content-title">
        商家入驻流程
      </div>
      <ul>
        <li>
          <div class="step-number">
            1
          </div>
          <div class="step-right" style="display: flex;align-items: center;">
            点击上面的banner图进入<div class="link-rz" />
          </div>
        </li>
        <li>
          <div class="step-line" />
        </li>
        <li>
          <div class="step-number">
            2
          </div>
          <div class="step-right">
            点击&nbsp;<a class="register-now">立即注册</a>&nbsp;进行注册
          </div>
        </li>
        <li>
          <div class="step-line" />
          <div class="step-img">
            <img src="~assets/img/step_1.png" alt="">
            <img src="~assets/img/step_2.png" alt="">
          </div>
        </li>
        <li>
          <div class="step-number">
            3
          </div>
          <div class="step-right">
            注册成功之后&nbsp;<a class="register-now">填写相关资质信息</a>
          </div>
        </li>
        <li>
          <div class="step-line" />
          <div class="step-img">
            <img src="~assets/img/step_3.png" alt="">
          </div>
        </li>
        <li>
          <div class="step-number">
            4
          </div>
          <div class="step-right">
            药兜网审核通过之后即入驻成功
          </div>
        </li>
        <li>
          <div class="step-line" />
          <div class="step-img">
            <img src="~assets/img/step_4.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    </transversetop>
  </div>
</template>
<script>
import transverseTop from '../../components/transverse/transverseTop';
export default {
  components: {
    transverseTop
  }
};
</script>
<style lang="scss" scoped>
  .business-settlement {
    margin-top: 20px;
    &-content {
      width: 1200px;
      margin: 0 auto;
      .settlement-content-title {
        height: 78px;
        text-align: center;
        line-height: 78px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
        border-bottom: 1px dashed #E5E5E5;
      }
      & ul {
        margin-left: 115px;
        margin-top: 30px;
        & li {
          display: flex;
          align-items: center;
          .step-number {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            color: white;
            line-height: 24px;
            text-align: center;
            background: #FFBE43;
          }
          .step-right {
            margin-left: 12px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            .link-rz {
              width: 94px;
              height: 22px;
              background: url('~assets/img/sjrz_shou.png');
              background-size: 100%;
            }
            .link-rz:hover {
              cursor: pointer;
            }
            .register-now {
              color: #1BAE8A;
              cursor: pointer;
              font-weight: bold;
            }
          }
          .step-line {
            width: 1px;
            border: 1px dashed #E5E5E5;
            margin-left: 11px;
          }
        }
        & li:nth-child(2) {
          .step-line {
            height: 60px;
          }
        }
        & li:nth-child(4) {
          align-items: flex-start;
          .step-img {
            display: flex;
          }
          .step-line {
            height: 443px;
          }
          & img:nth-child(1) {
            width: 330px;
            height: 309px;
            margin-left: 10px;
          }
          & img:nth-child(2) {
            width: 330px;
            height: 362px;
          }
        }
        & li:nth-child(6) {
          align-items: flex-start;
          .step-img {
            display: flex;
          }
          .step-line {
            height: 560px;
          }
          & img:nth-child(1) {
            width: 1047px;
            height: 481px;
            margin-left: 10px;
          }
        }
        & li:nth-child(8) {
          align-items: flex-start;
          .step-img {
            display: flex;
          }
          .step-line {
            height: 254px;
            border: none;
          }
          & img:nth-child(1) {
            width: 233px;
            height: 163px;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>