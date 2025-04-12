import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h3>Welcome to the Tradewind Dashboard</h3>
      <p>You are now logged in and can run queries.</p>
      {/* Later: Add query dashboard component here */}
    </div>
  );
}

export default Dashboard;
