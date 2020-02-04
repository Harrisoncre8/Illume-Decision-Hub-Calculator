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

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {  
  console.log('req body is:', req.body);
  const name = req.body.name;
  const company = req.body.company;
  const phone = req.body.phone;
  const industry = req.body.industry;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const connection = await pool.connect();

  const queryTextUser = `INSERT INTO "users" (email, hashedpassword) 
                          VALUES ($1, $2) RETURNING id`;
  const queryTextContact = `INSERT INTO "contact_info" (business_name, industry_id, phone_number, user_id)
                            VALUES ($1, $2, $3, $4)`
  try {
    await connection.query(`BEGIN`);
    const id = await connection.query(queryTextUser, [email, password]);
    await connection.query(queryTextContact, [company, phone, industry, id.rows[0].id]);
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
