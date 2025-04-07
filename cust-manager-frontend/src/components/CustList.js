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
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td>{cust.company}</td>
              <td>
              <Link className = "detail" to={`/custs/${cust.id}`}>
                <button>詳細</button> {/* 詳細ボタン */}
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustList;
