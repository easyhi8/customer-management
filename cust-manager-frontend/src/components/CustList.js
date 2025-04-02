// TaskList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const API_BASE_URL = "http://localhost:3001/api/tasks";

  // コンポーネントがマウントされたときにすべてのタスクを取得するためのuseEffectフック
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        // タスクを取得するAPIリクエスト
        const response = await axios.get(`${API_BASE_URL}`);
        console.log(response.data);
        setTasks(response.data);
      } catch (err) {
        console.error("タスク取得時のエラー:", err);
      }
    };

    getAllTasks();
  }, []); // 空の依存配列で初回マウント時のみ実行

  return (
    <div>
      <h2>タスク一覧表</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-title">
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>{" "}
              {/* タスクタイトルにタスク詳細ページへ遷移するリンクを設定 */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
