// taskModel.js
const db = require("../config/database");

// 全タスクを取得する
const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    const sqlSelect = "SELECT * FROM tasks ORDER BY id";
    db.query(sqlSelect, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 単一のタスクを取得する関数
const getTask = (id) => {
  const sqlSelect = "SELECT * FROM tasks WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// タスクを追加する
const addTask = (task) => {
  const { title, description, deadline, status } = task;
  return new Promise((resolve, reject) => {
    const sqlInsert =
      "INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [title, description, deadline, status],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId); // 新しく追加されたタスクのIDを返す
      }
    );
  });
};

// タスクを更新する
const updateTask = (id, task) => {
  const { title, description, deadline, status } = task;
  return new Promise((resolve, reject) => {
    const sqlUpdate =
      "UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?";
    db.query(
      sqlUpdate,
      [title, description, deadline, status, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows); // 更新された行数を返す
      }
    );
  });
};

// タスクを削除する
const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const sqlDelete = "DELETE FROM tasks WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows); // 削除された行数を返す
    });
  });
};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
