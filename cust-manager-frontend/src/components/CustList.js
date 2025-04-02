// CustList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustList = () => {
  const [custs, setCusts] = useState([]);

  const API_BASE_URL = "http://localhost:3001/api/custs";

  // コンポーネントがマウントされたときにすべての顧客情報を取得するためのuseEffectフック
  useEffect(() => {
    const getAllCusts = async () => {
      try {
        // 顧客情報を取得するAPIリクエスト
        const response = await axios.get(`${API_BASE_URL}`);
        console.log(response.data);
        setCusts(response.data);
      } catch (err) {
        console.error("顧客情報取得時のエラー:", err);
      }
    };

    getAllCusts();
  }, []); // 空の依存配列で初回マウント時のみ実行

  return (
    <div>
      <h2>顧客情報一覧表</h2>
      <ul>
        {custs.map((cust) => (
          <li key={cust.id}>
            <div className="cust-title">
              <Link to={`/custs/${Cust.id}`}>{cust.title}</Link>{" "}
              {/* 顧客情報タイトルに顧客情報詳細ページへ遷移するリンクを設定 */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustList;
