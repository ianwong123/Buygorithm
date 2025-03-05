<template>
  <div class="home min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow p-6">
      <!-- 6-Box Section -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="md:col-span-2">
          <ImageCarousel />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <PromoBox image="https://via.placeholder.com/400x200" title="Promo 1" />
          <PromoBox image="https://via.placeholder.com/400x200" title="Promo 2" />
          <PromoBox image="https://via.placeholder.com/400x200" title="Promo 3" />
          <PromoBox image="https://via.placeholder.com/400x200" title="Promo 4" />
          <PromoBox image="https://via.placeholder.com/400x200" title="Promo 5" />
        </div>
      </section>

      <!-- Trending Section -->
      <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Trending</h2>
          <router-link to="/trending" class="text-blue-500 hover:underline">More →</router-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard image="https://via.placeholder.com/400x200" category="Category 1" />
          <CategoryCard image="https://via.placeholder.com/400x200" category="Category 2" />
          <CategoryCard image="https://via.placeholder.com/400x200" category="Category 3" />
          <CategoryCard image="https://via.placeholder.com/400x200" category="Category 4" />
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';
import PromoBox from '@/components/PromoBox.vue';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Footer,
    CategoryCard,
    ImageCarousel,
    PromoBox,
  },
};
</script>

<style scoped>
.home {
  @apply min-h-screen flex flex-col;
}
</style>