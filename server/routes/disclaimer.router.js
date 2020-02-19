const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route for disclaimer
router.get('/', (req, res) => {
  const sqlQuery = `SELECT * FROM disclaimer;`;
  pool.query(sqlQuery)
  .then(results=>{
    res.send(results.rows[0]);
  })
  .catch(error=>{
    res.sendStatus(500);
  });
});

module.exports = router;
