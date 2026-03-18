import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, MessageSquare, FileText, BarChart2, Bell } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Interview', path: '/interview', icon: <MessageSquare size={20} /> },
    { name: 'Resume AI', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="layout">
      {!isHome && (
        <aside className="sidebar glass-panel">
          <div className="sidebar-logo">
            <div className="logo-icon glow-purple"></div>
            <h2>NextPrep</h2>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      )}
      
      <main className={`main-content ${isHome ? 'full-width' : ''}`}>
        {!isHome && (
          <header className="top-header glass-card">
            <div className="header-search">
              <input type="text" placeholder="Search resources, topics..." className="search-input bg-glass" />
            </div>
            <div className="header-actions">
              <button className="icon-btn"><Bell size={20} /></button>
              <div className="user-profile">
                <img src="https://ui-avatars.com/api/?name=Krishna&background=8b5cf6&color=fff" alt="Profile" className="avatar" />
              </div>
            </div>
          </header>
        )}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
