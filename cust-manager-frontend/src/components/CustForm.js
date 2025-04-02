// TaskForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../services/taskService";

const TaskForm = ({ addTask }) => {
  const statusOptions = ["未完了", "完了"]; // ステータス選択肢の配列
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: statusOptions[0],
  });
  const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化

  // コンポーネントがマウントされたときに期限を今日の日付に設定するためのuseEffectフック
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // 今日の日付を取得
    setTask((prev) => ({ ...prev, deadline: today })); // 期限を今日の日付に設定
  }, []);

  // フォームの状態をリセットする関数
  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      deadline: new Date().toISOString().split("T")[0],
      status: statusOptions[0],
    });
  };

  const handleAddTask = async () => {
    const { title, description, deadline, status } = task;
    if (!title || !description || !deadline || !status) {
      alert("すべてのフィールドを入力してください");
      return;
    }
    console.log("Sending data:", { title, description, deadline, status });
    try {
      const response = await taskService.addTask(
        title,
        description,
        deadline,
        status
      ); // タスクを追加するためのAPI呼び出し
      console.log(response.data);
      alert("タスクが正常に追加されました");
      resetForm(); // フォームをリセット
    } catch (error) {
      console.error("Error adding task:", error);
      alert("タスクの追加中にエラーが発生しました");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ローカルストレージからトークンを削除
    navigate("/"); // ログイン画面に遷移
  };

  return (
    <div>
      <h2>タスクの新規追加</h2>
      <div className="textBox">
        <input
          type="text"
          placeholder="タスクタイトル"
          value={task.title}
          onChange={(e) => setTask(e.target.value)}
        />
        <br />
        <textarea
          placeholder="タスクの説明"
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
          <button onClick={handleAddTask}>追加</button>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
