import Grid from "./grid"
import Snake from "./snake"
var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" }

var weights;

export default class Neural {

    constructor() {
        
        log("start");

        this.randomiseWeights();

        log(weights);
    }


    decideMove(grid) {

        
        this.randomiseWeights();

        // Returns direction with maximum weight
        var decidedMove = (Object.keys(direction)[weights.indexOf(Math.max.apply(Math, weights))]);



        var tempCurrentDirection = Snake.getCurrentDirection();
        Snake.setCurrentDirection(decidedMove);
        decidedMove = (this.nextSquareIsOneSnakeSquareBehind()) ? tempCurrentDirection : decidedMove


        return decidedMove;

        /*return direction.RIGHT;*/

    }


    showGrid(grid) {
        log(grid);
    }

    randomiseWeights() {
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

    nextSquareIsOneSnakeSquareBehind() {
        return (Snake.getSnakeRows()[Snake.getSnakeRows().length - 2] === Grid.nextRow(Snake.getCurrentRow()) && Snake.getSnakeColumns()[Snake.getSnakeColumns().length - 2] === Grid.nextColumn(Snake.getCurrentColumn())) ? true : false
    }



}



function zeroto0point99() { return (Math.floor(Math.random() * 100))/100; }

function log(thing) { console.log(thing); }