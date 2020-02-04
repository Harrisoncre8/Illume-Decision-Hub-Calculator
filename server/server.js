const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const passport = require('./strategies/user.strategy');


// Route includes
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const industryRouter = require('./routes/industry.router');
const questionRouter = require('./routes/question.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use(`/api/user`, userRouter);
app.use(`/api/admin`, adminRouter);
app.use(`/api/industry`, industryRouter);
app.use(`/api/question`, questionRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
