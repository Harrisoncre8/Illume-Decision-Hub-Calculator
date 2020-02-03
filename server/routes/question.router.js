const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for questions
router.get('/', async (req, res) => {
  console.log('In getQuestion route with');
  const sqlQuery = `
      SELECT * FROM question_calculator qc
      JOIN "questions" q ON "qc"."question_id" = "q"."id"
      LEFT JOIN "sub_questions" s ON "qc"."id" = "s"."question_id"
      WHERE "qc"."id" = $1;
    `;
  const client = await pool.connect();
  try {
    if(req.query.start){
      const startId = await client.query(`SELECT "start_id" FROM "calculators" WHERE "id" = $1;`, [req.query.start]);
      const results = await client.query(sqlQuery,[startId]);
      res.send(results.rows);
    } else {
      const results = await client.query(sqlQuery,[req.querry.id]);
      res.send(results.rows);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
