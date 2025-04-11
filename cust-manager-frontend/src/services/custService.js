// custService.js
import Axios from "axios";

const getAllCusts = () => {
  return Axios.get("http://localhost:3001/api/custs")
    .catch((error) => {
      console.error("APIエラー:", error.response ? error.response.data : error.message);
      throw error;  // エラーを再スローして、呼び出し元で処理できるようにする
    });
};



const getCust = (id) => {
  return Axios.get(`http://localhost:3001/api/custs/${id}`); // 指定したidの顧客情報を取得
};

const addCust = (name, email, phone, company) => {
  return Axios.post("http://localhost:3001/api/custs", {
    name,
    email,
    phone,
    company,
  }); // 顧客情報を追加するためのPOSTリクエスト
};

const updateCust = (id, name, email, phone, company) => {
  return Axios.put(`http://localhost:3001/api/custs/${id}`, {
    name,
    email,
    phone,
    company,
  }); // 指定したidの顧客情報を更新するためのPUTリクエスト
};

const deleteCust = (id) => {
  return Axios.delete(`http://localhost:3001/api/custs/${id}`); // 指定したidの顧客情報を削除するためのDELETEリクエスト
};

//  custServiceオブジェクトを作成し、すべての関数をプロパティとして追加
const custService = { getAllCusts, getCust, addCust, updateCust, deleteCust };

export default custService;
