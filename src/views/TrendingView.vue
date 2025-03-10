<template>
  <div class="trending min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow p-6">
      <Tabs :tabs="tabs" :initialTab="activeTab" @tab-change="handleTabChange" />
      <Filter class="my-4" />
      <ProductList :products="filteredProducts" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Tabs from '@/components/Tabs.vue';
import Filter from '@/components/Filter.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'TrendingView',
  components: {
    Navbar,
    Footer,
    Tabs,
    Filter,
    ProductList,
  },
  data() {
    return {
      tabs: ["Brand New", "Accessories", "Electronics", "Second Hand"],
      activeTab: this.$route.query.tab || "Brand New", 
      products: this.$root.trendingProducts || [],
    };
  },
  computed: {
    filteredProducts() {

      // Filter products based on the active tab
      return this.products.filter(product => product.category === this.activeTab);
    },
  },
  watch: {
    '$route.query.tab'(newTab) {

      // Here we update the tab when it changes
      this.activeTab = newTab; 
    },
  },
  methods: {
    handleTabChange(tab) {

      // Then we update the tab when its clicked and then we update the URL query
      // such as changing in the url called Brand New to /Accessories etc
      this.activeTab = tab; 
      this.$router.push({ query: { tab } }); 
    },
  },
};
</script>

<style scoped>
.trending {
  @apply min-h-screen flex flex-col;
}
</style>