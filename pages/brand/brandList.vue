<template>
  <div class="brand-list">
    <div class="brand-list-content">
      <brandListItem v-for="(item,index) in brandList" :key="index" :brand-data="item" />
    </div>
  </div>
</template>
<script>
import {  brandList } from '~/api/home';
import brandListItem from '../../components/brand/brandListItem.vue';
export default {
  components: {
    brandListItem
  },
  data() {
    return {
      brandList: []
    };
  },
  created() {
    this.getBrandList();
  },
  methods: {
    /**
     * 获取品牌列表
     */
    getBrandList() {
      brandList().then((data) => {
        if (data.code === '0000') {
          this.brandList = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
  .brand-list {
    background: #F6F6F6;
    &-content {
      width: 1200px;
      margin: 0 auto;
      padding: 30px 0px;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>