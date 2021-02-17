const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/hello', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/', db.getTodos)
app.get('/done',db.getDone)
app.get('/notdone',db.getNotDone)
app.post('/', db.createTodo)
app.put('/:id', db.updateTodo)
app.delete('/:id', db.deleteTodo)


app.listen(PORT);
console.log("Running on http://localhost:" + PORT);
