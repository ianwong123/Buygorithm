<template>
    <div class="loyalty min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-grow p-6 max-w-2xl mx-auto space-y-6">
        <h1 class="text-5xl font-bold mb-6 text-center">Loyalty Program</h1>

        <!-- Points Tracker Box -->
        <div class="bg-indigo-100 p-6 rounded-lg shadow-md text-center">
          <h2 class="text-2xl font-semibold mb-4">Your Points</h2>
          <p class="text-3xl font-bold">{{ userPoints }} Points</p>
        </div>

        <!-- Tier Status Tracker -->
        <div class="bg-orange-100 p-6 rounded-lg shadow-md text-center">
            <h2 class="text-2xl font-semibold mb-4">Your Tier</h2>
        <div class="text-3xl font-bold mb-2">{{ currentTier }}</div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-300 rounded-full h-5 overflow-hidden mb-4">
            <div 
                class="bg-emerald-400 h-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                :style="{ width: progressToNextTier + '%' }"
            >
            {{ progressToNextTier }}%
         </div>
    </div>

  <!-- Info about Next Tier -->
  <p class="text-sm text-gray-600">
    {{ pointsNeeded }} more points needed to reach <span class="font-semibold">{{ nextTier }}</span>!
  </p>
</div>

        <!-- Info Paragraph Boxes -->
        <div class="bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Welcome</h2>
          <p class="text-center">
            Welcome to our Loyalty Program! Earn points every time you interact with us — shopping, playing games, referring friends, or celebrating your birthday.
          </p>
        </div>
  
        <div class="bg-green-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Points System</h2>
          <p class="text-center">
            Collect points for every purchase and action you take. The more points you earn, the higher your status and the better the rewards you unlock!
          </p>
        </div>
  
        <div class="bg-yellow-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Mini Games</h2>
          <p class="text-center">
            Play fun mini-games like spin-the-wheel and scratch cards to win extra points and prizes!
          </p>
        </div>
  
        <div class="bg-purple-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Referrals</h2>
          <p class="text-center">
            Share your unique referral code with friends! Every successful referral earns you both bonus points.
          </p>
        </div>
  
        <div class="bg-pink-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Tiered Statuses</h2>
          <p class="text-center">
            Progress through Bronze, Silver, Gold, and Platinum tiers. Higher tiers unlock bigger discounts, gifts, and VIP-only perks!
          </p>
        </div>
  
        <div class="bg-red-100 p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4 text-center">Birthday Rewards</h2>
          <p class="text-center">
            Celebrate your special day with us — enjoy a surprise points bonus and exclusive birthday offers!
          </p>
        </div>

        <!-- Referral Input -->
        <div class="bg-teal-100 p-6 rounded-lg shadow-md">
          <ReferralInput />
        </div>

      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
  import ReferralInput from '@/components/loyalty/ReferralInput.vue'
  
  export default {
    name: 'LoyaltyView',
    components: {
      Navbar,
      Footer,
      ReferralInput,
    },
    data() {
      return {
        userPoints: 1200, // Example user points
  
        // Define tiers
        tiers: [
          { name: 'Bronze', minPoints: 0 },
          { name: 'Silver', minPoints: 1000 },
          { name: 'Gold', minPoints: 3000 },
          { name: 'Platinum', minPoints: 6000 },
        ],
      };
    },
    computed: {
      currentTier() {
        return this.tiers.slice().reverse().find(tier => this.userPoints >= tier.minPoints)?.name || 'Bronze';
      },
      nextTier() {
        const currentIndex = this.tiers.findIndex(tier => tier.name === this.currentTier);
        return this.tiers[currentIndex + 1]?.name || 'Top Tier!';
      },
      pointsNeeded() {
        const currentIndex = this.tiers.findIndex(tier => tier.name === this.currentTier);
        const nextMinPoints = this.tiers[currentIndex + 1]?.minPoints;
        if (nextMinPoints) {
          return nextMinPoints - this.userPoints;
        } else {
          return 0; // Already at Top Tier
        }
      },
      progressToNextTier() {
        const currentIndex = this.tiers.findIndex(tier => tier.name === this.currentTier);
        const currentMinPoints = this.tiers[currentIndex]?.minPoints || 0;
        const nextMinPoints = this.tiers[currentIndex + 1]?.minPoints || (currentMinPoints + 3000); // If last tier
  
        const progress = ((this.userPoints - currentMinPoints) / (nextMinPoints - currentMinPoints)) * 100;
        return Math.min(Math.max(progress, 0), 100).toFixed(0);
      },
    },
  }
  </script>
  
  
  <style scoped>
  .loyalty {
    @apply min-h-screen flex flex-col;
  }
  </style>