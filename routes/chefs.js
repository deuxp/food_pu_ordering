
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM items`;
    console.log('this is the chefs page');
    db.query(query)
      .then(data => {
        const items = data.rows;
        // console.log(items)
        res.render("chefs");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  // // POST: order number
  router.post('/pending', (req, res) => {

    const order = req.body.id

    let query = `SELECT orders.id, items.name, modification, qty
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN items ON item_id = items.id
    where orders.id = $1;`

    db.query(query, [order])
    .then(data => {
        return res.send(data.rows)
      })
    // res.send(order)
    // res.redirect('/', templateVars);
  });


  router.post('/time', (res, req) => {

    const time = req.body.time
    console.log(time)
  })



  // ready button endpoint
  router.get('/ping', (req, res) => {
    // this is test data, but wht it should do is set the status to paid, or closed
    db.query('select * from items;')
    .then(items => {

      return res.send(items.rows)
    })
  })

  return router;
};

// for order in orders
