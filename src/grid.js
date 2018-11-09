import Snake from "./snake"
var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" }
var gridSize = 20
var numRows = 20
var numColumns = 20

export default class Grid {

  static nextRow(currentRow) {
    
    if (Snake.getCurrentDirection() === direction.UP) {
      return this.oneRowUp(currentRow)
    }
    if (Snake.getCurrentDirection() === direction.DOWN) {
      return this.oneRowDown(currentRow)
    }
    return currentRow
  }

  static nextColumn(currentColumn) {
    if (Snake.getCurrentDirection() === direction.LEFT) {
      return Grid.oneColumnLeft(currentColumn)
    }
    if (Snake.getCurrentDirection() === direction.RIGHT) {
      return Grid.oneColumnRight(currentColumn)
    }
    return currentColumn
  }

  static oneRowUp (currentRow) { return (currentRow - 1 < 0) ? gridSize - 1 : currentRow - 1 }
  static oneRowDown (currentRow) { return (currentRow + 1 >= gridSize) ? 0 : currentRow + 1 }
  static oneColumnLeft (currentColumn) { return (currentColumn - 1 < 0) ? gridSize - 1 : currentColumn - 1 }
  static oneColumnRight (currentColumn) { return (currentColumn + 1 >= gridSize) ? 0 : currentColumn + 1 }



  static getGridSize() { return gridSize; }
  static getNumRows() { return numRows; }
  static getNumColumns() { return numColumns; }

}