INSERT INTO orders (restaurant_id, customer_id, time)
VALUES (1, 1, now());

INSERT INTO order_items (order_id, item_id, modification, qty)
VALUES (1, 2, 'not too hot pls', 3);

INSERT INTO order_items (order_id, item_id, modification, qty)
VALUES (1, 4, 'extra salty, pls', 1);
