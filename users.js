//var data =  require('app.js')
var users = [ {id:0, name:"Jon Snow", username:"jon@snow", password:"jon@snow", todos:["kill danerys","kill drogon"]},
              {id:1,name:"Arya Stark", username:"arya@stark", password:"arya@stark", todos:["kill cersie","kill joffery"]},
              {id:2,name:"Danerys Targarien", username:"dany@targ", password:"dany@targ", todos:["rule seven kingdoms","take revenge"]},
              {id:3,name:"Jamie Lannister", username:"jamie@lanister", password:"jamie@lanister", todos:["protect cersie"]},
];

var Person = {
  init: function(name, username, password){
    this.id = users.length;
    this.name = name;
    this.password=password;
    this.username=username;
    this.todos=[];
    return this;
  }
}

//var user = Person.init(data.name, data.username, data.password);
var user = null;
var userfound = false;

var login = function(user){
  users.forEach(function(item){
    //user_flag += 1;
    if(user.username === item.username)
    {
    //  console.log(user.username)
      if(user.password===item.password){
        //console.log(user.password)
        console.log('User Found')
        user = item
        userfound = true;
      }
    }
  });
  if(userfound)
  {
    userfound=false;
    return {status:true, id:user.id, user:users[user.id]};
  }
  else{
    console.log("User Not Found")
    return {status:false, id:-1, user:null};
  }
}

var register = function(data){
  var user = Person.init(data.name, data.username, data.password);
  users.push(user);
}

var logout = function()
{
  user_flag = -1;
  userfound = false;
}

var display=  function(user_id){
  return users[user_id].todos;
}

var add_todos = function(user_id, todo){
  if(todo!=""){
      users[user_id].todos.push(todo);
      return true;
  }
  else {
    return false;
  }
}

module.exports = {login:login, register: register, logout:logout, display:display, add_todos:add_todos};
