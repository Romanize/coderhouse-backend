import { Router } from "express";
import { renderForm } from "../controllers/home";
import { addProduct, renderProductList } from "../controllers/products";

const router = Router();

router.get("/", renderForm);
router.get("/products", renderProductList);
router.post("/products", addProduct);


export default router;
