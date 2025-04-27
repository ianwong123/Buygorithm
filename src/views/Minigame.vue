<template>
    <Navbar />
    <div>
      <h1>Catch the Points!</h1>
      <p>Use ← and → to move the basket. Score: <span id="score">{{ score }}</span></p>
      <canvas id="gameCanvas" width="400" height="600"></canvas>
    </div>
    <Footer class="footer-with-margin" />


</template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  export default {
    name: 'Minigame',
    components: {
      Navbar,
      Footer,
    },
    data() {
      return {
        score: 0,
        keys: {},
        basket: {
          x: 160,
          y: 550,
          width: 80,
          height: 20,
          speed: 5,
        },
        points: [],
      };
    },
    mounted() {
      this.setupGame();
    },
    methods: {
      setupGame() {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
  
        // Handle keyboard input
        document.addEventListener("keydown", e => (this.keys[e.key] = true));
        document.addEventListener("keyup", e => (this.keys[e.key] = false));
  
        // Create a falling point
        const spawnPoint = () => {
          const x = Math.random() * (canvas.width - 20);
          this.points.push({ x, y: 0, radius: 10, speed: 2 + Math.random() * 2 });
        };
  
        const update = () => {
          // Move basket
          if (this.keys["ArrowLeft"] && this.basket.x > 0) this.basket.x -= this.basket.speed;
          if (this.keys["ArrowRight"] && this.basket.x + this.basket.width < canvas.width)
            this.basket.x += this.basket.speed;
  
          // Move points
          for (let i = this.points.length - 1; i >= 0; i--) {
            const p = this.points[i];
            p.y += p.speed;
  
            // Check if caught
            if (
              p.y + p.radius >= this.basket.y &&
              p.x >= this.basket.x &&
              p.x <= this.basket.x + this.basket.width
            ) {
              this.points.splice(i, 1);
              this.score++;
            } else if (p.y > canvas.height) {
              this.points.splice(i, 1); 
            }
          }
        };
  
        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
  
          // Draw basket
          ctx.fillStyle = "orange";
          ctx.fillRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height);
  
          // Draw points
          ctx.fillStyle = "lime";
          this.points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        };
  
        const gameLoop = () => {
          update();
          draw();
          requestAnimationFrame(gameLoop);
        };
  
        // Start the game
        setInterval(spawnPoint, 1000); // Spawn point every second
        gameLoop();
      },
    },
};
</script>
  
  <style scoped>
  body {
    margin: 0;
    overflow: hidden;
    background: #222;
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  canvas {
    display: block;
    margin: auto;
    background: #333;
    border: 2px solid #555;
  }

  .footer-with-margin {
  margin-top: 50px; /* Adjust the value as needed */
}
  </style>
  