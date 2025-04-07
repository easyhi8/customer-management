import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CustEdit = () => {
  const navigate = useNavigate();
  const location = useLocation(); // `state` を取得するために useLocation を使用
  const { cust } = location.state || {}; // CustDetailから渡された顧客情報

  const [custData, setCustData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });

  const API_BASE_URL = "http://localhost:3001/api/custs";

  useEffect(() => {
    if (cust) {
      setCustData(cust); // `state` から受け取った顧客データをフォームにセット
    }
  }, [cust]);

  const handleSave = async () => {
    const { name, email, phone, address, company } = custData;
    if (!name || !email || !phone || !address || !company) {
      alert("すべてのフィールドを入力してください");
      return;
    }
    try {
      // APIを使用して顧客情報を更新
      await axios.put(`${API_BASE_URL}/${cust.id}`, {
        name,
        email,
        phone,
        address,
        company,
      });
      alert("顧客情報が更新されました");
      navigate(`/custs/${cust.id}`); // 顧客情報詳細ページへ遷移
    } catch (error) {
      console.error("顧客情報更新時のエラー:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/custs`); // 顧客一覧ページに遷移
  };

  return (
    <div>
      <h2>顧客情報編集</h2>
      <div className="textBox">
        <div className="inputGroup">
          <label>顧客名:</label>
          <input
            type="text"
            value={custData.name}
            onChange={(e) => setCustData({ ...custData, name: e.target.value })}
          />
        </div>
        <div className="inputGroup">
          <label>メールアドレス:</label>
          <input
            type="email"
            value={custData.email}
            onChange={(e) => setCustData({ ...custData, email: e.target.value })}
          />
        </div>
        <div className="inputGroup">
          <label>電話番号:</label>
          <input
            type="text"
            value={custData.phone}
            onChange={(e) => setCustData({ ...custData, phone: e.target.value })}
          />
        </div>
        <div className="inputGroup">
          <label>住所:</label>
          <input
            type="text"
            value={custData.address}
            onChange={(e) => setCustData({ ...custData, address: e.target.value })}
          />
        </div>
        <div className="inputGroup">
          <label>会社名:</label>
          <input
            type="text"
            value={custData.company}
            onChange={(e) => setCustData({ ...custData, company: e.target.value })}
          />
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
