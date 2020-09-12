<template>
  <div class="good-shop">
    <div class="good-shop-content">
      <transverseTop />
      <div class="good-shop-list">
        <goodShopItem v-for="(item,index) in dataList" :key="index" :item-data="item" :color-index="index" />
      </div>
    </div>
  </div>
</template>
<script>
import { storeList } from '~/api/transverse';
import transverseTop from '../../components/transverse/transverseTop';
import goodShopItem from '../../components/transverse/goodShopItem';
export default {
  components: {
    transverseTop,
    goodShopItem
  },
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.getStoreList();
  },
  methods: {
    getStoreList() {
      storeList().then((data) => {
        if (data.code == '0000') {
          this.dataList = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .good-shop {
    margin-top: 20px;
    &-content {
      width: 1200px;
      margin: 19px auto 60px;
      .good-shop-list {
        display: flex;
        flex-wrap: wrap;
        & a {
          margin-left: 10px;
        }
        & a:nth-child(3n+1) {
          margin-left: 0px;
        }
      }
    }
  }
</style>