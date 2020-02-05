const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for questions
router.get('/', async (req, res) => {
  const sqlQuery = `SELECT * FROM "split" WHERE "question_id" = $1 AND "calculator_id" = $2;`;
  pool.query(sqlQuery, [req.query.question_id, req.query.calculator_id])
  .then(results=>{
    res.send(results.rows);
  })
  .catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;
