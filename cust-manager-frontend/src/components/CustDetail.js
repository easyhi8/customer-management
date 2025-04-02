// TaskDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import taskService from "../services/taskService";

const TaskDetail = () => {
  const { id } = useParams(); // URLからタスクのidを取得
  const [task, setTask] = useState({});
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  const API_BASE_URL = "http://localhost:3001/api/tasks";

  // コンポーネントがマウントされたときにタスクを取得するためのuseEffectフック
  useEffect(() => {
    const getTask = async () => {
      try {
        // APIからタスク詳細を取得
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log(response.data);

        // ここで最初の要素を取り出す
        setTask(response.data[0]); // 配列の最初の要素を設定
      } catch (err) {
        console.error(
          "タスク取得時のエラー:",
          err.response ? err.response.data : err.message
        );
      }
    };
    getTask();
  }, [id]); // idが変更されたときに再実行

  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`); // タスク編集ページへ遷移
  };
  const handleBack = () => {
    navigate(`/tasks`); // タスク一覧ページへ遷移
  };

  const handleDelete = () => {
    //  確認ダイアログを表示
    if (window.confirm("このタスクを削除してもよろしいですか？")) {
      taskService
        .deleteTask(task.id) // タスク削除サービスを呼び出す
        .then((response) => {
          console.log(response.data);
          alert("タスクが正常に削除されました");
          navigate(`/tasks`); // タスク一覧ページへ遷移
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          alert("タスクの削除中にエラーが発生しました");
        });
    } else {
      alert("タスクの削除がキャンセルされました");
    }
  };

  // 期限をyyyy/mm/dd形式に変換する関数
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <div>
      <h2>タスク詳細</h2>
      <div className="textBox">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>期限：{formatDate(task.deadline)}</span>　
        <span>ステータス：{task.status}</span>
        <div className="buttonContainer">
          <button onClick={handleEdit}>編集</button>
          <button onClick={handleBack}>戻る</button>
          <button style={{ marginLeft: "auto" }} onClick={handleDelete}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
