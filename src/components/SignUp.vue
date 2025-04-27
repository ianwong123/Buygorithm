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
            <p class="text-xs sm:text-sm">Your account has been created successfully.</p>
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

      <!-- Signup Form -->
      <div v-else class="overflow-y-auto max-h-[80vh]">
        <h2 class="text-xl sm:text-2xl  text-gray-700 font-bold mb-4">Sign Up</h2>
        <form @submit.prevent="handleSignup">
          <!-- Full Name -->
          <div class="mb-3 sm:mb-4">
            <label for="fullName" class="block text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
            <input
              v-model="fullName"
              type="text"
              id="fullName"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
          
          <!-- Username -->
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
    
          <!-- Email -->
          <div class="mb-3 sm:mb-4">
            <label for="email" class="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
    
          <!-- Phone Number -->
          <div class="mb-3 sm:mb-4">
            <label for="phone" class="block text-xs sm:text-sm font-medium text-gray-700">Phone Number</label>
            <input
              v-model="phone"
              type="tel"
              id="phone"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
  
          <!-- Address -->
          <div class="mb-3 sm:mb-4">
            <label for="address" class="block text-xs sm:text-sm font-medium text-gray-700">Address</label>
            <textarea
              v-model="address"
              id="address"
              rows="2"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            ></textarea>
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
    
          <!-- Confirm Password -->
          <div class="mb-3 sm:mb-4">
            <label for="confirmPassword" class="block text-xs sm:text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              required
            />
          </div>
    
          <!-- Error Message -->
          <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 sm:mb-4 text-xs sm:text-sm">
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
            <span>Sign Up</span>
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
  name: 'SignupModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fullName: '',  
      username: '',
      email: '',
      phone: '',
      address: '',   
      password: '',
      confirmPassword: '',
      error: '',
      isLoading: false,
      showSuccess: false
    };
  },
  methods: {
    async handleSignup() {
      // Clear previous errors
      this.error = '';
      
      // Frontend validation
      if (!this.fullName || !this.username || !this.email || !this.phone || 
          !this.password || !this.confirmPassword || !this.address) {
        this.error = 'Please fill in all fields.';
        return;
      }
      
      // Validate phone format (basic validation)
      if (!/^[\d\s\+\-\(\)]{6,20}$/.test(this.phone)) {
        this.error = 'Please enter a valid phone number';
        return;
      }
      
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }
      
      if (this.password.length < 8) {
        this.error = 'Password must be at least 8 characters long.';
        return;
      }
      
      this.isLoading = true;
      
      try {
        const response = await api.signup({
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
          full_name: this.fullName,  
          address: this.address      
        });
        
        console.log('Signup response:', response);
        
        // Show success message
        this.isLoading = false;
        this.showSuccess = true;
        
      } catch (error) {
        this.isLoading = false;
        console.error('Signup error:', error);
        this.error = error.response?.data?.message || 
                    error.response?.data?.error || 
                    'Signup failed. Please try again.';
      }
    },
    closeModal() {
      // Reset form if success was shown
      if (this.showSuccess) {
        this.fullName = '';
        this.username = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.password = '';
        this.confirmPassword = '';
        this.error = '';
        this.showSuccess = false;
      }
      
      this.$emit('close');
    },
  },
};
</script>