import type { Ingredient } from "../interfaces/Ingredient";

const STOCK_PER_UNIT = 100;

const calculateStock = (
  ingredientId: string,
  quantity: number,
  ingredients: Ingredient[],
): boolean => {
  const ingredient = ingredients.find((item) => item.id === ingredientId);
  if (!ingredient) return false;

  return ingredient.stock - quantity * STOCK_PER_UNIT >= 0;
};

export default calculateStock;
