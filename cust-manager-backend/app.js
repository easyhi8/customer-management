// app.js
const express = require("express");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

// JSON形式のリクエストボディを解析するためのミドルウェアを追加
app.use(express.json());
// CORSを有効にするためのミドルウェアを追加
app.use(cors());

// タスク関連のAPIルートを使用
app.use("/api", taskRoutes);
// 認証関連のAPIルートを使用
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
