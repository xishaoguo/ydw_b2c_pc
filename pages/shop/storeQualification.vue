<template>
  <div class="store-qualification">
    <div class="store-qualification-main yd-container">
      <ul>
        <li v-for="(item,index) in images" :key="index">
          <img :src="item">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    if (this.$route.query.images) {
      this.images = this.$route.query.images;
    }
  }
};
</script>
<style lang="scss" scoped>
  .store-qualification {
    margin-top: 30px;
    margin-bottom: 60px;
    &-main {
      & ul {
        text-align: center;
        & li {
          margin-top: 32px;
          img {
            width: 924px;
            height: 647px;
          }
        }
      }
    }
  }
</style>