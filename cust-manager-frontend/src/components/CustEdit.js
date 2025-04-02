// CustEdit
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CustEdit = ({ updateCust }) => {
  const { id } = useParams(); // URLから顧客idを取得
  const [cust, setCust] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
  });
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  const API_BASE_URL = "http://localhost:3001/api/custs";

  // コンポーネントがマウントされたときに顧客情報の詳細を取得するためのuseEffectフック
  useEffect(() => {
    const getCust = async () => {
      try {
        // APIから顧客情報詳細を取得
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log(response.data);
        // 取得したデータで状態を更新
        setCust(response.data);
      } catch (err) {
        console.error(
          "顧客情報取得時のエラー:",
          err.response ? err.response.data : err.message
        );
      }
    };

    getCust();
  }, [id]); // idが変更されたときに再実行

  const handleSave = async (e) => {
    const { title, description, deadline, status } = cust;
    if (!title || !description || !deadline || !status) {
      alert("顧客情報タイトルと顧客情報の説明を入力してください");
      return;
    }
    try {
      // APIを使用して顧客情報を更新
      await axios.put(`${API_BASE_URL}/${id}`, {
        title,
        description,
        deadline,
        status,
      });
      alert("顧客情報が更新されました");
      navigate(`/custs/${id}`); // 顧客情報詳細ページへ遷移
    } catch (error) {
      console.error("顧客情報更新時のエラー:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/custs/${id}`);
  };

  const statusOptions = ["未完了", "完了"]; // ステータス選択肢の配列

  return (
    <div>
      <h2>顧客情報編集</h2>
      <div className="textBox">
        顧客情報タイトル
        <br />
        <input
          type="text"
          value={Cust.title}
          onChange={(e) => setCust(e.target.value)}
        />
        <br />
        顧客情報内容
        <br />
        <textarea
          value={Cust.description}
          onChange={(e) => setCust(e.target.value)}
          rows="2"
        />
        <br />
        <div className="inputRow">
          <div className="inputGroup">
            <label>期限</label>
            <input
              type="date"
              id="dateInput"
              value={Cust.deadline}
              onChange={(e) => setCust(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>ステータス</label>
            <select
              value={Cust.status}
              onChange={(e) => setCust(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={handleSave}>保存</button>
          <button onClick={handleCancel}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default CustEdit;
