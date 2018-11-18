import Grid from "./grid"

var foodColumn = null;
var foodRow = null;

export default class Food {

    static reset() {
        foodColumn = null;
        foodRow = null;
    }

    static getFoodColumn() { return foodColumn; }
    static setFoodColumn(newFoodColumn) { foodColumn = newFoodColumn; }

    static getFoodRow() { return foodRow; }
    static setFoodRow(newFoodRow) { foodRow = newFoodRow; }

    static setRandomLocation() {
        Food.setFoodRow(Math.floor(Math.random() * Grid.getNumRows()));
        Food.setFoodColumn(Math.floor(Math.random() * Grid.getNumColumns()));
    }

}