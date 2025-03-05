<template>
    <div class="trending min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow p-6">
        <Tabs :tabs="tabs" :initialTab="activeTab" />
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
        tabs: ["Women's Clothes", "Men's Clothes", "Auction", "Category 1", "Category 2", "Category 3"],
        activeTab: this.$route.query.tab || "Women's Clothes",
        products: [
          { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/200', inStock: true },
          { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/200', inStock: false },
          // Add more products
        ],
        inStock: false,
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product => !this.inStock || product.inStock);
      },
    },
    watch: {
      '$route.query.tab'(newTab) {
        this.activeTab = newTab;
      },
    },
  };
  </script>
  
  <style scoped>
  .trending {
    @apply min-h-screen flex flex-col;
  }
  </style>