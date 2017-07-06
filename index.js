const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server log...', err);
    }
  });
  next();
});
// app.use((req, res)=>{
//   res.render('maintenance', {
//     pageTitle: 'Maintenance'
//   });
// });

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (str)=>{
  return str.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>');
  res.render('home', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to the HOME page.'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects', {
    pageTitle: 'Projects',
    message: 'Some projects I have created'
  });
});

app.get('/about', (req, res)=>{
  res.render('about', {
    pageTitle: 'About'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Bad request'
  });
});

app.get('/help', (req, res)=>{
  res.render('help.html');
});


app.listen(port, ()=>{
  console.log(`Server started on port http://localhost:${port}`);
});
