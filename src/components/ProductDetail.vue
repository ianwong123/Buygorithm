<template>
  <div class="product-detail min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-grow p-4 md:p-6 max-w-2xl mx-auto w-full">
      <div v-if="loading" class="text-center py-10">
        <p class="text-xl">Loading product details...</p>
      </div>
      
      <div v-else-if="error" class="text-center py-10 text-red-600">
        <p class="text-xl">{{ error }}</p>
        <button @click="fetchProductDetails" class="mt-4 bg-teal-500 text-white px-4 py-2 rounded">
          Try Again
        </button>
      </div>
      
      <div v-else>
        <!-- Product Name -->
        <h1 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 break-words">
          {{ product.name }}
        </h1>

        <!-- Main Product image displayed -->
        <img
          :src="product.image"
          alt="Product Image"
          class="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg mb-4"
        />
        
        <div class="flex space-x-4 mb-6">
          <button
            @click="buyNow"
            class="flex-1 bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
          >
            Buy Now
          </button>

          <button
            @click="addToCart"
            class="flex-1 bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
          >
            Add to Cart
          </button>
        </div>

        <!-- Product Description -->
        <p class="text-base md:text-lg text-justify mb-4 break-words whitespace-pre-line">
          {{ product.description }}
        </p>

        <!-- Product price -->
        <p class="text-lg md:text-xl font-bold mb-2">£{{ parseFloat(product.price).toFixed(2) }}</p>

        <!-- Product quantity -->
        <p class="text-base md:text-lg mb-2">Quantity: {{ product.quantity }}</p>

        <!-- Product categories -->
        <p class="text-base md:text-lg mb-4">Category: {{ product.category }}</p>
        
        <!-- Seller information -->
        <p v-if="product.seller_name" class="text-base md:text-lg mb-4">Seller: {{ product.seller_name }}</p>

        <!-- Product information -->
        <p v-if="product.seller_name" class="text-base md:text-lg mb-4">Product ID: {{ product.id }}</p>
        
        <!-- Condition -->
        <p class="text-base md:text-lg mb-4">Condition: {{ product.item_condition === 'new' ? 'New' : 'Used' }}</p>

        <!-- Additional Images -->
        <div v-if="product.images && product.images.length > 1" class="mt-4">
          <h2 class="text-xl font-bold mb-2">More Images</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              class="w-full h-32 md:h-48 object-cover rounded-lg"
            />
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
  name: 'ProductDetail',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        image: '',
        images: []
      },
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      this.loading = true;
      this.error = null;
      
      try {
        const productId = this.$route.params.id;
        const response = await api.getProductById(productId);
        
        // Transform API data to match our frontend structure
        this.product = {
          id: response.data.product_id,
          name: response.data.title,
          description: response.data.item_description,
          price: parseFloat(response.data.price),
          quantity: response.data.quantity,
          category: response.data.category_name,
          image: response.data.images[0] || 'https://via.placeholder.com/400x200',
          images: response.data.images,
          seller_name: response.data.seller_name,
          item_condition: response.data.item_condition
        };
        
        this.loading = false;
      } catch (error) {
        console.error('Error fetching product details:', error);
        this.error = 'Failed to load product details. Please try again.';
        this.loading = false;
      }
    },

    
    buyNow() {
      // Implement buy now functionality
      alert('Buy Now functionality not implemented yet');
    },
    addToCart() {
      // Implement add to cart functionality
      alert('Add to Cart functionality not implemented yet');
    }
  }
};
</script>

<style scoped>
.product-detail {
  @apply min-h-screen flex flex-col;
}
</style>