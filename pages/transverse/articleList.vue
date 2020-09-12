<template>
  <div class="article-list">
    <div class="article-list-content">
      <transverseTop />
      <ul class="article-list-content-ul">
        <li v-for="(item,index) in 10" :key="item" @click="toArticleDetails(index)">
          <h6>[心血管科] 冠心病的几种典型症状</h6>
          <p>
            冠心病的几种典型症状，冠心病是生活中比较常见的一种心血管疾病，但是多数的人对于这一疾病的症状不是了解。
            下面给大家介绍冠心病的几种常见的典型症状，下面一起来看看。
            1、气短，感到空气不够用或呼吸困难等都可能是冠心病的症状，这种气短有活动时加重，休息时减轻，平卧时加重，
            坐位时减轻的特点。2、劳累或精神紧张时出现胸骨后或心前区闷痛，冠心病的症状表现为或紧缩样疼痛，并向左肩、左上臂放射，
            持续3-5分钟，休息2、劳累或精神紧张时出现胸骨后或心前区闷痛，冠心病的症状表现为或紧缩样疼痛，并向左肩、左上臂放射，
            持续3-5分钟，休息
          </p>
          <div>发布时间：2020-07-28</div>
        </li>
      </ul>
      <div class="article-list-content-pag">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, total, jumper"
          :total="1000"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import transverseTop from '../../components/transverse/transverseTop';
export default {
  components: {
    transverseTop
  },
  data() {
    return {
      currentPage: 5
    };
  },
  methods: {
    handleCurrentChange(number) {
      console.log('页面改变了', number);
      this.currentPage = number;
    },
    /**
     * 跳转文章详情
     */
    toArticleDetails(index) {
      this.$router.push('/transverse/articleDetails');
    }
  }
};
</script>
<style lang="scss">
  .article-list {
    margin-top: 20px;
    &-content {
      width: 1200px;
      margin: 0 auto 60px;
      &-ul {
        margin-top: 9px;
        & li {
          margin-top: 30px;
          color: #999999;
          &:hover {
            color: #00A47C;
            cursor: pointer;
          }
          &:hover h6{
            color: #00A47C;
          }
          &:hover div{
            color: #999999;
          }
          & h6 {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            line-height: 24px;
          }
          & p {
            margin-top: 10px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          &>div {
            margin-top: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            text-align: right;
          }
        }
      }
      &-pag {
        text-align: center;
      }
    }
  }
</style>