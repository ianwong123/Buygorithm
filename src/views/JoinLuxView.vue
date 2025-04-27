<template>
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <Navbar />
  
      <main class="flex-grow p-6 flex flex-col justify-center items-center">
        <h1 class="text-3xl font-bold mb-6 text-center">Join Buygorithm Lux</h1>
        <p class="mb-4 text-center">Please log in or sign up to enjoy the exclusive benefits of the Buygorithm Lux program!</p>
  
        <div class="space-y-4">
          <!-- Log In Option -->
          <div class="bg-blue-100 p-6 rounded-lg shadow-md text-center w-full max-w-sm">
            <h2 class="text-2xl font-semibold mb-4">Log In to Join Buygorithm Lux</h2>
            <p class="mb-4">Already have an account? Log in to continue and enjoy the Lux benefits!</p>
            <button @click="openLoginModal" class="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600">
              Log In
            </button>
          </div>
  
          <!-- Sign Up Option -->
          <div class="bg-green-100 p-6 rounded-lg shadow-md text-center w-full max-w-sm">
            <h2 class="text-2xl font-semibold mb-4">Sign Up for Buygorithm Lux</h2>
            <p class="mb-4">New to Buygorithm? Sign up to unlock all the Lux benefits!</p>
            <button @click="openSignupModal" class="bg-green-500 text-white p-3 rounded-lg w-full hover:bg-green-600">
              Sign Up
            </button>
          </div>
        </div>
  
        <div class="mt-6 text-center">
          <router-link to="/lux" class="text-blue-500 hover:underline">Back to Loyalty Program Details</router-link>
        </div>
      </main>
  
      <!-- Footer -->
      <Footer />
  
      <!-- Login Modal -->
      <LoginModal 
        :isOpen="isLoginModalOpen" 
        @close="closeLoginModal" 
      />
  
      <!-- Sign Up Modal -->
      <SignupModal 
        :isOpen="isSignupModalOpen" 
        @close="closeSignupModal" 
      />
    </div>
  </template>
  
  <script>
  // Import Navbar, Footer, Login and Signup Components
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  import LoginModal from '@/components/Login.vue';
  import SignupModal from '@/components/SignUp.vue';
  
  export default {
    name: 'RegistrationView',
    components: {
      Navbar,
      Footer,
      LoginModal,
      SignupModal,
    },
  
    data() {
      return {
        isLoginModalOpen: false,  // Modal visibility state for Login
        isSignupModalOpen: false, // Modal visibility state for SignUp
      };
    },
  
    methods: {
      openLoginModal() {
        this.isLoginModalOpen = true; // Show login modal
      },
  
      closeLoginModal() {
        this.isLoginModalOpen = false; // Close login modal
      },
  
      openSignupModal() {
        this.isSignupModalOpen = true; // Show signup modal
      },
  
      closeSignupModal() {
        this.isSignupModalOpen = false; // Close signup modal
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles to enhance the layout */
  </style>
  