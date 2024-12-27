// taskService.js
import Axios from "axios";

const getAllTasks = () => {
  return Axios.get("http://localhost:3001/api/get/tasks"); // APIエンドポイントからすべてタスクを取得
};

const getTask = (id) => {
  return Axios.get(`http://localhost:3001/api/tasks/${id}`); // 指定したidのタスクを取得
};

const addTask = (title, description, deadline, status) => {
  return Axios.post("http://localhost:3001/api/tasks", {
    title,
    description,
    deadline,
    status,
  }); // タスクを追加するためのPOSTリクエスト
};

const updateTask = (id, title, description, deadline, status) => {
  return Axios.put(`http://localhost:3001/api/tasks/${id}`, {
    title,
    description,
    deadline,
    status,
  }); // 指定したidのタスクを更新するためのPUTリクエスト
};

const deleteTask = (id) => {
  return Axios.delete(`http://localhost:3001/api/tasks/${id}`); // 指定したidのタスクを削除するためのDELETEリクエスト
};

//  taskServiceオブジェクトを作成し、すべての関数をプロパティとして追加
const taskService = { getAllTasks, getTask, addTask, updateTask, deleteTask };

export default taskService;
