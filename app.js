const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookiePraser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware'); 

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookiePraser());  // access a cookie method

// view engine
app.set('view engine', 'ejs');

// database connection
//const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
const dbURI = 'mongodb+srv://netdb:test1234@clusterschool.mxvsbfq.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/', authRoutes);

// # 9 cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('set-cookie', 'newUser=true')   // how to identify the cookie. set a cookie

//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//   res.send('you got the cookies')

// });

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;  // cookies is javascript object, can use dot notation to get different cookies
//   console.log(cookies);
//   console.log(cookies.newUser);

//   res.json(cookies);
// });