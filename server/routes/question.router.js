const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for questions
router.get('/', async (req, res) => {
  const sqlQuery = `
      SELECT 
        "qc"."id", 
        "qc"."question_id", 
        "qc"."next_id",
        "q"."question",
        "q"."response_type",
        "q"."help_text",
        "q"."sub_questions",
        "q"."split",
        "c"."calculator"
      FROM question_calculator qc
      JOIN "questions" q ON "qc"."question_id" = "q"."id"
      JOIN "calculators" c ON "qc"."calculator_id" = "c"."id"
      WHERE "qc"."id" = $1;
    `;
  const client = await pool.connect();
  try {
    if(req.query.start){
      const startId = await client.query(`SELECT "start_id" FROM "calculators" WHERE "id" = $1;`, [req.query.start]);
      const results = await client.query(sqlQuery,[startId.rows[0].start_id]);
      res.send(results.rows);
    } else {
      const results = await client.query(sqlQuery,[req.query.id]);
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
