const express = require("express");

const PORT = process.env.PORT || 3000;
const app = express();

// app.get("/", function (req, res) {
//   res.send("Hello world\n");
// });

// app.listen(PORT);

const bodyParser = require('body-parser');
//const postparser = require('./middleware/postParser');
const Todo = require('./todo');

app.use(bodyParser.json());

app.get('/', function(request, response){
  Todo.all((err, todos) => response.status(200).json(todos));
});

app.post('/', (request, response) => {
    console.log(request.body);
    var newTodo = request.body;
    Todo.add(newTodo);
    response.status(201).json();
});

app.put('/:id', (request, response) => {
  console.log(request.body); 
  var id = parseInt(request.params.id);
  var updatedTodo = request.body;
  updatedTodo.id = id;
  Todo.update(updatedTodo, (err, data) => {
    if(err)
    {
      response.status(404, 'The task is not found').send();
    } else {
    response.status(204).send(data);
  }
});
});

app.delete('/:id', (request, response) => {
  var id = parseInt(request.params.id);
  Todo.delete(id, (err) => {
    if(err){
      response.status(404).send();
    }else{
          response.status(200).send();
    }
  });
});

app.listen(PORT);
console.log("Running on http://localhost:" + PORT);
