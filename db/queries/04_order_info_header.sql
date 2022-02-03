-- THE ORDER -- TOTAL -- FOR CHECKOUT AND CHEF order dtails ONLY.
-- orders.id = variable $1 the order variable in question
SELECT orders.id, time, users.name as customer, status, sum(price) as total
from order_items
JOIN orders ON orders.id = order_id
JOIN items ON item_id = items.id
JOIN users ON orders.customer_id = users.id
WHERE orders.id = 1
GROUP BY orders.id, users.name;
