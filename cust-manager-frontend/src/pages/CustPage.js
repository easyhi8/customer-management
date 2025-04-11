// CustPage.js
import React from "react";
import CustForm from "../components/CustForm";
import custService from "../services/custService";

function CustPage() {
  const addCust = async (name, email) => {
    try {
      await custService.addCust(name, email); // 顧客管理追加のサービスメソッドを呼び出す
      alert("顧客管理が正常に追加されました");
    } catch (err) {
      console.error("顧客管理追加時のエラー:", err);
      alert("顧客管理の追加に失敗しました");
    }
  };

  return (
    <div className="CustPage">
      <CustForm addCust={addCust} />{" "}
      {/* 顧客管理追加フォームを表示。addCust関数をpropとして渡す */}
    </div>
  );
}

export default CustPage;
