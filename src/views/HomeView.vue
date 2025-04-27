<template>
  <div class="home min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow p-6">
      <!-- 6-Box Section -->
      <section class="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div class="md:col-span-2">
          <ImageCarousel />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 gap-4">
          <PromoBox image="/home-carouselimage/promo1.jpg"  />
          <PromoBox image="/home-carouselimage/promo2.jpg"  />
        </div>
        <div class="hidden sm:hidden lg:col-span-3 lg:grid lg:grid-cols-2 gap-4">
          <PromoBox image="/home-carouselimage/promo3.jpg"  />
          <PromoBox image="/home-carouselimage/promo4.jpg"  />
        </div>
      </section>

      <!-- Trending Section -->
      <section class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl md:text-4xl font-bold text-gray-800">Trending</h2>
          
          <router-link to="/trending" class="text-blue-500 text-xl hover:underline">More →</router-link>
        </div>
        <div class="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-12">
          <CategoryCard image="/home-carouselimage/brand_new.jpg" category="Brand New" />
          <CategoryCard image="/home-carouselimage/accessories.jpg" category="Accessories" />
          <CategoryCard image="/home-carouselimage/electronics.jpg" category="Electronics" />
          <CategoryCard image="/home-carouselimage/second_hand.jpg" category="Second Hand" />
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