import { RequestHandler } from "express";
import fs from "fs";

export interface ProductI {
  name: string;
  price: number;
  stock: number;
  description: string;
  code: number;
  pictureUrl: string;
  timestamp: number;
  id: number;
}

export const getProducts: RequestHandler = async (_req, res) => {
  const products: ProductI[] = JSON.parse(
    await fs.promises.readFile("./src/data/products.json", "utf-8")
  );
  res.json(products);
};

export const getProductByID: RequestHandler = async (req, res) => {
  const products: ProductI[] = JSON.parse(
    await fs.promises.readFile("./src/data/products.json", "utf-8")
  );
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}

export const addProduct: RequestHandler = async (req, res) => {
  const products: ProductI[] = JSON.parse(
    await fs.promises.readFile("./src/data/products.json", "utf-8")
  );
  const newProduct: ProductI = req.body;
  newProduct.id = products[products.length - 1]?.id + 1 || 1;
  newProduct.timestamp = Date.now();
  products.push(newProduct);
  await fs.promises.writeFile("./src/data/products.json", JSON.stringify(products, null, 2));
  res.json(newProduct);
}

export const updateProduct: RequestHandler = async (req, res) => {
  const products: ProductI[] = JSON.parse(
    await fs.promises.readFile("./src/data/products.json", "utf-8")
  );
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    const updatedProduct: ProductI = req.body;
    product.name = updatedProduct.name ?? product.name;
    product.description = updatedProduct.description ?? product.description;
    product.stock = updatedProduct.stock ?? product.stock;
    product.code = updatedProduct.code ?? product.code;
    product.price = updatedProduct.price ?? product.price;
    product.pictureUrl = updatedProduct.pictureUrl ?? product.pictureUrl;
    product.timestamp = Date.now();
    await fs.promises.writeFile("./src/data/products.json", JSON.stringify(products, null, 2));
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const products: ProductI[] = JSON.parse(
    await fs.promises.readFile("./src/data/products.json", "utf-8")
  );
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    await fs.promises.writeFile("./src/data/products.json", JSON.stringify(products, null, 2));
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}