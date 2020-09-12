<template>
  <div class="shop">
    <div class="shop-main yd-container">
      <div class="shop-main-top">
        <div class="shop-main-top-img">
          <img :src="shopInfo.merchantLogo" alt="">
        </div>
        <div class="shop-main-top-introduce">
          <ul>
            <li>{{ shopInfo.merchantName }}</li>
            <li>
              <img src="~assets/img/shop/store_location.png" alt="">
              <div>{{ shopInfo.address }}</div>
            </li>
            <li>
              <nuxt-link :to="{name:'shop-storeQualification',query:{images:qualificationsList}}">
                <img src="~assets/img/shop/certification_management.png" alt="">
                <div>查看店铺资质<span class="el-icon-arrow-right" /></div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="shop-main-main">
        <div class="shop-main-main-nav" @mouseover="mouseOver()" @mouseleave="mouseLeave">
          <ul class="shop-main-main-nav-ul">
            <li>全部商品分类</li>
            <li v-for="(item,index) in navList" :key="index" @mouseover="mouseLiOver(index)">
              {{ item.text }}
            </li>
          </ul>
          <div v-show="isMove" class="shop-main-main-nav-child">
            <div v-for="(item,index) in childCategorys" :key="index">
              <ul>
                <li v-for="i in item" :key="i.id" @click="getShopMerchandise(i.id)">
                  <span>{{ i.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="shop-main-main-list">
          <div v-for="(item,index) in productList" :key="index" class="f-box">
            <brandProduct :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import brandProduct from '../../components/brand/brandProduct';
import { pcPartyProductCategorys, getShopInfo } from '~/api/shopping';
import { esSearch } from '~/api/home';
export default {
  components: {
    brandProduct
  },
  data() {
    return {
      navList: [],
      isMove: false,
      partyId: '',
      childCategorys: [],
      productList: [],
      shopInfo: {
        address: null,
        companyName: '',
        customerServicePhone: '',
        enterId: '',
        isClosed: false,
        merchantId: '',
        merchantLogo: '',
        merchantName: '',
        images: []
      },
      qualificationsList: []
    };
  },
  created() {
    this.partyId = this.$route.query.partyId;
    this.getPartyProductCategorys();
    this.getShopInfo();
  },
  methods: {
    /**
     * 获取店铺信息
     */
    getShopInfo() {
      getShopInfo({ shopId: this.partyId }).then((data) => {
        if (data.code === '0000') {
          Object.assign(this.shopInfo, data.data);
          this.qualificationsList = [];
          this.shopInfo.images.forEach(item => {
            this.qualificationsList.push(item.imageUrl);
          });
          console.log('处理后的资质', this.qualificationsList);
        }
      });
    },
    /**
     * 搜索店铺商品
     */
    getShopMerchandise(id) {
      let obj = {
        categoryId: id,
        pageIndex: 1,
        pageSize: 20
      };
      esSearch(obj).then((data) => {
        if (data.code === '0000') {
          this.productList = data.data.products;
        }
      });
    },
    /**
     * 获取店铺全部分类列表
     */
    getPartyProductCategorys() {
      pcPartyProductCategorys({ partyId: this.partyId }).then((data) => {
        if (data.code === '0000') {
          this.navList = data.data;
          this.getShopMerchandise(this.navList[0].children[0].id);
        }
      });
    },
    /**
     * 鼠标移入nav
     */
    mouseOver(index=null) {
      this.isMove = true;
    },
    /**
     * 鼠标移入Li
     */
    mouseLiOver(index) {
      this.childCategorys = this.arrTrans(this.navList[index].children, 9);
    },
    /**
     * 鼠标移出nav
     */
    mouseLeave() {
      this.isMove = false;
    },
    /**
     * 处理分类二级数据
     */
    arrTrans(arr, num) {
      const iconsArr = []; // 声明数组
      arr.forEach((item, index) => {
        const page = Math.floor(index / num); // 计算该元素为第几个素组内
        if (!iconsArr[page]) { // 判断是否存在
          iconsArr[page] = [];
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    }
  }
};
</script>
<style lang="scss" scoped>
  .shop {
    background: url('~assets/img/shop/shop_main_top.png');
    background-size: 100% 120px;
    background-repeat: no-repeat;
    background-color: #F0F0F0;
    &-main {
      &-top {
        height: 120px;
        display: flex;
        align-items: center;
        &-img {
          width: 231px;
          height: 87px;
          background: #ffffff;
          & img {
            width: 100%;
            height: 100%
          }
        }
        &-introduce {
          margin-left: 33px;
          height: 87px;
          & ul {
            & li {
              display: flex;
              & a {
                display: flex;
              }
              & img {
                width: 18px;
                height: 18px;
              }
              & div {
                margin-left: 4px;
              }
            }
            & li:nth-child(1) {
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FF7900;
            }
            & li:nth-child(2) {
              margin-top: 9px;
              & div {
                margin-top: -1px;
              }
            }
            & li:nth-child(3) {
              margin-top: 4px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      &-main {
        display: flex;
        margin-top: 30px;
        &-nav {
          width: 190px;
          height: 380px;
          background: #ffffff;
          position: relative;
          &-ul {
            & li {
              height: 40px;
              text-align: center;
              line-height: 40px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              &:hover {
                cursor: pointer;
                background: #00A47C;
                color: #ffffff;
              }
            }
            & li:nth-child(1) {
              height: 40px;
              background: #E6F7FF;
              &:hover {
                cursor: pointer;
                background: #E6F7FF;
                color: #999999;
              }
            }
          }
          &-child {
            width: 298px;
            height: 340px;
            background: #00A47C;
            position: absolute;
            top: 40px;
            right: -298px;
            padding: 10px 0;
            display: flex;
            & div {
              width: 98px;
              height: 100%;
              & ul {
                & li {
                  width: 100%;
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #FFFFFF;
                  line-height: 20px;
                  padding: 8px 0;
                  text-align: center;
                  &:hover span{
                    cursor: pointer;
                    border-bottom: 1px solid #ffffff;
                  }
                }
              }
            }
          }
        }
        &-list {
          margin-left: 44px;
          width: 966px;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 20px;
          .f-box {
            margin-left: 25px;
            width: 220px;
            height: 345px;
            margin-top: 30px;
          }
          .f-box:nth-child(4n+1) {
            margin-left: 0;
          }
          .f-box:nth-child(1),.f-box:nth-child(2),.f-box:nth-child(3),.f-box:nth-child(4) {
            margin-top: 0;
          }
        }
      }
    }
  }
</style>