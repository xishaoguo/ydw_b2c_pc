<template>
  <div class="nav-content">
    <div class="nav-container yd-container flex-box">
      <div class="nav-left" />
      <div class="nav-center">
        <el-carousel trigger="click" height="340px" class="lun-bo">
          <el-carousel-item v-for="(item,index) in ROTATION_BANNER" :key="index">
            <img :src="item.imageUrl" alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="nav-right">
        <img src="~assets/img/home/sjrzgg.png" alt="">
        <div class="marshalling" />
        <el-carousel height="20px" style="margin-top: 7px;" direction="vertical" :autoplay="true" indicator-position="none" class="marshalling-content">
          <el-carousel-item v-for="(item,index) in YDW_NEWS" :key="index">
            <nuxt-link :to="{name: 'transverse-articleDetails',query: {index: index}}">
              <div class="medium">
                {{ item.slogan }}
              </div>
            </nuxt-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { homeBanner } from '~/api/home';
export default {
  name: 'Nav',
  components: {

  },
  data() {
    return {
      INDEX_BANNER_LEFT: [],
      INDEX_BANNER_RIGHT: [],
      INDEX_BANNER_R_DOWN: [],
      INDEX_BANNER_R_UP: [],
      KING_KONG_ICON: [],
      ROTATION_BANNER: [],
      YDW_NEWS: [],
    };
  },
  watch: {

  },
  created() {
    this.getBannerData();
  },
  mounted() {

  },
  methods: {
    getBannerData() {
      homeBanner().then((data) => {
        if (data.code === '0000') {
          this.INDEX_BANNER_LEFT=data.data.INDEX_BANNER_LEFT;
          this.INDEX_BANNER_RIGHT=data.data.INDEX_BANNER_RIGHT;
          this.INDEX_BANNER_R_DOWN=data.data.INDEX_BANNER_R_DOWN;
          this.INDEX_BANNER_R_UP=data.data.INDEX_BANNER_R_UP;
          this.KING_KONG_ICON=data.data.KING_KONG_ICON;
          this.ROTATION_BANNER=data.data.ROTATION_BANNER;
          this.YDW_NEWS = data.data.YDW_NEWS;
        }
      });
    }
  },
};
</script>

<style lang="scss">
.nav-content {
  background: white;
  width: 100%;
  .nav-container {
    display: flex;
    align-items: flex-start;
    .nav-left {
      position: relative;
    }
    .nav-center {
      flex-grow: 1;
      margin-left: 190px;
      .el-carousel {
        .el-carousel__indicators {
          .el-carousel__button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }
        }
        .el-carousel__container {
          button {
            display: none;
          }
        }
        .el-carousel__indicator--horizontal {
          padding: 12px 8px;
        }
      }
    }
    .nav-right {
      width: 202px;
      height: 340px;
      background: #EFFAFA;
      & img {
        width: 100%;
        height: 259px;
      }
      & .marshalling {
        width: 117px;
        height: 30px;
        background: url('~assets/img/home/marshalling.png');
        background-size: 100%;
        margin-left: 20px;
        margin-top: 10px;
      }
      .medium {
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #666666;
        line-height: 22px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .marshalling-content {
        margin-top: 7px;
        margin-left: 20px;
        text-align: left;
      }
      .el-carousel__item {
        background: none;
      }
    }
  }
}
</style>
