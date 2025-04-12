import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QueryDashboard from '../components/QueryDashboard';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h3>Welcome to your Dashboard</h3>
      <QueryDashboard />
    </div>
  );
}

export default Dashboard;
