import { Router } from "express";
import {
  addProductToShoppingCart,
  addShoppingCart,
  deleteProductByIdFromShoppingCart,
  deleteShoppingCartById,
  getProductsByShoppingCartId,
} from "../controllers/shoppingCartController";

export const shoppingCartRouter = Router();

shoppingCartRouter.post("/", addShoppingCart);
shoppingCartRouter.delete("/:id", deleteShoppingCartById);
shoppingCartRouter.get("/:id/products", getProductsByShoppingCartId);
shoppingCartRouter.post("/:id/products/:prod_id", addProductToShoppingCart);
shoppingCartRouter.delete(
  "/:id/products/:prod_id",
  deleteProductByIdFromShoppingCart
);
