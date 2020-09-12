<template>
  <div>
    <shortcut />
    <div class="search-container">
      <Header />
    </div>
    <div class="main-container">
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Shortcut from '../components/shortcut';
import Footer from '../components/footer';
import Header from '../components/header';
export default {
  name: 'Main',
  components: {
    Shortcut,
    Header,
    Footer
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
  .main-container {
    background: white;
  }
  .search-container {
    background-color: #fff;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  }
</style>
