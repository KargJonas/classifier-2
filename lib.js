// Jonas Karg 2019

// The dataset (has to be loaded first)
let dataset;
const TWO_PI = Math.PI * 2;

// Our weights
let currentWeights = [0, 0, 0, 0, 0];
let learningRate = 1;
let error = 1;

fetch("data/dataset-002.json")
  .then(response => response.json())
  .then(response => dataset = response)
  .then(() => calculateError(currentWeights))
  .then(draw)
  .then(() => window.requestAnimationFrame(train));

function train() {
  for (let i = 0; i < currentWeights.length; i++) {
    const newWeights = currentWeights.slice();
    const offset = Math.sin(Math.random() * TWO_PI) * learningRate;
    newWeights[i] += offset
    const newError = calculateError(currentWeights);

    // Keep change, if it reduces error
    if (newError < error) {
      currentWeights = newWeights;
      error = newError;
      drawPrediction();
      console.log({ error });
    }
  }

  // const newWeights = currentWeights.slice();

  // for (let i = 0; i < currentWeights.length; i++) {
  //   const offset = Math.sin(Math.random() * TWO_PI) * learningRate;
  //   newWeights[i] += offset;
  // }

  // const newError = calculateError(currentWeights);

  // // Keep change, if it reduces error
  // if (newError < error) {
  //   currentWeights = newWeights;
  //   error = newError;
  //   drawPrediction();
  //   console.log({ error });
  // }

  // console.log(newWeights);

  // window.requestAnimationFrame(train);
}

function sigmoid(x) {
  return 1 / (Math.pow(Math.E, x) + 1) - 0.5;
}

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

function calculateError(weights) {
  const amount = dataset.length;
  let correct = 0;

  dataset.map(item => {
    const x = item.data[0];
    const y = item.data[1];

    let prediction = 0;

    // console.log(f(x, y, weights));

    // Predict the label of the current point with our function
    if (f(x, y, weights) >= 1) {
      prediction = 1;
    }

    // Validating the prediction
    if (prediction === item.label) {
      correct++;
    }
  });

  return 1 - correct / amount;
}

/*
-0.11115312349337014
2.5488297760802663
0.7279570232975133
1.3492165776419505
- 0.08995985198702716
1.3072824752596606

f(x,z) = x⁰*-0.11115312349337014+z⁰*-0.11115312349337014+x¹*2.5488297760802663+z¹*2.5488297760802663+x²*0.7279570232975133+z²*0.7279570232975133+x³*1.3492165776419505+z³*1.3492165776419505

*/