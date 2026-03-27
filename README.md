# Grocery App - Backend

##  Project Overview

This is the backend service for the Grocery App.
It provides APIs for managing products and customer orders for a supermarket.

The backend is built using **Node.js (Express)** and **PostgreSQL**.

---

## Features

### Products
- Fetch all products
- Search products by name
- Filter products by category

### Orders
- Create a new order
- Validate product availability (stock check)
- Store order details and items
- Fetch all placed orders (Admin view)

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (Node PostgreSQL client)

---

## Project Structure
```
grocery-app-backend/
│
├── config/
│ ├── db-config.js 
│ ├── schema.sql 
│
├── controllers/
│ ├── product-controller.js
│ ├── order-controller.js
│
├── models/
│ ├── product-models.js 
│ ├── order-models.js
│
├── routes/
│ ├── product-routes.js
│ ├── order-routes.js
│
├── utils/
│ ├── loggers.js
│
├── index.js 
└── package.json
```

---


##  Database Schema

The database is organized into two schemas:

- `product_details` → stores product-related data  
- `order_details` → stores order-related data  

---

### **Schema: `product_details`**

#### **Table Name:** `products`

| Column      | Type        | Description                          |
| ----------- | ----------- | ------------------------------------ |
| `id`        | SERIAL (PK) | Unique product identifier            |
| `name`      | TEXT        | Product name                         |
| `price`     | DECIMAL     | Price of the product                 |
| `category`  | TEXT        | Product category                     |
| `stock`     | INT         | Available stock quantity             |
| `image_url` | TEXT        | URL of the product image             |

---

### **Schema: `order_details`**

#### **Table Name:** `orders`

| Column          | Type        | Description                          |
| --------------- | ----------- | ------------------------------------ |
| `id`            | SERIAL (PK) | Unique order identifier              |
| `customer_name` | TEXT        | Name of the customer                 |
| `phone_no`      | TEXT        | Customer phone number                |
| `address`       | TEXT        | Delivery address                     |
| `total`         | DECIMAL     | Total order amount                   |
| `created_at`    | TIMESTAMP   | Order creation timestamp             |

---

#### **Table Name:** `order_items`

| Column       | Type        | Description                                      |
| ------------ | ----------- | ------------------------------------------------ |
| `id`         | SERIAL (PK) | Unique order item identifier                     |
| `order_id`   | INTEGER (FK)| References `order_details.orders(id)`            |
| `product_id` | INTEGER (FK)| References `product_details.products(id)`        |
| `quantity`   | INTEGER     | Quantity of the product in the order             |

---

##  Database Setup (Using pgAdmin)

### Open pgAdmin

- Launch *pgAdmin*
- Connect to your PostgreSQL server

---

### Create Database

- Right-click on *Databases*
- Click *Create → Database*
- Enter database name:grocery_db

- Click *Save*

---

### Run Schema File

- Select the newly created database (grocery_app)
- Click on *Query Tool*

---

### Execute schema.sql

- Open the file located at:
- Copy all the SQL queries
- Paste into the Query Tool
- Click *Execute*

---

### Expected Result

The following schemas and tables will be created:

- product_details.products
- order_details.orders
- order_details.order_items

---

### Verify Tables

Run the following queries in Query Tool:

```sql
SELECT * FROM product_details.products;
SELECT * FROM order_details.orders;
```
---
##  Environment Variables

### Create a .env file in the root directory

```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=grocery_app
DB_PASSWORD=your_password
DB_PORT=5432
```

## Install dependencies

```
npm install
```

## Start Server

```
npm start
```

## Server will run at
```
http://localhost:3000
```

## API Endpoints

### Products
 - GET/grocery/products -> Fetch all products

### Orders
 - POST/grocery/orders -> Create a new order
 - GET/grocery/orders -> Retrieve all orders (admin)

## Author

**Miromina**  
 smirona16@gmail.com  
 [LinkedIn](https://www.linkedin.com/in/miromina/) | [GitHub](https://github.com/MirominaS)

---