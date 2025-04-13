import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDashboard() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userId) return navigate('/login');

    axios.post('http://localhost:8000/api/user-portfolio/', { userid: userId })
      .then(res => setPortfolio(res.data.results || []));

    axios.post('http://localhost:8000/api/user-transactions/', { userid: userId })
      .then(res => setTransactions(res.data.results || []));

  }, [userId, navigate]);

  return (
    <div className="container mt-4">
      <h3>{username}'s Dashboard</h3>
      
      <h5 className="mt-4">📁 Your Portfolio</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            {portfolio.length > 0 && Object.keys(portfolio[0]).map(k => <th key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {portfolio.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h5 className="mt-4">💸 Your Transactions</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            {transactions.length > 0 && Object.keys(transactions[0]).map(k => <th key={k}>{k}</th>)}
          </tr>
        </thead>
        <tbody>
          {transactions.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
