const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  const sql = 'CREATE TABLE IF NOT EXISTS todos (id integer primary key, title, body, isComplete)';
  db.run(sql);
  db.run('INSERT INTO todos(title,body,isComplete) VALUES(?,?,?)', 'errand', 'buy the milk', false);
  db.run('INSERT INTO todos(title,body,isComplete) VALUES(?,?,?)', 'errand','rent a car',false);
  db.run('INSERT INTO todos(title,body,isComplete) VALUES(?,?,?)', 'errand','feed the cat',false);
});

class Todo {
  constructor(id, title, body, isComplete){
    this.id = id;
    this.title = title;
    this.body = body;
    this.isComplete = isComplete; 
  }

  
  static all(callback){
    db.all('SELECT * FROM todos', callback); 
    
  };

  static done(callback){
    db.all('SELECT id, title, body FROM todos WHERE isComplete=1',callback); 
  }

  static notdone(callback){
    db.all('SELECT id, title, body FROM todos WHERE isComplete=0',callback); 

  }

  static add(todo){
    const sql = 'INSERT INTO todos(title,body,isComplete) VALUES(?,?,?)';
    db.run(sql, todo.title,todo.body,false);
  };

  static update(todo, callback){
    console.log(todo);
    const sql = 'UPDATE todos SET isComplete = ? WHERE id = ?';
    db.run(sql, todo.isComplete, todo.id, callback);
  };

  static delete(id, callback){
    const sql = 'DELETE FROM todos where id = ?';
    db.run(sql, id, callback);
  };
}

module.exports = Todo;
