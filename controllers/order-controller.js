import { order_data } from "../models/order-models.js";
import { product_data } from "../models/product-models.js";
import { errorLogger, logger } from "../utils/loggers.js";

export const createOrderController = (req, res) => {
    try {
        const {customer_name, phone_no, address, items} = req.body;
        
        if(!customer_name || !phone_no || !address || !items) {
            return res.status(400).json({
                error: "Missing required fields"
            })
        }

        let total = 0;

        const detailed_items = items.map((item) => {
            const product_detail = product_data.find((product) => product.id === item.product_id)

            if(!product_detail) {
                throw new Error(`Product with id ${item.product_id} not found`)
            }

            if(item.quantity > product_detail.stock) {
                throw new Error(`Not enough stock for ${product_detail.name}`)
            }

            total += product_detail.price * item.quantity

            return {
                product_id: item.product_id,
                quantity: item.quantity
            }
        })

        const new_order = {
            id: order_data.length +1,
            customer_name,
            phone_no,
            address,
            total,
            items:detailed_items,
            created_at: new Date()
        }

        order_data.push(new_order);

        logger("Order Created Successfully")

        return res.status(201).json({
                data: new_order,
                message:"Order created successfully",
                success: true
        })
        
    } catch (error) {
        errorLogger(error.message)

        return res.status(400).json({
            data:null,
            message:error.message,
            success: false
        })
        
    }
}