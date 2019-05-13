var express = require('express');
var bodyParser = require('body-parser');
var users = require('./users')
var app = express();

var curr_id=-1;
var login = false;
var log_user = null;
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){
  res.render('home');
});

app.get('/register', function(req, res){
  res.render('register');
});
app.post('/register',urlencodedParser, function(req,res){
  console.log(req.body)
  users.register(req.body);
  res.render("success_register", {name:req.body.name})
});


app.get('/login', function(req, res){
  if(login)
  {
    res.redirect('/todos');
    return ;
  }
  res.render('login');
});

app.get('/dashboard', function(req, res){
  if(login)
  {
    res.render('dashboard', {name: log_user.name});
  }
  else {
    res.redirect('/login')
  }
})

app.post('/login',urlencodedParser, function(req, res){
  log_user = users.login(req.body);
  if(log_user.status)
  {
    login = true;
    console.log("Succesful Login")
    curr_id = log_user.id;
    console.log(curr_id)
    log_user = log_user.user;
    res.render('dashboard', {name: log_user.name});
  }
  else {
    res.render('login_failed');
  }
});

app.get('/logout', function(req, res){
  if(login)
  {
      login = false;
      log_user = null;
      curr_id = -1;
      users.logout();
      console.log(log_user)
  }
    res.redirect('/login');
})

app.get('/todos', function(req, res){
  if(login)
  {
    todos = users.display(curr_id);
    res.render('todos', {todos:todos});
  }
  else {
    res.redirect('/login');
  }
})

app.post('/todos',urlencodedParser, function(req, res){
  if(login){
    console.log(req.body);
    todo = req.body.todo;
    var done = users.add_todos(curr_id, todo);
    if(done)
      res.redirect('/todos');
  }
  else {
    res.redirect('/login')
  }
});

app.listen(port, function(){
  console.log("Server started at "+port);
});
