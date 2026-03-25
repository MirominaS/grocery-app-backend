import express from 'express'
import { createOrderController } from '../controllers/order-controller.js';


const router = express.Router();

router.post("/orders",createOrderController)

export default router;