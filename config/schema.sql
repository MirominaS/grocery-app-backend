-- create schemas
CREATE SCHEMA IF NOT EXISTS product_details;
CREATE SCHEMA IF NOT EXISTS order_details;

-- table for products
CREATE TABLE product_details.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL NOT NULL,
    category TEXT,
    stock INT DEFAULT 0,
    image_url TEXT
);

-- table for orders
CREATE TABLE order_details.orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone_no TEXT NOT NULL,
    address TEXT NOT NULL,
    total DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- table for order items
CREATE TABLE order_details.order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES order_details.orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES product_details.products(id),
    quantity INT NOT NULL
);

-- sample data to store in the product table
INSERT INTO product_details.products (name, price, category, stock, image_url) VALUES
('Apple', 5, 'Fruits', 200, 'https://5.imimg.com/data5/AK/RA/MY-68428614/apple.jpg'),
('Orange', 3, 'Fruits', 150, 'https://thumbs.dreamstime.com/b/sliced-orange-fruit-leaves-isolated-white-23331258.jpg'),
('Milk', 8, 'Dairy', 40, 'https://as2.ftcdn.net/jpg/02/31/84/29/1000_F_231842968_qThCnmslPbEAwhg7nuW9rAy8qRNhRli7.jpg'),
('Curd', 7, 'Dairy', 70, 'https://t4.ftcdn.net/jpg/05/84/40/39/360_F_584403956_eIK7nSjPN8EDceoQpQoGRTQYGSpolqvu.jpg'),
('Bread', 10, 'Bakery', 100, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/960px-Fresh_made_bread_05.jpg'),
('Cake', 25, 'Bakery', 60, 'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_640.jpg');
