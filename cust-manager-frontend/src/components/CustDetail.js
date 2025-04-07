import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import custService from "../services/custService";

const CustDetail = () => {
  const { id } = useParams(); // URLから顧客情報のidを取得
  const [cust, setCust] = useState(null);
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  const API_BASE_URL = "http://localhost:3001/api/custs";

  // コンポーネントがマウントされたときに顧客情報を取得するためのuseEffectフック
  useEffect(() => {
    const getCust = async () => {
      try {
        // APIから顧客情報詳細を取得
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log(response.data);

        // 取得したデータを設定
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

  const handleEdit = () => {
    navigate(`/custs/edit/${id}`); // 顧客情報編集ページへ遷移
  };

  const handleBack = () => {
    navigate(`/custs`); // 顧客情報一覧ページへ遷移
  };

  const handleDelete = () => {
    //  確認ダイアログを表示
    if (window.confirm("この顧客情報を削除してもよろしいですか？")) {
      custService
        .deleteCust(id) // 顧客情報削除サービスを呼び出す
        .then((response) => {
          console.log(response.data);
          alert("顧客情報が正常に削除されました");
          navigate(`/custs`); // 顧客情報一覧ページへ遷移
        })
        .catch((error) => {
          console.error("Error deleting cust:", error);
          alert("顧客情報の削除中にエラーが発生しました");
        });
    } else {
      alert("顧客情報の削除がキャンセルされました");
    }
  };

  // 顧客情報がまだ読み込まれていない場合のローディング状態を追加
  if (!cust) {
    return <div>ロード中...</div>;
  }

  return (
    <div>
      <h2>顧客情報詳細</h2>
      <div className="textBox">
        <h3>{cust.name}</h3> {/* 顧客名をh3で表示 */}
        <table className = "detailTable">
          <tbody>
            <tr>
              <th>メールアドレス:</th>
              <td>{cust.email}</td>
            </tr>
            <tr>
              <th>電話番号:</th>
              <td>{cust.phone}</td>
            </tr>
            <tr>
              <th>住所:</th>
              <td>{cust.adrress}</td>
            </tr>
            <tr>
              <th>会社名:</th>
              <td>{cust.company}</td>
            </tr>
          </tbody>
        </table>
        <div className="buttonContainer">
          <button onClick={handleEdit}>編集</button>
          <button onClick={handleBack}>戻る</button>
          <button onClick={handleDelete}>削除</button>
        </div>
      </div>
    </div>
  );
};

export default CustDetail;
