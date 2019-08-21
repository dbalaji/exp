
const Grid = require("./Grid")

class GameOfLife {

    /**
     *
     * @param initial_snapshot
     * array of positions [{x:Number, y:Number, z: Number}]
     */
    constructor (initial_snapshot) {
        this._grid = new Grid(initial_snapshot);
    }

    run () {
        const computationCompleteCB = () => {
            setTimeout(() => {
                this._grid.gotoNextGeneration(computationCompleteCB);
            }, 1000);
        };
        this._grid.gotoNextGeneration(computationCompleteCB);
    }
};

module.exports = GameOfLife;