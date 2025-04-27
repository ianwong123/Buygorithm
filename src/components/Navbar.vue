<template>
  <nav class="flex justify-between items-center p-4 bg-teal-500 text-white">
    <!-- Logo -->
    <div class="text-2xl md:text-4xl font-bold">Buygorithm</div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/" class="hover:text-gray-200">Home</router-link>
      <router-link to="/auction" class="hover:text-gray-200">Auction</router-link>
      <router-link to="/trending" class="hover:text-gray-200">Shop</router-link>
      <router-link to="/sell" class="hover:text-gray-200">Sell</router-link>
      <router-link to="/manage" class="hover:text-gray-200">Manage Products</router-link>
      <router-link to="/loyalty" class="hover:text-gray-200">Loyalty</router-link>
      <router-link to="/cart" class="hover:text-gray-200">Cart</router-link>
      <button @click="openLoginModal" class="hover:text-gray-200">Login</button>
      <button @click="openSignupModal" class="hover:text-gray-200">Sign Up</button>
    </div>

    <!-- Mobile Menu Button -->
    <button @click="toggleMenu" class="md:hidden">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

    <!-- Mobile Menu (Slides from the side) -->
    <div v-if="isMenuOpen" class="fixed inset-0 bg-teal-500 z-50 flex flex-col items-center justify-center md:hidden">
      <button @click="toggleMenu" class="absolute top-4 right-4 text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <router-link to="/" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Home</router-link>
      <router-link to="/auction" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Auction</router-link>
      <router-link to="/trending" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Shop</router-link>
      <router-link to="/sell" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Sell</router-link>
      <router-link to="/manage" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Manage Products</router-link>
      <router-link to="/loyalty" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Loyalty</router-link>
      <router-link to="/cart" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Cart</router-link>
      <button @click="openLoginModal" class="text-2xl my-2 hover:text-gray-200">Login</button>
      <button @click="openSignupModal" class="text-2xl my-2 hover:text-gray-200">Sign Up</button>
    </div>

    <!-- Login -->
    <LoginModal :isOpen="isLoginModalOpen" @close="closeLoginModal" />

    <!-- Signup  -->
    <SignupModal :isOpen="isSignupModalOpen" @close="closeSignupModal" />
  </nav>
</template>

<script>
import LoginModal from '@/components/Login.vue';
import SignupModal from '@/components/SignUp.vue';

export default {
  name: 'Navbar',
  components: {
    LoginModal,
    SignupModal,
  },

  data() {
    return {
      isMenuOpen: false,
      isLoginModalOpen: false,
      isSignupModalOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    openLoginModal() {
      this.isLoginModalOpen = true;
    },

    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    
    openSignupModal() {
      this.isSignupModalOpen = true;
    },
    
    closeSignupModal() {
      this.isSignupModalOpen = false;
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>