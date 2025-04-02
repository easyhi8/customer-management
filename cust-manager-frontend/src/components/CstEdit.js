// TaskEdit
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TaskEdit = ({ updateTask }) => {
  const { id } = useParams(); // URLからタスクidを取得
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
  });
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  const API_BASE_URL = "http://localhost:3001/api/tasks";

  // コンポーネントがマウントされたときにタスクの詳細を取得するためのuseEffectフック
  useEffect(() => {
    const getTask = async () => {
      try {
        // APIからタスク詳細を取得
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        console.log(response.data);
        // 取得したデータで状態を更新
        setTask(response.data);
      } catch (err) {
        console.error(
          "タスク取得時のエラー:",
          err.response ? err.response.data : err.message
        );
      }
    };

    getTask();
  }, [id]); // idが変更されたときに再実行

  const handleSave = async (e) => {
    const { title, description, deadline, status } = task;
    if (!title || !description || !deadline || !status) {
      alert("タスクタイトルとタスクの説明を入力してください");
      return;
    }
    try {
      // APIを使用してタスクを更新
      await axios.put(`${API_BASE_URL}/${id}`, {
        title,
        description,
        deadline,
        status,
      });
      alert("タスクが更新されました");
      navigate(`/tasks/${id}`); // タスク詳細ページへ遷移
    } catch (error) {
      console.error("タスク更新時のエラー:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/tasks/${id}`);
  };

  const statusOptions = ["未完了", "完了"]; // ステータス選択肢の配列

  return (
    <div>
      <h2>タスク編集</h2>
      <div className="textBox">
        タスクタイトル
        <br />
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask(e.target.value)}
        />
        <br />
        タスク内容
        <br />
        <textarea
          value={task.description}
          onChange={(e) => setTask(e.target.value)}
          rows="2"
        />
        <br />
        <div className="inputRow">
          <div className="inputGroup">
            <label>期限</label>
            <input
              type="date"
              id="dateInput"
              value={task.deadline}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>ステータス</label>
            <select
              value={task.status}
              onChange={(e) => setTask(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="buttonContainer">
          <button onClick={handleSave}>保存</button>
          <button onClick={handleCancel}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
