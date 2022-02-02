/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// const q = `SELECT * FROM restaurants;`
// const q = `SELECT * FROM users;`
// const q = `select * from items`
// const q = `select * from orders`

// insert items into basket
// const q = `

// INSERT INTO order_items (order_id, item_id, modification)
// VALUES (1, 2, 'not too hot pls');

// INSERT INTO order_items (order_id, item_id, modification)
// VALUES (1, 4, 'extra salty, pls');

// `
// check the new order
// const q = `
// select * from order_items;
// `
// get a tally <-- JS
// const q = `
// SELECT order_id, items.name, modification, price
// FROM order_items
// JOIN orders ON orders.id = order_id
// JOIN items ON item_id = items.id;
// `
// get a tax <-- JS

// get a total < -- JS
const q = `
SELECT sum(price) as total
from order_items
JOIN orders ON orders.id = order_id
JOIN items ON item_id = items.id
WHERE orders.id = 1;
`

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(q)
    // db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
