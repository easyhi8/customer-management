// tasksController.js
const taskModel = require("../models/taskModel");

// エラーハンドリング関数
const handleError = (res, error, message) => {
  console.error("データベースエラー:", error);
  res.status(500).send(message);
};

// 全タスクを取得する
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    handleError(res, error, "データベースからタスクを取得中にエラーが発生しました");
  }
};

// 単一のタスクを取得する
const getTask = async (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  try {
    const task = await taskModel.getTask(taskId);
    if (!task) return res.status(404).send("タスクが見つかりません");
    res.json(task);
  } catch (error) {
    handleError(res, error, "データベースからタスクを取得中にエラーが発生しました");
  }
};

// 新しいタスクを追加する
const addTask = async (req, res) => {
  const { title, description, deadline, status } = req.body; // リクエストボディからデータを取得
  try {
    const taskId = await taskModel.addTask({ title, description, deadline, status });
    res.status(201).send(`タスクが正常に追加されました: ${taskId}`);
  } catch (error) {
    handleError(res, error, "タスクの追加に失敗しました");
  }
};

// タスクを更新する
const updateTask = async (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  const { title, description, deadline, status } = req.body;
  try {
    const affectedRows = await taskModel.updateTask(taskId, { title, description, deadline, status });
    if (affectedRows === 0) return res.status(404).send("タスクが見つかりません");
    res.send({ taskId, title, description, deadline, status });
  } catch (error) {
    handleError(res, error, "タスクの更新に失敗しました");
  }
};

//  タスクを削除する
const deleteTask = async (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  try {
    const affectedRows = await taskModel.deleteTask(taskId);
    if (affectedRows === 0) return res.status(404).send("タスクが見つかりません");
    res.send({ message: "タスクが正常に削除されました" });
  } catch (error) {
    handleError(res, error, "タスクの削除に失敗しました");
  }
};

module.exports = { getAllTasks, getTask, addTask, updateTask, deleteTask };
