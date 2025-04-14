import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Watchlist from "./Watchlist";
import Orders from "./Orders";
import Portfolio from "./Portfolio";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('watchlist');

  const renderPage = () => {
    switch (activeTab) {
      case 'watchlist':
        return <Watchlist />;
      case 'orders':
        return <Orders />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Watchlist />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-grow-1 p-3">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
