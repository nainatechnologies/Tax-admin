import React, { useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  FileText,
  Receipt,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar({
  activeView,
  setActiveView,
  onLogout,
  userCount = 9,
  mobileOpen = false,
  onCloseMobile,
}) {
  const sidebarRef = useRef(null);

  // Force scroll position to stay locked at top 0 on every render/mount
  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  });

  const handleItemClick = (viewId) => {
    setActiveView(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      ref={sidebarRef}
      className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      onScroll={(e) => {
        if (e.currentTarget.scrollTop !== 0) {
          e.currentTarget.scrollTop = 0;
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ul className="sidebar-nav-list" style={{ width: '100%' }}>
          {/* Dashboard */}
          <li style={{ width: '100%' }}>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleItemClick('dashboard')}
            >
              <div className="sidebar-item-left">
                <LayoutDashboard size={20} strokeWidth={2.4} />
                <span>Dashboard</span>
              </div>
            </button>
          </li>

          {/* Users with count */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'users' ? 'active' : ''}`}
              onClick={() => handleItemClick('users')}
            >
              <div className="sidebar-item-left">
                <Users size={20} strokeWidth={2.4} />
                <span>Users</span>
              </div>
              <span className="sidebar-badge blue">{userCount}</span>
            </button>
          </li>

          <li className="sidebar-section-divider" />
          <li className="sidebar-section-label">CA Network</li>

          {/* CA Management */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'ca-management' ? 'active' : ''}`}
              onClick={() => handleItemClick('ca-management')}
            >
              <div className="sidebar-item-left">
                <Briefcase size={20} strokeWidth={2.4} />
                <span>CA Management</span>
              </div>
            </button>
          </li>

          <li className="sidebar-section-divider" />
          <li className="sidebar-section-label">Services & Catalog</li>

          {/* Services */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'services' ? 'active' : ''}`}
              onClick={() => handleItemClick('services')}
            >
              <div className="sidebar-item-left">
                <Layers size={20} strokeWidth={2.4} />
                <span>Services</span>
              </div>
            </button>
          </li>

          <li className="sidebar-section-divider" />
          <li className="sidebar-section-label">Operations</li>

          {/* Cases */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'cases' ? 'active' : ''}`}
              onClick={() => handleItemClick('cases')}
            >
              <div className="sidebar-item-left">
                <FileText size={20} strokeWidth={2.4} />
                <span>Cases</span>
              </div>
            </button>
          </li>

          {/* Invoices */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'invoices' ? 'active' : ''}`}
              onClick={() => handleItemClick('invoices')}
            >
              <div className="sidebar-item-left">
                <Receipt size={20} strokeWidth={2.4} />
                <span>Invoices</span>
              </div>
            </button>
          </li>

          <li className="sidebar-section-divider" />

          {/* Notifications */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'notifications' ? 'active' : ''}`}
              onClick={() => handleItemClick('notifications')}
            >
              <div className="sidebar-item-left">
                <Bell size={20} strokeWidth={2.4} />
                <span>Notifications</span>
              </div>
            </button>
          </li>

          {/* Settings */}
          <li>
            <button
              type="button"
              className={`sidebar-item-btn ${activeView === 'settings' ? 'active' : ''}`}
              onClick={() => handleItemClick('settings')}
            >
              <div className="sidebar-item-left">
                <Settings size={20} strokeWidth={2.4} />
                <span>Settings</span>
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* Logout at bottom */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to log out of the admin panel?')) {
              onLogout();
            }
          }}
        >
          <LogOut size={20} strokeWidth={2.4} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
