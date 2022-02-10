/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
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


  // login route
  router.post('/login', (req, res) => {
    const { username } = req.body
    res.redirect(`/api/users/${username}`);
  })


  // set session-cookie
  router.get('/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/api/items')
  });

  // logout
  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/')
  })

  return router;
};
