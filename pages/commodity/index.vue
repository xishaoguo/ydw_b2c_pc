<template>
  <div class="commodity">
    <div class="commodity-content yd-container">
      <div class="commodity-content-top">
        <div class="commodity-content-top_main-img">
          <div class="main-img-ctn">
            <img class="" :src="detailsData.imageUrlList[curIndex]" alt="">
            <img v-show="detailsData.quantityOnHandTotal < 1" class="wuhuo" src="~assets/img/details/wuhuo.png" alt="">
            <img v-show="!detailsData.shelfStatus" class="xiajia" src="~assets/img/details/xiajia.png" alt="">
          </div>
          <div class="sub-img">
            <div v-if="detailsData.imageUrlList.length>4" class="left-btn" @click="leftClick">
              <img src="../../assets/img/details/left-btn-icon.png" alt="">
            </div>
            <ul>
              <li v-for="(item,index) in detailsData.imageUrlList" :key="index" :class="curIndex==index?'active': ''" @click="toggleImg(index)">
                <img :src="item" alt="">
                <div v-show="curIndex==index" class="img-mask" />
              </li>
            </ul>
            <div v-if="detailsData.imageUrlList.length>4" class="right-btn" @click="rightClick">
              <img src="../../assets/img/details/right-btn-icon.png" alt="">
            </div>
          </div>
        </div>
        <div class="commodity-message">
          <ul>
            <li>
              <div class="commodity-message-name">
                {{ detailsData.productName }}
              </div>
            </li>
            <li>
              <div class="commodity-message-indications">
                {{ detailsData.function }}
              </div>
            </li>
            <li class="commodity-message-price">
              <div class="commodity-message-price-left">
                <div>价格：</div>
                <div><span>￥</span><span>{{ detailsData.DEFAULT_PRICE.price }}.00</span></div>
                <div v-show="detailsData.useHealthyCard===1">
                  可用药神卡
                </div>
              </div>
              <div class="commodity-message-price-right">
                <nuxt-link :to="{name:'shop',query:{partyId:detailsData.partyId}}">
                  <div>
                    <img src="~assets/img/details/pharmacy_icon.png" alt="">
                    <div>{{ detailsData.merchantInfo.merchantName }}</div>
                    <div class="el-icon-arrow-right" />
                  </div>
                </nuxt-link>
              </div>
            </li>
            <li class="commodity-message-li">
              <div>通用名称：</div>
              <div>{{ detailsData.internalName }}</div>
              <div v-show="detailsData.rx===1" class="prescription">
                处方药
              </div>
            </li>
            <li class="commodity-message-li">
              <div>批准文号：</div>
              <div>国药准字H20000079</div>
            </li>
            <li class="commodity-message-li">
              <div>生产厂家：</div>
              <div>{{ detailsData.producer }}</div>
            </li>
            <li class="commodity-message-li">
              <div>剂型/型号：</div>
              <div>{{ detailsData.dosageForm }}</div>
            </li>
            <li class="commodity-message-li">
              <div>规格：</div>
              <div>{{ detailsData.productSize }}</div>
            </li>
            <li class="commodity-message-li">
              <div>数量：</div>
              <el-input-number
                v-model="quantityGoods" :min="1" size="large"
                :max="10" @change="handleChange"
              />
              <div class="stock">
                库存：{{ detailsData.quantityOnHandTotal }}件
              </div>
            </li>
            <li class="commodity-message-button">
              <div class="commodity-message-button-box">
                <button>加入购物车</button>
                <button>立即购买</button>
                <button :class="detailsData.statusId === 1?'is-collection':''" @click="collectionOfGoods">
                  {{ detailsData.statusId === 1?'已收藏':'收藏商品' }}
                </button>
              </div>
            </li>
            <li v-show="detailsData.rx===1" class="commodity-message-jinggao">
              <span />
              <span>处方药须凭处方在执业药师指导下购买和使用</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="commodity-content-footer">
        <div class="commodity-content-footer-left" />
        <div class="commodity-content-footer-right">
          <div style="display:flex;">
            <div :class="rightType===0 ? 'button_1 button-click':'button_1'" @click="detailSwitch(0)">
              <div>商品详情</div>
            </div>
            <div :class="rightType===1?'button_2 button-click':'button_2'" @click="detailSwitch(1)">
              <div>说明书</div>
            </div>
          </div>
          <div v-show="rightType===0" class="commodity-detail-content">
            <div v-html="selectContactData.contact" />
          </div>
          <div v-show="rightType===1" class="instructions">
            <div class="instructions-main">
              【药品名称】<br>
              通用名称：硝苯地平控释片<br>
              商品名称：硝苯地平控释片(欣然)<br>
              英文名称：Nifedipine Controlled released Tablets<br>
              拼音全码：XiaoBenDiPingKongShiPian(XinRan)<br>
              【主要成份】 本品主要成份为硝苯地平，化学名称：2，6-二甲基-4(2-硝基苯基)-1，4-二氢-3，5-吡啶二甲酸二甲酯。<br>
              【成 份】<br>
              化学名：2，6-二甲基-4(2-硝基苯基)-1，4-二氢-3，5-吡啶二甲酸二甲酯<br>
              分子量：C17H18N2O6<br>
              【性 状】 本品为薄膜衣片，除去包衣后片芯为黄色与红色的双层片。<br>
              【适应症/功能主治】 1、高血压 2、冠心病 慢性稳定型心绞病(劳累性心绞痛)<br>
              【规格型号】 30mg*12s<br>
              【用法用量】 治疗时应尽可能按个体情况服药。依据患者的临床情况，给予不同的基础用药剂量。肝功能损伤患者应仔细监控，严重病例应减少用药剂量。 除非特殊医嘱，成年人推荐下列剂量：一次一片（30mg），一日1次。 疗程：用药时间应由医生决定。 用药方法：通常整片药片用少量液体吞服，服药时间不受就餐时间的限制。 该药片不能咀嚼或掰断后服用！<br>
              【不良反应】 临床最常见的不良反应 以下情况发生率在1%到10%之间：整个机体：虚弱(疲劳)、水肿、头痛 心血管系统：外周水肿、心悸、血管扩张(面红、热感) 消化系统：便秘 神经系统：头晕 (详见内包装说明书)<br>
              【禁 忌】 对硝苯地平过敏者禁用。禁用于心源性休克。由于酶诱导作用，与利福平合用时，硝苯地平达不到有效的血药浓度，因而不得与利福平合用。禁用于怀孕和哺乳期妇女。<br>
              【注意事项】 对于心力衰竭及严重主动脉瓣狭窄的患者，当血压很低时(收缩压＜90mmHg的严重低血压)，服用本品应十分谨慎。 过度低血压：虽然在大多数患者硝苯地平降血压效应是适度的并能耐受，但少数患者出现过度而难以耐受的低血压。低血压反应常发生在初始给药或继后的增加剂量时，尤易发生于合用β受体阻滞剂患者。 (详见内包装说明书)请仔细阅读说明书并遵医嘱使用。<br>
              【儿童用药】 尚无本品用于儿童的资料。<br>
              【老年患者用药】 虽然小型的药代动力学研究显示t1/2、Cmax和AUC有增加，但在硝苯地平的临床研究中未纳入足够量的65岁以上患者以明确老年患者与青年人的反应是否有不同。已报道的临床用药经验亦未能明确老年患者与青年人的反应的差异。通常而言，由于老年患者的肝、肾或心功能下降，合并其他疾病或合并使用其他药物，因此，老年患者用药应慎重，常从小剂量开始用药。<br>
              【孕妇及哺乳期妇女用药】 孕妇及哺乳期妇女禁用本品。 (详见内包装说明书)<br>
              【药物相互作用】 <br>
              1．与其他降压药合用会加强硝苯地平的降压作用。。 <br>
              2．β-受体阻滞剂 绝大多数患者合用本品有较好的耐受性和疗效，但个别患者可能诱发和加重低血压、心力衰竭和心绞痛。 3．蛋白结合率高的药物如双香豆素类、苯妥英钠、奎尼丁、奎宁、华法林等与本品同用时，这些药的游离浓度常发生改变。 4．西咪替丁：此药可抑制细胞色素P4503A4系统，因此可升高硝苯地平的血浆浓度而加强抗高血压疗效。 (详见内包装说明书)<br>
              【药物过量】 症状：发生严重的硝苯地平中毒时可见下述症状：意识障碍甚至昏迷，血压下降，心动过速/心动过缓性心律失常，高血糖，代谢性酸中毒，低氧血症，心源性休克伴肺水肿。 成人过量后的救治措施：在针对硝苯地平过量的救治中，应首先考虑到活性成份的排除及恢复心血管状态的稳定。 (详见内包装说明书)<br>
              【药理毒理】 详见说明书。<br>
              【药代动力学】 详见说明书。<br>
              【贮 藏】 遮光，阴凉干燥处<br>
              【包 装】 30mg*12s/盒。<br>
              【有 效 期】 36 月<br>
              【执行标准】 WS1-(X-002)-2015Z<br>
              【批准文号】 国药准字H20000079<br>
              【生产企业】 上海现代制药股份有限公司<br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProductDetails, selectContact } from '~/api/details';
