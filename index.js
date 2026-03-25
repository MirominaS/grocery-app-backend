import express, { json } from 'express'
import { product_data } from './models/product-models.js';
import productRouter from './routes/product-routes.js'

const app = express()
const PORT = 3000;

app.use(json());
app.use("/grocery",productRouter)

app.listen(PORT, () => {
    console.log(`grocery-app-backend is running on ${PORT}.`);
})
