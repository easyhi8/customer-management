// CustForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import custService from "../services/custService";

const CustForm = ({ addCust }) => {
  const statusOptions = ["未完了", "完了"]; // ステータス選択肢の配列
  const [cust, setCust] = useState({
    title: "",
    description: "",
    deadline: "",
    status: statusOptions[0],
  });
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  // コンポーネントがマウントされたときに期限を今日の日付に設定するためのuseEffectフック
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // 今日の日付を取得
    setCust((prev) => ({ ...prev, deadline: today })); // 期限を今日の日付に設定
  }, []);

  // フォームの状態をリセットする関数
  const resetForm = () => {
    setCust({
      title: "",
      description: "",
      deadline: new Date().toISOString().split("T")[0],
      status: statusOptions[0],
    });
  };

  const handleAddCust = async () => {
    const { title, description, deadline, status } = cust;
    if (!title || !description || !deadline || !status) {
      alert("すべてのフィールドを入力してください");
      return;
    }
    console.log("Sending data:", { title, description, deadline, status });
    try {
      const response = await custService.addCust(
        title,
        description,
        deadline,
        status
      ); // 顧客情報を追加するためのAPI呼び出し
      console.log(response.data);
      alert("顧客情報が正常に追加されました");
      resetForm(); // フォームをリセット
    } catch (error) {
      console.error("Error adding Cust:", error);
      alert("顧客情報の追加中にエラーが発生しました");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ローカルストレージからトークンを削除
    navigate("/"); // ログイン画面に遷移
  };

  return (
    <div>
      {/* <h2>顧客情報の新規追加</h2> */}
      <div className="textBox">
        <div className="search">
          <input
            type="text"
            placeholder="顧客名で検索"
            value={cust.title}
            onChange={(e) => setCust(e.target.value)}
          />
          <br />
          <button onClick={handleAddCust}>フィルタリング</button>
          <button onClick={handleAddCust}>顧客情報追加</button>
        </div>
        {/* <textarea
          placeholder="顧客情報の説明"
          value={cust.description}
          onChange={(e) => setCust(e.target.value)}
          rows="2"
        /> */}
        <br />
        {/* <div className="inputRow">
          <div className="inputGroup">
            <label>期限</label>
            <input
              type="date"
              id="dateInput"
              value={cust.deadline}
              onChange={(e) => setCust(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>ステータス</label>
            <select
              value={cust.status}
              onChange={(e) => setCust(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        <div className="buttonContainer">
          {/* <button onClick={handleAddCust}>追加</button> */}
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default CustForm;
