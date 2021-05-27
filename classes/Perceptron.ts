import {bool, Vector} from './DataStructures'
import { ExampleData } from './ExampleData';

export class Perceptron {

  weights: number[];
  bias: number;

  constructor(weights?: number[], bias?: number) {
    this.weights = weights || [];
    this.bias = bias || 0;
  }

  initRandom = (weightCount: number = 2): bool => {

    this.weights = [];
    for(let i = 0; i < weightCount; i++) this.weights.push(Math.random()*2-1);
    this.bias = Math.random()*2-1;

    return 1;
  }

  Activation = (t: number) => {
    return 1 / (1 + Math.exp(-t));
  };

  Think = (input: number[]): any => {
    if(input.length != this.weights.length) return '--- Error: Input size doesn\'t match weight size.';
    let result = 0;
    this.weights.forEach((weight, index) => result += input[index] * weight);
    result += this.bias;
    
    result = this.Activation(result);

    return result;
  }

  Learn = (examples: ExampleData): any => {
    if(examples.input.length != examples.solutions.length) 
      return '--- Error: Example size doesn\'t match solution size.';

    examples.input.forEach((example, index) => {
      let res = this.Think(example);
      let error = examples.solutions[index] - res;
      for(let i = 0; i < this.weights.length; i++) {
        this.weights[i] += example[i] * error * examples.rate;
      }
      this.bias += error * examples.rate;
      
    });

    return 1;
  }

  Train = (data: ExampleData): any => { for(let i = 0; i < data.repetition; i++) this.Learn(data); };
}