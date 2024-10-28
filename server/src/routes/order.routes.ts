import { Router } from "express";
import { placeOrder } from "../controllers/orders/placeOrder.controller.mts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { verifyOrder } from "../controllers/orders/verifyOrder.controller.mts";
import { userOrder } from "../controllers/orders/usersOrder.controller.mts";
import { listOrders } from "../controllers/orders/listOrders.controller.mts";
import { updateStatus } from "../controllers/orders/orderStatus.controller.mts";

const router = Router();

router.post('/place', authMiddleware, placeOrder)
router.post('/verify', verifyOrder)
router.post('/user-orders', authMiddleware, userOrder)
router.get('/list', listOrders)
router.put('/status', updateStatus)

export const orderRouter = router