export default {
  data() {
    return {
      quantityGoods: 0,
      isCollection: false,
      curIndex: 0,
      imageUrlList: [
        require('../../assets/img/details/details_main.png'),
        require('../../assets/img/details/details_main.png'),
        require('../../assets/img/details/details_main.png'),
        require('../../assets/img/details/details_main.png'),
        require('../../assets/img/details/details_main.png'),
      ],
      rightType: 0,
      wuHuo: false,
      xiaJia: true,
      productId: '',
      detailsData: {
        productName: '',
        function: '',
        internalName: '',
        registerNum: '',
        GROUP_PRICE: {
          fromDate: '',
          minQuantity: 1,
          maxQuantity: 100,
          price: '',
          thruDate: ''
        },
        DEFAULT_PRICE: {
          fromDate: '',
          minQuantity: 1,
          maxQuantity: null,
          price: '',
          thruDate: null
        },
        productSize: '',
        producer: '',
        dosageForm: '',
        productId: '',
        id: 192653614,
        partyId: '',
        merchantInfo: {
          phone: '',
          partyId: '',
          merchantType: '',
          merchantName: ''
        },
        imageUrlList: [
          ''
        ],
        shelfStatus: '',
        rx: '',
        salesTotal: '',
        type: '',
        quantityOnHandTotal: '',
        useHealthyCard: '',
        productType: '',
        productCategoryId: '',
        Instructions: '',
        limitNum: 2,
        limitBuy: 100,
        statusId: ''
      },
      selectContactData: {
        product_id: '',
        contact: '',
        id: 6912,
        create_date: '',
        update_date: ''
      }
    };
  },
  created() {
    this.productId = this.$route.query.productId;
    this.getCommodityDetails();
    this.getSelectContact();
  },
  methods: {
    handleChange(number) {
      console.log(number);
    },
    /**
     * 获取商品信息数据
     */
    getCommodityDetails() {
      getProductDetails({ productId: this.productId }).then((data) => {
        if (data.code === '0000') {
          Object.assign(this.detailsData, data.data);
          console.log('详情数据', this.detailsData);
        }
      });
    },
    /**
     * 获取商品详情
     */
    getSelectContact() {
      selectContact({ productId: this.productId }).then((data) => {
        if (data.code === '0000') {
          Object.assign(this.selectContactData, data.data);
        }
      });
    },
    /**
     * 收藏商品
     */
    collectionOfGoods() {
      this.isCollection = !this.isCollection;
    },
    /**
     * 店家左边箭头
     */
    rightClick() {
      let ingLen = this.imageUrlList.length;
      let curIdx = this.curIndex;
      if (curIdx == ingLen - 1) {
        return;
      } else {
        this.curIndex++;
      }
    },
    /**
     * 店家右边箭头
     */
    leftClick() {
      if (this.curIndex == 0) {
        return;
      } else {
        this.curIndex--;
      }
    },
    /**
     * 图片切换
     */
    toggleImg(index) {
      this.curIndex = index;
    },
    /**
     * 商品详情和说明书切换
     */
    detailSwitch(number) {
      this.rightType = number;
    }
  }
};
</script>
<style lang="scss">
  .commodity {
    margin-top: 20px;
    &-content {
      &-top {
        display: flex;
        &_main-img {
          width: 390px;
          & img {
            width: 390px;
            height: 390px
          }
          .main-img-ctn {
            width: 390px;
            height: 390px;
            position: relative;
            img {
              max-width: 390px;
              max-height: 390px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            & .wuhuo, & .xiajia{
              position: absolute;
              top: 50%;
              left: 50%;
              width: 140px;
              height: 140px;
              transform: translate(-70px, -70px);
            }
          }
          .sub-img {
            width: 390px;
            display: flex;
            align-items: center;
            margin: 10px 0;
            ul {
              // width: 350px;
              overflow-x: auto;
              white-space: nowrap;
              margin: 0 auto;
              &::-webkit-scrollbar {
                height: 4px;
              }
              &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                background: rgba(0, 0, 0, 0.2);
              }
              &::-webkit-scrollbar-track {
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                border-radius: 0;
                background: rgba(0, 0, 0, 0.1);
              }
              li {
                width: 80px;
                height: 80px;
                border: 1px solid #d2d2d2;
                position: relative;
                display: inline-block;
                margin-left: 10px;
                .img-mask {
                  position: absolute;
                  width: 76px;
                  height: 76px;
                  background: rgba(0,0,0,0.5);
                  top: 0px;
                  left: 0px;
                }
                img {
                  max-width: 76px;
                  max-height: 76px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &:last-child {
                  margin-right: 0;
                }
              }
              li:nth-child(1) {
                margin-left: 0;
              }
              .active {
                border: 2px solid #ff7900;
              }
            }
            .left-btn {
              & img {
                width: 15px;
                height: 15px;
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .right-btn {
              & img {
                width: 15px;
                height: 15px;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
        .commodity-message {
          margin-left: 20px;
          & ul {
            & li {
              & .commodity-message-name {
                font-size: 20px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #666666;
              }
              & .commodity-message-indications {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #F70C08;
              }
            }
            & .commodity-message-price {
              width: 800px;
              height: 60px;
              padding-bottom: 10px;
              background: url('~assets/img/shop/shop_main_top.png');
              background-size: 100% 100%;
              margin-bottom: 15px;
              margin-top: 4px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              &-left {
                display: flex;
                align-items: flex-end;
                & div:nth-child(1) {
                  font-size: 12px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #999999;
                  margin-left: 10px;
                }
                & div:nth-child(2) {
                  color: #FF7900;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  display: flex;
                  align-items: flex-end;
                  margin-left: 32px;
                  & span:nth-child(1) {
                    font-size: 12px;
                  }
                  & span:nth-child(2) {
                    font-size: 16px;
                    transform: translateY(2px);
                  }
                }
                & div:nth-child(3) {
                  width: 88px;
                  height: 22px;
                  background: #FF7900;
                  border-radius: 2px;
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #FFFFFF;
                  line-height: 22px;
                  text-align: center;
                  margin-bottom: 3px;
                  margin-left: 10px;
                }
              }
              &-right {
                & a {
                  &>div {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    & img {
                      width: 16px;
                      height: 16px;
                      margin-right: 2px;
                    }
                    & div:nth-child(2) {
                      font-size: 16px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #999999;
                      line-height: 24px;
                    }
                    & div:nth-child(3) {
                      margin-top: 2px;
                    }
                  }
                }
              }
            }
            & .commodity-message-li {
              display: flex;
              align-items: center;
              margin-top: 17px;
              & div:nth-child(1) {
                width: 68px;
                height: 17px;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 17px;
              }
              & div:nth-child(2) {
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
              & .prescription {
                width: 44px;
                line-height: 18px;
                border-radius: 2px;
                border: 1px solid #F70C08;
                color: #F70C08;
                font-size: 12px;
                text-align: center;
                margin-left: 10px;
              }
              & .stock {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                margin-left: 10px;
              }
              .el-input-number {
                width: 115px;
                line-height: 30px;
              }
              .el-input-number__decrease, .el-input-number__increase {
                width: 23px;
                background: transparent;
              }
              .el-input-number .el-input__inner {
                padding-left: 23px;
                padding-right: 23px;
              }
              .el-input__inner {
                height: 32px;
                border-radius: 1px;
              }
            }
            & .commodity-message-button {
              margin-top: 30px;
              &-box {
                display: flex;
                & button {
                  width: 160px;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  font-size: 16px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  &:hover {
                    cursor: pointer;
                  }
                }
                & button:nth-child(1) {
                  color: #FFFFFF;
                  background: #00A47C;
                }
                & button:nth-child(2) {
                  background: #00A47C;
                  color: #FF7900;
                  background: rgba(255, 121, 0, 0.1);
                  border: 1px solid #FF7900;
                  margin-left: 10px;
                }
                & button:nth-child(3) {
                  border: 1px solid #D2D2D2;
                  margin-left: 10px;
                  color: #999999;
                  background: url('~assets/img/details/shou_cang_no.png');
                  background-size: 18px 18px;
                  background-repeat: no-repeat;
                  background-position: 20px 12px;
                }
                & .is-collection {
                  background: url('~assets/img/details/shou_cang.png') !important;
                  margin-left: 10px !important;
                  background-size: 18px 18px !important;
                  background-repeat: no-repeat !important;
                  background-position: 20px 12px !important;
                  border: 1px solid #FF7900 !important;
                  color: #FF7900 !important;
                }
              }
            }
            & .commodity-message-jinggao {
              display: flex;
              align-items: center;
              margin-top: 20px;
              & span:nth-child(1) {
                width: 16px;
                height: 16px;
                background: url('~assets/img/details/jinggao.png');
                background-size: 100%;
              }
              & span:nth-child(2) {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                margin-left: 10px;
              }
            }
          }
        }
      }
      &-footer {
        margin-top: 60px;
        display: flex;
        &-left {
          width: 207px;
          height: 306px;
          background: #F6F6F6;
        }
        &-right {
          width: 959px;
          margin-left: 35px;
          & div:nth-child(1) {
            height: 49px;
            background: #F9F9F9;
            & .button_1 {
              width: 150px;
              height: 49px;
              display: flex;
              align-items: center;
              text-align: center;
              &:hover {
                cursor: pointer;
              }
              & div {
                width: 150px;
                height: 22px;
                line-height: 22px;
                background: none;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 22px;
              }
            }
            & .button_2 {
              display: flex;
              align-items: center;
              text-align: center;
              width: 150px;
              height: 49px;
              background: #F9F9F9;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              &:hover {
                cursor: pointer;
              }
              & div {
                width: 150px;
                height: 22px;
                line-height: 22px;
                border-right: 1px solid #D2D2D2;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 22px;
                background: none;
              }
            }
            .button-click {
              background: #FF7900;
              & div {
                color: #FFFFFF;
              }
            }
          }
          .commodity-detail-content {
            width: 100%;
            height: auto;
            background: #ffffff;
          }
          & .instructions {
            margin-top: 20px;
            margin-bottom: 60px;
            &-main {
              height: auto;
              background: #ffffff;
            }
          }
        }
      }
    }
  }
</style>