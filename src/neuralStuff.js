import Snake from "./snake"
import Food from "./food"
var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" }

var weights;

export default class Neural {

    constructor() {
        
        log("start");

        this.randomiseWeights();

        log(weights);
    }

    static decideMove(grid) { 
        
        this.randomiseWeights();










        if(Food.getFoodColumn() > Snake.getCurrentColumn()) {
            weights[3] = 1;
        } else if(Food.getFoodColumn() < Snake.getCurrentColumn()) {
            weights[2] = 1;
        }

        if(Food.getFoodRow() > Snake.getCurrentRow()) {
            weights[1] = 1;
        } else if(Food.getFoodRow() < Snake.getCurrentRow()) {
            weights[0] = 1;
        }





        






        // direction with maximum weight
        var decidedMove = (Object.keys(direction)[weights.indexOf(Math.max.apply(Math, weights))]);



        var biggest = -Infinity;
        var next_biggest = -Infinity;
        
        for (var i = 0, n = weights.length; i < n; ++i) {
            var nr = +weights[i]; // convert to number first
        
            if (nr > biggest) {
                next_biggest = biggest; // save previous biggest value
                biggest = nr;
            } else if (nr < biggest && nr > next_biggest) {
                next_biggest = nr; // new second biggest value
            }
        }

        // direction with second maximum weight
        var backupMove = Object.keys(direction)[weights.indexOf(next_biggest)];
        
        
        // Don't allow snake to go back on itself - use backup move if highest weighting is backwards
        Snake.setCurrentDirection(decidedMove);
        decidedMove = (this.nextSquareIsOneSnakeSquareBehind()) ? backupMove : decidedMove

        return decidedMove;

    }


    static showGrid(grid) {
        log(grid);
    }

    static randomiseWeights() {
        weights = [];
        for(var i = 0; i < 4; i++) {
            weights.push(zeroto0point99());
        }
    }



    // Needs to make a decision based on what it can 'see'
    // Decision is one of four options: UP, DOWN, LEFT, RIGHT
    // Needs a weighting for each option

    // INPUT
    //   Looking forward, left, and right, how far away is snake or food?
    //   Make a decision
    //   Reward for reaching food or punish for hitting snake
    //   Adjust weights

    static nextSquareIsOneSnakeSquareBehind() {
        return (Snake.getSnakeRows()[Snake.getSnakeRows().length - 2] === Snake.nextRow(Snake.getCurrentRow()) && Snake.getSnakeColumns()[Snake.getSnakeColumns().length - 2] === Snake.nextColumn(Snake.getCurrentColumn())) ? true : false
    }



}



function zeroto0point99() { return (Math.floor(Math.random() * 100))/100; }

function log(thing) { console.log(thing); }