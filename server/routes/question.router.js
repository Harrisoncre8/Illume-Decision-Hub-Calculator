const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET route for questions
router.get('/', rejectUnauthenticated, async (req, res) => {
  // The two sub-queries cause the user_id to return null if the user doesn't exist in that row.
  const sqlQuery = `
      SELECT 
        "qc"."id", 
        "qc"."question_id", 
        "qc"."next_id",
        "qc"."calculator_id",
        "q"."question",
        "q"."response_type",
        "q"."help_text",
        "q"."sub_questions",
        "q"."split",
        "q"."question2", 
        "q"."response_type2", 
        "q"."help_text2",
        "q"."header",
        "c"."calculator",
        (SELECT 
          (SELECT 
            "user_id" FROM "user_checks"
            WHERE "user_id" = $2 
            AND "question_id" = (SELECT
              "question_id" FROM "question_calculator" 
              WHERE "id" = $1)) AS "user_id")
      FROM question_calculator qc
      JOIN "questions" q ON "qc"."question_id" = "q"."id"
      JOIN "calculators" c ON "qc"."calculator_id" = "c"."id"
      WHERE "qc"."id" = $1;
    `;
  const client = await pool.connect();
  try {
    if(req.query.start){
      const startId = await client.query(
        `SELECT "start_id" FROM "calculators" WHERE "id" = $1;`, 
        [req.query.start]
      );
      const results = await client.query(sqlQuery,[startId.rows[0].start_id, req.user.id]);
      res.send(results.rows);
    } else {
      let results = await client.query(sqlQuery,[Number(req.query.id), req.user.id]);
      let next_id = results.rows[0].next_id;
      let user_id = results.rows[0].user_id;
      while(user_id === null && next_id != null){
        results = await client.query(sqlQuery,[next_id, req.user.id]);
        next_id = results.rows[0].next_id;
        user_id = results.rows[0].user_id;
      }
      if(user_id === null && next_id === null){
        res.send([{
          calculator: results.rows[0].calculator,
          calculator_id: results.rows[0].calculator_id,
          next_id: null,
          skipToResults: true
        }]);
      } else {
        res.send(results.rows);
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.get('/all/', (req,res)=>{
  pool.query(`SELECT * FROM "questions" ORDER BY "id";`).then(results=>{
    res.send(results.rows);
  }).catch(err=>{
    console.log(err);
    res.send(500);
  })
})

// GET questions for results page
router.get('/results/:id', (req,res)=>{
  pool.query(`
      SELECT 
        "qc"."id", 
        "qc"."question_id", 
        "qc"."next_id",
        "qc"."calculator_id",
        "q"."question",
        "q"."response_type",
        "q"."help_text",
        "q"."sub_questions",
        "q"."split",
        "c"."calculator",
        "s"."split_text",
        "q"."question2", 
        "q"."response_type2", 
        "q"."help_text2",
        "q"."header",
        "s"."next_id" as "split_next_id"
      FROM question_calculator qc
      JOIN "questions" q ON "qc"."question_id" = "q"."id"
      JOIN "calculators" c ON "qc"."calculator_id" = "c"."id"
      LEFT JOIN "split" s ON "qc"."question_id" = "s"."question_id" AND "qc"."calculator_id" = "s"."calculator_id"
      WHERE "qc"."calculator_id" = $1
      ORDER BY "qc"."id";
    `,
    [req.params.id])
  .then(results=>{
    res.send(results.rows);
  })
  .catch(err=>{
    res.sendStatus(500);
    console.log(err);
  });
});

// GET splits for results page
router.get('/splits/:id', (req,res)=>{
  pool.query(`SELECT * FROM "split" WHERE "calculator_id" = $1`,[req.params.id])
  .then(results=>{
    res.send(results.rows);
  })
  .catch(err=>{
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;
