<template>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold">{{ category }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CategoryCard',
    props: {
      category: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>