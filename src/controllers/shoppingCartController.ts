import { ProductI } from "./productsController";
import fs from "fs";
import { RequestHandler } from "express";

export interface ShoppingCartI {
  id: number;
  timestamp: number;
  products: ProductI[];
}

export const addShoppingCart: RequestHandler = async (req, res) => {
  const shoppingCarts: ShoppingCartI[] = JSON.parse(
    await fs.promises.readFile("./src/data/shoppingCarts.json", "utf-8")
  );
  const newShoppingCart: ShoppingCartI = req.body;
  newShoppingCart.id = shoppingCarts[shoppingCarts.length - 1]?.id + 1 || 1;
  newShoppingCart.timestamp = Date.now();
  newShoppingCart.products = newShoppingCart.products || [];
  shoppingCarts.push(newShoppingCart);
  await fs.promises.writeFile("./src/data/shoppingCarts.json", JSON.stringify(shoppingCarts, null, 2));
  res.json(newShoppingCart);
}

export const deleteShoppingCartById: RequestHandler = async (req, res) => {
  const shoppingCarts: ShoppingCartI[] = JSON.parse(
    await fs.promises.readFile("./src/data/shoppingCarts.json", "utf-8")
  );
  const cartIndex = shoppingCarts.findIndex(c => c.id === parseInt(req.params.id));
  if (cartIndex > -1) {
    shoppingCarts.splice(cartIndex, 1);
    await fs.promises.writeFile("./src/data/shoppingCarts.json", JSON.stringify(shoppingCarts, null, 2));
    res.json({ message: "Shopping cart deleted" });
  } else {
    res.status(404).json({ message: "Shopping cart not found" });
  }
}

export const getProductsByShoppingCartId: RequestHandler = async (req, res) => {
  const shoppingCarts: ShoppingCartI[] = JSON.parse(
    await fs.promises.readFile("./src/data/shoppingCarts.json", "utf-8")
  );
  const cart = shoppingCarts.find(c => c.id === parseInt(req.params.id));
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: "Shopping cart not found" });
  }
}

export const addProductToShoppingCart: RequestHandler = async (req, res) => {
  const shoppingCarts: ShoppingCartI[] = JSON.parse(
    await fs.promises.readFile("./src/data/shoppingCarts.json", "utf-8")
  );
  const cart = shoppingCarts.find(c => c.id === parseInt(req.params.id));
  if (cart) {
    const products: ProductI[] = JSON.parse(
      await fs.promises.readFile("./src/data/products.json", "utf-8")
    );;
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.prod_id));
    if (productIndex > -1) {
      cart.products.push(products[productIndex]);
      cart.timestamp = Date.now();
    } else {
      res.status(404).json({ message: "Product not found" });
    }
    await fs.promises.writeFile("./src/data/shoppingCarts.json", JSON.stringify(shoppingCarts, null, 2));
    res.json(cart);
  } else {
    res.status(404).json({ message: "Shopping cart not found" });
  }
}

export const deleteProductByIdFromShoppingCart: RequestHandler = async (req, res) => {
  const shoppingCarts: ShoppingCartI[] = JSON.parse(
    await fs.promises.readFile("./src/data/shoppingCarts.json", "utf-8")
  );
  const cart = shoppingCarts.find(c => c.id === parseInt(req.params.id));
  if (cart) {
    const productIndex = cart.products.findIndex(p => p.id === parseInt(req.params.prod_id));
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.timestamp = Date.now();
      await fs.promises.writeFile("./src/data/shoppingCarts.json", JSON.stringify(shoppingCarts, null, 2));
      res.json({ message: "Product deleted" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else {
    res.status(404).json({ message: "Shopping cart not found" });
  }
}