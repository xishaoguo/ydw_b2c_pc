<template>
  <div class="fast-navigation">
    <div class="fast-navigation-list">
      <ul>
        <li>
          <div :class="listItem === 0 && list1 ? ' is-click' : ''" @click="checkList(0)">
            <div class="first-div">
              新手帮助
              <div
                :class="listItem===0 && list1 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===0 && list1" class="child-ul">
            <li
              :class="navigationListIndex===1 ? 'list-click' : ''"
              @click="navigationListIndex=1"
            >
              用户注册
            </li>
            <li
              :class="navigationListIndex===2 ? 'list-click' : ''"
              @click="navigationListIndex=2"
            >
              商品搜索
            </li>
            <li
              :class="navigationListIndex===3 ? 'list-click' : ''"
              @click="navigationListIndex=3"
            >
              订单状态
            </li>
          </ul>
        </li>
        <li>
          <div :class="listItem===1 && list2 ? ' is-click' : ''" @click="checkList(1)">
            <div class="first-div" style="width: 120px;">
              消费者保障
              <div
                :class="listItem===1 && list2 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===1 && list2" class="child-ul">
            <li
              :class="navigationListIndex===4 ? 'list-click' : ''"
              @click="navigationListIndex=4"
            >
              网购警示
            </li>
            <li
              :class="navigationListIndex===5 ? 'list-click' : ''"
              @click="navigationListIndex=5"
            >
              投诉维权
            </li>
            <li
              :class="navigationListIndex===6 ? 'list-click' : ''"
              @click="navigationListIndex=6"
            >
              客服中心
            </li>
          </ul>
        </li>
        <li>
          <div :class="listItem===2 && list3 ? ' is-click' : ''" @click="checkList(2)">
            <div class="first-div">
              配送方式
              <div
                :class="listItem===2 && list3 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===2 && list3" class="child-ul">
            <li
              :class="navigationListIndex===7 ? 'list-click' : ''"
              @click="navigationListIndex=7"
            >
              物流配送
            </li>
            <li
              :class="navigationListIndex===8 ? 'list-click' : ''"
              @click="navigationListIndex=8"
            >
              运费说明
            </li>
            <li
              :class="navigationListIndex===9 ? 'list-click' : ''"
              @click="navigationListIndex=9"
            >
              验收标准
            </li>
          </ul>
        </li>
        <li>
          <div :class="listItem===3 && list4 ? ' is-click' : ''" @click="checkList(3)">
            <div class="first-div">
              支付方式
              <div
                :class="listItem===3 && list4 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===3 && list4" class="child-ul">
            <li
              :class="navigationListIndex===10 ? 'list-click' : ''"
              @click="navigationListIndex=10"
            >
              支付宝支付
            </li>
            <li
              :class="navigationListIndex===11 ? 'list-click' : ''"
              @click="navigationListIndex=11"
            >
              微信支付
            </li>
          </ul>
        </li>
        <li>
          <div :class="listItem===4 && list5 ? ' is-click' : ''" @click="checkList(4)">
            <div class="first-div">
              售后服务
              <div
                :class="listItem===4 && list5 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===4 && list5" class="child-ul">
            <li
              :class="navigationListIndex===12 ? 'list-click' : ''"
              @click="navigationListIndex=12"
            >
              退换货保障
            </li>
            <li
              :class="navigationListIndex===13 ? 'list-click' : ''"
              @click="navigationListIndex=13"
            >
              退换货流程
            </li>
            <li
              :class="navigationListIndex===14 ? 'list-click' : ''"
              @click="navigationListIndex=14"
            >
              退款说明
            </li>
          </ul>
        </li>
        <li>
          <div :class="listItem===5 && list6 ? ' is-click' : ''" @click="checkList(5)">
            <div class="first-div">
              举报投诉
              <div
                :class="listItem===5 && list6 ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'"
              />
            </div>
          </div>
          <ul v-show="listItem===5 && list6" class="child-ul">
            <li
              :class="navigationListIndex===15 ? 'list-click' : ''"
              @click="navigationListIndex=15"
            >
              我要举报
            </li>
            <li
              :class="navigationListIndex===16 ? 'list-click' : ''"
              @click="navigationListIndex=16"
            >
              我要投诉
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="fast-navigation-content">
      <!-- 用户注册 -->
      <userRegistration v-show="navigationListIndex === 1" />
      <!-- 商品搜索 -->
      <productSearch v-show="navigationListIndex === 2" />
      <!-- 订单状态 -->
      <orderStatus v-show="navigationListIndex === 3" />
      <!-- 网购警示 -->
      <warning v-show="navigationListIndex === 4" />
      <!-- 投诉维权 -->
      <safeguardingRights v-show="navigationListIndex === 5" />
      <!-- 客服中心 -->
      <customerService v-show="navigationListIndex === 6" />
      <!-- 物流配送 -->
      <distribution v-show="navigationListIndex === 7" />
      <!-- 运费说明 -->
      <freight v-show="navigationListIndex === 8" />
      <!-- 验收标准 -->
      <acceptance v-show="navigationListIndex === 9" />
      <!-- 支付宝支付 -->
      <zhifubao v-show="navigationListIndex === 10" />
      <!-- 微信支付 -->
      <weixin v-show="navigationListIndex === 11" />
      <!-- 退换货保障 -->
      <exchangeGoods v-show="navigationListIndex === 12" />
      <!-- 退换货流程 -->
      <exchangeProcess v-show="navigationListIndex === 13" />
      <!-- 退款说明 -->
      <refundInstructions v-show="navigationListIndex === 14" />
      <!-- 我要举报 -->
      <report v-show="navigationListIndex === 15" />
      <!-- 我要投诉 -->
      <complaint v-show="navigationListIndex === 16" />
    </div>
  </div>
