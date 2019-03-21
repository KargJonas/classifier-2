// Jonas Karg 2019

// Settings
const RANDOM_AMPLITUDE = 1;
const LEARNING_RATE = .25;
const COMPLEXITY = 100;
const DEFAULT_WEIGHT = 1;

// Constants
const TWO_PI = Math.PI * 2;
const sigmoid = (x) => (1 / (Math.pow(Math.E, x) + 1) - 0.5);

// Our weights
let currentWeights = new Array(COMPLEXITY).fill(DEFAULT_WEIGHT);

// The initial error
let error = 1;

// The dataset
const dataset = require("./data/dataset-002.json");

// Randomizes a single weight at a time and "scales" the change
// according to the difference in error
function trainSingleErrorTolerant() {
  for (let i = 0; i < currentWeights.length; i++) {
    const newWeights = currentWeights.slice();
    const offset = Math.sin(Math.random() * TWO_PI) * RANDOM_AMPLITUDE;
    newWeights[i] += offset;

    const newError = evaluateError(newWeights);
    const errorFactor = error / newError;

    currentWeights[i] = newWeights[i] * (errorFactor * LEARNING_RATE);

    error = newError;
    console.log({ error });
  }
}

// Randomizes all weights at one time and "scales" the change
// according to the difference in error
function trainMultiErrorTolerant() {
  const newWeights = currentWeights.slice();

  for (let i = 0; i < currentWeights.length; i++) {
    const offset = Math.sin(Math.random() * TWO_PI) * LEARNING_RATE;
    newWeights[i] += offset;
  }

  const newError = evaluateError(newWeights);
  const errorFactor = error / newError;

  currentWeights = newWeights.map(weight => weight * errorFactor);
  error = newError;
  console.log({ error });
}

while (error !== 0) {
  train();
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// function f(x, y, weights) {
//   let result = 0;

//   for (let i = 0; i < weights.length; i++) {
//     result +=
//       (weights[i] * Math.pow(x, i)) +
//       (weights[i] * Math.pow(y, i));
//   }

//   return result;
//   // return sigmoid(result);
// }

function f(x, y, weights) {
  let result = 0;

  // for (let i = 0; i < weights.length; i++) {
  //   result +=
  //     (weights[i] * Math.pow(y, i)) -
  //     (weights[i] * Math.pow(x, i));
  // }
  for (let i = 0; i < weights.length; i += 2) {
    result +=
      (weights[i] * Math.pow(y, i)) +
      (weights[i + 1] * Math.pow(x, i));
  }

  return result;
  // return sigmoid(result);
}
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////


function train() {
  // trainSingleErrorTolerant();
  trainMultiErrorTolerant();

  if (error === 0) {
    console.log("0% Error reached - stopping the training.");
    return;
  }
}

function evaluateError(weights) {
  const amount = dataset.length;
  let correct = 0;

  dataset.map(item => {
    const x = item.data[0];
    const y = item.data[1];

    let prediction = f(x, y, weights);
    let predictedLabel = prediction > 0 ? 1 : 0;

    // Validating the prediction
    if (predictedLabel === item.label) {
      correct++;
    }
  });

  return 1 - correct / amount;
}