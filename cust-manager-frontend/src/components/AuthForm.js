// AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  // ユーザー名とパスワードの状態を管理するためのuseStateフック
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // ページ遷移に使うuseNavigateフックを初期化
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3001/api";

  // ユーザー登録とログインを行う共通関数
  const handleAuth = async (isRegister) => {
    // isRegister引数を使って登録とログインのどちらの処理かを判断
    if (!userName || !password) {
      alert("ユーザー名とパスワードを入力してください");
      return;
    }

    try {
      const endpoint = isRegister ? "register" : "login"; // 変数を用いて、登録かログインかに応じたAPIエンドポイントを簡素化
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, {
        userName,
        password,
      });
      alert(isRegister ? "登録が成功しました" : "ログインに成功しました"); // メッセージも共通化

      // 取得したトークンをローカルストレージに保存
      const token = response.data.token;
      localStorage.setItem("token", token);
      // 顧客情報管理ページへ遷移
      navigate("/custs");

      // 入力フィールドをリセット
      setUserName("");
      setPassword("");
    } catch (error) {
      alert(isRegister ? "登録が失敗しました" : "ログインに失敗しました");
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h2>ログイン</h2>
      <div className="textBox">
        <input
          type="text"
          placeholder="ユーザー名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="buttonContainer">
          <button onClick={() => handleAuth(true)}>登録</button>
          <button onClick={() => handleAuth(false)}>ログイン</button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
