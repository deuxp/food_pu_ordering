
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then(data => {
        const items = data.rows;
        const templateVars = {
          items: items
        }
        console.log(templateVars.items[0]);
        //res.json({ users });
        res.render("menu", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // *** needs to be completed ***
  // create order in database using INSERT
  // once order is created and ID of order is returned, create rows on order_items table based on data held by cartItems
  // then send text to restaurant
  // some indicator of success should be sent to client page?
  router.post('/orders', (req,res) => {

    res.json(req.body);

  });


  return router;
};
