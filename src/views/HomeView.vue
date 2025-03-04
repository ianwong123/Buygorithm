<template>
    <div class="home">
      <Navbar />
      <main class="p-6">
        <!-- Trending Section -->
        <section class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Trending</h2>
            <router-link to="/trending" class="text-blue-500 hover:underline">More →</router-link>
          </div>
          <!-- Add trending products here -->
        </section>
  
        <!-- Category Sections -->
        <section class="grid grid-cols-2 gap-4">
          <CategoryCard category="Category 1" />
          <CategoryCard category="Category 2" />
          <CategoryCard category="Category 3" />
          <CategoryCard category="Category 4" />
        </section>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  import CategoryCard from '@/components/CategoryCard.vue';
  
  export default {
    name: 'HomeView',
    components: {
      Navbar,
      Footer,
      CategoryCard,
    },
  };
  </script>
  
  <style scoped>
  .home {
    @apply min-h-screen flex flex-col;
  }
  </style>