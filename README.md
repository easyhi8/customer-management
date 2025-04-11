# プロジェクト名: 顧客管理システム

## 概要

このプロジェクトは、ユーザー登録とログイン、顧客管理ができる簡単な**顧客管理システム**です。フロントエンドはReact、バックエンドはNode.jsとExpress、データベースはMySQLを使用しています。

### 主な機能
1. **ユーザー登録機能**  
   フォームに名前とパスワードを入力し、サーバー側にPOSTリクエストを送信して新しいユーザーをデータベースに追加します。登録後顧客管理ページへ遷移します。
   
2. **ユーザーログイン機能**  
   登録されたユーザーの名前とパスワードでログインが可能です。登録後顧客管理ページへ遷移します。

3. **顧客管理機能**  
   追加された顧客情報の管理が可能です。顧客一覧から各顧客の詳細ページが確認できます。編集ページでは顧客の編集や削除が可能です。

---

## ディレクトリ構造

- **`Cust-manager-frontend/`**  
  フロントエンドのディレクトリ

  - **`public/`**
    - `index.html` : ReactアプリケーションのエントリーポイントとなるHTMLファイル。index.js で作成されたReactコンポーネントが、このHTML内の div タグにマウントされます。
  - **`src/`**
    - **`components/`**
      - `AuthForm.js` : ユーザーのログインや新規登録を行うためのフォームコンポーネント。axiosInstance.js を使用して認証関連のAPI（/login や /register）と連携します。
      - `CustForm.js` : 新しい顧客を作成するためのフォームコンポーネント。ユーザーが入力した顧客データをバックエンドに送信し、顧客を追加します。また、顧客の編集にも使用されます。
      - `CustEdit.js` : 顧客の編集ページ。
      - `CustDetail.js` : 個々の顧客の詳細を表示するコンポーネント。特定の顧客の情報を表示できます。削除操作も可能です。
      - `CustList.js` : 顧客の一覧を表示するコンポーネント。custService.js を使ってAPIから顧客データを取得し、リスト形式で表示します。
    - **`pages/`**
      - `CustPage.js` : 顧客管理ページ。顧客の一覧、顧客の追加・編集、顧客の詳細などを表示するために、CustList.js や CustForm.js などのコンポーネントを組み合わせて使用します。
    - **`services/`**
      - `CustService.js` : 顧客関連のAPI通信を行うサービス。GET /custs、POST /custs などのAPIリクエストを行い、CustList.js や CustForm.js から呼び出されます。
    - `App.js` : Reactアプリのメインコンポーネント。ルーティングを定義し、各ページの表示を管理します。react-router-dom を使って異なるURLに対してページを切り替えます。
    - `App.css` : アプリのスタイル
    - `index.js` : Reactアプリケーションのエントリーポイント。ReactDOM.render() を使って、App.js をHTML内の指定された場所に描画します。
  
- **`Cust-manager-backend/`**  
  バックエンドのディレクトリ

  - **`controllers/`**
    - `authController.js` : ユーザーのデータ操作に関するロジックをまとめたファイル
    - `CustController.js` : 顧客に関するAPIのビジネスロジックを実装するコントローラ。GET /custs で顧客一覧を取得したり、POST /custs で新しい顧客を作成するなどの操作を行います。
  - **`config/`**
    - `database.js` : MySQLデータベースへの接続情報を設定するファイル。ホスト名、ユーザー名、パスワード、データベース名などが設定されます。
  - **`models/`**
    - `CustModel.js` : 顧客に関するデータベース操作を定義するモデル。getAllCusts、addCust、updateCust、deleteCust など、MySQLデータベースでのCRUD操作を実装します。
    - `userModel.js` : ユーザーに関するデータベース操作を定義するモデル。ユーザー情報の取得や作成を行い、認証処理のために使用されます。
  - **`routes/`**
    - `auth.js` : 認証関連のAPIルートを定義するファイル。authController.js のメソッド（login や register）を呼び出し、ユーザーのログインや登録を処理します。
    - `Cust.js` : 顧客関連のAPIルートを定義するファイル。CustsController.js の各メソッド（例えば getAllCusts や createCust）を呼び出し、/Custs というエンドポイントで顧客操作を処理します。
  - `app.js` : サーバーのメインファイル。APIルートの設定やサーバー起動を行う。
  - `server.js` : Expressサーバーを起動するエントリーポイント。app.js をインポートし、サーバーを起動してリクエストを待ち受けます。

---

## 立ち上げ方法

このプロジェクトはフロントエンド（React）とバックエンド（Node.js）で構成されており、2つの環境でアプリケーションを起動する必要があります。

### 1. **MySQLの設定**
1. MySQLにログインし、次のコマンドでデータベースとテーブルを作成します。

   ```sql
   CREATE DATABASE cust-manager;
   
   USE cust-manager;
   
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(45) NOT NULL,
       password VARCHAR(255) NOT NULL
   );
   CREATE TABLE custs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(45) NOT NULL,
       description VARCHAR(100) NOT NULL
       deadline VARCHAR(20) NOT NULL
       status VARCHAR(20) NOT NULL
   );

### 2. **バックエンドセットアップ**

`cust-manager-backend/`ディレクトリに移動します。

cd cust-manager-backend
必要な依存関係をインストールします。

npm install
サーバーを起動します。

npm start
サーバーはポート3001で動作します。

### 3. **フロントエンドセットアップ**
別のターミナルを開き、`cust-manager-frontend/`ディレクトリに移動します。

cd cust-manager-frontend
必要な依存関係をインストールします。

npm install
フロントエンドを起動します。

npm start
クライアントはデフォルトでhttp://localhost:3000で起動します。
# customer-management
