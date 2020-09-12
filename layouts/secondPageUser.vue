<template>
  <div>
    <shortcut />
    <div class="search-container">
      <Header />
    </div>
    <div class="main-container">
      <div class="main-contrnt">
        <div class="main-left">
          <UserLeft />
        </div>
        <div class="main-right">
          <Nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Shortcut from '../components/shortcut';
import Footer from '../components/footer';
import Header from '../components/header';
import UserLeft from '../components/user/userLeft';
export default {
  name: 'SecondPageUser',
  components: {
    Shortcut,
    Header,
    Footer,
    UserLeft,
  },
  data() {
    return {

    };
  },
  watch: {},
  created() {},
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .main-container {
    background: #F0F0F0;
    width: 100%;
    padding-top: 30px;
    padding-bottom: 60px;
    box-shadow: inset 0px 6px 10px -6px rgba(0,0,0,0.1);
  }
  .main-contrnt{
    display: flex;
    width: 1200px;
    margin: 0 auto;
    .main-left{
      width: 207px;
      margin-right: 28px;

    }
    .main-right{
      flex: 1;
    }
  }
  .search-container {
    background-color: #FFFFFF;
  }

</style>
