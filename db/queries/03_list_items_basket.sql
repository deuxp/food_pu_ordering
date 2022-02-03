-- TALLY ALL ITEMS - can be used for CHEF, CHECKOUT, ... the order bubble will be a local object
-- get the full order item table for the secure page and the restaurant page
  -- the floating element will be built with JS local variables/object.. that same obj will be used in the final insert query above. .the advantage to this is the customer can change their mind without having to delete from the DB.. and every click adds a duplicate item.
--- --- -- -- - - --- -- - - - - -- - - - --- -- -  -

SELECT order_id, items.name, modification, price
FROM order_items
JOIN orders ON orders.id = order_id
JOIN items ON item_id = items.id;
