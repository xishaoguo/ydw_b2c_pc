import Vue from 'vue';
const filters = {
  /**
   * 保留两位小数
   */
  numberTofixed(price) {
    if (!price || price == 0) {
      price = '0.00';
    }
    if (!price) {
      return price;
    }
    if (typeof price === 'number') {
      price = Math.round(price * 100) / 100;
    }
    price = price.toString();
    if (price.indexOf('.') < 0) {
      price = price + '.00';
    } else {
      var length = price.substring(price.indexOf('.')).length;
      if (length == 2) {
        price = price + '0';
      }
    }
    return price;
  }
};
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
export default filters;

