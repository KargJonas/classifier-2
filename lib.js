// Jonas Karg 2019

// Settings
const LEARNING_RATE = 3;
const COMPLEXITY = 10;
const DEFAULT_WEIGHT = 1;

// Constants
const TWO_PI = Math.PI * 2;
const sigmoid = (x) => (1 / (Math.pow(Math.E, x) + 1) - 0.5);

// The dataset (has to be loaded first)
let dataset = [];

// Our weights
let currentWeights = new Array(COMPLEXITY).fill(DEFAULT_WEIGHT);

// The initial error
let error = 1;
let iteration = 0;

fetch("data/dataset-002.json")
  .then(response => response.json())
  .then(response => dataset = response)
  .then(drawDataset)
  .then(drawPrediction)
  .then(train);

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function f(x, y, weights) {
  let result = 0;

  for (let i = 0; i < weights.length; i++) {
    result +=
      (weights[i] * Math.pow(x, i)) +
      (weights[i] * Math.pow(y, i));
  }

  return result;
  // return sigmoid(result);
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


function train() {
  // trainSingle();
  // trainMultiple();
  // trainMultiErrorTolerant();
  trainSingleErrorTolerant();

  if (error === 0) {
    console.log("0% Error reached - stopping the training.");
    return;
  }

  // console.log(++iteration);
  window.requestAnimationFrame(train);
}

function evaluateError(weights) {
  const amount = dataset.length;
  let correct = 0;

  dataset.map(item => {
    const x = item.data[0];
    const y = item.data[1];

    let prediction = f(x, y, weights);
    let predictedLabel = prediction > 0 ? 1 : 0;

    // console.log({x, y, prediction});

    // Validating the prediction
    if (predictedLabel === item.label) {
      correct++;
    }
  });

  return 1 - correct / amount;
}