<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
        <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
        <form @submit.prevent="handleSignup">
          <!-- Username -->
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700"
              required
            />
          </div>
  
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700"
              required
            />
          </div>
  
          <!-- Phone Number -->
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              v-model="phone"
              type="tel"
              id="phone"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700"
              required
            />
          </div>
  
          <!-- Password -->
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700"
              required
            />
          </div>
  
          <!-- Confirm Password -->
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-lg text-gray-700"
              required
            />
          </div>
  
          <!-- Error Message -->
          <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
  
          <!-- Submit Button -->
          <button type="submit" class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600">
            Sign Up
          </button>
        </form>
  
        <!-- Close Button -->
        <button @click="closeModal" class="mt-4 text-sm text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script>
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
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        error: '',
      };
    },
    methods: {
      handleSignup() {
        // Frontend validation
        if (!this.username || !this.email || !this.phone || !this.password || !this.confirmPassword) {
          this.error = 'Please fill in all fields.';
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
  
        // Simulate sending data to backend
        this.error = '';
        console.log('Signing up with:', {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
  
        // Close modal after signup
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>