-- all back end until the order is revealed then a custom table query is made

-- need to get seperately first, but will hard-code for now:
-- query customer id = 1
-- query restaurant id = 1

-- INIT THE ORDER
--- --- -- -- - - --- -- - - - - -- - - - --- -- -  -

INSERT INTO orders (restaurant_id, customer_id, name, instructions, status)
VALUES (1, 1, 'breakfast', 'not too hot', 'pending');
RETURNING *

-- ADD ITEM TO ORDER
-- basket add items -- at the end of the order, with the populated JS object
--- --- -- -- - - --- -- - - - - -- - - - --- -- -  -

-- needs to have a JS intermediary, like an object and only puts into the DB once the order is finalized
-- so for the following imagine that the order is paid, or sent to resto and the object has inserted all of these as a loop

-- thinking about losing the qty column

-- this needs a get items query for every time an item is put into the basket OR
-- more likely that after the query is done they will be stored in environment variables
  -- this item id is then linked to order_items
    -- for the sake of the insert query I will hard code this data

-- append to the linking table items
 -- order_id is from the returned init insert
-- note: this is repeatable for every event listener, basket add
INSERT INTO order_items (order_id, item_id, modification, qty)
VALUES (1, 2, 'not too hot pls', 3);

INSERT INTO order_items (order_id, item_id, modification, qty)
VALUES (1, 4, 'extra salty, pls', 1);

-- TALLY ALL ITEMS - can be used for CHEF, CHECKOUT, ... the order bubble will be a local object
-- get the full order item table for the secure page and the restaurant page
  -- the floating element will be built with JS local variables/object.. that same obj will be used in the final insert query above. .the advantage to this is the customer can change their mind without having to delete from the DB.. and every click adds a duplicate item.
--- --- -- -- - - --- -- - - - - -- - - - --- -- -  -

SELECT order_id, items.name, modification, price
FROM order_items
JOIN orders ON orders.id = order_id
JOIN items ON item_id = items.id;

-- THE ORDER -- TOTAL -- FOR CHECKOUT AND CHEF order dtails ONLY.
-- orders.id = variable $1 the order variable in question
SELECT orders.id, time, users.name as customer, status, sum(price) as total
from order_items
JOIN orders ON orders.id = order_id
JOIN items ON item_id = items.id
JOIN users ON orders.customer_id = users.id
WHERE orders.id = 1
GROUP BY orders.id, users.name;
