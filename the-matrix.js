<html>
  <head>
    <style>
      body {
        background-color: black;
      }

      canvas {
        background-color: green;
      }
    </style>
  </head>
  <body>
    <canvas id="gameCanvas"></canvas>
    <script>
      const canvas = document.getElementById("gameCanvas");
      const context = canvas.getContext("2d");

      // Set the canvas dimensions to fill the screen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Set up the player character
      let player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 20,
        height: 20,
        color: "white",
        speed: 5
      };

      // Set up the bullets
      let bullets = [];
      let bulletSpeed = 10;

      // Handle keyboard controls
      document.addEventListener("keydown", keyDownHandler);
      document.addEventListener("keyup", keyUpHandler);

      let rightPressed = false;
      let leftPressed = false;
      let upPressed = false;
      let downPressed = false;

      function keyDownHandler(event) {
        if (event.key == "Right" || event.key == "ArrowRight") {
          rightPressed = true;
        }
        if (event.key == "Left" || event.key == "ArrowLeft") {
          leftPressed = true;
        }
        if (event.key == "Up" || event.key == "ArrowUp") {
          upPressed = true;
        }
        if (event.key == "Down" || event.key == "ArrowDown") {
          downPressed = true;
        }
      }

      function keyUpHandler(event) {
        if (event.key == "Right" || event.key == "ArrowRight") {
          rightPressed = false;
        }
        if (event.key == "Left" || event.key == "ArrowLeft") {
          leftPressed = false;
        }
        if (event.key == "Up" || event.key == "ArrowUp") {
          upPressed = false;
        }
        if (event.key == "Down" || event.key == "ArrowDown") {
          downPressed = false;
        }
      }

      // Update the game state
      function update() {
        // Move the player based on the keyboard input
        if (rightPressed) {
          player.x += player.speed;
        }
        if (leftPressed) {
          player.x -= player.speed;
        }
        if (upPressed) {
          player.y -= player.speed;
        }
        if (downPressed) {
          player.y += player.speed;
        }

        // Move the bullets
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].y -= bulletSpeed;
        }

        // Remove bullets that have gone off the screen
        bullets = bullets.filter(bullet => bullet.y > 0);

        // Spawn new bullets at random intervals
        if (Math.random() < 0.1) {
          bullets.push({
            x: Math.random() * canvas.width,
            y: 0,
            width: 5,
            height: 15,
            color: "red"
          });
        }

        // Check for collision with bullets
        for (let i = 0; i < bullets.length; i++) {
          let bullet = bullets[i];
          if (
            player.x < bullet.x + bullet.width &&
            player.x + player.width > bullet.x &&
            player.y < bullet.y + bullet.height &&
            player.y + player.height > bullet.y
          ) {
            // Collision detected, end the game
            alert("You were hit by a bullet! Game Over.");
            document.location.reload();
          }
        }
      }

      // Render the game
      function draw() {
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the player character
        context.beginPath();
        context.rect(player.x, player.y, player.width, player.height);
        context.fillStyle = player.color;
        context.fill();
        context.closePath();

        // Draw the bullets
        for (let i = 0; i < bullets.length; i++) {
          let bullet = bullets[i];
          context.beginPath();
          context.rect(bullet.x, bullet.y, bullet.width, bullet.height);
          context.fillStyle = bullet.color;
          context.fill();
          context.closePath();
        }
      }

      // Game loop
      function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
      }

      gameLoop();
    </script>
  </body>
</html>
