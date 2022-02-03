DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  instructions VARCHAR(255),
  status VARCHAR(255) DEFAULT 'pending',
  time  DEFAULT transaction_timestamp(),
  tip INTEGER DEFAULT 0
);
