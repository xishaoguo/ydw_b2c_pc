<template>
  <div class="advertising-space">
    <ul>
      <li v-for="item in images" :key="item">
        <img :src="item" alt="广告位">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdvertisingSpace',
  components: {},
  data() {
    return {
      images: [
        require('../../assets/img/home/advertisement_1.png'),
        require('../../assets/img/home/advertisement_2.png'),
        require('../../assets/img/home/advertisement_3.png'),
        require('../../assets/img/home/advertisement_4.png')
      ]
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.advertising-space {
    width: 1200px;
    & ul {
      display: flex;
      & li {
        flex: 1;
        & img {
          width: 100%;
          height: 158px;
        }
      }
    }
}
</style>
