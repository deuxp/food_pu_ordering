
const { query } = require('express');
const express = require('express');
const { ConnectionPolicyPage } = require('twilio/lib/rest/voice/v1/connectionPolicy');
const { validateExpressRequest } = require('twilio/lib/webhooks/webhooks');
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




  // Create the Order
  router.post('/orders', (req,res) => {

    const { user_id } = req.session; // user_id === customer name
    const { restaurant_id } =  req.body;
    const { tip } =  req.body;
    const { order } =  req.body; // [{}] // --> req.body.order[n].mID === item_id
    let phone;
    // req.session.order = '[]'
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
        let orderMSG = `Hello Chef, ${user_id} has just placed their order.\n\norderID: ${id}\n- - - - - - -`

        // loop to append order items to the text
        order.forEach(item => {
          orderMSG += `\n- ${item.quantity} x ${item.name} ... ${item.instructions || ''}`
        })

        // console.log('\t', orderMSG)
        const confirmationMSG = `Hello ${user_id}, your order has been placed`

        // SMS the order to the restaurant // test one at a time sinc it is the same phone#
        sendSMS(orderMSG, restaurant)
        console.log('\t should be null: ', req.session.order)
        // sendSMS(confirmationMSG, phone)
        // res.redirect('/api/items/empty-cart')
        return res.redirect('/api/items/empty-cart')
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
  router.get("/cookie-data", (req, res) => {
    // req.session.order = 'JSON goes here'
    // console.log('\t', req.session.user_id)
    // console.log('\t', req.session)

    // return the data
    // console.log('\tit passed through')
    // console.log(req.session.order || [])
    if (!req.session.order) {
      req.session.order = '[]'
    }
    console.log('\t the session is', req.session.order)
    return res.send(req.session.order); // as a JSON string
  })



  router.post('/order-cart', (req, res) => {
    // recieve cart items
    const { cartItems } = req.body;
    // make a JSON string
    const stringy = JSON.stringify(cartItems)
    // update the session.order
    req.session.order = stringy;

    return res.send(stringy);
  })

  // pass through -- pass off
  // this removes an item from the cart and then returns the updated data
  // do all of the JSONing here.
  router.post('/remove-item', (req, res) => {
        // recieve cart items
        const { cartItems } = req.body;
        // make a JSON string
        const stringy = JSON.stringify(cartItems);
        // update the session.order
        req.session.order = stringy;
        console.log('\tstringy remove: ', stringy)
        // return the obj not the string
        return res.send(cartItems);
  })

  router.get('/empty-cart', (req, res) => {
    console.log('\n\tthe cart has been emptied\n')
    req.session.order = null;
    return res.redirect('/api/items')
  })

  return router;
};
