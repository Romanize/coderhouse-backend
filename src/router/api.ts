import { Router } from "express";
import {
  deleteProduct,
  getProducts,
  getRandomProduct,
  getSingleProduct,
  saveProduct,
  updateProduct,
} from "../controllers/products";

const router = Router();

router.get("/", getProducts);
router.get("/random", getRandomProduct);
router.get("/:id", getSingleProduct);

router.post("/", saveProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
