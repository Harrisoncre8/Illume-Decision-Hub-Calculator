const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// GET user information by user id
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let userID = req.params.id
  const sqlQuery = `SELECT "user_id", "name", "business_name", "industry_id", "industry"."industry", "users"."email", "phone_number" 
                    FROM "contact_info"
                    JOIN "users" ON "contact_info"."user_id" = "users"."id"
                    JOIN "industry" ON "contact_info"."industry_id" = "industry"."id"
                    WHERE "user_id" = ${userID};`;
  pool.query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch( error => {
      console.log('Error with GET user info', error);
      res.sendStatus(500);
    });
});

// PUT route to edit user information, handles two different tables in DB
router.put('/info', rejectUnauthenticated, async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const company = req.body.company;
  const phone = req.body.phone;
  const email = req.body.email;
  const industry = req.body.industryID;
  const sqlQueryContactInfo = `UPDATE "contact_info"
                               SET "name" = $2, "business_name" = $3, 
                               "industry_id" = $4, "phone_number" = $5
                               WHERE "user_id" = $1;`;
  const sqlQueryUsers = `UPDATE "users" SET "email" = $2 WHERE "id" = $1;`;
  const connection = await pool.connect();
  try{
    await connection.query(`BEGIN`);
    await connection.query(sqlQueryContactInfo, [id, name, company, industry, phone]);
    await connection.query(sqlQueryUsers, [id, email]);
    await connection.query(`COMMIT`);
    res.sendStatus(200);
  } catch (error){
    console.log('Error in put route for user info', error);
    await connection.query(`ROLLBACK`);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted.
router.post('/register', async (req, res, next) => {  
  const name = req.body.name;
  const company = req.body.company;
  const phone = req.body.phone;
  const industry = req.body.industry;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const connection = await pool.connect();

  const queryTextUser = `INSERT INTO "users" (email, hashedpassword) 
                          VALUES ($1, $2) RETURNING id`;
  const queryTextContact = `INSERT INTO "contact_info" (name, business_name, industry_id, phone_number, user_id)
                            VALUES ($1, $2, $3, $4, $5)`
  try {
    await connection.query(`BEGIN`);
    const id = await connection.query(queryTextUser, [email, password]);
    await connection.query(queryTextContact, [name, company, industry, phone, id.rows[0].id]);
    await connection.query(`COMMIT`);
    res.sendStatus(201);
  }catch(error){
    console.log('----------->error in registration:', error);
    await connection.query(`ROLLBACK`);
    res.sendStatus(500);
  }finally{
    connection.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('MAKE IT????--------');
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
