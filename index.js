import express from 'express'
import { product_data } from './models/product_models.js';


const app = express()
const PORT = 3000;

app.get('/',(req, res) => {
    res.send("Hello world")
})

app.get('/products',(req,res) => {
    console.log(product_data);
    res.json(product_data)
})

app.listen(PORT, () => {
    console.log(`grocery-app-backend is running on ${PORT}.`);
})
