<template>
    <div class="sell min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow p-6 max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Update or Delete a Product</h1>
        
        <div v-if="submitted" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <strong>Success!</strong> Your product has been listed.
          <div class="mt-4">
            <button @click="viewProduct" class="bg-teal-500 text-white px-4 py-2 rounded mr-2">
              View Product
            </button>
            <button @click="resetForm" class="bg-gray-300 px-4 py-2 rounded">
              List Another Product
            </button>
          </div>
        </div>
        
        <form v-else @submit.prevent="handleSubmit" class="space-y-4">
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

          <!-- Product Name Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              v-model="product.name"
              type="integer"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
  
          <!-- Product Description Field
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="product.description"
              required
              rows="4"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div> -->
  
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
  
          <!-- Condition Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Condition</label>
            <select
              v-model="product.condition"
              required
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
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
          <button type="submit" class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600" :disabled="loading">
            <span v-if="loading">Listing Product...</span>
            <span v-else>Update Product</span>
          </button>

            <!-- Submit Button -->
          <button type="submit"class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600" :disabled="loading">
            <span v-if="loading">Listing Product...</span>
            <span v-else>Delete Product</span>
          </button>
          
          


          <div v-if="error" class="text-red-600 text-center">
            {{ error }}
          </div>
        </form>
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
        product: {
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          category: 'Brand New',
          condition: 'new',
          images: [],
          imagePreviews: [],
        },
        loading: false,
        error: null,
        submitted: false,
        createdProductId: null
      };
    },
    methods: {
      handleImageUpload(e) {
        const files = Array.from(e.target.files);
        if (files.length + this.product.images.length > 25) {
          alert('You can upload a maximum of 25 images.');
          return;
        }
        
        // In a real app, you'd upload these to a server and get URLs back
        // For now, we'll use local object URLs
        files.forEach(file => {
          this.product.images.push(file);
          this.product.imagePreviews.push(URL.createObjectURL(file));
        });
      },
      handleImageDelete(index) {
        this.product.images.splice(index, 1);
        this.product.imagePreviews.splice(index, 1);
      },
      async handleSubmit() {
        // Validate product name length
        if (this.product.name.length > 100) {
          alert('Product name must be 100 characters or less only.');
          return;
        }
        
        this.loading = true;
        this.error = null;
        
        try {
          // In a real app, you'd upload images to a server first
          // For now, we'll just use the first preview URL
          const productData = {
            title: this.product.name,
            item_description: this.product.description,
            price: parseFloat(this.product.price),
            quantity: parseInt(this.product.quantity),
            category: this.product.category,
            item_condition: this.product.condition,
            // In a real app, these would be URLs from the server after upload
            images: this.product.imagePreviews
          };
          
          const response = await api.createProduct(productData);
          this.createdProductId = response.data.productId;
          this.submitted = true;
        } catch (error) {
          console.error('Error creating product:', error);
          this.error = 'Failed to list your product. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      viewProduct() {
        // Navigate to trending page with the relevant category tab
        this.$router.push({ 
          path: '/trending', 
          query: { tab: this.product.category } 
        });
      },
      resetForm() {
        this.product = {
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          category: 'Brand New',
          condition: 'new',
          images: [],
          imagePreviews: [],
        };
        this.submitted = false;
        this.createdProductId = null;
      }
    },
  };
  </script>
  
  <style scoped>
  .sell {
    @apply min-h-screen flex flex-col;
  }
  </style>