import React, { useState } from 'react';
import axios from 'axios';

function QueryDashboard() {
  const [userId, setUserId] = useState('');
  const [results, setResults] = useState([]);
  const [queryInfo, setQueryInfo] = useState('');

  const runQuery = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/user-portfolio/', { userid: userId });
    setQueryInfo(res.data.query_info);
    setResults(res.data.results);
  };

  return (
    <div className="container mt-4">
      <h3>Query: User Portfolio</h3>
      <form onSubmit={runQuery}>
        <input className="form-control mb-2" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Enter User ID" />
        <button className="btn btn-primary">Run</button>
      </form>

      {queryInfo && <h5 className="mt-4">{queryInfo}</h5>}
      {results.length > 0 && (
        <table className="table table-striped mt-2">
          <thead>
            <tr>{Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QueryDashboard;
