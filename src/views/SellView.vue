<template>
    <div class="sell min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow p-6 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">List a Product for Sale</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
  
          <!-- Product Name Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              v-model="product.name"
              type="text"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <!-- Product Description Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="product.description"
              required
              rows="4"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
  
          <!-- Price Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Price (£)</label>
            <input
              v-model="product.price"
              type="number"
              min="0"
              step="0.01"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <!-- Quantity Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              v-model="product.quantity"
              type="number"
              min="1"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <!-- Select Category Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Category</label>
            <select
              v-model="product.category"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Brand New">Brand New</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Second Hand">Second Hand</option>
            </select>
          </div>
  
          <!-- Upload Image Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Product Images</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              multiple
              class="mt-1 block w-full"
            />
            <div v-if="product.imagePreviews.length" class="mt-2 grid grid-cols-3 gap-4">
              <div v-for="(image, index) in product.imagePreviews" :key="index" class="relative">
                <img :src="image" class="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  @click="handleImageDelete(index)"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
          >
            List Product
          </button>
        </form>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'SellView',
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
          quantity: 1,
          category: 'Brand New',
          images: [],
          imagePreviews: [],
        },
      };
    },
    methods: {
      handleImageUpload(e) {
        const files = Array.from(e.target.files);
        if (files.length + this.product.images.length > 25) {
          alert('You can upload a maximum of 25 images.');
          return;
        }
        files.forEach(file => {
          this.product.images.push(file);
          this.product.imagePreviews.push(URL.createObjectURL(file));
        });
      },
      handleImageDelete(index) {
        this.product.images.splice(index, 1);
        this.product.imagePreviews.splice(index, 1);
      },
      handleSubmit() {

        // If the product name is too long then alrt
        if (this.product.name.length > 100) {
            alert('Product name must be 100 characters or less only.');
            return;
        }
        const newProduct = {
          id: Date.now(),
          ...this.product,
          image: this.product.imagePreviews[0], 
          images: this.product.imagePreviews,
        };
  
        this.$root.trendingProducts = [...(this.$root.trendingProducts || []), newProduct];
        this.$router.push({ path: '/trending', query: { tab: newProduct.category } });
      },
    },
  };
  </script>
  
  <style scoped>
  .sell {
    @apply min-h-screen flex flex-col;
  }
  </style>