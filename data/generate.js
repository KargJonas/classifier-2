const generate = require("./generators/generator-lib");

// const PATH = "dataset-000.json";
const PATH = "dataset-002.json";
const AMOUNT = 2000;
// const AMOUNT = 2;
const SCALE_X = 1;
const SCALE_Y = 1;

function f(x) {
  return 0.5;
  // return 0.5 * Math.pow(x, 2) + 0.1 * Math.pow(x, 3) + 0.1;
}

generate({ PATH, AMOUNT, SCALE_X, SCALE_Y, f });