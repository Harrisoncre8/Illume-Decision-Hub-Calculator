const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for admin user information
router.get('/user-info', (req, res) => {
  let sqlQuery = `SELECT c.user_id as id, c.business_name as company, c.phone_number as phone, c.name, u.email
                  FROM contact_info c
                  JOIN users u ON u.id = c.user_id
                  ORDER BY c.business_name;`;
  pool.query(sqlQuery)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    console.log('Error with GET admin user info', error);
    res.sendStatus(500);
  });
});

module.exports = router;
