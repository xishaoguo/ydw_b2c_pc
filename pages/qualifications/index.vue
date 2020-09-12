<template>
  <div class="qualifications">
    <div class="qualifications-list">
      <div class="qualifications-list-one" @click="ulCheck(0)">
        药兜网资质和规则<div :class="isRule ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'" />
      </div>
      <ul v-show="isRule">
        <li :class="qualificationsType===0?'li-isclick':''" @click="qualificationsType=0">
          <div>平台资质</div>
        </li>
        <li :class="qualificationsType===1?'li-isclick':''" @click="qualificationsType=1">
          <div>药兜网平台交易规则</div>
        </li>
        <li :class="qualificationsType===2?'li-isclick':''" @click="qualificationsType=2">
          <div>药兜网平台食品经营者审查登记规范</div>
        </li>
        <li :class="qualificationsType===3?'li-isclick':''" @click="qualificationsType=3">
          <div>药兜网平台医疗器械审查登记规范</div>
        </li>
        <li :class="qualificationsType===4?'li-isclick':''" @click="qualificationsType=4">
          <div>药兜网退店协议</div>
        </li>
        <li :class="qualificationsType===5?'li-isclick':''" @click="qualificationsType=5">
          <div>药兜网信用评价规则</div>
        </li>
        <li :class="qualificationsType===6?'li-isclick':''" @click="qualificationsType=6">
          <div>药兜网隐私权政策</div>
        </li>
        <li :class="qualificationsType===7?'li-isclick':''" @click="qualificationsType=7">
          <div>药兜网用户服务协议</div>
        </li>
      </ul>
      <div class="qualifications-list-two" @click="ulCheck(1)">
        药兜网公示<div :class="isPublicity ? 'expand-triangle' : 'expand-triangle expand-triangle-rule'" />
      </div>
      <ul v-show="isPublicity" style="border-top: none;">
        <li style="border-top: none;" :class="qualificationsType===8?'li-isclick':''" @click="qualificationsType=8">
          公开征求意见收集
        </li>
        <li :class="qualificationsType===9?'li-isclick':''" @click="qualificationsType=9">
          平台规则变更公示
        </li>
        <li :class="qualificationsType===10?'li-isclick':''" @click="qualificationsType=10">
          违规商家处罚公示
        </li>
      </ul>
    </div>
    <div class="qualifications-content">
      <rule v-show="qualificationsType===0" />
      <tradingRules v-show="qualificationsType===1" />
      <foodSpecification v-show="qualificationsType===2" />
      <deviceSpecification v-show="qualificationsType===3" />
      <returnAgreement v-show="qualificationsType===4" />
      <evaluationRules v-show="qualificationsType===5" />
      <privacyPolicy v-show="qualificationsType===6" />
      <serviceAgreement v-show="qualificationsType===7" />
      <opinionGathering v-show="qualificationsType===8" />
      <changePublicity v-show="qualificationsType===9" />
      <penaltyRules v-show="qualificationsType===10" />
    </div>
  </div>
</template>
<script>
import rule from '~/components/qualifications/rule';
import tradingRules from '~/components/qualifications/tradingRules';
import foodSpecification from '~/components/qualifications/foodSpecification';
import deviceSpecification from '~/components/qualifications/deviceSpecification';
import returnAgreement from '~/components/qualifications/returnAgreement';
import evaluationRules from '~/components/qualifications/evaluationRules';
import privacyPolicy from '~/components/qualifications/privacyPolicy';
import serviceAgreement from '~/components/qualifications/serviceAgreement';
import opinionGathering from '~/components/qualifications/opinionGathering';
import changePublicity from '~/components/qualifications/changePublicity';
import penaltyRules from '~/components/qualifications/penaltyRules';
export default {
  components: {
    rule,
    tradingRules,
    foodSpecification,
    deviceSpecification,
    returnAgreement,
    evaluationRules,
    privacyPolicy,
    serviceAgreement,
    opinionGathering,
    changePublicity,
    penaltyRules
  },
  fetch() {
    this.indexChange();
  },
  data() {
    return {
      isRule: true,
      isPublicity: false,
      qualificationsType: 0,
      index: 0
    };
  },
  watch: {
    '$route': 'indexChange'
  },
  methods: {
    indexChange() {
      this.isRule = true,
      this.isPublicity = false;
      let number = this.$route.query.index;
      if (number < 5) {
        this.qualificationsType = 0;
      } else if (number === 5) {
        this.qualificationsType = 7;
      } else if (number === 6) {
        this.qualificationsType = 1;
      } else if (number === 7) {
        this.qualificationsType = 6;
      } else if (number === 8) {
        this.qualificationsType = 2;
      } else if (number === 9) {
        this.qualificationsType = 3;
      }
    },
    ulCheck(number) {
      console.log(number);
      if (number === 0) {
        this.isRule = !this.isRule;
        this.isPublicity = false;
      } else {
        this.isPublicity = !this.isPublicity;
        this.isRule = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .qualifications {
    width: 1200px;
    margin: 0 auto;
    border: 1px solid #E5E5E5;
    min-height: 318px;
    background: #ffffff;
    display: flex;
    margin-top: 30px;
    margin-bottom: 60px;
    &-list {
      width: 190px;
      background: #ffffff;
      & ul {
        border: 1px solid #E5E5E5;
        border-left: none;
        & li {
          border-top: 1px #E5E5E5 dashed;
          height: 50px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          & div {
            width: 140px;
            text-align: center;
          }
        }
        .li-isclick {
          color: #00A47C;
          font-weight: bold;
        }
        & li:nth-child(1) {
          border-top: none;
        }
        & li:hover {
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: bold;
          color: #00A47C;
        }
      }
      &-one {
        height: 50px;
        font-size: 14px;
        background: #FAFAFA;
        text-align: center;
        line-height: 50px;
        border-top: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
      }
      &-two {
        height: 50px;
        font-size: 14px;
        background: #FAFAFA;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid #E5E5E5;
        border-top: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        .qualifications-list-icon {
          width: 10px;
          height: 10px;
          font-size: 14px;
          position: absolute;
          right: 15px;
          top: 25px;
          border-top: 5px solid black;
          border-left: 5px solid black;
          border-right: 5px solid transparent;
          border-bottom: 5px solid transparent;
          transform: rotateZ(45deg);
        }
        .show-rule {
          transform: rotateZ(225deg);
          margin-top: -8px;
        }
      }
    }
    &-content {
      width: 1010px;
    }
  }
</style>