import { order_data } from "../models/order-models.js";
import { product_data } from "../models/product-models.js";
import { errorLogger, logger } from "../utils/loggers.js";
import { pool } from '../config/db-config.js';

export const createOrderController = async (req, res) => {
    try {
        const {customer_name, phone_no, address, items} = req.body;
        
        if(!customer_name || !phone_no || !address || !items) {
            return res.status(400).json({
                error: "Missing required fields"
            })
        }

        let total = 0;

        await pool.query("begin")

        for (let item of items) {
            const result = await pool.query("select * from product_details.products where id = $1",
                [item.product_id]
            )
            if(result.rows.length === 0) {
                throw new Error(`Product with id ${item.product_id} not found`)
            }

            const product = result.rows[0];
            
            if(item.quantity > product.stock) {
                throw new Error(`Not enough stock for ${product.name}`)
            }

            total += product.price * item.quantity

            const order_result = await pool.query(
                `insert into order_details.orders (customer_name,phone_no, address, total) values ($1,$2,$3,$4) returning id`,
                [customer_name,phone_no,address, total]
            )

            const order_id = order_result.rows[0].id;

            for(let item of items) {
                await pool.query(
                    `insert into order_details.order_items (order_id,product_id,quantity) values ($1,$2,$3)`,
                    [order_id,item.product_id,item.quantity]
                )
            }

            await pool.query("commit")

            logger("Order Created successfully")

            return res.status(201).json({
                data: {order_id,total},
                message: "Order created successfully",
                success: true
            })
        }        
    } catch (error) {
        await pool.query("rollback")

        errorLogger(error.message)

        return res.status(400).json({
            data:null,
            message:error.message,
            success: false
        })
        
    }
}

export const getOrdersController = async (req, res) => {
    try {
        logger("Fetching all orders")

        const result = await pool.query(
            `select 
                o.id as order_id,
                o.customer_name,
                o.phone_no,
                o.address,
                o.total,
                o.created_at,
                oi.product_id,
                oi.quantity,
                p.name as product_name,
                p.price as product_price,
                p.category as product_category,
                p.image_url as product_image
            from order_details.orders o
            left join order_details.order_items oi on o.id = oi.order_id
            left join product_details.products p on oi.product_id = p.id
            order by o.created_at desc, o.id, oi.id`)

            const orders = [];

            result.rows.forEach (row => {
                let order = orders.find(or => or.id === row.order_id)
                if(!order){
                    order = {
                        id: row.order_id,
                        customer_name: row.customer_name,
                        phone_no: row.phone_no,
                        address: row.address,
                        total: row.total,
                        created_at: row.created_at,
                        items: []
                    }
                    orders.push(order)
                }

               if(row.product_id) {
                order.items.push({
                    product_id: row.product_id,
                    name: row.product_name,
                    price: row.product_price,
                    category: row.product_category,
                    image: row.product_image,
                    quantity: row.quantity
                })
               }
            })

            return res.status(200).json({
                data: orders,
                message: "Orders fetched successfully",
                success: true
            })
        
    } catch (error) {
        errorLogger(error.message)

        return res.status(500).json({
            data: null,
            message:error.message,
            success:false
        })
    }
}