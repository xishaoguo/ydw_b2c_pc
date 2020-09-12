<template>
  <div class="header-content">
    <div class="header-container yd-container flex-box">
      <div class="logo">
        <nuxt-link to="/">
          <img class="logo-image" src="../assets/img/logo.png" alt="">
        </nuxt-link>
        <el-carousel height="20px" direction="vertical" :autoplay="true" class="logo-carousel" indicator-position="none">
          <el-carousel-item v-for="(item,index) in qualificationsList" :key="index">
            <nuxt-link :to="{name: 'qualifications',query: {index: index}}">
              <div class="medium">
                {{ item }}<span class="medium-icon el-icon-arrow-right" />
              </div>
            </nuxt-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="search">
        <div class="search-box">
          <input
            ref="inputBox"
            v-model="inpVal" class="search-input font-px14 color-999" type="text" :placeholder="inpPlaceholder"
            @focus="getFocus" @blur="noFocus"
          >
          <button class="search-btn font-px16 color-fff" @click="searchButtonClick">
            搜&nbsp;&nbsp;索
          </button>
          <div v-show="showHistorySearch" ref="showHistoryBox" class="history-search">
            <ul>
              <li class="history-search-first">
                <div>搜索历史</div>
                <div>清空</div>
              </li>
              <li v-for="(item,index) in historySearchData" :key="index" class="history-search-li" @click="historySearchCommit(item)">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="flex-box one-txt-cut">
          <ul class="flex-box one-txt-cut search-list">
            <li v-for="(item, index) in searchList" :key="index" class="font-px12 color-999">
              <a @click="quickSearch(item)">
                {{ item }}
              </a>
            </li>
          </ul>
          <div style="width:100px;" />
        </div>
      </div>
      <div class="shoppin-cart font-px12">
        <div class="shoppin-cart-code">
          <img src="../assets/img/android_code.png">
          <span>扫码下载药兜网(安卓)app</span>
        </div>
        <div class="shoppin-cart-code">
          <img src="../assets/img/ios_code.png">
          <span>扫码下载药兜网(ios)app</span>
        </div>
      </div>
    </div>
    <div class="yd-container flex-box">
      <div class="font-px16 classify-all" @mouseout="setMouseover" @mouseover="getMouseover()" @click="showClass">
        <div class="all-center">
          全部商品分类
          <div v-show="isHome===false" :class="showClassify ? 'fold' : 'fold2'" />
        </div>
        <ul v-show="showClassify" :class="showSecondaryMenu?'classify-item o-a':'classify-item'">
          <li v-for="(item, index) in classifyList" :key="index" @mouseover="getMouseover(item.children)">
            {{ item.text }}
          </li>
        </ul>
        <div v-show="showSecondaryMenu && showClassify" class="classify-item-two">
          <ul v-for="item in classifyListChildren" :key="item.id">
            <li v-for="i in item" :key="i.id">
              <nuxt-link :to="{name:'brand-brandProductsList',query:{id:i.id}}">
                {{ i.text }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="nav-center">
        <ul class="nav-center-navigation">
          <li v-for="(item, index) in navList" :key="index" :class="transverse === item.id ? 'nav-center-navigation-click':''" @click="lateralNavigation(item.id)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from '~/utils/storage';
import { categoryList, recordText } from '~/api/home';
export default {
  name: 'Header',
  components: {},
  fetch() {
    if (this.$route.path === '/') {
      this.isHome = true;
      this.showClassify = true;
    } else {
      this.isHome = false;
      this.showClassify = false;
    }
  },
  data() {
    return {
      qualificationsList: [
        '互联网药品信息服务资格证书：(京)•经营性•2014•0011',
        '营业执照',
        '（京）网械平台备字（2018）第00010号',
        '互联网药品交易资格证书：国 A20160008',
        '食品经营许可证',
        '用户服务协议',
        '平台交易规则',
        '隐私权政策',
        '食品经营者审查登记规范',
        '医疗器械审查登记规范',
      ],
      classifyList: [],
      classifyListChildren: [],
      searchList: [],
      navList: [
        {
          name: '首页',
          id: '1'
        },
        {
          name: '医药咨询',
          id: '2'
        },
        {
          name: '药兜好店',
          id: '3'
        },
        {
          name: '品牌馆',
          id: '4'
        },
        {
          name: '商家入驻',
          id: '5'
        }
      ],
      historySearchData: [
        '眼药水',
        '眼药水',
        '眼药水',
        '眼药水',
        '眼药水',
        '眼药水',
      ],
      cartNumber: 8,
      inpVal: '',
      showSecondaryMenu: false,
      isHome: true,
      showClassify: true,
      inpPlaceholder: '口罩',
      showHistorySearch: false,
      transverse: 0,
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.path === '/') {
        this.isHome = true;
        this.showClassify = true;
      } else {
        this.isHome = false;
        this.showClassify = false;
      }
    }
  },
  created() {
    console.log('vuex的数据', this.$store.state.home.transverse);
    this.getCategoryList();
    this.getRecordText();
  },
  mounted() {
    document.addEventListener('click', (e) => {
      let inp = null;
      if (this.$refs.inputBox) {
        inp = this.$refs.inputBox.contains(e.target);
      }
      if (this.$refs.showHistoryBox) {
        let isSelf = this.$refs.showHistoryBox.contains(e.target);
        if (!isSelf && !inp) {
          console.log('不在上面');
          this.showHistorySearch = false;
        }
      }
    });
  },
  methods: {
    getCookieMethod() {
      getCookie('isHome');
    },
    /**
     * 获取热搜列表
     */
    getRecordText() {
      recordText().then((data) => {
        if (data.code === '0000') {
          this.searchList = data.data;
        }
      });
    },
    /**
     * 请求全部分类列表数据
     */
    getCategoryList() {
      this.showClassify = true;
      categoryList().then((data) => {
        if (data.code === '0000') {
          Object.assign(this.classifyList, data.data);
        }
      });
    },
    /**
     * 搜索按钮点击
     */
    searchButtonClick() {
      // this.$router.push('/search'); 成功的
      this.$router.push('/search/searchNo'); // 失败的
    },
    /**
     * 输入框获取焦点
     */
    getFocus() {
      this.inpPlaceholder = '';
      this.showHistorySearch = true;
    },
    /**
     * 输入框失去焦点
     */
    noFocus() {
      this.inpPlaceholder = '口罩';
    },
    /**
     * 搜索按钮
     */
    quickSearch(dos) {
      this.inpVal = dos;
    },
    /**
     * 历史搜索列表点击
     */
    historySearchCommit(text) {
      console.log(text);
      this.inpVal = text;
      this.showHistorySearch = false;
    },
    /**
     * 全部分类鼠标移入事件
     */
    getMouseover(item) {
      if (item) {
        this.classifyListChildren = item;
        this.classifyListChildren = this.arrTrans(item, 9);
      }
      this.showSecondaryMenu = true;
    },
    /**
     * 全部分类鼠标移出事件
     */
    setMouseover() {
      this.showSecondaryMenu = false;
    },
    /**
     * 点击切换全部分类的显示和隐藏
     */
    showClass() {
      if (this.isHome) {
        this.showClassify = true;
      } else {
        this.showClassify = !this.showClassify;
      }
    },
    /**
     * 横向导航点击
     */
    lateralNavigation(id) {
      this.clickIndex = id;
      this.transverse = id;
      this.$store.commit('home/addTransverse', id);
      switch (id) {
      case '1' :
        this.$router.push('/');
        break;
      case '2':
        this.$router.push('/transverse/articleList');
        break;
      case '3' :
        this.$router.push('/transverse/goodShop');
        break;
      case '4':
        this.$router.push('/brand/brandList');
        break;
      case '5':
        this.$router.push('/transverse');
        break;
      }
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

<style scoped lang="scss">
.header-content {
  .header-container {
    align-items: flex-start;
    padding: 40px 0;
    .logo {
      height: 70px;
      display: flex;
      flex-direction: column;
      &-image {
        width: 122px;
        height: 41px;
      }
      &-carousel {
        width: 310px;
        margin-top: 6px;
        .el-carousel__item {
          background: white;
        }
        & .medium-icon {
          margin-left: 3px;
        }
      }
    }
    .search {
      margin: 0 135px 0 10px;
      flex: 1;
      .search-input {
        width: 540px;
        padding: 10px 20px;
        border-top: 1px solid rgba(217,217,217,1);
        border-left: 1px solid rgba(217,217,217,1);
        border-bottom: 1px solid rgba(217,217,217,1);
      }
      .search-btn {
        position: absolute;
        padding: 10px 30px;
        background:linear-gradient(67deg,rgba(0,164,124,1) 0%,rgba(0,164,124,1) 100%);
      }
      .search-list {
        flex-wrap: wrap;
        flex: 1;
        height: 20px;
        margin-top: 4px;
        & li {
          margin-right: 10px;
          cursor: pointer;
          & a {
            &:hover {
              color: #FF7900;
            }
          }
        }
      }
      .search-box {
        width: 540px;
        position: relative;
      }
      .history-search {
        z-index: 6;
        position: absolute;
        width: 540px;
        min-height: 30px;
        background: #FFFFFF;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
        & ul {
          & li {
            padding: 0 20px;
            line-height: 30px;
            &:hover {
              background: #E6F7FF;
              cursor: pointer;
            }
          }
        }
        &-first {
          display: flex;
          justify-content: space-between;
          & div:nth-child(1) {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
          & div:nth-child(2) {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FF7900;
          }
        }
        &-li {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
    }
    .shoppin-cart {
      width:202px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      margin-top: -14px;
      &-code {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 85px;
        & > img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
  .classify-all {
    padding: 8px 46px;
    color: #fff;
    background: #138F6D;
    font-weight: 500;
    width: 194px;
    position: relative;
    .all-center {
      width: 110px;
      position: relative;
      margin: 0 auto;
    }
    .fold {
      width: 8px;
      height: 8px;
      border-left: 4px solid white;
      border-top: 4px solid white;
      border-right: 4px solid transparent;
      border-bottom: 4px solid transparent;
      transform: rotateZ(45deg);
      position: absolute;
      top: 12px;
      right: 0;
    }
    .fold2 {
      width: 8px;
      height: 8px;
      border-left: 4px solid white;
      border-top: 4px solid white;
      border-right: 4px solid transparent;
      border-bottom: 4px solid transparent;
      transform: rotateZ(225deg);
      position: absolute;
      top: 7px;
      right: 0;
    }
    .classify-item {
			background:#00A47C;
      padding-bottom: 20px;
      height: 340px;
      position: absolute;
      z-index: 5;
      top: 40px;
      left: 0;
      overflow: hidden;
			& li {
				padding: 10px 69px;
        font-size: 14px;
        font-weight:500;
				color: #fff;
        cursor: pointer;
				&:hover {
					color: #00A47C;
          background:#fff;
				}
			}
    }
    .o-a {
      overflow: auto;
      & li {
        padding: 10px 67px;
      }
    }
    & .classify-item-two {
      width: 300px;
      height: 340px;
      background: white;
      box-shadow: 0px 1px 12px 0px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 40px;
      right: -300px;
      z-index: 5;
      display: flex;
      & ul {
        width: 100px;
        height: 100%;
        border-right: 1px solid #F6F6F6;
        & li {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 500;
          color: #999999;
          text-align: center;
          padding: 8px 0;
        }
        & li:hover {
          cursor: pointer;
          color: #00A47C;
          font-weight: bold;
        }
      }
    }
    // 滚动条样式
    .classify-item::-webkit-scrollbar {
      width:3px;
      height:80px;
      background: #00A47C;
    }
    .classify-item::-webkit-scrollbar-thumb {
      width:3px;
      height:80px;
      background:rgba(255,255,255,0.8);
      border-radius:2px;
    }
    .classify-item::-webkit-scrollbar-track {
      padding-right: 1px;
    }
  }
  .nav-center {
    flex-grow: 1;
    &-navigation {
      display: flex;
      & li {
        font-size: 14px;
        color: #999;
        margin: 0 32px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          color: #00A47C;
        }
      }
      &-click {
        color: #00A47C !important;
      }
    }
  }
}
</style>
