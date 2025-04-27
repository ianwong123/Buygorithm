<template>
    <div class="points-balance bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 class="text-xl font-semibold">Your Points</h2>
      <p class="text-2xl font-bold text-primary">{{ points }} pts</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    points: {
      type: Number,
      required: true
    }
  })
  </script>
  