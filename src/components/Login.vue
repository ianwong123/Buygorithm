<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form @submit.prevent="handleLogin">

          <!-- Username or Email -->
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username or Email</label>
            <input
              v-model="username"
              type="text"
              id="username"
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
  
          <!-- Error Message -->
          <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
  
          <!-- Submit Button -->
          <button type="submit" class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600">
            Login
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
      };
    },
    methods: {
      handleLogin() {
        // Frontend validation
        if (!this.username || !this.password) {
          this.error = 'Please fill in all fields.';
          return;
        }
  
        if (this.password.length < 8) {
          this.error = 'Password must be at least 8 characters long.';
          return;
        }
  
        // Simulate sending data to backend
        this.error = '';
        console.log('Logging in with:', { username: this.username, password: this.password });
  
        // Close modal after login
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      },
    },
  };
</script>
  
<style scoped>
</style>