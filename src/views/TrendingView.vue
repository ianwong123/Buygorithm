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
import api from '@/services/api';

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
      products: [],
      loading: true,
      error: null
    };
  },
  computed: {
    filteredProducts() {
      // Filter products based on the active tab
      return this.products.filter(product => {
        // Match the category_name from API with our tab names
        return product.category_name === this.activeTab;
      });
    },
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    '$route.query.tab'(newTab) {
      // Update the tab when it changes in the URL
      this.activeTab = newTab || "Brand New";
    },
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.getProducts();
        console.log('API Response:', response.data); // Log  API response
        
        // Transform the API data to match our frontend structure
        this.products = response.data.map(product => {
          console.log(`Product category: ${product.category_name}, Active tab: ${this.activeTab}`);
          return {
            id: product.product_id,
            name: product.title,
            description: product.item_description,
            price: parseFloat(product.price),
            quantity: product.quantity,
            category_name: product.category_name, 
            image: product.primary_image || 'https://via.placeholder.com/400x200',
            images: [product.primary_image || 'https://via.placeholder.com/400x200']
          };
        });
        
        console.log('Transformed products:', this.products);
        console.log('Active tab:', this.activeTab);
        console.log('Filtered products:', this.filteredProducts);
        
        this.loading = false;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    },

    // Update your computed property to normalize comparisons
    computed: {
      filteredProducts() {
        console.log('Filtering products for tab:', this.activeTab);
        // Filter products based on the active tab with case-insensitive matching
        return this.products.filter(product => {
          const tabLower = this.activeTab.toLowerCase();
          const categoryLower = (product.category_name || '').toLowerCase();
          const match = categoryLower === tabLower;
          console.log(`Comparing: "${categoryLower}" with "${tabLower}" = ${match}`);
          return match;
        });
      },
    },
    handleTabChange(tab) {
      // Update the tab when it's clicked and then update the URL query
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