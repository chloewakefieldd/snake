import React from 'react'
import "./index.css"

var currentRow = 0
var currentColumn = 0
var squareSize = 20
var numRows = squareSize
var numColumns = squareSize
var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" }
var currentDirection = direction.LEFT
var snakeRows = []
var snakeColumns = []
var snakeLength = 0
var foodColumn = 0
var foodRow = 0



class Logic {

  init(grid) {
    currentRow = Math.floor(Math.random() * 2) + Math.floor(squareSize/2)
    currentColumn = Math.floor(Math.random() * 2) + Math.floor(squareSize/2)
    snakeRows.push(currentRow)
    snakeColumns.push(currentColumn)
    snakeLength += 1
    grid = this.createGrid(grid)
    currentDirection = Object.keys(direction)[Math.floor(Object.keys(direction).length * Math.random())]
    this.keyPressed = this.keyPressed.bind(this);
    return grid
  }

  createGrid(grid) {
    for (var i = 0; i < numRows * numColumns; i++) grid.push('empty')
    grid[this.getGridIndexOf(currentRow, currentColumn)] = 'yellow'
    this.placeFoodItem(grid)
    return grid
  }

  step(grid) {
    this.updateHead(grid)
    this.updateTail(grid)
    return grid
  }


  makeGridPosEmpty(grid, index) { grid[index] = 'empty' }
  makeGridPosYellow(grid, index) { grid[index] = 'yellow' }
  getGridIndexOf(row, column) { return row * numRows + column }

  placeFoodItem(grid) {
    var foodPlaced = false
    while (!foodPlaced) {
      foodRow = Math.floor(Math.random() * numRows)
      foodColumn = Math.floor(Math.random() * numColumns)
      var isFoodPositionAvailable = true
      for(var i = 0; i < snakeRows.length; i++) {
        if (foodRow === snakeRows[i] && foodColumn === snakeColumns[i]) {
          isFoodPositionAvailable = false
          break
        }
      }
      if (isFoodPositionAvailable) {
          var gridIndex = this.getGridIndexOf(foodRow, foodColumn)
          grid[gridIndex] = 'food'
          foodPlaced = true
      }
    }
  }





  updateHead(grid) {
    for(var i = 0; i < snakeRows.length; i++) {
      if (this.nextRow() === snakeRows[i] && this.nextColumn() === snakeColumns[i]) {
        window.location.reload();
      }
    }
    currentRow = this.nextRow()
    currentColumn = this.nextColumn()
    snakeColumns.push(currentColumn)
    snakeRows.push(currentRow)
    this.makeGridPosYellow(grid, this.getGridIndexOf(currentRow, currentColumn))
  }

  updateTail(grid) {
    if (snakeRows.length > snakeLength && snakeColumns.length > snakeLength) {
      if(currentRow === foodRow && currentColumn === foodColumn) {
        snakeLength += 1
        this.placeFoodItem(grid)
      } else {
        this.makeGridPosEmpty(grid, this.getGridIndexOf(snakeRows[0], snakeColumns[0]))
        snakeRows.splice(0, 1);
        snakeColumns.splice(0, 1);
      }
    }
  }


 

  nextRow() {
    if (currentDirection === direction.UP) return this.oneRowUp()
    if (currentDirection === direction.DOWN) return this.oneRowDown()
    return currentRow
  }
  
  nextColumn() {
    if (currentDirection === direction.LEFT) return this.oneColumnLeft()
    if (currentDirection === direction.RIGHT) return this.oneColumnRight()
    return currentColumn
  }
  
  oneRowUp () { return (currentRow - 1 < 0) ? squareSize - 1 : currentRow - 1 }
  oneRowDown () { return (currentRow + 1 >= squareSize) ? 0 : currentRow + 1 }
  oneColumnLeft () { return (currentColumn - 1 < 0) ? squareSize - 1 : currentColumn - 1 }
  oneColumnRight () { return (currentColumn + 1 >= squareSize) ? 0 : currentColumn + 1 }


  nextSquareIsOneSnakeSquareBehind() {
    return (snakeRows[snakeRows.length - 2] === this.nextRow() && snakeColumns[snakeColumns.length - 2] === this.nextColumn()) ? true : false
  }



  keyPressed(event) {
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
  }

}








class Grid extends React.Component {

  componentDidMount() { document.addEventListener("keydown", logic.keyPressed, false); }
  componentWillUnmount() { document.removeEventListener("keydown", logic.keyPressed, false); }
  
  render() {
    var renderedGrid = []
    for (var i = 0; i < numRows * numColumns; i++) {
      renderedGrid.push(<Square type={this.props.gridProp[i]}/>)
    }
    return renderedGrid
  }
}


class Square extends React.Component {
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
            <Grid gridProp={this.state.grid}/>
            </div>
        </header>
      </div>
    )
  }
}