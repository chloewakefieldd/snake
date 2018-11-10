import Grid from "./grid"

var direction = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT",  RIGHT: "RIGHT" };

var currentRow = 0;
var currentColumn = 0;
var currentDirection;

var snakeRows = [];
var snakeColumns = [];

export default class Snake {

    static getCurrentDirection() { return currentDirection; }
    static setCurrentDirection(newDirection) { currentDirection = newDirection; }
    
    static getCurrentRow() { return currentRow; }
    static setCurrentRow(newRow) { currentRow = newRow; }

    static getCurrentColumn() { return currentColumn; }
    static setCurrentColumn(newColumn) { currentColumn = newColumn; }

    static getSnakeRows() { return snakeRows; }
    static setSnakeRows(newSnakeRows) { snakeRows = newSnakeRows; }
    static pushSnakeRow(newSnakeRow) { snakeRows.push(newSnakeRow); }

    static getSnakeColumns() { return snakeColumns; }
    static setSnakeColumns(newSnakeColumns) { snakeColumns = newSnakeColumns; }
    static pushSnakeColumn(newSnakeColumn) { snakeColumns.push(newSnakeColumn); }

    static nextRow(currentRow) {
      if (this.getCurrentDirection() === direction.UP) {
        return this.oneRowUp(currentRow);
      }
      if (this.getCurrentDirection() === direction.DOWN) {
        return this.oneRowDown(currentRow);
      }
      return currentRow
    }
  
    static nextColumn(currentColumn) {
      if (this.getCurrentDirection() === direction.LEFT) {
        return this.oneColumnLeft(currentColumn);
      }
      if (this.getCurrentDirection() === direction.RIGHT) {
        return this.oneColumnRight(currentColumn);
      }
      return currentColumn;
    }
  
    static oneRowUp (currentRow) { return (currentRow - 1 < 0) ? Grid.getGridSize() - 1 : currentRow - 1; }
    static oneRowDown (currentRow) { return (currentRow + 1 >= Grid.getGridSize()) ? 0 : currentRow + 1; }
    static oneColumnLeft (currentColumn) { return (currentColumn - 1 < 0) ? Grid.getGridSize() - 1 : currentColumn - 1; }
    static oneColumnRight (currentColumn) { return (currentColumn + 1 >= Grid.getGridSize()) ? 0 : currentColumn + 1; }

    static removeLastSquare() {
        snakeRows.splice(0, 1);
        snakeColumns.splice(0, 1);
    }

}