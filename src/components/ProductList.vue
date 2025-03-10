<template>
  <div class="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="product in products" :key="product.id" class="product-card border p-4 rounded-lg">
      <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
        <!-- Product Image -->
        <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover rounded-lg mb-4" />

        <!-- Product Name (ellipses if too long) -->
        <h2 class="text-lg font-bold truncate">{{ product.name }}</h2>

        <!-- Product Price -->
        <p class="text-gray-700">£{{ product.price.toFixed(2) }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-list {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6;
}

.product-card {
  @apply border p-4 rounded-lg;
}

/*turn the product name into ellipsis if itss too long */
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>