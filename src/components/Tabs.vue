<template>
  <div class="tabs">
    <div class="flex space-x-4 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="handleTabClick(tab)"
        :class="['p-2', activeTab === tab ? 'border-b-2 border-blue-500' : 'text-gray-500']"
      >
        {{ tab }}
      </button>
    </div>
    <div class="mt-4 lg:min-w-lg">
      <img :src="imagePlaceholder" alt="Placeholder" class="hidden lg:block w-full h-64 object-cover rounded-lg" />
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
      imagePlaceholder: '/home-carouselimage/trending.jpg',
    };
  },

  watch: {
    initialTab(newTab) {
      //change the new tab
      this.activeTab = newTab; 
    },
  },

  methods: {
    handleTabClick(tab) {

      // Emit the selected tab to the parent
      this.activeTab = tab;
      this.$emit('tab-change', tab); 
    },
  },
};
</script>

<style scoped>
</style>