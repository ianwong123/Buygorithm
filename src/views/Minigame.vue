<template>
  <div class="minigame text-center">
    <h1>Catch the Points!</h1>
    <p>Use ← and → to move the basket. Score: <span>{{ score }}</span></p>

    <canvas v-show="gameStarted" id="gameCanvas" width="400" height="600" class="mx-auto my-4"></canvas>

    <div v-if="!gameStarted" class="flex justify-center mt-4">
      <button 
        @click="startGame"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>

    <div v-if="gameStarted" class="flex justify-center mt-4">
      <button 
        @click="finishGame"
        class="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
      >
        Finish Game & Collect Points
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Minigame',
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
      gameStarted: false,
      spawnInterval: null,
      animationFrameId: null,
    };
  },
  methods: {
    setupGame() {
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      document.addEventListener("keydown", e => (this.keys[e.key] = true));
      document.addEventListener("keyup", e => (this.keys[e.key] = false));

      const spawnPoint = () => {
        const x = Math.random() * (canvas.width - 20);
        this.points.push({ x, y: 0, radius: 10, speed: 2 + Math.random() * 2 });
      };

      const update = () => {
        if (this.keys["ArrowLeft"] && this.basket.x > 0) this.basket.x -= this.basket.speed;
        if (this.keys["ArrowRight"] && this.basket.x + this.basket.width < canvas.width)
          this.basket.x += this.basket.speed;

        for (let i = this.points.length - 1; i >= 0; i--) {
          const p = this.points[i];
          p.y += p.speed;

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
        
        ctx.fillStyle = "pink";
        ctx.fillRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height);

        ctx.fillStyle = "purple";
        this.points.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      const gameLoop = () => {
        update();
        draw();
        this.animationFrameId = requestAnimationFrame(gameLoop);
      };

      this.spawnInterval = setInterval(spawnPoint, 1000);
      gameLoop();
    },

    startGame() {
      this.gameStarted = true;
      this.score = 0;
      this.points = [];
      this.setupGame();
    },

    finishGame() {
      clearInterval(this.spawnInterval);
      cancelAnimationFrame(this.animationFrameId);
      this.$emit('gameFinished', this.score);
      this.gameStarted = false;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  overflow: hidden;
  color: white;
  font-family: Arial, sans-serif;
  text-align: center;
}

canvas {
  display: block;
  margin: auto;
  background: #333;
  background-size: cover;
  border: 2px solid #555;
}

h1 {
  margin-bottom: 1rem;
}
</style>