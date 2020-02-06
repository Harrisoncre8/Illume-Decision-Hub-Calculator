const rejectNonAdmin = async (req, res, next) =>{
    // check if admin status is true for user
    const admin = await pool.query(`SELECT "admin" FROM "users" WHERE "id" = $1;`, [req.session.passport.user]);
    if(admin.rows[0].admin){
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  module.exports = { rejectNonAdmin };
  