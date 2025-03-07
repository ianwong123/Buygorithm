<template>
  <footer class="bg-teal-500 text-white p-6">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
      <!-- Logo -->
      <div class="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Buygorithm</div>

      <!-- Divider (Hidden on mobile) -->
      <div class="border-l border-gray-600 h-24 mx-6 hidden md:block"></div>

      <!-- Contact Info -->
      <div class="text-center md:text-left">
        <p class="text-sm md:text-base">Customer Service No.: 0800 866 1129</p>
        <p class="text-sm md:text-base">Merchant Hotline: 0800 988 2230</p>
        <p class="text-sm md:text-base">Customer Service Hours: 10 AM - 6 PM</p>
        <p class="text-sm md:text-base">Merchant Service Hours: 10 AM - 5 PM</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>