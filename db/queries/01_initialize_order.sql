-- all back end until the order is revealed then a custom table query is made

-- need to get seperately first, but will hard-code for now:
-- query customer id = 1
-- query restaurant id = 1

-- INIT THE ORDER
--- --- -- -- - - --- -- - - - - -- - - - --- -- -  -

INSERT INTO orders (restaurant_id, customer_id, name, instructions, status, time)
VALUES (1, 1, 'lunch', 'not too hot', 'pending', now())
RETURNING *;
