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
  name: 'SecondPageUser',
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
    background: #FFFFFF;
    width: 100%;
    padding-top: 30px;
    box-shadow: inset 0px 6px 10px -6px rgba(0,0,0,0.1)
  }
  .search-container {
    background-color: #FFFFFF;
  }
</style>
