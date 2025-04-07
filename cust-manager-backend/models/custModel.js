// custModel.js
const db = require("../config/database");

// 全顧客情報を取得する
const getAllCusts = () => {
  return new Promise((resolve, reject) => {
    const sqlSelect = "SELECT * FROM custs ORDER BY id";
    db.query(sqlSelect, (err, results) => {
      if (err) {
        console.error("SQLエラー:", err.message, err.stack);  // スタックトレースも表示
        return reject(err);
      }
      resolve(results);
    });
  });
};



// 単一の顧客情報を取得する関数
const getCust = (id) => {
  const sqlSelect = "SELECT * FROM custs WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, [id], (err, result) => {
      if (err) return reject(err);
      if (result.length === 0) return reject("顧客情報が見つかりません");
      resolve(result[0]);  // 結果が見つかった場合は最初の要素を返す
    });
  });
};


// 顧客情報を追加する
const addCust = (cust) => {
  const { name, email, phone, company } = cust;
  return new Promise((resolve, reject) => {
    const sqlInsert =
      "INSERT INTO custs (name, email, phone, company) VALUES (?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [name, email, phone, company],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId); // 新しく追加された顧客情報のIDを返す
      }
    );
  });
};

// 顧客情報を更新する
const updateCust = (id, cust) => {
  const { name, email, phone, company } = cust;
  return new Promise((resolve, reject) => {
    const sqlUpdate =
      "UPDATE custs SET name = ?, email = ?, phone = ?, company = ? WHERE id = ?";
    db.query(
      sqlUpdate,
      [name, email, phone, company, id],
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
