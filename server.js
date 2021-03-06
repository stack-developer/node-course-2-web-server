const express = require('express');

const hbs = require('hbs');
var app = express();

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', hbs);

hbs.registerHelper('getCurrenttYear', ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('streamit', (text)=>{
  return text.toUpperCase();
})

app.use(express.static(__dirname +'/public'));

app.use((req, res, next)=>{

var now = new Date().toString();
var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs')
// });

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomMessage:"Welcome to my website"
  });
});

app.get('/project', (req, res)=>{
  res.render('project.hbs',{
    pageTitle:"Project"
  })
})

app.get('/about', (req, res) =>{
  res.render('about.hbs',{
    pageTitle : "About Page"
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:"unable to connect api server"
  });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
