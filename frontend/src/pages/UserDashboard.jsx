import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Watchlist from "./Watchlist";
import Orders from "./Orders";
import Portfolio from "./Portfolio";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState('watchlist');

  const renderPage = () => {
    switch (activePage) {
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
      <Sidebar onTabChange={setActivePage} />
      <div className="flex-grow-1 p-3">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
