# プロジェクト名: タスク管理システム

## 概要

このプロジェクトは、ユーザー登録とログイン、タスク管理ができる簡単な**タスク管理システム**です。フロントエンドはReact、バックエンドはNode.jsとExpress、データベースはMySQLを使用しています。

### 主な機能
1. **ユーザー登録機能**  
   フォームに名前とパスワードを入力し、サーバー側にPOSTリクエストを送信して新しいユーザーをデータベースに追加します。登録後タスク管理ページへ遷移します。
   
2. **ユーザーログイン機能**  
   登録されたユーザーの名前とパスワードでログインが可能です。登録後タスク管理ページへ遷移します。

3. **タスク管理機能**  
   追加されたタスクの管理が可能です。タスク一覧から各タスクの詳細ページが確認できます。編集ページではタスクの編集や削除が可能です。

---

## ディレクトリ構造

- **`task-manager-frontend/`**  
  フロントエンドのディレクトリ

  - **`public/`**
    - `index.html` : ReactアプリケーションのエントリーポイントとなるHTMLファイル。index.js で作成されたReactコンポーネントが、このHTML内の div タグにマウントされます。
  - **`src/`**
    - **`components/`**
      - `AuthForm.js` : ユーザーのログインや新規登録を行うためのフォームコンポーネント。axiosInstance.js を使用して認証関連のAPI（/login や /register）と連携します。
      - `TaskForm.js` : 新しいタスクを作成するためのフォームコンポーネント。ユーザーが入力したタスクデータをバックエンドに送信し、タスクを追加します。また、タスクの編集にも使用されます。
      - `TaskEdit.js` : タスクの編集ページ。
      - `TaskDetail.js` : 個々のタスクの詳細を表示するコンポーネント。特定のタスクの情報を表示できます。削除操作も可能です。
      - `TaskList.js` : タスクの一覧を表示するコンポーネント。taskService.js を使ってAPIからタスクデータを取得し、リスト形式で表示します。
    - **`pages/`**
      - `TaskPage.js` : タスク管理ページ。タスクの一覧、タスクの追加・編集、タスクの詳細などを表示するために、TaskList.js や TaskForm.js などのコンポーネントを組み合わせて使用します。
    - **`services/`**
      - `taskService.js` : タスク関連のAPI通信を行うサービス。GET /tasks、POST /tasks などのAPIリクエストを行い、TaskList.js や TaskForm.js から呼び出されます。
    - `App.js` : Reactアプリのメインコンポーネント。ルーティングを定義し、各ページの表示を管理します。react-router-dom を使って異なるURLに対してページを切り替えます。
    - `App.css` : アプリのスタイル
    - `index.js` : Reactアプリケーションのエントリーポイント。ReactDOM.render() を使って、App.js をHTML内の指定された場所に描画します。
  
- **`task-manager-backend/`**  
  バックエンドのディレクトリ

  - **`controllers/`**
    - `authController.js` : ユーザーのデータ操作に関するロジックをまとめたファイル
    - `taskController.js` : タスクに関するAPIのビジネスロジックを実装するコントローラ。GET /tasks でタスク一覧を取得したり、POST /tasks で新しいタスクを作成するなどの操作を行います。
  - **`config/`**
    - `database.js` : MySQLデータベースへの接続情報を設定するファイル。ホスト名、ユーザー名、パスワード、データベース名などが設定されます。
  - **`models/`**
    - `taskModel.js` : タスクに関するデータベース操作を定義するモデル。getAllTasks、addTask、updateTask、deleteTask など、MySQLデータベースでのCRUD操作を実装します。
    - `userModel.js` : ユーザーに関するデータベース操作を定義するモデル。ユーザー情報の取得や作成を行い、認証処理のために使用されます。
  - **`routes/`**
    - `auth.js` : 認証関連のAPIルートを定義するファイル。authController.js のメソッド（login や register）を呼び出し、ユーザーのログインや登録を処理します。
    - `task.js` : タスク関連のAPIルートを定義するファイル。tasksController.js の各メソッド（例えば getAllTasks や createTask）を呼び出し、/tasks というエンドポイントでタスク操作を処理します。
  - `app.js` : サーバーのメインファイル。APIルートの設定やサーバー起動を行う。
  - `server.js` : Expressサーバーを起動するエントリーポイント。app.js をインポートし、サーバーを起動してリクエストを待ち受けます。

---

## 立ち上げ方法

このプロジェクトはフロントエンド（React）とバックエンド（Node.js）で構成されており、2つの環境でアプリケーションを起動する必要があります。

### 1. **MySQLの設定**
1. MySQLにログインし、次のコマンドでデータベースとテーブルを作成します。

   ```sql
   CREATE DATABASE task-manager;
   
   USE task-manager;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(45) NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(45) NOT NULL,
       description VARCHAR(100) NOT NULL
       deadline VARCHAR(20) NOT NULL
       status VARCHAR(20) NOT NULL
   );

### 2. **バックエンドセットアップ**

`task-manager-backend/`ディレクトリに移動します。

cd task-manager-backend
必要な依存関係をインストールします。

npm install
サーバーを起動します。

npm start
サーバーはポート3001で動作します。

### 3. **フロントエンドセットアップ**
別のターミナルを開き、`task-manager-frontend/`ディレクトリに移動します。

cd task-manager-frontend
必要な依存関係をインストールします。

npm install
フロントエンドを起動します。

npm start
クライアントはデフォルトでhttp://localhost:3000で起動します。
# customer-management
