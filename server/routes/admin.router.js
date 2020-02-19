const encryptLib = require('../modules/encryption');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-auth-middleware');

// DELETE route for admin to update industry information
router.delete('/industry-info/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const id = [req.params.id];
  const sqlQuery = `UPDATE industry 
                    SET enabled = NOT enabled
                    WHERE id = $1;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// GET route for industry information
router.get('/industry', rejectUnauthenticated, (req, res) => {
  let sqlQuery = `SELECT * FROM industry 
                  ORDER BY industry;`;
  pool.query(sqlQuery)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// GET route for admin question editing
router.get('/questions/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const id = [req.params.id];
  const sqlQuery = `SELECT q.id, q.header, q.question, q.help_text, q.sub_questions
                    FROM calculators c
                    JOIN question_calculator qc ON qc.calculator_id = c.id
                    JOIN questions q ON q.id = qc.question_id
                    WHERE c.id = $1 AND q.sub_questions IS NULL
                    ORDER BY q.id;`;
  pool.query(sqlQuery, id)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// GET route for admin sub-question editing
router.get('/subquestions', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const sqlQuery = `SELECT DISTINCT q.id, q.header, q.question, q.help_text, q.sub_questions
                    FROM calculators c
                    JOIN question_calculator qc ON qc.calculator_id = c.id
                    JOIN questions q ON q.id = qc.question_id
                    ORDER BY q.id;`;
  pool.query(sqlQuery)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// GET route for admin user information
router.get('/user-info',rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const sqlQuery = `SELECT c.user_id as id, c.name, c.business_name as company, c.phone_number as phone, u.email, u.admin as usertype, i.industry, i.id as industryID
                    FROM contact_info c
                    JOIN users u ON u.id = c.user_id
                    JOIN industry i ON i.id = c.industry_id
                    WHERE super_admin != true
                    ORDER BY c.business_name, c.name, id;`;
  pool.query(sqlQuery)
    .then(result => {
    res.send(result.rows);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// POST route for admin to add new industry information
router.post('/industry-info', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const id = [req.body.newIndustry, req.body.newGrossMargin/100, req.body.newOpMargin/100];
  const sqlQuery = `INSERT INTO industry (industry, gross_margin, op_margin)
                    VALUES ($1, $2, $3);`;
  pool.query(sqlQuery, id)
    .then(result => {
    res.sendStatus(201);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// PUT route for admin to update industry information
router.put('/industry-info', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const id = [req.body.selectedId, req.body.selectedIndustry, req.body.selectedGrossMargin/100, req.body.selectedOpMargin/100];
  const sqlQuery = `UPDATE industry 
                    SET industry = $2, gross_margin = $3, op_margin = $4
                    WHERE id = $1;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// PUT route for admin to update calculator questions
router.put('/question', rejectUnauthenticated, rejectNonAdmin, (req, res) => {
  const id = [req.body[0], req.body[1], req.body[2]];
  const sqlQuery = `UPDATE questions 
                    SET question = $2, help_text = $3
                    WHERE id = $1;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

// PUT route for admin to update user information
router.put('/user-info', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const company = req.body.company;
  const phone = req.body.phone;
  const industry = req.body.industryId;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password); // This only has data, needs salt parameter as well
  const usertype = req.body.usertype;
  const sqlQueryContactInfo = ` UPDATE contact_info
                                SET "name" = $1, "business_name" = $2, phone_number = $3, industry_id = $4
                                WHERE user_id = $5;`;
  let sqlQueryUsers = ``;
  const connection = await pool.connect();

  password ? sqlQueryUsers = `UPDATE users SET email = $1, hashedpassword = $2, admin = $3 WHERE id = $4;` 
            : sqlQueryUsers = `UPDATE users SET email = $1, admin = $3 WHERE id = $2;`
  const params = password ?[email, password, usertype, id] : [email, id, usertype];
  
  try {
    await connection.query(`BEGIN`);
    await connection.query(sqlQueryContactInfo, [name, company, phone, industry, id]);
    await connection.query(sqlQueryUsers, params);
    await connection.query(`COMMIT`);
    res.sendStatus(200);
  } catch(error) {
    await connection.query(`ROLLBACK`);
    res.sendStatus(500);
  }
  finally {
    connection.release();
  }
});

module.exports = router;
