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
