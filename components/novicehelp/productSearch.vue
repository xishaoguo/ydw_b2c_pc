<template>
  <div class="product-search">
    <h1>商品搜索</h1>
    <div class="product-search-content">
      <ul>
        <li>
          <div>
            <img src="~assets/img/novicehelp/bond_icon.png" alt="" class="bond-icon">
          </div>
          <div class="step-text">
            药兜网是专业的互联网药品交易平台，为您提供便捷、快速订购的交易服务。药兜网的药品信息均为全国各地的药房商家发布的真实信息，您可以放心的在网上选购您需要的药品。
          </div>
        </li>
        <li>
          <div class="step-line" />
          <div class="step-text" />
        </li>
        <li>
          <div class="step-number">
            1
          </div>
          <div class="step-text">
            <h2>如果搜索商品：</h2>
            在页面头部中间的搜索栏，输入您要查询的药品关键字（如：商品名、批准文号、通用名等。）即可进行药品搜索。
          </div>
        </li>
        <li>
          <div class="step-line" />
          <div class="li-img">
            <img src="~assets/img/novicehelp/productSearch_1.png" alt="">
          </div>
        </li>
        <li>
          <div class="step-number">
            2
          </div>
          <div class="step-text">
            点击<span>搜索</span>，就会展示跟您搜索关键词相关的药品。
          </div>
        </li>
        <li>
          <div class="li-img2">
            <img src="~assets/img/novicehelp/productSearch_2.png" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .product-search {
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
          .bond-icon {
              width: 24px;
              height: 24px;
            }
          .step-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #666666;
            margin-left: 12px;
            margin-top: 3px;
            max-width: 870px;
            span {
              color: #0FAA84;
              font-weight: bold;
            }
          }
          .step-line {
            width: 4px;
            border-left: 1px dashed #E5E5E5;
            margin-left: 11px;
          }
          .li-img {
            margin-left: 14px;
            & img {
              width: 674px;
              height: 120px;
            }
          }
          .li-img2 {
            margin-left: 27px;
            & img {
              width: 674px;
              height: 120px;
            }
          }
        }
        & li:nth-child(2) {
          .step-line {
            height: 104px;
            border: none;
          }
        }
        & li:nth-child(4) {
          .step-line {
            height: 209px;
            margin-top: -20px;
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