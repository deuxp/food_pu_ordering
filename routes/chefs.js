
const express = require('express');
const router  = express.Router();
require('dotenv').config()


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhone = process.env.PHONE_RECIEVE;
const twilio = process.env.PHONE_TWILIO;
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM items`;
    console.log('this is the chefs page');
    db.query(query)
      .then(data => {
        const items = data.rows;
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


  router.post('/time', (req, res) => {
    console.log('is this being reached .. why??')
    console.log(req)
  })



  // ready button endpoint
  // SMS send ready message
  router.post('/ping', (req, res) => {

    // query the order for the chefs
    

    // sends SMS
    client.messages
    .create({
      body: 'ding dong, hello it\'s me again',
      from: twilio,
      to: myPhone
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};

// for order in orders
