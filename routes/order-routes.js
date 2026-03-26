import express from 'express'
import { createOrderController, getOrdersController } from '../controllers/order-controller.js';


const router = express.Router();

router.post("/orders",createOrderController)
router.get("/orders",getOrdersController)

export default router;