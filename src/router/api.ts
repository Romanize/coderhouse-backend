import { Router } from "express";
import { getProducts, getRandomProduct } from "../controllers/products";

const router = Router();

router.get('/products', getProducts)
router.get('/randomProduct', getRandomProduct)

export default router;