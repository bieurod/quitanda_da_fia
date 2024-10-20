<template>
  <div>
    <Banner/>
    <Product/>
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import Product from '../components/Product.vue';

export default {
  name: 'HomeView',
  components: {
    Banner,
    Product,
  }
}
</script>
