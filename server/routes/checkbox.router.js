const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET a users checkboxes
router.get('/user/', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM "user_checks" WHERE "user_id" = $1;`, [req.user.id]).then( results=>{
    res.send(results.rows);
  }).catch(err=>{
    res.send(500);
  })
})

// POST route for user checkboxes
router.post('/', rejectUnauthenticated, async (req, res) => {
  const client = await pool.connect();
  try {
    client.query('BEGIN')
    await client.query(`DELETE FROM "user_checks" WHERE "user_id" = $1;`, [req.user.id])
    const payload = Object.entries(req.body).reduce((acum, arr) => {
      if (arr[1]) {
        acum.push({ user_id: req.user.id, question_id: arr[0] });
      }
      return acum
    }, [])
    await client.query(`
      INSERT INTO "user_checks" (
        SELECT
          (data->>'user_id')::int, (data->>'question_id')::int
        FROM (
          SELECT json_array_elements($1::json) AS data
        ) tmp
      );
    `, [JSON.stringify(payload)])
    await client.query('COMMIT');
    res.sendStatus(201)
  } catch (error) {
    await client.query('ROLLBACK');
    res.sendStatus(500)
  } finally {
    client.release();
  };
});

module.exports = router;
