<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="promo-image-container">
      <img :src="image" alt="Promo Image" class="promo-image" />
    </div>
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
.promo-image-container {
  width: 100%;
  height: 250px; 
  overflow: hidden;
  border-radius: 8px;
}

.promo-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.promo-image-container:hover .promo-image {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>