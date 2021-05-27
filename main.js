import { Perceptron } from './classes/Perceptron.js';
const perceptron = new Perceptron();
// let i = [0, 4];
// const examples: ExampleData = {
//   input: [[2, 6], [0, 2], [6, 9], [5, 5]],
//   solutions: [1, 0, 1, 0],
//   repetition: 10000,
//   rate: 0.1
// }
// perceptron.initRandom(i.length);
// // console.log(perceptron.weights)
// perceptron.Train(examples);
// console.log(perceptron.Think(i), Math.round(perceptron.Think(i)));
// console.log('Weights:', perceptron.weights)
// perceptron.initRandom();
// const ex: ExampleData = {
//   input: [[3, 6], [4, 8], [9, 18], [2, 3], [7, 12], [13, 9]],
//   solutions: [0, 0, 0, 1, 1, 1],
//   repetition: 100,
//   rate: 0.1
// };
// perceptron.Train(ex);
// let guess = perceptron.Think([120, 230])
// console.log("GUESS:", guess, Math.round(guess));
perceptron.initRandom();
const nodes = {
    input: [],
    solutions: [],
    repetition: 100,
    rate: 0.1
};
const state = {
    currentTeam: 0,
    colors: ['#cc2900', '#0039e6'],
    guessing: false,
    guess: 0,
};
const canvas = document.querySelector('#environment');
const ctx = canvas.getContext('2d');
canvas.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    if (state.guessing) {
        ctx.fillStyle = '#009900';
        ctx.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        state.guess = perceptron.Think([e.clientX, e.clientY]);
        document.getElementById('guess').style.backgroundColor = state.colors[Math.round(state.guess)];
        state.guessing = false;
        return 0;
    }
    ctx.fillStyle = state.colors[state.currentTeam];
    ctx.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    nodes.input.push([e.clientX, e.clientY]);
    nodes.solutions.push(state.currentTeam);
});
document.getElementById('btn-train').onclick = () => perceptron.Train(nodes);
document.getElementById('btn-change').onclick = () => {
    state.currentTeam = state.currentTeam > 0 ? 0 : 1;
    document.querySelector(':root').style.setProperty('--team-color', state.colors[state.currentTeam]);
};
document.getElementById('btn-guess').onclick = () => state.guessing = !state.guessing;
