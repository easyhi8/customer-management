// custService.js
import Axios from "axios";

const getAllCusts = () => {
  return Axios.get("http://localhost:3001/api/get/custs"); // APIエンドポイントからすべて顧客情報を取得
};

const getCust = (id) => {
  return Axios.get(`http://localhost:3001/api/custs/${id}`); // 指定したidの顧客情報を取得
};

const addCust = (title, description, deadline, status) => {
  return Axios.post("http://localhost:3001/api/custs", {
    title,
    description,
    deadline,
    status,
  }); // 顧客情報を追加するためのPOSTリクエスト
};

const updateCust = (id, title, description, deadline, status) => {
  return Axios.put(`http://localhost:3001/api/custs/${id}`, {
    title,
    description,
    deadline,
    status,
  }); // 指定したidの顧客情報を更新するためのPUTリクエスト
};

const deleteCust = (id) => {
  return Axios.delete(`http://localhost:3001/api/custs/${id}`); // 指定したidの顧客情報を削除するためのDELETEリクエスト
};

//  custServiceオブジェクトを作成し、すべての関数をプロパティとして追加
const custService = { getAllCusts, getCust, addCust, updateCust, deleteCust };

export default custService;
