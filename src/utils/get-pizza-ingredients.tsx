import type { Pizza } from "../interfaces/Pizza";
import { useGetIngredientNames } from "../api/ingredients";

const getPizzaIngredients = (pizza: Pizza) => {
  const { data: ingredientNames } = useGetIngredientNames(pizza.ingredients);
  return ingredientNames?.map(ingredient => ingredient.name);
};

export default getPizzaIngredients;