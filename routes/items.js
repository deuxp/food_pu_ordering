
const { query } = require('express');
const express = require('express');
const { ConnectionPolicyPage } = require('twilio/lib/rest/voice/v1/connectionPolicy');
const router  = express.Router();

require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = process.env.PHONE_TWILIO;
const restaurant = process.env.PHONE_RESTAURANT;
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
   * @param {''} phone send to this number world-format: ie., +1416555000
   */
   const sendSMS = (message, phone) => {
    client.messages
    .create({
      body: message,
      from: twilio,
      to: phone
    })
    .then(message => console.log(message.sid))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  };


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


  /** TODO:
   * - [X] whats the data look like?
   *
   * - [X] unpack seesion id
   *  - [X init order in db using INSERT .. using the sesssion where name is "" ID
   *  - [X] return order ID
   *
   * .then()
   * - [X] unpack the req.body --> it is { order }
   *  - [X] write the insert query for one item to the order_items table -> make sure that you include the order number
   *    - [X] loop through with this query to insert
   *      - [X] then sendSMS() <-- refer to the router endpoint defined below
   *        - [X] error handle
   * new router send-order-SMS
   * - [X] import the sms func to the page.. if it is not there. maybe refactor so we are using the same one.. import the necessary numbers from the dotenv
   *  - [X] text the restaurant: order id, name of the
   *    - [X] text the customer order-confirmed
   *        - [X] error handle
   */



  // Create the Order
  router.post('/orders', (req,res) => {

    const { user_id } = req.session; // user_id === customer name
    const { restaurant_id } =  req.body;
    const { tip } =  req.body;
    const { order } =  req.body; // [{}] // --> req.body.order[n].mID === item_id
    let phone;
    // init order query
    const queryInitOrder = `
    INSERT INTO orders (restaurant_id, customer_id, time, tip)
    VALUES ($1, $2, now(), $3)
    RETURNING id;
    `;

    // query and return the customer id from the session name -- this is for the next query to insert the customer in the order number
    const queryCustomerID = `
    SELECT id, phone FROM users
    WHERE name = $1
    `;

    const queryAddToCart = `
    INSERT INTO order_items (order_id, item_id, modification, qty)
    VALUES ($1, $2, $3, $4)
    `;

    db.query(queryCustomerID, [user_id])
      .then(user => {
        phone = user.rows[0].phone;
        return user.rows[0].id;
      })
      .then(customer => {
        // init the order
        // return the new order id
        return db.query(queryInitOrder, [restaurant_id, customer, tip])
      })
      // works up to HERE
      .then(orderID => {
        const { id } = orderID.rows[0] // id of current order created
        // loop through with the insert query
        order.forEach(item => {
          db.query(queryAddToCart, [id, item.mID, item.instructions, item.quantity])
        });
        return id
      })
      .then(id => {
        // user_id is the customer name
        const orderMSG = `Hello Chef, ${user_id} has just placed their order.
        orderID: ${id}`

        const confirmationMSG = `Hello ${user_id}, your order has been placed`

        // SMS the order to the restaurant // test one at a time sinc it is the same phone#
        sendSMS(orderMSG, restaurant)
        // sendSMS(confirmationMSG, phone)

      })
      .catch(err => {
        console.log(err.message)
        res
          .status(501)
          .json({ error: err.message })
      })
  });


 // +++_+_+_+_+_-=_+_+-+_+_==_++++_+_+_+_+_-=_+_+-+_+_==_++++_+_+_+_+_-=_+_+-+_+_==_++++_+_+_+_+_-=_+_+-+_+_==_+

  // if this works, the terminaotr part will be JSON string and parse, then modify then stringify
  router.post("/cookie-data", (req, res) => {
    // req.session.order = 'JSON goes here'
    // console.log('\t', req.session.user_id)
    // console.log('\t', req.session)
  })




  return router;
};
