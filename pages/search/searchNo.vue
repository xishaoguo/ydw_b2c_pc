<template>
  <div class="search-no">
    <div class="search-no-content yd-container">
      <img src="~assets/img/search_no.png" alt="">
      <div>没有找到“<span>硝苯地平</span>”相关的结果，换一个词试试吧~</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .search-no {
    &-content {
      margin-top: 80px;
      margin-bottom: 93px;
      display: flex;
      justify-content: center;
      align-items: center;
      & img {
        width: 145px;
        height: 178px;
      }
      & div {
        margin-left: 30px;
        & span {
          color: #FF7900;
          font-weight: bold;
        }
      }
    }
  }
</style>