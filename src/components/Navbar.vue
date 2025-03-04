<template>
    <nav class="flex justify-between items-center p-4 bg-blue-500 text-white">
      <div class="text-xl font-bold">My E-Commerce</div>
      <div class="flex space-x-4">
        <router-link to="/cart" class="hover:text-gray-200">Cart</router-link>
        <router-link to="/login" class="hover:text-gray-200">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  </style>