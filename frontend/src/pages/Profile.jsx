import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/profile/", {
        userid: userId,
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="container mt-3" style={{ maxWidth: 600 }}>
      <h4>👤 My Profile</h4>
      <table className="table table-striped mt-3">
        <tbody>
          <tr><th>User ID</th><td>{profile.userid}</td></tr>
          <tr><th>Name</th><td>{profile.name}</td></tr>
          <tr><th>Email</th><td>{profile.email}</td></tr>
          <tr><th>Password (Hashed)</th><td><code>{profile.password.slice(0, 20)}...</code></td></tr>
          <tr><th>Virtual Balance</th><td>₹ {profile.virtual_balance.toFixed(2)}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
