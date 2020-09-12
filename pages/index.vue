<template>
  <div class="container">
    <Nav />
    <advertisingSpace />
    <div ref="floorSuspension">
      <ul>
        <li ref="storeyOne">
          <storey-one :hot-brand="hotBrandData" />
        </li>
        <li v-for="(item,index) in floorList" :key="index">
          <storey :storey-data="item" :storey-index="index" @leftClick="leftClick" />
        </li>
      </ul>
    </div>
    <floor-suspension :is-show="showFloorSuspension" :floor-index="floorIndex" @jumpFloor="jumpFloor" />
    <rightSuspension :is-show="showRightSuspension" @toTop="toTop" />
    <!-- 底部 -->
    <bottom-line :text="'已经到底了'" />
  </div>
</template>

<script>
import { homeProductCategorys, brandList, esSearch } from '~/api/home';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { fetchList } from '~/api/home';
import advertisingSpace from '~/components/home/advertisingSpace.vue';
import storeyOne from '~/components/home/storeyOne.vue';
import storey from '~/components/home/storey.vue';
import bottomLine from '~/components/bottomLine.vue';
import Nav from '~/components/nav';
import floorSuspension from '~/components/home/floorSuspension';
import rightSuspension from '~/components/home/rightSuspension';
export default {
  components: {
    advertisingSpace,
    storeyOne,
    storey,
    Nav,
    floorSuspension,
    rightSuspension,
    bottomLine
  },
  async asyncData(context) {
    // let [res2] = await Promise.all([
    //   // 获取数据
    //   // context.$axios
    //   //   .post('/mall/activity', {
    //   //     pageIndex: 1,
    //   //     pageSize: 20,
    //   //     type: 'PROMO'
    //   //   })
    //   //   .then((res) => {
    //   //     console.log('这是nuxt--axios');
    //   //     return res;
    //   //   }),
    //   // 获取数据
    //   fetchList({
    //     pageIndex: 1,
    //     pageSize: 20,
    //     type: 'PROMO'
    //   }).then((res) => {
    //     console.log('这是axios');
    //     return res;
    //   })
    // ]);
    // return {
    //   friendList: res2.data
    // };
  },
  data() {
    return {
      picList: [
        {
          id: 0,
          url: require('../assets/img/p2326219915.jpg')
        },
        { id: 1, url: require('../assets/img/p2404647190.jpg') },
        {
          id: 2,
          url: require('../assets/img/51022baaa2f66e163903a760b9bf6536.jpg')
        },
        { id: 3, url: require('../assets/img/p1065200694.jpg') }
      ],
      // 列表数据
      blogList: [],
      // 总条数
      blogTotal: 0,
      // 数据
      friendList: [],
      result: 0,
      showFloorSuspension: false,
      showRightSuspension: false,
      floorIndex: 0,
      hotBrandData: [],
      floorList: [],
      floorStoreyList: []
    };
  },
  watch: {
    $route(to, from) {
      console.log('path', to.path);
    }
  },
  created() {
    this.getHomeProductCategorys();
    this.getHotBrand();
  },
  computed: {
    ...mapGetters('user', ['include']),
    ...mapState('user', {
      value: (state) => state.value
    })
  },
  mounted() {
    // this.getList();
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    /**
     * 获取楼层中最多分类的数据
     */
    getHomeProductCategorys() {
      homeProductCategorys().then((data) => {
        if (data.code === '0000') {
          this.floorList = data.data;
        }
      });
    },
    /**
     * 楼层右侧商品查询
     */
    getHomeEsSearch(categoryId, index = null) {
      let obj = {
        pageIndex: 1,
        pageSize: 20,
        categoryId: categoryId
      };
      esSearch(obj).then((data) => {
        if (data.code === '0000') {
          if (index === null) {
            this.floorStoreyList.push(data.data);
          } else {
            this.$set(this.floorStoreyList, index, data.data);
          }
        }
      });
    },
    /**
     * 获取热卖品牌
     */
    getHotBrand() {
      brandList().then((data) => {
        if (data.code === '0000') {
          this.hotBrandData = data.data.slice(0, 6);
        }
      });
    },
    /**
     * 楼层左侧点击事件
     */
    leftClick(item) {
      this.getHomeEsSearch(item.data.categoryId, item.index);
    },
    /**
     * 回到顶部
     */
    toTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    /**
     * 缓慢移动效果
     */
    moveSlowly(number) {
      if (document.documentElement.scrollTop >= number) {
        let terval = setInterval(() => {
          document.documentElement.scrollTop -= 50;
          if (document.documentElement.scrollTop <= number) {
            clearInterval(terval);
            document.documentElement.scrollTop = number;
          }
        }, 10);
      } else {
        let terval = setInterval(() => {
          document.documentElement.scrollTop += 50;
          if (document.documentElement.scrollTop >= number) {
            clearInterval(terval);
            document.documentElement.scrollTop = number;
          }
        }, 10);
      }
    },
    /**
     * 点击楼层浮动跳转到对应楼层
     */
    jumpFloor(index) {
      console.log('ff', document.documentElement.scrollTop);
      if (index === 0) {
        this.moveSlowly(771);
      } else if (index === 1) {
        this.moveSlowly(1229);
      } else if (index === 2) {
        this.moveSlowly(1927);
      } else if (index === 3) {
        this.moveSlowly(2620);
      }
    },
    /**
     * 监听页面滚动
     */
    handleScroll() {
      if (this.$refs.floorSuspension) {
        let s = this.$refs.floorSuspension.getBoundingClientRect().top;
        if (s < 0 && s > -2100) {
          this.showFloorSuspension = true;
        } else {
          this.showFloorSuspension = false;
        }
        if (s < 540) {
          this.showRightSuspension = true;
        } else {
          this.showRightSuspension = false;
        }
        if (s < 0 && s > -457) {
          this.floorIndex = 0;
        } else if (s < -457 && s > -1153) {
          this.floorIndex = 1;
        } else if (s < -1153 && s > -1849) {
          this.floorIndex = 2;
        } else if (s < -1849 && s > -2100) {
          this.floorIndex = 3;
        }
      }
    },
    getList() {
      fetchList({
        pageIndex: 1,
        pageSize: 20,
        type: 'PROMO'
      }).then((res) => {
        console.log('这是mounted');
      });
    },
    ...mapActions('user', ['getInfo']),
    ...mapMutations('user', ['SET_VALUE']),
    async change() {
      await this.getInfo('Hello ydw');
      await this.$store.dispatch('setToken', '{%22token%22:%22eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJbXCIxNTgwMzQ1ODM4NFwiLFwiUFVSQ0hBU0VcIl0iLCJpYXQiOjE1OTc4OTA4MTgsImV4cCI6MTYwMDQ4MjgxOCwibmJmIjoxNTk3ODkwODE4fQ.xVQbDnx2xIzeb3YILWxdODSTfeYZjnaIPfdxs95-eMg%22%2C%22phone%22:%2215803458384%22%2C%22groupName%22:%22%E9%BE%99%E6%8E%A7%22%2C%22partyId%22:%22A1132%22%2C%22statusId%22:%22NOT_PASSED%22%2C%22websiteId%22:%22WE_AH%22%2C%22openId%22:%22oL9IoxK2wIlbJlPmEBBDw9pwC27I%22%2C%22isCommercialAllocation%22:false}');
      this.result = this.include(2);
      // this.SET_VALUE('Hello ydmm')

      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 1500
      });
    }
  },
  // SEO优化
  head() {
    return {
      title: '药兜网',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '很多个很多个关键词很多个很多个关键词很多个很多个关键词'
        },
        {
          hid: 'description',
          name: 'description',
          content: '很多个很多个关键词很多个很多个关键词很多个很多个关键词'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  flex-direction: column;
  background: #F0F0F0;
}
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.box-bg {
  height: 300px;
  background: url('../assets/img/p2326219915.jpg');
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
