// Constants
const WIDTH = 500;
const HEIGHT = 500;
const HALF_WIDTH = WIDTH / 2;
const HALF_HEIGHT = HEIGHT / 2;

// The canvas used to draw the dataset
const pointCnv = document.getElementById("point-cnv");
const pointCtx = pointCnv.getContext("2d");

// The canvas used to draw the current prediction-function
const predictionCnv = document.getElementById("prediction-cnv");
const predictionCtx = predictionCnv.getContext("2d");

function drawDataset() {
  dataset.map(
    item => {
      const isAbove = item.label;

      if (isAbove) {
        pointCtx.fillStyle = `rgb(255, 50, 50)`;
      } else {
        pointCtx.fillStyle = `rgb(50, 50, 255)`;
      }

      // pointCtx.fillRect(item.data[0] * WIDTH, HEIGHT - item.data[1] * HEIGHT, 4, 4);
      pointCtx.fillRect(item.data[0] * WIDTH, item.data[1] * HEIGHT, 4, 4);
    }
  );

  pointCtx.stroke();
}

function drawPrediction() {
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const adjustedX = x / WIDTH;
      const adjustedY = y / HEIGHT;

      if (f(adjustedX, adjustedY, currentWeights) >= 1) {
        predictionCtx.fillStyle = `rgb(255, 200, 200)`;
      } else {
        predictionCtx.fillStyle = `rgb(200, 200, 255)`;
      }

      predictionCtx.fillRect(x, y, 1, 1);
    }
  }
}