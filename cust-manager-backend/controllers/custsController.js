// custsController.js
const custModel = require("../models/custModel");

// エラーハンドリング関数
const handleError = (res, error, message) => {
  console.error("データベースエラー:", error);
  res.status(500).send(message);
};

// 全顧客情報を取得する
const getAllCusts = async (req, res) => {
  try {
    const custs = await custModel.getAllCusts();
    res.json(custs);
  } catch (error) {
    handleError(res, error, "データベースから顧客情報を取得中にエラーが発生しました");
  }
};

// 単一の顧客情報を取得する
const getCust = async (req, res) => {
  const custId = req.params.id; // URLパラメータからIDを取得
  try {
    const cust = await custModel.getCust(custId);
    if (!cust) return res.status(404).send("顧客情報が見つかりません");
    res.json(cust);
  } catch (error) {
    handleError(res, error, "データベースから顧客情報を取得中にエラーが発生しました");
  }
};

// 新しい顧客情報を追加する
const addCust = async (req, res) => {
  const { title, description, deadline, status } = req.body; // リクエストボディからデータを取得
  try {
    const custId = await custModel.addCust({ title, description, deadline, status });
    res.status(201).send(`顧客情報が正常に追加されました: ${custId}`);
  } catch (error) {
    handleError(res, error, "顧客情報の追加に失敗しました");
  }
};

// 顧客情報を更新する
const updateCust = async (req, res) => {
  const custId = req.params.id; // URLパラメータからIDを取得
  const { title, description, deadline, status } = req.body;
  try {
    const affectedRows = await custModel.updatecust(custId, { title, description, deadline, status });
    if (affectedRows === 0) return res.status(404).send("顧客情報が見つかりません");
    res.send({ custId, title, description, deadline, status });
  } catch (error) {
    handleError(res, error, "顧客情報の更新に失敗しました");
  }
};

//  顧客情報を削除する
const deleteCust = async (req, res) => {
  const custId = req.params.id; // URLパラメータからIDを取得
  try {
    const affectedRows = await custModel.deleteCust(custId);
    if (affectedRows === 0) return res.status(404).send("顧客情報が見つかりません");
    res.send({ message: "顧客情報が正常に削除されました" });
  } catch (error) {
    handleError(res, error, "顧客情報の削除に失敗しました");
  }
};

module.exports = { getAllCusts, getCust, addCust, updateCust, deleteCust };
