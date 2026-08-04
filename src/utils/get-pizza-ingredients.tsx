import type { Ingredient } from "../interfaces/Ingredient";
import type { Pizza } from "../interfaces/Pizza";

const getPizzaIngredients = (pizza: Pizza, ingredients: Ingredient[]): Ingredient[] => {
  const byId = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  return pizza.ingredients
    .map((id) => byId.get(id))
    .filter((ingredient): ingredient is Ingredient => ingredient !== undefined);
};

export default getPizzaIngredients;
