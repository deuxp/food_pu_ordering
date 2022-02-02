DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id REFERENCES orders(id) ON DELETE CASCADE,
  item_id REFERENCES items(id) ON DELETE CASCADE,
  modification VARCHAR(255)
);
