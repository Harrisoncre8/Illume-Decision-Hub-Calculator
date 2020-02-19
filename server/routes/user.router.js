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
  let userID = [req.params.id]
  const sqlQuery = `SELECT "user_id", "name", "business_name", "industry_id", "industry"."industry", "industry"."service", "industry"."enabled", "users"."email", "phone_number" 
                    FROM "contact_info"
                    JOIN "users" ON "contact_info"."user_id" = "users"."id"
                    JOIN "industry" ON "contact_info"."industry_id" = "industry"."id"
                    WHERE "user_id" = $1;`;
  pool.query(sqlQuery, userID)
    .then(result => {
      res.send(result.rows);
    })
    .catch( error => {
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
    await connection.query(`ROLLBACK`);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
})

// PUT route to check user password and update it in DB
router.put('/new-password', rejectUnauthenticated, (req, res) => {
  const userID = req.body.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = encryptLib.encryptPassword(req.body.newPassword);
  const storedPassword = req.user.hashedpassword;
  const sqlQuery = `UPDATE "users" SET "hashedpassword" = $2 WHERE "id" = $1;`;
  if(encryptLib.comparePassword(oldPassword, storedPassword)){
    pool.query(sqlQuery, [userID, newPassword]);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
})

// POST route to toggle user calculators
router.post('/calc-info', rejectUnauthenticated, (req, res) => {
  const userID = req.body.userID;
  const calcID = req.body.calcID;
  const sqlQuery = `INSERT INTO "toggle_calculator" ("user_id", "calculator_id") VALUES ($1, $2)`;
  pool.query(sqlQuery, [userID, calcID]).then(result => {
    res.sendStatus(201);
  }) 
  .catch( error => {
    res.sendStatus(500);
  });
});

// GET calculator information by user id
router.get('/calc/:id', rejectUnauthenticated, (req, res) => {
  let userID = req.params.id
  const sqlQuery = `SELECT "calculator_id" FROM "toggle_calculator" WHERE "user_id" = ${userID};`;
  pool.query(sqlQuery)
    .then(result => {
      res.send(result.rows);
    })
    .catch( error => {
      res.sendStatus(500);
    });
});

// DELETE calculator information by user id
router.delete('/delete-calc/:id', rejectUnauthenticated, (req, res) => {
  let userID = req.user.id;
  let calcID = req.params.id;
  const sqlQuery = `DELETE FROM "toggle_calculator" 
                    WHERE "user_id" = ${userID} AND "calculator_id" = ${calcID}`;
  pool.query(sqlQuery)
    .then(result => {
      res.sendStatus(200);
    })
    .catch( error => {
      res.sendStatus(500);
    });
});

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
                          VALUES ($1, $2) RETURNING id;`;
  const queryTextContact = `INSERT INTO "contact_info" (name, business_name, industry_id, phone_number, user_id)
                            VALUES ($1, $2, $3, $4, $5);`;
  try {
    await connection.query(`BEGIN`);
    const id = await connection.query(queryTextUser, [email, password]);
    await connection.query(queryTextContact, [name, company, industry, phone, id.rows[0].id]);
    await connection.query(`COMMIT`);
    res.sendStatus(201);
  }catch(error){
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
  res.sendStatus(200);
});

// Clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// PUT to update user's industry
router.put('/industry', rejectUnauthenticated, (req, res) => {
  const id = [req.body.industry, req.body.id];
  const sqlQuery = `UPDATE contact_info 
                    SET industry_id = $1 
                    WHERE user_id = $2;`;
  pool.query(sqlQuery, id)
  .then(result => {
    res.sendStatus(200);
  })
  .catch( error => {
    res.sendStatus(500);
  });
});

module.exports = router;