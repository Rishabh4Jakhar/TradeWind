import React, { useState } from 'react';
import '../assets/css/Sidebar.css'; // Create this for basic custom styles if needed
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`d-flex flex-column bg-light sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <button className="btn btn-outline-primary m-2" onClick={toggleSidebar}>
        {isOpen ? 'Hide' : 'Show'}
      </button>

      {isOpen && (
        <ul className="nav flex-column mt-3">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => onSelect('watchlist')}>
              📈 Watchlist
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => onSelect('orders')}>
              💼 Orders
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={() => onSelect('portfolio')}>
              📊 Portfolio
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
