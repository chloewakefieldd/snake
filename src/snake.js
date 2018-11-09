
var currentRow = 0
var currentColumn = 0
var currentDirection;

export default class Snake {

    static getCurrentDirection() { return currentDirection; }
    static setCurrentDirection(newDirection) { currentDirection = newDirection; }
    
    static getCurrentRow() { return currentRow; }
    static setCurrentRow(newRow) { currentRow = newRow; }

    static getCurrentColumn() { return currentColumn; }
    static setCurrentColumn(newColumn) { currentColumn = newColumn; }

}