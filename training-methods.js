// Randomizes a single weight at a time.
function trainSingle() {
  for (let i = 0; i < currentWeights.length; i++) {
    const newWeights = currentWeights.slice();
    const offset = Math.sin(Math.random() * TWO_PI) * LEARNING_RATE;
    newWeights[i] += offset

    const newError = evaluateError(currentWeights);
    if (newError < error) {
      currentWeights = newWeights;
      error = newError;
      console.log({ error });
    }
  }
}

// Randomizes all weights at one time
function trainMultiple() {
  const newWeights = currentWeights.slice();

  for (let i = 0; i < currentWeights.length; i++) {
    const offset = Math.sin(Math.random() * TWO_PI) * LEARNING_RATE;
    newWeights[i] += offset;
  }

  const newError = evaluateError(currentWeights);

  if (newError < error) {
    currentWeights = newWeights;
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

  const newError = evaluateError(currentWeights);
  const errorFactor = error / newError;

  currentWeights = newWeights.map(weight => weight * errorFactor);
  error = newError;
  console.log({ error });
}

// Randomizes a single weight at a time and "scales" the change
// according to the difference in error
function trainSingleErrorTolerant() {
  for (let i = 0; i < currentWeights.length; i++) {
    const newWeights = currentWeights.slice();
    const offset = Math.sin(Math.random() * TWO_PI) * LEARNING_RATE;
    newWeights[i] += offset;

    const newError = evaluateError(newWeights);
    const errorFactor = error / newError;

    currentWeights[i] = newWeights[i] * errorFactor;

    error = newError;
    console.log({ error });
  }
}