<template>
  <Navbar />
    <div class="game-container">
      <canvas ref="gameCanvas" width="400" height="600"></canvas>
    </div>
    <Footer />
  </template>
  
  <script>
   import Navbar from '@/components/Navbar.vue';
   import Footer from '@/components/Footer.vue';
  export default {
    name: 'Minigame2',
    components : {
      Navbar,
      Footer
    }
    ,
    data() {
      return {
        GRAVITY: 0.6,
        FLAP_STRENGTH: -12,
        PIPE_WIDTH: 50,
        PIPE_SPACING: 200,
        PIPE_WIDTH_GAP: 150,
        bird: {
          x: 50,
          y: 300,
          width: 30,
          height: 30,
          color: 'yellow',
          velocity: 0
        },
        pipes: [],
        pipeSpeed: 2,
        score: 0,
        gameOver: false,
        ctx: null,
        animationFrame: null
      };
    },
    mounted() {
      this.initGame();
    },
    beforeDestroy() {
      this.cleanupGame();
    },
    methods: {
      initGame() {
        const canvas = this.$refs.gameCanvas;
        this.ctx = canvas.getContext('2d');
        document.addEventListener('keydown', this.handleKeyPress);
        this.gameLoop();
      },
      cleanupGame() {
        document.removeEventListener('keydown', this.handleKeyPress);
        cancelAnimationFrame(this.animationFrame);
      },
      Pipe(x, gapY) {
        return {
          x: x,
          top: gapY,
          bottom: gapY + this.PIPE_SPACING,
          width: this.PIPE_WIDTH,
          height: this.$refs.gameCanvas.height,
          passed: false
        };
      },
      drawBird() {
        this.ctx.fillStyle = this.bird.color;
        this.ctx.fillRect(this.bird.x, this.bird.y, this.bird.width, this.bird.height);
      },
      drawPipes() {
        this.pipes.forEach(pipe => {
          this.ctx.fillStyle = 'green';
          this.ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
          this.ctx.fillRect(pipe.x, pipe.bottom, pipe.width, this.$refs.gameCanvas.height - pipe.bottom);
        });
      },
      updateBird() {
        this.bird.velocity += this.GRAVITY;
        this.bird.y += this.bird.velocity;
      },
      checkCollisions() {
        const canvas = this.$refs.gameCanvas;
        if (this.bird.y <= 0 || this.bird.y + this.bird.height >= canvas.height) {
          this.gameOver = true;
        }
        
        this.pipes.forEach(pipe => {
          if (
            this.bird.x + this.bird.width > pipe.x &&
            this.bird.x < pipe.x + pipe.width &&
            (this.bird.y < pipe.top || this.bird.y + this.bird.height > pipe.bottom)
          ) {
            this.gameOver = true;
          }
        });
      },
      updatePipes() {
        const canvas = this.$refs.gameCanvas;
        if (this.pipes.length === 0 || this.pipes[this.pipes.length - 1].x < canvas.width - 200) {
          const gapY = Math.floor(Math.random() * (canvas.height - this.PIPE_SPACING));
          this.pipes.push(this.Pipe(canvas.width, gapY));
        }
  
        this.pipes.forEach(pipe => {
          pipe.x -= this.pipeSpeed;
        });
  
        this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);
      },
      updateScore() {
        this.pipes.forEach(pipe => {
          if (pipe.x + pipe.width < this.bird.x && !pipe.passed) {
            this.score++;
            pipe.passed = true;
          }
        });
      },
      drawScore() {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText('Score: ' + this.score, 10, 30);
      },
      handleKeyPress(event) {
        if (event.key === ' ' && !this.gameOver) {
          this.bird.velocity = this.FLAP_STRENGTH;
        } else if (event.key === ' ' && this.gameOver) {
          this.restartGame();
        }
      },
      restartGame() {
        this.bird.y = this.$refs.gameCanvas.height / 2;
        this.bird.velocity = 0;
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.gameLoop();
      },
      gameLoop() {
        if (this.gameOver) {
          const canvas = this.$refs.gameCanvas;
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          this.ctx.fillRect(0, 0, canvas.width, canvas.height);
          this.ctx.fillStyle = '#fff';
          this.ctx.font = '30px Arial';
          this.ctx.fillText('Game Over! Press Space to Restart', 50, canvas.height / 2);
          return;
        }
  
        this.ctx.clearRect(0, 0, this.$refs.gameCanvas.width, this.$refs.gameCanvas.height);
  
        this.updateBird();
        this.updatePipes();
        this.checkCollisions();
        this.updateScore();
  
        this.drawBird();
        this.drawPipes();
        this.drawScore();
  
        this.animationFrame = requestAnimationFrame(this.gameLoop);
      }
    }
  };
  </script>
  
  <style scoped>
  .game-container {
    margin: 0;
    padding: 0;
    background-color: #70c5ce;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  
  canvas {
    background-color: #fff;
    display: block;
  }
  </style>