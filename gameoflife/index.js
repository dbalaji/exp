
const GameOfLife = require("./GameOfLife");

const sample = [
    {x:1,y:2},
    {x:2,y:2},
    {x:2,y:3},
    {x:3,y:2}
];

const blinker = [
    {x:1,y:2},
    {x:2,y:2},
    {x:3,y:2}
];

const beacon = [
    {x:2,y:2},
    {x:3,y:2},
    {x:2,y:3},
    {x:3,y:3},

    {x:4,y:4},
    {x:5,y:4},
    {x:4,y:5},
    {x:5,y:5}
];

var cell_positions= beacon;
const gol = new GameOfLife(cell_positions);

gol.run();
