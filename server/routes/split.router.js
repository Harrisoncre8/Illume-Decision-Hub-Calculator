const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for questions
router.get('/:id', async (req, res) => {
  console.log('In getSplit route with');
  const sqlQuery = `SELECT * FROM "split" WHERE "question_id" = $1;`;
  pool.query(sqlQuery, [req.params.id]).then(results=>{
    console.log(results.rows);
    res.send(results.rows);
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  })
});

module.exports = router;
