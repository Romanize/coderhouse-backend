import { Router } from "express";
import { validateAdminRole } from "../controllers/authController";
import {
  addProduct,
  deleteProduct,
  getProductByID,
  getProducts,
  updateProduct,
} from "../controllers/productsController";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductByID);
productsRouter.post("/", validateAdminRole, addProduct);
productsRouter.put("/:id", validateAdminRole, updateProduct);
productsRouter.delete("/:id", validateAdminRole, deleteProduct);

