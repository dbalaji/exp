
const MIN_NEIGHBOURS= 2;
const MAX_NEIGHBOURS= 3;
const NEWBORN_NEIGHBOURS_REQUIRED= 3;

class Cell {
    constructor (pos, is_alive){
        this._is_alive = typeof is_alive === 'undefined' ? false : is_alive;
        this._pos= pos;
    }

    getPosition () {
        return this._pos;
    }

    isAlive() {
        return this._is_alive;
    }

    isDead() {
        return !this._is_alive;
    }

    makeAlive() {
        this._is_alive= true;
    }

    canbeAlive (neighbours) {
        // console.log(this);
        // console.log(neighbours);
        let num_alive= 0;
        let canbe_alive= undefined;
        for (let index =0, count= neighbours.length; index < count; index++){
            if (neighbours[index].isAlive()){
                num_alive++;
            }
            if (num_alive > MAX_NEIGHBOURS) {
                break;
            }
        }
        if ((num_alive > MAX_NEIGHBOURS) || (num_alive < MIN_NEIGHBOURS)) {
            canbe_alive= false;
        }
        else {
            if (!this._is_alive) {
                if (num_alive === NEWBORN_NEIGHBOURS_REQUIRED) {
                    canbe_alive= true;
                }
            }
            else {
                canbe_alive= true;
            }
        }
        return canbe_alive;
    }
};


module.exports = Cell;