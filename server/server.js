const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');
const industryRouter = require('./routes/industry.router');
const questionRouter = require('./routes/question.router');
const splitRouter = require('./routes/split.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Passport Session Configuration
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(`/api/user`, userRouter);
app.use(`/api/admin`, adminRouter);
app.use(`/api/industry`, industryRouter);
app.use(`/api/question`, questionRouter);
app.use(`/api/split`, splitRouter);

// Serve static files
app.use(express.static('build'));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: 'build'});
});

// App Set
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
