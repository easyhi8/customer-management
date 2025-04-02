// server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const custRoutes = require("./routes/cust");

// アプリケーションにJSONボディパーサーを追加
app.use(bodyParser.json());
// apiパスにタスク関連のルートを使用
app.use("/api", custRoutes);

// 環境変数からポート番号を取得。指定がなければ3001を使用
const PORT = process.env.PORT || 3001;

// 指定したポートでサーバーをリッスンし、起動メッセージをコンソールに表示
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
