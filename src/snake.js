
var currentRow = 0
var currentColumn = 0
var currentDirection;

var snakeRows = []
var snakeColumns = []

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

    static removeLastSquare() {
        snakeRows.splice(0, 1);
        snakeColumns.splice(0, 1);
    }

}