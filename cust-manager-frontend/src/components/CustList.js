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
      <table>
        <thead>
          <tr>
            <th>顧客名</th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>会社名</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {custs.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.name}</td> {/* 顧客名 */}
              <td>{cust.email}</td> {/* メールアドレス */}
              <td>{cust.phone}</td> {/* 電話番号 */}
              <td>{cust.company}</td> {/* 会社名 */}
              <td>
                <Link to={`/custs/${cust.id}`}>詳細を見る</Link> {/* 顧客詳細ページへのリンク */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustList;
