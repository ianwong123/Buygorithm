<template>
    <div class="relative w-full h-96 overflow-hidden rounded-lg">
      <img :src="currentImage" alt="Carousel Image" class="w-full h-full object-cover" />
      <button @click="prevImage" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3">
        &lt;
      </button>
      <button @click="nextImage" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3">
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
            '/home-carouselimage/image1.png',
            '/home-carouselimage/image2.png',
            '/home-carouselimage/image3.png',
        //   'https://via.placeholder.com/800x400/ff0000',
        //   'https://via.placeholder.com/800x400/00ff00',
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
  </style>