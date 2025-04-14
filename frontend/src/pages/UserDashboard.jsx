import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const UserDashboard = () => {
  const [activePage, setActivePage] = useState('watchlist');

  const renderPage = () => {
    switch (activePage) {
      case 'watchlist':
        return <div>📈 This is the Watchlist Page</div>;
      case 'orders':
        return <div>💼 This is the Orders Page</div>;
      case 'portfolio':
        return <div>📊 This is the Portfolio Page</div>;
      default:
        return <div>Select a tab from sidebar</div>;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar onSelect={setActivePage} />
      <div className="flex-grow-1 p-3">{renderPage()}</div>
    </div>
  );
};

export default UserDashboard;
