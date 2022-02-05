
const express = require('express');
const { send } = require('express/lib/response');
const router  = express.Router();
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhone = process.env.PHONE_RECIEVE;
const twilio = process.env.PHONE_TWILIO;
const client = require('twilio')(accountSid, authToken);


module.exports = (db) => {

    /////////////////////
    // helper function //
    /////////////////////

  /** -=-=---=-----=-- -- - =  -= -=-=---=-----=-- -- - =  -=
   * Purpose: to dry up the SMS messaging to a function.
   * Behaviour: router callback variables must be named (req, res),
   *            else the function throws an error.
   * Author: Gottfried Kleinberger
   * @param {''} message Sent over SMS
   */
   const sendSMS = message => {
    client.messages
    .create({
      body: message,
      from: twilio,
      to: myPhone
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  };


  ////////////////////////////
  // GET: render chefs page //
  ////////////////////////////


  // may have to get session id from req header to pass to the nav
  router.get("/", (req, res) => {
    let query = `SELECT id FROM orders WHERE status = 'pending';`;
    db.query(query)
      .then(data => {
        const orderList = []
        data.rows.forEach(item => {
          orderList.push(item.id)
        });
        const templateVars = {orderList: orderList};
        console.log(templateVars)
        res
          .render("chefs", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });


  ////////////////////////
  // POST: order number //
  ////////////////////////

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
  });


  /////////////////////////////////////
  // POST: send SMS - time-remaining //
  /////////////////////////////////////

  router.post('/time', (req, res) => {
    const time = req.body.time;
    const message = `Your amazing meal will be ready for pickup in approx. ${time} minutes.`;
    sendSMS(message);
  })


  //////////////////////////
  // POST: SMS send ready //
  //////////////////////////

  router.post('/ping', (req, res) => {
    const message = 'Your delicious order is ready for pick up. See you soon!';
    sendSMS(message);
  })

  return router;
};

