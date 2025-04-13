import { FaTable, FaUser, FaSignInAlt, FaSignOutAlt, FaHome, FaRocket } from "react-icons/fa";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {     
  return (
    <div className="w-64 min-h-screen bg-dark shadow-md p-5">
      <h1 className="text-xl font-bold mb-8 flex items-center gap-2">
        <FaRocket /> TradeWind
      </h1>

      <ul className="space-y-4">
        <li className="flex items-center gap-3 text-[#f7f7f7] hover:text-blue-600 cursor-pointer">
          <FaHome /> <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="flex items-center gap-3 text-[#f7f7f7] hover:text-blue-600 cursor-pointer">
          <FaTable /><Link className="nav-link" to="/dashboard-layout">Sample Button</Link>
        </li>
        <li className="flex items-center gap-3 text-[#f7f7f7] hover:text-blue-600 cursor-pointer">
          <FaUser /><Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="flex items-center gap-3 text-[#f7f7f7] hover:text-blue-600 cursor-pointer">
          <FaSignInAlt /><Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="flex items-center gap-3 text-[#f7f7f7] hover:text-blue-600 cursor-pointer">
          <FaSignOutAlt /><Link className="nav-link" to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
