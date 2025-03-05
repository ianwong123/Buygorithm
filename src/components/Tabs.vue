<template>
  <div class="tabs">
    <div class="flex space-x-4 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="['p-2', activeTab === tab ? 'border-b-2 border-blue-500' : 'text-gray-500']"
      >
        {{ tab }}
      </button>
    </div>
    <div class="mt-4">
      <img :src="imagePlaceholder" alt="Placeholder" class="w-full h-48 object-cover rounded-lg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    initialTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: this.initialTab,
      imagePlaceholder: 'https://via.placeholder.com/800x400',
    };
  },
  watch: {
    initialTab(newTab) {
      this.activeTab = newTab;
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>