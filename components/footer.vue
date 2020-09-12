<template>
  <div class="footer-container">
    <div class="footer-container-service">
      <div class="footer-container-service-main">
        <ul class="footer-container-service-main-first">
          <li>
            <img src="../assets/img/logo_2.png" alt="药兜网">
          </li>
          <li>
            <h6>新手帮助</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:0}}">
              用户注册
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:1}}">
              商品搜索
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:2}}">
              订单状态
            </nuxt-link>
          </li>
          <li>
            <h6>消费者保障</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:3}}">
              网购警示
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:4}}">
              投诉维权
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:5}}">
              客服中心
            </nuxt-link>
          </li>
          <li>
            <h6>配送方式</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:6}}">
              物流配送
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:7}}">
              运费说明
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:8}}">
              验收标准
            </nuxt-link>
          </li>
          <li>
            <h6>支付方式</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:9}}">
              支付宝支付
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:10}}">
              微信支付
            </nuxt-link>
          </li>
          <li>
            <h6>售后服务</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:11}}">
              退换货保障
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:12}}">
              退换货流程
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:13}}">
              退款说明
            </nuxt-link>
          </li>
          <li>
            <h6>举报投诉</h6>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:14}}">
              我要举报
            </nuxt-link>
            <nuxt-link :to="{name: 'noviceHelp',query:{footerIndex:15}}">
              我要投诉
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-container-content">
      <div class="footer-container-content-main">
        <ul>
          <li>
            <a href="#">关于我们</a>
          </li>
          <li>
            <a href="#">新闻资讯</a>
          </li>
          <li>
            <a href="#">药兜服务</a>
          </li>
          <li>
            <a href="#">全国网络</a>
          </li>
          <li>
            <a href="#">合作企业</a>
          </li>
          <li>
            <a href="#">诚聘英才</a>
          </li>
          <li>
            <a href="#">联系我们</a>
          </li>
          <li>
            <a href="#">用户服务协议</a>
          </li>
          <li>
            <a href="#">隐私政策</a>
          </li>
        </ul>
        <div class="text-content">
          <div>
            <a href="http://www.samr.gov.cn/" rel="nofollow" target="_blank">监督机构：国家市场监督管理局</a>&nbsp;
            <a href="http://scjgj.beijing.gov.cn/" rel="nofollow" target="_blank">北京市市场监督管理局</a>&nbsp;
            <a href="https://www.nmpa.gov.cn/" rel="nofollow" target="_blank">国家药品监督管理局</a>
            <a href="http://yjj.beijing.gov.cn/" rel="nofollow" target="_blank">北京市药品监督管理局</a>
            <a href="http://scjgj.beijing.gov.cn/" rel="nofollow" target="_blank">顺义区市场监督管理局</a>
          </div>
          <div>
            <a href="https://images.yaodouwang.com/images/zl/yyzz-gw.jpg" rel="nofollow" target="_blank">
              营业执照
            </a>&nbsp;
            <a href="https://images.yaodouwang.com/images/zl/%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%BD%AF%E8%91%97%E7%99%BB%E8%AE%B0%E8%AF%81.png" rel="nofollow" target="_blank">
              软件著作权登记证书
            </a>&nbsp;
            <a href="https://images.yaodouwang.com/images/pc/version2/yaopinxinxifuwu.jpg" rel="nofollow" target="_blank">
              互联网药品信息服务资格证书：（京）&middot; 经营性 &middot; 2014 &middot; 0011
            </a>&nbsp;
            <a href="https://images.yaodouwang.com/images/zl/%E4%BA%92%E8%81%94%E7%BD%91%E8%8D%AF%E5%93%81%E4%BA%A4%E6%98%93%E8%B5%84%E6%A0%BC%E8%AF%81%E4%B9%A6.jpg" rel="nofollow" target="_blank">
              互联网药品交易资格证书：国A20160008
            </a>&nbsp;
            <a href="https://images.yaodouwang.com/images/zl/spjyzs-new.jpg" rel="nofollow" target="_blank">
              食品经营许可证
            </a>
          </div>
          <div>
            <a href="https://images.yaodouwang.com/images/zl/yiliaoqixie-new.jpg" rel="nofollow" target="_blank">
              互联网医疗器械备案登记证书：（京）网械平台备字（2018）第00010号
            </a>
          </div>
          <div>
            <a>
              Copyright2014-2020 &nbsp;北京星汉博纳医药科技有限公司
            </a>
          </div>
          <div><a>京ICP备15008423号</a></div>
          <div><a>京公网安备&nbsp;11011302002099</a></div>
        </div>
        <div class="cooperative-enterprise">
          <a href="https://cn.unionpay.com/upowhtml/cn/templates/index/index.html" rel="nofollow" target="_blank">
            <img src="../assets/img/home/china.png" alt="">
          </a>
          <a href="http://www.abchina.com/cn/" rel="nofollow" target="_blank">
            <img src="../assets/img/home/ABC.png" alt="">
          </a>
          <a href="http://www.icbc.com.cn/icbc/" rel="nofollow" target="_blank">
            <img src="../assets/img/home/gs.png" alt="">
          </a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010002001098" rel="nofollow" target="_blank">
            <img src="../assets/img/home/beian.png" alt="">
          </a>
          <a href="https://credit.szfw.org/CX20160322018221580187.html" rel="nofollow" target="_blank">
            <img src="../assets/img/home/cert.png" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.footer-container {
  color: #fff;
  font-size: 14px;
  text-align: center;
  &-service {
    background: #00A47C;
    height: 217px;
    padding-top: 64px;
    &-main {
      width: 1200px;
      margin: 0 auto;
      &-first {
        & li {
          text-align: left;
        }
      }
      & ul {
        display: flex;
        justify-content: space-between;
        & li {
          display: flex;
          flex-direction: column;
          & a {
            color:rgba(255,255,255,0.6);
            cursor: pointer;
          }
          & a:hover {
            color:rgba(255,255,255,1);
          }
          & h6 {
            font-size: 16px;
            margin-bottom: 10px;
          }
          & img {
            width: 143px;
            height: 70px;
          }
        }
      }
    }
  }
  &-content {
    background: #138F6D;
    height: 279px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    line-height:20px;
    padding-top: 30px;
    color:rgba(255,255,255,0.6);
    &-main {
      max-width: 1020px;
      margin: 0 auto;
      & ul {
        display: flex;
        justify-content: space-between;
      }
      .text-content {
        line-height:20px;
        margin-top: 30px;
      }
      .cooperative-enterprise {
        display: flex;
        justify-content: center;
        margin-top: 33px;
        & img {
          width: 108px;
          height: 28px;
          margin-right: 10px;
        }
      }
    }
    & a {
      color:rgba(255,255,255,0.6);
      cursor: pointer;
    }
    & a:hover {
      color:rgba(255,255,255,1);
    }
  }
}
</style>
