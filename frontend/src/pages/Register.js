import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/register/', {
        userid: userId,
        name: name,
        password: password
      });

      localStorage.setItem("userId", userId);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Register on Tradewind</h3>
      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Confirm Password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required />
        <button className="btn btn-success w-100">Register</button>
      </form>
      {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
    </div>
  );
}

export default Register;
