<template>
  <div class="bg-white p-4 rounded-lg shadow-md cursor-pointer" @click="navigateToTrending">
    <img :src="image" alt="Category Image" class="w-full h-64 object-cover rounded-lg" />
    <h3 class="mt-2 text-center text-lg font-semibold">{{ category }}</h3>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  methods: {
    navigateToTrending() {
      this.$router.push({ path: '/trending', query: { tab: this.category } });
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>