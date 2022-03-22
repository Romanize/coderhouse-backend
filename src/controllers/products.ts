import { RequestHandler } from "express";

interface ProductI {
  name: string;
  price: number;
  url: string;
  id: number;
};

const products: Array<ProductI> = [];
let identifier = 1;

export const addProduct: RequestHandler<{}, {}, ProductI> = (req, res) => {
  const { body } = req;
  const newProduct: ProductI = {
    ...body,
    id: identifier
  }
  identifier++;

  products.push(newProduct)
  res.redirect('/');
}

export const renderProductList: RequestHandler = (req, res) => {
  res.render('products', { products })
}