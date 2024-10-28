import { Router } from "express";
import { getCart } from "../controllers/cart/getCart.controller.mts";
import { addToCart } from "../controllers/cart/addToCart.controller.mts";
import { removeFromCart } from "../controllers/cart/removeFromCart.controller.ts";
import { authMiddleware } from '../middleware/auth.middleware.ts';

const router = Router();

router.post('/add', authMiddleware, addToCart)
router.post('/remove', authMiddleware, removeFromCart)
router.get('/get', authMiddleware, getCart)

export const cartRouter = router