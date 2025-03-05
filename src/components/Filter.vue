<template>
    <div class="filter">
      <div class="flex items-center mb-4">
        <input type="checkbox" id="in-stock" v-model="inStock" class="mr-2" />
        <label for="in-stock">In Stock</label>
      </div>
      <!-- Add more filters here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'Filter',
    data() {
      return {
        inStock: false,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>