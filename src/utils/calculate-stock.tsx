import type { Ingredient } from "../interfaces/Ingredient";
import type { OrderItem } from "../interfaces/Order";

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

const getRequiredIngredientQuantities = (orderItems: OrderItem[]): Map<string, number> => {
  const quantities = new Map<string, number>();

  for (const item of orderItems) {
    const ingredientIds = [
      ...item.pizza.ingredients,
      ...item.extras.map((extra) => extra.id),
    ];

    for (const id of ingredientIds) {
      quantities.set(id, (quantities.get(id) ?? 0) + item.quantity);
    }
  }

  return quantities;
};

export const getInsufficientStockIngredients = (
  orderItems: OrderItem[],
  ingredients: Ingredient[],
): string[] => {
  const required = getRequiredIngredientQuantities(orderItems);

  return [...required.entries()]
    .filter(([id, quantity]) => !calculateStock(id, quantity, ingredients))
    .map(([id]) => ingredients.find((ingredient) => ingredient.id === id)?.name ?? id);
};

export default calculateStock;
