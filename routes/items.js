
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then(data => {
        const items = data.rows;
        const { user_id } = req.session
        const templateVars = {
          items: items,
          user_id
        }
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
  // once order is created and ID of order is returned,
  // INSERT rows on order_items table based on data held by cartItems
  // then send text to restaurant
  // some indicator of success should be sent to client page?
  // it may be better to split into two functions/endpoints for handling DB queries???
  router.post('/orders', (req,res) => {

    res.json(req.body);

  });


  return router;
};
