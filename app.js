const express = require('express');
const cors = require('cors');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const seenRoute = require('./routes/seenRoute');
const passport = require('./utils/passport');
const app = express();
const port = 3000;

// Log middleware
app.use((req, res, next) => {
    console.log(new Date() + ': ' + req.method + ' ' + req.path);
    next();
});

app.use(express.static('ui'));
app.use(express.static('img'));
//Add cors headers
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/post', passport.authenticate('jwt', {session: false}), postRoute);
app.use('/seen', passport.authenticate('jwt', {session: false}), seenRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);


app.listen(port, () => console.log(`Website listening on port ${port}`));