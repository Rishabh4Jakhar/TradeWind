import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QueryDashboard from '../components/QueryDashboard';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);
/*
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', {
        userid: userId,
        password: password
      });
      localStorage.setItem("userId", userId); // simple session
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Login failed");
    }
  };
  */
useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.post(`http://localhost:8000/api/user-name/`, {userid: userId});
            //if (!response.ok) {
            //    throw new Error("Failed to fetch user data");
            //}
            const userData = await response.json();
            console.log("User Data:", userData);
            localStorage.setItem("username", userData.username); // Save username in local storage
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    fetchUserData();
}, []);

  return (
    <div className="container mt-4">
      <h3>Welcome to your Dashboard</h3>
      <QueryDashboard />
    </div>
  );
}

export default Dashboard;
