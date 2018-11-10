var foodColumn = 0
var foodRow = 0

export default class Food {

    static getFoodColumn() { return foodColumn; }
    static setFoodColumn(newFoodColumn) { foodColumn = newFoodColumn; }

    static getFoodRow() { return foodRow; }
    static setFoodRow(newFoodRow) { foodRow = newFoodRow; }

}