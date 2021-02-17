const Pool = require('pg').Pool
const pool = new Pool({
  user: 'distri_instance',
  host: 'distributed-computing.cmdld0ejdsom.us-east-2.rds.amazonaws.com',
  database: 'distributed-computing',
  password: 'distributed-computing',
  port: 5432,
})


const getTodos = (request, response) => {
  pool.query('SELECT * FROM tasks ORDER BY ID', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getDone = (request, response) => {
  pool.query('SELECT * FROM tasks WHERE isCompleted = true ORDER BY ID', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getNotDone = (request, response) => {
  pool.query('SELECT * FROM tasks WHERE isCompleted = false ORDER BY ID', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const createTodo = (request, response) => {
    const { title, body } = request.body
  
    pool.query('INSERT INTO tasks (title, body, isCompleted) VALUES ($1, $2, $3)', [title, body, false], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`task added`)
    })
  }

const updateTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    'UPDATE tasks SET isCompleted = $1 WHERE id = $2',
    [true, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Todo modified with ID: ${id}`)
    }
  )
}

const deleteTodo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Todo deleted with ID: ${id}`)
  })
}

module.exports = {
  getTodos,
  getDone,
  getNotDone,
  createTodo,
  updateTodo,
  deleteTodo,
}
