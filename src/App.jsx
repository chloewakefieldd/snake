import React from 'react'
import "./index.css"
import Grid from "./grid"
import Neural from "./neuralStuff"
import Snake from "./snake"

var snakeLength = 0
var foodColumn = 0
var foodRow = 0

var neural;

class Logic {

  init(grid) {
    Snake.setCurrentRow(Math.floor(Math.random() * 2) + Math.floor(Grid.getGridSize()/2));
    Snake.setCurrentColumn(Math.floor(Math.random() * 2) + Math.floor(Grid.getGridSize()/2));
    Snake.pushSnakeRow(Snake.getCurrentRow())
    Snake.pushSnakeColumn(Snake.getCurrentColumn())
    snakeLength += 1
    grid = this.createGrid(grid)
    /*this.keyPressed = this.keyPressed.bind(this);*/
    neural = new Neural();
    Snake.setCurrentDirection(neural.decideMove(grid));
    return grid
  }

  createGrid(grid) {
    for (var i = 0; i < Grid.getNumRows() * Grid.getNumColumns(); i++) grid.push('empty')
    grid[this.getGridIndexOf(Snake.getCurrentRow(), Snake.getCurrentColumn())] = 'yellow'
    this.placeFoodItem(grid)
    return grid
  }

  step(grid) {
    Snake.setCurrentDirection(neural.decideMove(grid));
    this.updateHead(grid)
    this.updateTail(grid)
    return grid
  }


  makeGridPosEmpty(grid, index) { grid[index] = 'empty' }
  makeGridPosYellow(grid, index) { grid[index] = 'yellow' }
  getGridIndexOf(row, column) { return row * Grid.getNumRows() + column }

  placeFoodItem(grid) {
    var foodPlaced = false
    while (!foodPlaced) {
      foodRow = Math.floor(Math.random() * Grid.getNumRows())
      foodColumn = Math.floor(Math.random() * Grid.getNumColumns())
      var isFoodPositionAvailable = true
      for(var i = 0; i < Snake.getSnakeRows().length; i++) {
        if (foodRow === Snake.getSnakeRows()[i] && foodColumn === Snake.getSnakeColumns()[i]) {
          isFoodPositionAvailable = false
          break
        }
      }
      if (isFoodPositionAvailable) {
          var gridIndex = this.getGridIndexOf(foodRow, foodColumn)
          grid[gridIndex] = 'food'
          foodPlaced = true;
      }
    }
  }





  updateHead(grid) {
    
    for(var i = 0; i < Snake.getSnakeRows().length; i++) {
      if (Grid.nextRow(Snake.getCurrentRow()) === Snake.getSnakeRows()[i] && Grid.nextColumn(Snake.getCurrentColumn()) === Snake.getSnakeColumns()[i]) {
        window.location.reload();
      }
    }
    //console.log("currentRow: "+currentRow);
    Snake.setCurrentRow(Grid.nextRow(Snake.getCurrentRow()));
    //console.log("currentRow: "+currentRow);
    Snake.setCurrentColumn(Grid.nextColumn(Snake.getCurrentColumn()));
    Snake.pushSnakeColumn(Snake.getCurrentColumn());
    Snake.pushSnakeRow(Snake.getCurrentRow());
    this.makeGridPosYellow(grid, this.getGridIndexOf(Snake.getCurrentRow(), Snake.getCurrentColumn()))
  }

  updateTail(grid) {
    if (Snake.getSnakeRows().length > snakeLength && Snake.getSnakeColumns().length > snakeLength) {
      if(Snake.getCurrentRow() === foodRow && Snake.getCurrentColumn() === foodColumn) {
        snakeLength += 1
        this.placeFoodItem(grid)
      } else {
        this.makeGridPosEmpty(grid, this.getGridIndexOf(Snake.getSnakeRows()[0], Snake.getSnakeColumns()[0]))
        Snake.removeLastSquare();
      }
    }
  }


 








  /*keyPressed(event) {
    var tempCurrentDirection = currentDirection
    if(event.keyCode === 37) {
      currentDirection = direction.LEFT
      currentDirection = (this.nextSquareIsOneSnakeSquareBehind()) ? tempCurrentDirection : direction.LEFT
    }
    if(event.keyCode === 38) {
      currentDirection = direction.UP
      currentDirection = (this.nextSquareIsOneSnakeSquareBehind()) ? tempCurrentDirection : direction.UP
    }
    if(event.keyCode === 39) {
      currentDirection = direction.RIGHT
      currentDirection = (this.nextSquareIsOneSnakeSquareBehind()) ? tempCurrentDirection : direction.RIGHT
    }
    if(event.keyCode === 40) {
      currentDirection = direction.DOWN
      currentDirection = (this.nextSquareIsOneSnakeSquareBehind()) ? tempCurrentDirection : direction.DOWN
    }
  }*/

}








class GridRender extends React.Component {

  /*componentDidMount() { document.addEventListener("keydown", logic.keyPressed, false); }
  componentWillUnmount() { document.removeEventListener("keydown", logic.keyPressed, false); }*/
  
  render() {
    var renderedGrid = []
    for (var i = 0; i < Grid.getNumRows() * Grid.getNumColumns(); i++) {
      renderedGrid.push(<SquareRender type={this.props.gridProp[i]}/>)
    }
    return renderedGrid
  }
}


class SquareRender extends React.Component {
  render() {
    return <div className={this.props.type + " square"}></div>;
  }
}

var logic

export default class App extends React.Component {
  constructor(props) {
    super()
    logic = new Logic()
    this.state = {grid: logic.init([])}
    setInterval(() => this.step(), 80);
  }

  step() {
    this.setState({grid: logic.step(this.state.grid)})
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Container">
            <GridRender gridProp={this.state.grid}/>
            </div>
        </header>
      </div>
    )
  }
}