// cust.js
const express = require("express");
const router = express.Router();
const custsController = require("../controllers/custsController");

// すべての顧客情報を取得するためのGETリクエストのルートを定義
router.get("/custs", custsController.getAllCusts);

// 特定の顧客情報をIDで取得するためのGETリクエストのルートを定義
router.get("/custs/:id", custsController.getCust);

// 新しい顧客情報を追加するためのPOSTリクエストのルートを定義
router.post("/custs", custsController.addCust);

// 特定の顧客情報をIDで更新するためのPUTリクエストのルートを定義
router.put("/custs/:id", custsController.updateCust);

// 特定の顧客情報をIDで削除するためのDELETEリクエストのルートを定義
router.delete("/custs/:id", custsController.deleteCust);

module.exports = router;
