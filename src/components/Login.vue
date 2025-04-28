
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md mx-auto">
      <!-- Success Alert -->
      <div v-if="showSuccess" class="mb-4 bg-green-100 border border-green-400 text-green-700 px-3 py-3 rounded relative" role="alert">
        <div class="flex items-center">
          <div class="mr-3">
            <svg class="h-5 w-5 sm:h-6 sm:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-sm sm:text-base">Success!</p>
            <p class="text-xs sm:text-sm">You have successfully logged in.</p>
          </div>
        </div>
        <div class="mt-3 flex justify-end">
          <button 
            @click="closeModal" 
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm"
          >
            Continue
          </button>
        </div>
      </div>

      <!-- Login Form -->
      <div v-else>
        <h2 class="text-xl sm:text-2xl  text-gray-700 font-bold mb-4">Login</h2>
        <form @submit.prevent="handleLogin">
          
          <!-- Username or Email -->
          <div class="mb-3 sm:mb-4">
            <label for="username" class="block text-xs sm:text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
    
          <!-- Password -->
          <div class="mb-3 sm:mb-4">
            <label for="password" class="block text-xs sm:text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
    
          <!-- Error Message -->
          <div v-if="error" class="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-3 sm:mb-4 text-xs sm:text-sm">
            <p>{{ error }}</p>
          </div>
    
          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 flex items-center justify-center text-sm"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="mr-2">
              <svg class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span>Login</span>
          </button>
        </form>
    
 
    
        <!-- Close Button -->
        <div class="flex justify-center mt-3 sm:mt-4">
          <button @click="closeModal" class="text-xs sm:text-sm text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'LoginModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      username: '', 
      password: '', 
      error: '',
      isLoading: false,
      showSuccess: false
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.isLoading = true;
      
      try {
        console.log('Attempting login with:', {
          username: this.username,
          password: this.password
        });
        
        const response = await api.login({
          username: this.username,
          password: this.password
        });
        
        console.log('Login response:', response);
        
        if (response.data.success) {
          this.showSuccess = true;
          
           // Store token and user data
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
           // Set auth header for future requests
          api.setAuthToken(response.data.token);
          // Emit success event

          this.$emit('login-success', response.data.user);
          this.closeModal();

        } else {
          this.error = response.data.message || 'Login failed';
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          this.error = error.response.data.message || 
                      error.response.data.error || 
                      'Login failed. Please try again.';
        } else {
          this.error = 'Network error. Please check your connection.';
        }
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.username = '';
      this.password = '';
      this.error = '';
      this.showSuccess = false;
      this.$emit('close');
    }
  }
};
</script>
  
<style scoped>
</style>