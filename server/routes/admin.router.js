const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for admin question editing
router.get('/questions/:id', (req, res) => {
  let id = [req.params.id];
  let sqlQuery = `SELECT q.id, q.question, q.help_text, q.sub_questions
                  FROM calculators c
                  JOIN question_calculator qc ON qc.calculator_id = c.id
                  JOIN questions q ON q.id = qc.question_id
                  WHERE c.id = $1 AND q.sub_questions IS NULL;`;
  pool.query(sqlQuery, id)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    console.log('Error with GET admin questions', error);
    res.sendStatus(500);
  });
});

// GET route for admin sub-question editing
router.get('/subquestions/:id', (req, res) => {
  let id = [req.params.id];
  let sqlQuery = `SELECT DISTINCT q.id, q.question, q.help_text, q.sub_questions
                  FROM calculators c
                  JOIN question_calculator qc ON qc.calculator_id = c.id
                  JOIN questions q ON q.id = qc.question_id
                  WHERE q.sub_questions = $1;`;
  pool.query(sqlQuery, id)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    console.log('Error with GET admin sub-questions', error);
    res.sendStatus(500);
  });
});

// GET route for admin user information
router.get('/user-info', (req, res) => {
  const sqlQuery = `SELECT c.user_id as id, c.name, c.business_name as company, c.phone_number as phone, u.email, i.industry, i.id as industryID
                    FROM contact_info c
                    JOIN users u ON u.id = c.user_id
                    JOIN industry i ON i.id = c.industry_id
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

// POST route for admin to add new industry information
router.post('/industry-info', (req, res) => {
  const id = [req.body.industry, req.body.margin];
  const sqlQuery = `INSERT INTO industry (industry, margin)
                    VALUES ($1, $2);`;
  pool.query(sqlQuery, id)
    .then(result => {
    res.sendStatus(201);
  })
  .catch( error => {
    console.log('Error with POST admin industry info', error);
    res.sendStatus(500);
  });
});

// PUT route for admin to update industry information
router.put('/industry-info', (req, res) => {
  const id = [req.body.id, req.body.industry, req.body.margin];
  const sqlQuery = `UPDATE industry 
                    SET industry = $2, margin = $3
                    WHERE id = $1;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    console.log('Error with PUT admin industry info', error);
    res.sendStatus(500);
  });
});

// PUT route for admin to update calculator questions
router.put('/question', (req, res) => {
  const id = [req.body[0], req.body[1], req.body[2]];
  const sqlQuery = `UPDATE questions 
                    SET question = $2, help_text = $3
                    WHERE id = $1;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    console.log('Error with PUT admin industry info', error);
    res.sendStatus(500);
  });
});

// PUT route for admin to update user information
router.put('/user-info', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const company = req.body.company;
  const phone = req.body.phone;
  const industry = req.body.industryid;
  const email = req.body.email;
  const password = req.body.password;
  const sqlQueryContactInfo = ` UPDATE contact_info
                                SET name = $1, business_name = $2, phone_number = $3, industry_id = $4
                                WHERE user_id = $5;`;
  let sqlQueryUsers = ``;
  const connection = await pool.connect();


  password ? sqlQueryUsers = `UPDATE users SET email = $1, hashedpassword = $2;` : sqlQueryUsers = `UPDATE users SET email = $1;`
  
  try {
    await connection.query(`BEGIN`);
    await connection.query(sqlQueryContactInfo, [name, company, phone, industry, id]);
    password ? await connection.query(sqlQueryUsers, [email, password]) : await connection.query(sqlQueryUsers, [email]);
    await connection.query(`COMMIT`);
    res.sendStatus(200);
  } catch(error) {
    console.log('Error with PUT admin edit user info', error);
    await connection.query(`ROLLBACK`);
    res.sendStatus(500);
  }
  finally {
    connection.release();
  }
});

module.exports = router;
