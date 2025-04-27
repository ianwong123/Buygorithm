<template>
    <div class="referral-input bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 class="text-xl font-semibold mb-2">Refer a Friend</h2>
      
      <!-- Display your referral code -->
      <div class="flex items-center mb-4">
        <input
          class="flex-1 border p-2 rounded-l-md"
          type="text"
          :value="referralCode"
          readonly
        />
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          @click="copyCode"
        >
          Copy
        </button>
      </div>
  
      <!-- Enter friend's referral code -->
      <div class="flex items-center">
        <input
          v-model="friendCode"
          class="flex-1 border p-2 rounded-l-md"
          type="text"
          placeholder="Enter a friend's code"
        />
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
          @click="submitFriendCode"
        >
          Submit
        </button>
      </div>
  
      <p v-if="copySuccess" class="text-green-500 mt-2">Copied to clipboard!</p>
      <p v-if="submitSuccess" class="text-green-500 mt-2">Referral code submitted!</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const referralCode = 'ABC123' // You can dynamically generate this
  const friendCode = ref('')
  const copySuccess = ref(false)
  const submitSuccess = ref(false)
  
  function copyCode() {
    navigator.clipboard.writeText(referralCode)
    copySuccess.value = true
    setTimeout(() => (copySuccess.value = false), 2000)
  }
  
  function submitFriendCode() {
    if (friendCode.value.trim() !== '') {
      console.log('Submitted friend code:', friendCode.value)
      submitSuccess.value = true
      setTimeout(() => (submitSuccess.value = false), 2000)
      friendCode.value = ''
    }
  }
  </script>
  
  <style scoped>
  .referral-input input {
    border: 1px solid #ddd;
  }
  </style>
  