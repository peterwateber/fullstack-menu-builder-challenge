"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMenuRequestBy = exports.Dish = exports.Category = void 0;
/**
 * Menu
 */
var Category;
(function (Category) {
    Category["BREAKFAST"] = "Breakfast";
    Category["LUNCH"] = "Lunch";
    Category["DINNER"] = "Dinner";
})(Category = exports.Category || (exports.Category = {}));
var Dish;
(function (Dish) {
    Dish["ASIAN"] = "Asian";
    Dish["Italian"] = "Italian";
})(Dish = exports.Dish || (exports.Dish = {}));
/**
 * Request
 */
var GetAllMenuRequestBy;
(function (GetAllMenuRequestBy) {
    GetAllMenuRequestBy["Category"] = "Category";
    GetAllMenuRequestBy["Dish"] = "Dish";
})(GetAllMenuRequestBy = exports.GetAllMenuRequestBy || (exports.GetAllMenuRequestBy = {}));
