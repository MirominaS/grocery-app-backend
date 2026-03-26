import { product_data } from "../models/product-models.js";
import { pool } from '../config/db-config.js';
import { errorLogger, logger } from "../utils/loggers.js"

export const getProductsController = async (req,res) => {
    try {
        logger("Fetching Products..")
        
        const {search, category} = req.query;

        let result;
        // for both search and category
        if(search && category) {
            result = await pool.query(`select * from product_details.products where name ilike $1 and category ilike $2`,
                [`%${search}%`, category]
            )
        } //for search
        else if(search) {  
            result = await pool.query(`select * from product_details.products where name ilike $1`,
                [`%${search}%`]
            )
        } //for category
        else if(category) {
            result = await pool.query(`select * from product_details.products where category ilike $1`,
                [category]
            )
        }//no filters
         else {
            result = await pool.query(`select * from product_details.products`)
        }

        return res.status(200).json({
            data: result.rows,
            message:"Products fetched successfully",
            success: true
        })
        
    } catch (error) {
        errorLogger("error:",error)
        return res.status(500).json({
            data:null,
            message:"Something went wrong!",
            success: false
        })
    }
}