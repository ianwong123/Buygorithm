<template>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <img :src="image" alt="Promo Image" class="w-full h-32 object-cover rounded-lg" />
      <p class="mt-2 text-center">{{ title }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PromoBox',
    props: {
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>