<template>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" alt="Product Image" class="w-full h-32 object-cover rounded-lg" />
        <p class="mt-2 text-center">{{ product.name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductList',
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .product-list {
    @apply grid grid-cols-2 md:grid-cols-4 gap-4;
  }
  .product-item {
    @apply bg-white p-4 rounded-lg shadow-md;
  }
  </style>