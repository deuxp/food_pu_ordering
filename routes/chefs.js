
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM items`;
    console.log('this is the chefs page');
    db.query(query)
      .then(data => {
        const items = data.rows;
        console.log(items)
        res.render("chefs");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  // POST: order number
  router.post('/pending', (req, res) => {

    const order = req.body.order

    let query = `SELECT orders.id, items.name, modification, price
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN items ON item_id = items.id
    where orders.id = $1;`

    db.query(query, [order])
      .then(data => res.send(data.rows))

    // res.send(order)
    // res.redirect('/', templateVars);
  });



  return router;
};

// for order in orders
