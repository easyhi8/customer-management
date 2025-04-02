// custModel.js
const db = require("../config/database");

// 全顧客情報を取得する
const getAllCusts = () => {
  return new Promise((resolve, reject) => {
    const sqlSelect = "SELECT * FROM tasks ORDER BY id";
    db.query(sqlSelect, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 単一の顧客情報を取得する関数
const getCust = (id) => {
  const sqlSelect = "SELECT * FROM Custs WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 顧客情報を追加する
const addCust = (cust) => {
  const { title, description, deadline, status } = cust;
  return new Promise((resolve, reject) => {
    const sqlInsert =
      "INSERT INTO Custs (title, description, deadline, status) VALUES (?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [title, description, deadline, status],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId); // 新しく追加された顧客情報のIDを返す
      }
    );
  });
};

// 顧客情報を更新する
const updateCust = (id, cust) => {
  const { title, description, deadline, status } = cust;
  return new Promise((resolve, reject) => {
    const sqlUpdate =
      "UPDATE Custs SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?";
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

// 顧客情報を削除する
const deleteCust = (id) => {
  return new Promise((resolve, reject) => {
    const sqlDelete = "DELETE FROM custs WHERE id = ?";
    db.query(sqlDelete, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows); // 削除された行数を返す
    });
  });
};

module.exports = {
  getAllCusts,
  getCust,
  addCust,
  updateCust,
  deleteCust,
};
