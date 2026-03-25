import { product_data } from "../models/product-models.js";
import { errorLogger, logger } from "../utils/loggers.js"

export const getProductsController = (req,res) => {
    try {
        logger("Fetching Products..")

        const {search, category} = req.query;

        let filtered_products = product_data;

        if(search) {
            filtered_products = filtered_products.filter(
                (product) => product.name.toLowerCase().includes(search.toLowerCase()) 
            )
        }

        if (category) {
            filtered_products = filtered_products.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            )
        }

        return res.status(200).json({
            data: filtered_products,
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