</template>
<script>
import userRegistration from '~/components/novicehelp/userRegistration';
import productSearch from '~/components/novicehelp/productSearch';
import orderStatus from '~/components/novicehelp/orderStatus';
import warning from '~/components/novicehelp/warning';
import safeguardingRights from '~/components/novicehelp/safeguardingRights';
import customerService from '~/components/novicehelp/customerService';
import distribution from '~/components/novicehelp/distribution';
import freight from '~/components/novicehelp/freight';
import acceptance from '~/components/novicehelp/acceptance';
import zhifubao from '~/components/novicehelp/zhifubao';
import weixin from '~/components/novicehelp/weixin';
import exchangeGoods from '~/components/novicehelp/exchangeGoods';
import exchangeProcess from '~/components/novicehelp/exchangeProcess';
import refundInstructions from '~/components/novicehelp/refundInstructions';
import report from '~/components/novicehelp/report';
import complaint from '~/components/novicehelp/complaint';
export default {
  components: {
    userRegistration,
    productSearch,
    orderStatus,
    warning,
    safeguardingRights,
    customerService,
    distribution,
    freight,
    acceptance,
    zhifubao,
    weixin,
    exchangeGoods,
    exchangeProcess,
    refundInstructions,
    report,
    complaint,
  },
  data() {
    return {
      listItem: 0,
      list1: true,
      list2: false,
      list3: false,
      list4: false,
      list5: false,
      list6: false,
      navigationListIndex: 1,
    };
  },
  created() {
    this.getIndex();
  },
  methods: {
    getIndex() {
      let index = this.$route.query.footerIndex;
      switch (index) {
      case 0:
        this.navigationListIndex = 1;
        this.list1 = true;
        this.listItem = 0;
        break;
      case 1:
        this.navigationListIndex = 2;
        this.list1 = true;
        this.listItem = 0;
        break;
      case 2:
        this.navigationListIndex = 3;
        this.list1 = true;
        this.listItem = 0;
        break;
      case 3:
        this.navigationListIndex = 4;
        this.list2 = true;
        this.listItem = 1;
        break;
      case 4:
        this.navigationListIndex = 5;
        this.list2 = true;
        this.listItem = 1;
        break;
      case 5:
        this.navigationListIndex = 6;
        this.list2 = true;
        this.listItem = 1;
        break;
      case 6:
        this.navigationListIndex = 7;
        this.list3 = true;
        this.listItem = 2;
        break;
      case 7:
        this.navigationListIndex = 8;
        this.list3 = true;
        this.listItem = 2;
        break;
      case 8:
        this.navigationListIndex = 9;
        this.list3 = true;
        this.listItem = 2;
        break;
      case 9:
        this.navigationListIndex = 10;
        this.list4 = true;
        this.listItem = 3;
        break;
      case 10:
        this.navigationListIndex = 11;
        this.list4 = true;
        this.listItem = 3;
        break;
      case 11:
        this.navigationListIndex = 12;
        this.list5 = true;
        this.listItem = 4;
        break;
      case 12:
        this.navigationListIndex = 13;
        this.list5 = true;
        this.listItem = 4;
        break;
      case 13:
        this.navigationListIndex = 14;
        this.list5 = true;
        this.listItem = 4;
        break;
      case 14:
        this.navigationListIndex = 15;
        this.list6 = true;
        this.listItem = 5;
        break;
      case 15:
        this.navigationListIndex = 16;
        this.list6 = true;
        this.listItem = 5;
        break;
      }
    },
    checkList(index) {
      this.listItem = index;
      switch (index) {
      case 0:
        this.list1 = !this.list1;
        this.list2 = false;
        this.list3 = false;
        this.list4 = false;
        this.list5 = false;
        this.list6 = false;
        break;
      case 1:
        this.list2 = !this.list2;
        this.list1 = false;
        this.list3 = false;
        this.list4 = false;
        this.list5 = false;
        this.list6 = false;
        break;
      case 2:
        this.list3 = !this.list3;
        this.list1 = false;
        this.list2 = false;
        this.list4 = false;
        this.list5 = false;
        this.list6 = false;
        break;
      case 3:
        this.list4 = !this.list4;
        this.list1 = false;
        this.list2 = false;
        this.list3 = false;
        this.list5 = false;
        this.list6 = false;
        break;
      case 4:
        this.list5 = !this.list5;
        this.list1 = false;
        this.list2 = false;
        this.list3 = false;
        this.list4 = false;
        this.list6 = false;
        break;
      case 5:
        this.list6 = !this.list6;
        this.list1 = false;
        this.list2 = false;
        this.list3 = false;
        this.list4 = false;
        this.list5 = false;
        break;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.fast-navigation {
  width: 1200px;
  min-height: 558px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  margin: 30px auto 60px;
  display: flex;
  &-list {
    & > ul {
      width: 190px;
      & li {
        min-height: 50px;
        line-height: 50px;
        background: #fafafa;
        text-align: center;
        border: 1px solid #e5e5e5;
        border-top: none;
        border-left: none;
        color: #999999;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        cursor: pointer;
        & .first-div {
          width: 100px;
          margin: 0 auto;
          position: relative;
        }
        & > div {
          position: relative;
          height: 48px;
        }
        & .is-click {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
        }
        & .child-ul {
          & li {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            background: white;
            border-bottom: 1px #e5e5e5 dashed;
            min-height: 50px;
            line-height: 50px;
            border-right: none;
            cursor: pointer;
          }
          & li:hover {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #00a47c;
          }
          .list-click {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #00a47c;
          }
          & li:nth-child(1) {
            border-top: 1px #e5e5e5 solid;
          }
          & li:nth-last-child(1) {
            border-bottom: none;
          }
        }
      }
    }
  }
  &-content {
    flex-grow: 1;
  }
}
</style>