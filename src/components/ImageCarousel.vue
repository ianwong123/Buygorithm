<template>
  <div class="relative w-full h-[600px] overflow-hidden rounded-lg">
    <img :src="currentImage" alt="Carousel Image" class="w-full h-full object-cover" />
    <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r">
      &lt;
    </button>
    <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l">
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data() {
    return {
      images: [
        '/home-carouselimage/sales1.jpg',
        '/home-carouselimage/sales2.jpg',
        '/home-carouselimage/sales3.jpg',
      ],
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  methods: {
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
  },
  mounted() {
    setInterval(this.nextImage, 5000); 
  },
};
</script>

<style scoped>
img {
  transition: opacity 0.5s ease;
}
</style>s