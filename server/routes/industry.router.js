const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for industry information
router.get('/', (req, res) => {
  let sqlQuery = `SELECT * FROM industry
                  WHERE enabled = true
                  ORDER BY industry;`;
  pool.query(sqlQuery)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    console.log('Error with GET industry', error);
    res.sendStatus(500);
  });
});

module.exports = router;
