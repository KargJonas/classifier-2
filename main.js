const WIDTH = 500;
const HEIGHT = 500;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;
const pointCnv = document.getElementById("point-cnv");
const pointCtx = pointCnv.getContext("2d");
const predictionCnv = document.getElementById("prediction-cnv");
const lineCtx = predictionCnv.getContext("2d");
lineCtx.lineWidth = 3;

function draw() {
  dataset.map(
    item => {
      const isAbove = item.label;

      if (isAbove) {
        pointCtx.fillStyle = `rgb(255, 50, 50)`;
      } else {
        pointCtx.fillStyle = `rgb(50, 50, 255)`;
      }

      pointCtx.fillRect(item.data[0] * WIDTH, HEIGHT - item.data[1] * HEIGHT, 4, 4);
    }
  );

  pointCtx.stroke();
}

function drawPrediction() {
  for (let y = HEIGHT; y > 0; y--) {
    for (let x = 0; x < WIDTH; x++) {
      const adjustedX = x / WIDTH;
      const adjustedY = y / HEIGHT;

      if (f(adjustedX, adjustedY, currentWeights) >= 1) {
        lineCtx.fillStyle = `rgb(255, 200, 200)`;
      } else {
        lineCtx.fillStyle = `rgb(200, 200, 255)`;
      }

      lineCtx.fillRect(x, y, 1, 1);
    }
  }
}