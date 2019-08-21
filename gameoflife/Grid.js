
const Cell = require("./Cell");
const Position = require("./Position");

class Grid {

    /**
     *
     * @param initial_snapshot : [{x: number, y: number}]
     */
    constructor (initial_snapshot) {
        this._gen = 0;
        this.live_cells = {};    //key (x.y)=> value (reference to cell object)
        this.loadSnapshot(initial_snapshot);
    }

    loadSnapshot (initial_snapshot) {
        for (let index=0, len= initial_snapshot.length; index < len ; index++) {
            let pos= new Position(initial_snapshot[index]);
            let cell = new Cell(pos, true);
            this.live_cells[pos.getId()]= cell;
        }
        this.print();
    }

    getNeighbours (cell) {
        let neighbours = [];
        let curr_cell_pos= cell.getPosition();
        let neighbouringPositions= curr_cell_pos.getNeighbouringPositions();

        for (let index=0, len = neighbouringPositions.length; index<len; index++){
            let pos = neighbouringPositions[index];
            let id = pos.getId();
            if (this.live_cells[id]) {
                neighbours.push(this.live_cells[id]);
            }
            else {
                neighbours.push(new Cell(pos, false));
            }
        }
        return neighbours;
    }

    gotoNextGeneration (cb) {
        this._gen++;
        console.log("Run #", this._gen);
        let potential_next_gen= {};
        let curr_gen_carry_fwd= {};
        let new_gen= {};

        for (let pos_key in this.live_cells) {
            let cell = this.live_cells[pos_key];
            let neighbours = this.getNeighbours(cell);
            let canbe_alive= cell.canbeAlive(neighbours);
            if (canbe_alive) {
                curr_gen_carry_fwd[pos_key]= cell;
            }
            for (let index= 0, num_neighbours= neighbours.length; index < num_neighbours; index++){
                let neighbour = neighbours[index];
                if (!neighbour.isAlive()){
                    potential_next_gen[neighbour.getPosition().getId()]= neighbour;
                }
            }
        }

        new_gen = curr_gen_carry_fwd;
        for (let pos_key in potential_next_gen) {
            let cell = potential_next_gen[pos_key];
            let neighbours = this.getNeighbours(cell);
            let canbe_alive= cell.canbeAlive(neighbours);
            if (canbe_alive) {
                new_gen[pos_key]= cell;
            }
        }
        for (let pos_key in new_gen) {
            new_gen[pos_key].makeAlive();
        }
        this.live_cells= new_gen;
        this.print();
        if (cb){
            return cb();
        }
    }

    print () {
        //console.log(this.live_cells);
        let min_x=0, max_x=0, min_y=0, max_y=0;
        for (let pos_key in this.live_cells) {
            let cell = this.live_cells[pos_key];
            let pos= cell.getPosition();
            let x= pos.getX();
            let y= pos.getY();
            if (x < min_x) {
                min_x= x;
            }
            else if (x > max_x) {
                max_x= x;
            }
            if (y < min_y) {
                min_y= y;
            }
            else if (y > max_y) {
                max_y= y;
            }
        }
        if (min_y < min_x) {
            min_x= min_y;
        }
        else {
            min_y= min_x
        }
        if (max_x < max_y) {
            max_x= max_y;
        }
        else {
            max_y = max_x;
        }
        for (let y=min_y-1; y<=max_y+1; y++){
            let row= [];
            for (let x= min_x-1; x<=max_x+1; x++){
                let pos_key= x+"."+y;
                if (this.live_cells[pos_key]){
                    row.push("*");
                }
                else {
                    row.push("-");
                }
            }
            console.log(row.join(" "));
        }
    }
};

module.exports = Grid;

