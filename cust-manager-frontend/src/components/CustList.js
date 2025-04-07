import React from "react";
import { Link } from "react-router-dom";

const CustList = ({ custs }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>顧客名</th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>会社名</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          {custs.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.name}</td> {/* 顧客名 */}
              <td>{cust.email}</td> {/* メールアドレス */}
              <td>{cust.phone}</td> {/* 電話番号 */}
              <td>{cust.company}</td> {/* 会社名 */}
              <td>
                <Link to={`/custs/${cust.id}`}>詳細を見る</Link> {/* 顧客詳細ページへのリンク */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustList;
