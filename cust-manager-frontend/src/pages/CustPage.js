// TaskPage.js
import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import taskService from "../services/taskService";

function TaskPage() {
  const addTask = async (title, description) => {
    try {
      await taskService.addTask(title, description); // タスク追加のサービスメソッドを呼び出す
      alert("タスクが正常に追加されました");
    } catch (err) {
      console.error("タスク追加時のエラー:", err);
      alert("タスクの追加に失敗しました");
    }
  };

  return (
    <div className="taskPage">
      <h1>タスク管理ページ</h1>
      <TaskList /> {/* タスク一覧コンポーネントを表示 */}
      <TaskForm addTask={addTask} />{" "}
      {/* タスク追加フォームを表示。addTask関数をpropとして渡す */}
    </div>
  );
}

export default TaskPage;
