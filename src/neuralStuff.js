import Snake from "./snake"
import Grid from "./grid";
var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT" }

var inputNeurons = [];
var weights = [];
var actionNeurons = [];

export default class Neural {

  static init() {

    log("start");

    this.randomiseWeights();
    this.randomiseActionNeurons();
    this.niceLog(weights);

  }

  static randomiseWeights() {
    weights = [];
    for (var i = 0; i < Grid.getNumSquares(); i++) {
      var individualNeuronWeights = [];
      for (var j = 0; j < 4; j++) {
        individualNeuronWeights.push(zeroto0point999());
      }
      weights.push(individualNeuronWeights);
    }
  }

  static randomiseActionNeurons() {
    actionNeurons = [];
    for (var i = 0; i < 4; i++) {
      actionNeurons.push(zeroto0point999());
    }
  }

  static setInputNeurons(grid) {
    inputNeurons = [];
    for (var i = 0; i < grid.length; i++) {
      if (grid[i] === 'empty') {
        inputNeurons.push(0.5);
      } else if (grid[i] === 'yellow') {
        inputNeurons.push(0.1);
      } else if (grid[i] === 'food') {
        inputNeurons.push(0.9);
      }
    }
    //this.niceLog(inputNeurons);
  }

  static setActionNeuronValues(grid) {
    actionNeurons = [];
    for (var actionIndex = 0; actionIndex < 4; actionIndex++) {
      var actionValue = 0;
      for (var i = 0; i < Grid.getNumSquares(); i++) {
        actionValue += weights[i][actionIndex] * inputNeurons[i];
      }
      actionNeurons.push(actionValue);
    }

    /*weightedInputs = [];
    for (var i = 0; i < Grid.getNumSquares(); i++) {
      weightedInputs.push(reducePrecision(inputNeurons[i] * weights[i]));
    }*/
    var actionNeuronString = "actionNeurons: ";
    for (var j = 0; j < 4; j++) {
      actionNeuronString += "" +reducePrecision(actionNeurons[j]) + ", ";
    }
    log(actionNeuronString);
  }


  static decideMove(grid) {

    this.setInputNeurons(grid);

    this.setActionNeuronValues(grid);





    // direction with maximum weight
    var decidedMove = (Object.keys(direction)[actionNeurons.indexOf(Math.max.apply(Math, actionNeurons))]);
    console.log(decidedMove);

    var biggest = -Infinity;
    var next_biggest = -Infinity;

    for (var i = 0, n = actionNeurons.length; i < n; ++i) {
      var nr = +actionNeurons[i]; // convert to number first

      if (nr > biggest) {
        next_biggest = biggest; // save previous biggest value
        biggest = nr;
      } else if (nr < biggest && nr > next_biggest) {
        next_biggest = nr; // new second biggest value
      }
    }

    // direction with second maximum weight
    var backupMove = Object.keys(direction)[actionNeurons.indexOf(next_biggest)];


    // Don't allow snake to go back on itself - use backup move if highest weighting is backwards
    Snake.setCurrentDirection(decidedMove);
    decidedMove = (this.nextSquareIsOneSnakeSquareBehind()) ? backupMove : decidedMove

    return decidedMove;

  }


  static niceLog(grid) {
    //log(grid);

    var tempGrid = [];
    var gridRow = [];

    for (var i = 0; i < grid.length; i++) {

      //var row = Math.floor(i / Grid.getNumRows());
      //var column = i % Grid.getNumColumns();

      if (grid[i] === 'empty') {
        gridRow.push('e');
      } else if (grid[i] === 'yellow') {
        gridRow.push('y');
      } else if (grid[i] === 'food') {
        gridRow.push('f');
      } else {
        gridRow.push(grid[i]);
      }

      if (i % Grid.getNumColumns() === 7) {
        //log(gridRow);
        tempGrid.push(gridRow);
        gridRow = [];
      } else if (grid.length < 8) {
        for (var j = 0; j < grid.length; j++) {
          tempGrid.push(grid[j]);
        }
      }

    }
    log(tempGrid);
  }





  static nextSquareIsOneSnakeSquareBehind() {
    return (Snake.getSnakeRows()[Snake.getSnakeRows().length - 2] === Snake.nextRow(Snake.getCurrentRow()) && Snake.getSnakeColumns()[Snake.getSnakeColumns().length - 2] === Snake.nextColumn(Snake.getCurrentColumn())) ? true : false
  }



}


function reducePrecision(num) { return (Math.floor(num * 100)) / 100; }

function zeroto0point999() { return (Math.floor(Math.random() * 1000)) / 1000; }

function log(thing) { console.log(thing); }