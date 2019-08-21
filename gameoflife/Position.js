
class Position {
    constructor (coords){
        this._x= coords.x;
        this._y= coords.y;
    }

    getX() {
        return this._x;
    }

    getY () {
        return this._y;
    }

    getId () {
        return this._x +"."+ this._y;
    }

    getNeighbouringPositions() {
        let positions = [];

        positions.push(new Position({x:this._x+1, y:this._y+1}));
        positions.push(new Position({x:this._x+1, y:this._y}));
        positions.push(new Position({x:this._x+1, y:this._y-1}));

        positions.push(new Position({x:this._x, y:this._y+1}));
        positions.push(new Position({x:this._x, y:this._y-1}));

        positions.push(new Position({x:this._x-1, y:this._y+1}));
        positions.push(new Position({x:this._x-1, y:this._y}));
        positions.push(new Position({x:this._x-1, y:this._y-1}));

        return positions;
    }

};

module.exports = Position;