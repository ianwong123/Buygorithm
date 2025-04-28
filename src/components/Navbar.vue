<template>
  <nav class="flex justify-between items-center p-4 bg-teal-500 text-white">
    <!-- Logo -->
    <div class="text-2xl md:text-4xl font-bold">Buygorithm</div>

    <!-- Desktop Menu -->
    <div class="hidden md:flex space-x-4 items-center">
      <!-- Always visible menu items -->
      <router-link to="/" class="hover:text-gray-200">Home</router-link>
      
      <!-- Minigames Dropdown -->
      <div class="relative">
        <button class="hover:text-gray-200 font-medium" @click="toggleMinigameDropdown">
          Minigame 
        </button>
        <div v-if="isMinigameDropdownOpen" class="absolute left-0 mt-2 w-40 bg-teal-600 text-white rounded-md shadow-lg">
          <router-link to="/minigame/game1" class="block px-4 py-2 hover:bg-teal-700">Game 1</router-link>
          <router-link to="/minigame/game2" class="block px-4 py-2 hover:bg-teal-700">Game 2</router-link>
        </div>
      </div>

      <router-link to="/auction" class="hover:text-gray-200">Auction</router-link>
      <router-link to="/trending" class="hover:text-gray-200">Shop</router-link>
      <router-link to="/loyalty" class="hover:text-gray-200">Loyalty</router-link>
      <router-link to="/lux" class="hover:text-gray-200">Lux</router-link>
      <router-link to="/cart" class="hover:text-gray-200">Cart</router-link>

      <!-- Conditional seller/admin items -->
      <template v-if="isAuthenticated">
        <router-link to="/sell" class="hover:text-gray-200">Sell</router-link>
        <router-link to="/manage" class="hover:text-gray-200">Manage Products</router-link>
      </template>

      <!-- Auth Buttons -->
      <template v-if="!isAuthenticated">
        <button @click="openLoginModal" class="hover:text-gray-200">Login</button>
        <button @click="openSignupModal" class="hover:text-gray-200">Sign Up</button>
      </template>
      <template v-else>
        <span class="font-medium">Hi, {{ currentUser.username }}</span>
        <button @click="logout" class="hover:text-gray-200">Logout</button>
      </template>
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
      
      <!-- Always visible mobile menu items -->
      <router-link to="/" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Home</router-link>
      
      <!-- Minigames Dropdown (Mobile) -->
      <div class="relative">
        <button class="text-2xl my-2 hover:text-gray-200" @click="toggleMobileMinigameDropdown">
          Minigame
        </button>
        <div v-if="isMobileMinigameDropdownOpen" class="text-2xl my-2">
          <router-link to="/minigame/game1" @click="toggleMenu" class="block my-2 hover:text-gray-200">Game 1</router-link>
          <router-link to="/minigame/game2" @click="toggleMenu" class="block my-2 hover:text-gray-200">Game 2</router-link>
        </div>
      </div>

      <router-link to="/auction" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Auction</router-link>
      <router-link to="/trending" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Shop</router-link>
      <router-link to="/loyalty" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Loyalty</router-link>
      <router-link to="/lux" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Lux</router-link>
      <router-link to="/cart" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Cart</router-link>

      <!--  Onlly seller mobile items -->
      <template v-if="isAuthenticated">
        <router-link to="/sell" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Sell</router-link>
        <router-link to="/manage" class="text-2xl my-2 hover:text-gray-200" @click="toggleMenu">Manage Products</router-link>
      </template>

      <!-- Auth Buttons (Mobile) -->
      <template v-if="!isAuthenticated">
        <button @click="openLoginModal" class="text-2xl my-2 hover:text-gray-200">Login</button>
        <button @click="openSignupModal" class="text-2xl my-2 hover:text-gray-200">Sign Up</button>
      </template>
      <template v-else>
        <span class="text-2xl my-2">Hi, {{ currentUser.username }}</span>
        <button @click="logout" class="text-2xl my-2 hover:text-gray-200">Logout</button>
      </template>
    </div>

    <!-- Modals -->
    <LoginModal 
      :isOpen="isLoginModalOpen" 
      @close="closeLoginModal"
      @login-success="handleLoginSuccess"
    />
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
      isMinigameDropdownOpen: false,  // For desktop
      isMobileMinigameDropdownOpen: false,  // For mobile
    };
  },

  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    currentUser() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    toggleMinigameDropdown() {
      this.isMinigameDropdownOpen = !this.isMinigameDropdownOpen;
    },

    toggleMobileMinigameDropdown() {
      this.isMobileMinigameDropdownOpen = !this.isMobileMinigameDropdownOpen;
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

    handleLoginSuccess(userData) {

    // Force update the navbar upon successful login
    this.$forceUpdate();
    
    // Close the modal
    this.closeLoginModal();
    
    // Show notification
    this.showToast(`Welcome back, ${userData.username}!`);
    },
    
    // toast notification implementation
    showToast(message) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.remove();
      }, 3000);
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/');
      this.$forceUpdate(); 

    },
  },
};
</script>

<style scoped>
</style>
