<template>
    <div class="loyalty min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow p-6 max-w-2xl mx-auto space-y-6">
        <h1 class="text-5xl font-bold mb-6 text-center">Buygorithm Lux</h1>
  
        <!-- Box 1: Welcome Text -->
        <div class="bg-blue-100 p-6 rounded-lg shadow-md">
          <p>
            We are very appreciative to our loyal users! Join our loyalty program and enjoy exclusive discounts, free deliveries and special rewards.
          </p>
        </div>
    
        <!-- Box 2: Pricing -->
        <div class="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-2 text-center"></h2>
          <p>Sign-up to Buygorithm Lux for unlimited next day deliveries on £20+ orders. (Including, free Standard Delivery on £15+ orders.)
            Shopping just got 10x better and easier >>>
          </p>
          <p class="text-xl font-semibold mb-2 text-center"> 
            For Only £12.99 a Year!
          </p>
        </div> 
  
        <!-- Box 3: Join Now Button -->
        <div class="bg-yellow-100 p-6 rounded-lg shadow-md text-center">
          <p class="mb-2">Don't want to miss out on ALL the exclusive benefits? It's simple, sign up now!</p>
          <button
            @click="joinLoyalty"
            class="bg-emerald-500 text-white p-3 rounded-lg hover:bg-emerald-600 w-full"
          >
            JOIN NOW
          </button>
        </div>
  
        <!-- Box 4: Benefits List -->
        <div class="bg-green-100 p-6 rounded-lg shadow-md">
          <ul class="list-disc list-inside space-y-2">
            <li>Earn points with every purchase</li>
            <li>Redeem points for discounts or gifts</li>   
            <li>Free deliveries</li>
            <li>Exclusive members-only promotions</li>
            <li>Birthday rewards and surprise offers</li>
            <li>Play Games to Earn More!</li>
          </ul>
        </div>
  
        <!-- Savings Comparison Table -->
        <h2 class="text-3xl font-semibold mt-10 mb-4 text-center">Savings Comparison</h2>
        <table class="table-auto w-full text-left border-collapse mb-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-4 py-2 border text-center">Number of Orders</th>
              <th class="px-4 py-2 border text-center">Without Loyalty Program</th>
              <th class="px-4 py-2 border text-center">With Loyalty Program</th>
              <th class="px-4 py-2 border text-center">Total Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(savings, index) in savingsData" :key="index">
              <td class="px-4 py-2 border text-center">{{ savings.orders }} </td>
              <td class="px-4 py-2 border text-center">£{{ savings.withoutLoyalty }} </td>
              <td class="px-4 py-2 border text-center">£{{ savings.withLoyalty }} </td>
              <td class="px-4 py-2 border text-center">£{{ savings.savings }}</td>
            </tr>
          </tbody>
        </table>
  
  
        <!-- Box 5: Create an Account, Choose Lux, and Enjoy Lux -->
        <div class="flex gap-6 justify-center">
          <!-- Box 1 -->
          <div class="bg-cream p-6 rounded-lg shadow-md w-96 text-center">
            <h3 class="text-xl font-semibold mb-2">Create an Account</h3>
            <p>Create an account & start shopping with Buygorithm.</p>
          </div>
  
          <!-- Box 2 -->
          <div class="bg-cream p-6 rounded-lg shadow-md w-96 text-center">
            <h3 class="text-xl font-semibold mb-2">Choose Lux</h3>
            <p>Select Lux option using the link above or during your checkout process.</p>
          </div>
  
          <!-- Box 3 -->
          <div class="bg-cream p-6 rounded-lg shadow-md w-96 text-center">
            <h3 class="text-xl font-semibold mb-2">Enjoy Lux</h3>
            <p>Enjoy Lux on your first order and all year long!</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'LoyaltyView',
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {
        loyaltyPrice: 12.99, // Price for the loyalty program
        deliveryPrice: 5.99, // Next day delivery price
        savingsData: [
        { orders: 3, withoutLoyalty: (3 * 5.99).toFixed(2), withLoyalty: (12.99).toFixed(2), savings: ((3 * 5.99) - 12.99).toFixed(2) },
          { orders: 5, withoutLoyalty: (5 * 5.99).toFixed(2), withLoyalty: (12.99).toFixed(2), savings: ((5 * 5.99) - 12.99).toFixed(2) },
          { orders: 10, withoutLoyalty: (10 * 5.99).toFixed(2), withLoyalty: (12.99).toFixed(2), savings: ((10 * 5.99) - 12.99).toFixed(2) },
          { orders: 15, withoutLoyalty: (15 * 5.99).toFixed(2), withLoyalty: (12.99).toFixed(2), savings: ((15 * 5.99) - 12.99).toFixed(2) }
        ],
      };
    },
    methods: {
      joinLoyalty() {
        alert('Thanks for joining our loyalty program! 🎉');
      },
    },
  };
  </script>
  
  <style scoped>
  .loyalty {
    @apply min-h-screen flex flex-col;
  }
  </style>
  