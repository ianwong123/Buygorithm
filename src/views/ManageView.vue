<template>
  <div class="manage min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow p-6 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">Manage Your Products</h1>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <p class="text-lg">Loading your products...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>
      
      <!-- Success State -->
      <div v-else>
        <div v-if="products.length === 0" class="text-center py-10">
          <p class="text-lg">You haven't listed any products yet.</p>
          <router-link 
            to="/sell" 
            class="mt-4 inline-block bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            List Your First Product
          </router-link>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="product in products" 
            :key="product.product_id" 
            class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="p-4">
              <div class="flex items-start gap-4">
                <img 
                  :src="product.primary_image || 'https://via.placeholder.com/150'" 
                  class="w-24 h-24 object-cover rounded-lg"
                  alt="Product image"
                >
                <div class="flex-1">
                  <h2 class="text-lg font-semibold">{{ product.title }}</h2>
                  <p class="text-teal-600 font-bold">£{{ product.price.toFixed(2) }}</p>
                  <p class="text-sm text-gray-500">Stock: {{ product.quantity }}</p>
                </div>
              </div>
              
              <div class="mt-4 flex space-x-2">
                <router-link
                  :to="`/product/${product.product_id}`"
                  class="flex-1 text-center bg-blue-500 text-white py-2 px-3 rounded text-sm"
                >
                  View
                </router-link>
                <button
                  @click="editProduct(product.product_id)"
                  class="flex-1 bg-teal-500 text-white py-2 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(product.product_id)"
                  class="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import api from '@/services/api';

export default {
  name: 'ManageView',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchUserProducts();
  },
  methods: {
    async fetchUserProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        // First verify we have a token
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Not authenticated');
        }

        const response = await api.getUserProducts();
        console.log('API Response:', response.data); // Debug log
        
        if (response.data && Array.isArray(response.data)) {
          this.products = response.data.map(product => ({
            ...product,
            price: parseFloat(product.price) || 0,
            quantity: parseInt(product.quantity) || 0
          }));
        } else {
          throw new Error('Invalid data format from server');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = error.response?.data?.error || 
                    error.message || 
                    'Failed to load products. Please try again.';
        
        if (error.response?.status === 401) {
          this.error = 'Please login to view your products';
        }
      } finally {
        this.loading = false;
      }
    },
    
    editProduct(productId) {
      this.$router.push(`/edit-product/${productId}`);
    },
    
    async confirmDelete(productId) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await api.deleteProduct(productId);
          this.products = this.products.filter(p => p.product_id !== productId);
        } catch (error) {
          console.error('Delete failed:', error);
          alert('Failed to delete product. Please try again.');
        }
      }
    }
  }
};
</script>

<style scoped>
.manage {
  @apply min-h-screen flex flex-col;
}
</style>