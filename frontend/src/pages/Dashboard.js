import React from 'react';
import { useNavigate } from 'react-router-dom';
import QueryDashboard from '../components/QueryDashboard';

function Dashboard() {

  return (
    <div className="container mt-4">
      <h3>Welcome to your Dashboard</h3>
      <QueryDashboard />
    </div>
  );
}

export default Dashboard;
