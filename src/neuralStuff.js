var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" }

var weights = [];

export default class Neural {

    constructor() {
        
        log("start");

        for(var i = 0; i < 4; i++) {
            weights.push(zeroto0point99());
        }

        log(weights);
    }


    decideMove(grid, currentDirection) {

        var decidedMove = (Object.keys(direction)[weights.indexOf(Math.max.apply(Math, weights))]);

        // Returns direction with maximum weight
        return decidedMove;

    }


    showGrid(grid) {
        log(grid);
    }

    



    // Needs to make a decision based on what it can 'see'
    // Decision is one of four options: UP, DOWN, LEFT, RIGHT
    // Needs a weighting for each option

    // INPUT
    //   Looking forward, left, and right, how far away is snake or food?
    //   Make a decision
    //   Reward for reaching food or punish for hitting snake
    //   Adjust weights





}



function zeroto0point99() { return (Math.floor(Math.random() * 100))/100; }

function log(thing) { console.log(thing); }