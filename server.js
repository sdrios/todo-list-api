var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let counter = 1;

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get("/api/todos", function(request, response, next){

response.json(todoList);
});

// GET /api/todos/:id
app.get("/api/todos/:id", function(request, response, next){

    let todoItem = todoList.find(function(element){
        return element.id.toString() === request.params.id;
    });

    console.log(todoItem);
    response.json(todoItem);
});

//POST /api/todos
app.post("/api/todos/", function(request, response, next){
    counter++;
    let todoItem = request.body;

todoItem = { id: counter, ...todoItem }; // note we are using the spread operator (...)

todoList.push(todoItem);
response.json(todoItem);
});

//PUT /api/todos/:id
app.put("api/todos/:id", function (request, response, next) {
  let todoItem = todoList.find(function (element) {
    return element.id.toString() === request.params.id;
  });

  //   let newPropertyEntries = Object.entries(request.body)[0]; // just the first key/value pair
  //   todoItem[newPropertyEntries[0]] = newPropertyEntries[1];

  if (typeof todoItem == 'undefined') {
    response.json('To do item is undefined');
  }
  
  var newTodoData = request.body;
  var newTodoKeys = Object.keys(newTodoData); // ["todo", "todo2"]

  newTodoKeys.forEach(function (key) {
    todoItem[key] = newTodoData[key];
  });

  response.json(todoItem);
});

//DELETE /api/todos/:id
app.delete("/api/todos/:id", function (request, response, next) {
  let indexToRemove = todoList.findIndex(function (todoItem) {
    return todoItem.id.toString() === request.params.id;
  });

  if (indexToRemove >= 0) {
    todoList.splice(indexToRemove, 1);
  }

  response.sendStatus(200);
});

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})