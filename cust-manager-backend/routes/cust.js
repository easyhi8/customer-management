// task.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// すべてのタスクを取得するためのGETリクエストのルートを定義
router.get("/tasks", tasksController.getAllTasks);

// 特定のタスクをIDで取得するためのGETリクエストのルートを定義
router.get("/tasks/:id", tasksController.getTask);

// 新しいタスクを追加するためのPOSTリクエストのルートを定義
router.post("/tasks", tasksController.addTask);

// 特定のタスクをIDで更新するためのPUTリクエストのルートを定義
router.put("/tasks/:id", tasksController.updateTask);

// 特定のタスクをIDで削除するためのDELETEリクエストのルートを定義
router.delete("/tasks/:id", tasksController.deleteTask);

module.exports = router;
