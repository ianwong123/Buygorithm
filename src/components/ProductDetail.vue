<template>
  <div class="product-detail min-h-screen flex flex-col">
    <Navbar />

    <main class="flex-grow p-4 md:p-6 max-w-2xl mx-auto w-full">

      <!-- here os the Product Name -->
      <h1 class="text-2xl md:text-3xl font-bold mb-4 md:mb-6 break-words">
        {{ product.name }}
      </h1>

      <!-- Main Product image displayed -->
      <img
        :src="product.image"
        alt="Product Image"
        class="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg mb-4"
      />
      
      <button
          @click="buyNow"
          class="w-full md:w-auto bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
        >
          Buy Now
      </button>

      <button
          @click="addToCart"
          class="w-full md:w-auto bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
        >
          Add to Cart
        </button>

      
      <!-- Product Description -->
      <p class="text-base md:text-lg text-justify mb-4 break-words whitespace-pre-line">
        {{ product.description }}
      </p>

      <!-- product price -->
      <p class="text-lg md:text-xl font-bold mb-2">£{{ product.price.toFixed(2) }}</p>

      <!-- productProduct quanitty -->
      <p class="text-base md:text-lg mb-2">Quantity: {{ product.quantity }}</p>

      <!-- product categories -->
      <p class="text-base md:text-lg mb-4">Category: {{ product.category }}</p>

      <!-- additional Images -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          v-for="(image, index) in product.images"
          :key="index"
          :src="image"
          class="w-full h-32 md:h-48 object-cover rounded-lg"
        />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'ProductDetail',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      product: null,
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.product = this.$root.trendingProducts.find(
      (product) => product.id === parseInt(productId)
    );
  },
};
</script>

<style scoped>
.product-detail {
  @apply min-h-screen flex flex-col;
}
</style>