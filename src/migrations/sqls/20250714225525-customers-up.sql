-- 1. Define enum types
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'delivered', 'cancelled');
CREATE TYPE delivery_status AS ENUM ('assigned', 'in-transit', 'delivered');

CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  phone_number VARCHAR,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(100),
  reset_password_token_expires TIMESTAMPTZ,
  reset_password_token VARCHAR(50),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);


CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  description TEXT,
  address TEXT,
  phone_number VARCHAR(20),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  restaurant_id VARCHAR(100) REFERENCES restaurants(reference),
  name VARCHAR(100),
  description TEXT,
  price DECIMAL(10, 2),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  customer_id VARCHAR(100) REFERENCES customer(reference),
  restaurant_id VARCHAR(100) REFERENCES restaurants(reference),
  delivery_address TEXT,
  total_price DECIMAL(10, 2),
  status order_status DEFAULT 'pending',
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  order_id VARCHAR(100) REFERENCES orders(reference),
  menu_item_id VARCHAR(100) REFERENCES menu_items(reference),
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE delivery_riders (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR(100),
  phone_number VARCHAR(20),
  vehicle_type VARCHAR(50),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE order_delivery (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  order_id VARCHAR(100) REFERENCES orders(reference),
  rider_id VARCHAR(100) REFERENCES delivery_riders(reference),
  delivery_status delivery_status DEFAULT 'assigned',
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);


CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  customer_id VARCHAR(100) REFERENCES customer(reference),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);


CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  reference VARCHAR UNIQUE NOT NULL,
  cart_id VARCHAR(100) REFERENCES cart(reference),
  menu_item_id VARCHAR(100) REFERENCES menu_items(reference),
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2),
  added_at TIMESTAMPTZ,
  removed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);
