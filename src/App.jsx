import React from 'react'
import "./index.css"
import Grid from "./grid"
import Neural from "./neuralStuff"
import Snake from "./snake"
import Food from "./food"

class Logic {

  static init(grid) {
    Snake.setInitialLocation();
    Snake.pushCurrentLocation();
    Snake.setSnakeLength(1);
    grid = Logic.createGrid(grid)
    Snake.setCurrentDirection(Neural.decideMove(grid));
    return grid
  }

  static resetEverything() {
    window.location.reload();
    //Snake.reset();
    //Food.reset();
  }

  static createGrid(grid) {
    console.log("CREATING GRID");
    for (var i = 0; i < Grid.getNumRows() * Grid.getNumColumns(); i++) grid.push('empty')
    grid[Logic.getGridIndexOf(Snake.getCurrentRow(), Snake.getCurrentColumn())] = 'yellow'
    Logic.placeFoodItem(grid)
    return grid
  }

  static step(grid) {
    Snake.setCurrentDirection(Neural.decideMove(grid));
    Logic.updateHead(grid)
    Logic.updateTail(grid)
    return grid
  }


  static makeGridPosEmpty(grid, index) { grid[index] = 'empty' }
  static makeGridPosYellow(grid, index) { grid[index] = 'yellow' }
  static getGridIndexOf(row, column) { return row * Grid.getNumRows() + column }

  static placeFoodItem(grid) {
    var foodPlaced = false
    while (!foodPlaced) {
      Food.setFoodRow(Math.floor(Math.random() * Grid.getNumRows()));
      Food.setFoodColumn(Math.floor(Math.random() * Grid.getNumColumns()));
      var isFoodPositionAvailable = true
      for(var i = 0; i < Snake.getSnakeRows().length; i++) {
        if (Food.getFoodRow() === Snake.getSnakeRows()[i] && Food.getFoodColumn() === Snake.getSnakeColumns()[i]) {
          isFoodPositionAvailable = false
          break
        }
      }
      if (isFoodPositionAvailable) {
          var gridIndex = Logic.getGridIndexOf(Food.getFoodRow(), Food.getFoodColumn())
          grid[gridIndex] = 'food'
          foodPlaced = true;
      }
    }
  }





  static updateHead(grid) {
    
    for(var i = 0; i < Snake.getSnakeRows().length; i++) {
      if (Snake.nextRow(Snake.getCurrentRow()) === Snake.getSnakeRows()[i] && Snake.nextColumn(Snake.getCurrentColumn()) === Snake.getSnakeColumns()[i]) {
        Logic.resetEverything();
      }
    }
    Snake.setCurrentRow(Snake.nextRow(Snake.getCurrentRow()));
    Snake.setCurrentColumn(Snake.nextColumn(Snake.getCurrentColumn()));
    Snake.pushCurrentLocation();
    Logic.makeGridPosYellow(grid, Logic.getGridIndexOf(Snake.getCurrentRow(), Snake.getCurrentColumn()))
  }

  static updateTail(grid) {
    if (Snake.getSnakeRows().length > Snake.getSnakeLength() && Snake.getSnakeColumns().length > Snake.getSnakeLength()) {
      if(Snake.getCurrentRow() === Food.getFoodRow() && Snake.getCurrentColumn() === Food.getFoodColumn()) {
        Snake.increaseSnakeLength();
        Logic.placeFoodItem(grid)
      } else {
        Logic.makeGridPosEmpty(grid, Logic.getGridIndexOf(Snake.getSnakeRows()[0], Snake.getSnakeColumns()[0]))
        Snake.removeLastSquare();
      }
    }
  }

}






class GridRender extends React.Component {
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


export default class App extends React.Component {

  constructor(props) {
    super()
    this.state = {grid: Logic.init([])}
    setInterval(() => this.step(), 80);
  }

  step() {
    this.setState({grid: Logic.step(this.state.grid)})
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