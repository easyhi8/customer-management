import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import custService from "../services/custService";  // 顧客情報を取得するサービス
import CustList from "../components/CustList";

const CustForm = ({ addCust }) => {
  const [searchTerm, setSearchTerm] = useState('');  // 検索キーワード
  const [custs, setCusts] = useState([]);  // 顧客情報のリスト（最初は空の配列）
  const [filteredCusts, setFilteredCusts] = useState([]);  // 絞り込んだ顧客リスト
  const navigate = useNavigate();  // ページ遷移用フック

  // コンポーネントがマウントされたときに顧客情報を取得する
  useEffect(() => {
    const fetchCusts = async () => {
      try {
        const response = await custService.getAllCusts();  // 顧客情報を取得するAPI呼び出し
        setCusts(response.data);  // 顧客情報を状態に保存
        setFilteredCusts(response.data);  // 絞り込み前の顧客リストをセット
      } catch (error) {
        console.error("顧客データの取得に失敗しました:", error);
      }
    };
  
    fetchCusts();  // 初期データを取得
  }, []);  // 空の依存配列でマウント時のみ実行
  
  // 顧客名で絞り込む関数
  const handleSearchCust = () => {
    const filtered = custs.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())  // 顧客名に検索キーワードが含まれるか
    );
    setFilteredCusts(filtered);  // 絞り込んだ顧客情報を更新
  };

  // 顧客情報追加の関数（単純なページ遷移）
  const handleAddCust = () => {
    // 新規顧客の追加なしで単純に遷移させる
    navigate("/custs/edit/新規顧客ID");  // ここで新規顧客IDに遷移（仮のID）
  };

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");  // ログイン画面に遷移
  };

  return (
    <div>
      <h2>顧客一覧</h2>
      <div className="textBox">
        <div className="search">
          <input
            type="text"
            placeholder="顧客名で検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // 検索キーワード更新
          />
          <br />
          <button onClick={handleSearchCust}>フィルタリング</button>  {/* 絞り込みボタン */}
          <button onClick={handleAddCust}>顧客情報追加</button>
        </div>
        <br />

        {/* filteredCustsをCustListに渡す */}
        <CustList custs={filteredCusts} /> {/* 顧客管理一覧コンポーネントを表示 */}

        <div className="buttonContainer">
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default CustForm;
