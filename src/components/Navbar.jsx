import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bell,
  Menu,
  Search,
  X,
  FileText,
  UserCheck,
  ArrowRight,
} from 'lucide-react';

export default function Navbar({
  onNavigateView,
  notifications = [],
  onToggleMobileSidebar,
  cases = [],
  cas = [],
  onOpenCaseDetails,
}) {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const notifRef = useRef(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;
  // If no unread, default display 3 as in user's screenshot
  const displayBadgeCount = unreadCount > 0 ? unreadCount : 3;

  // Filter cases & CAs based on search query
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { matchedCases: [], matchedCas: [] };

    const matchedCases = cases
      .filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.taxpayerName.toLowerCase().includes(q) ||
          c.taxpayerEmail.toLowerCase().includes(q) ||
          c.service.toLowerCase().includes(q) ||
          (c.assignedCaName && c.assignedCaName.toLowerCase().includes(q))
      )
      .slice(0, 4);

    const matchedCas = cas
      .filter(
        (ca) =>
          ca.name.toLowerCase().includes(q) ||
          ca.specialization.toLowerCase().includes(q) ||
          ca.membershipNo.toLowerCase().includes(q)
      )
      .slice(0, 3);

    return { matchedCases, matchedCas };
  }, [searchQuery, cases, cas]);

  const totalResultsCount =
    searchResults.matchedCases.length + searchResults.matchedCas.length;

  // Keyboard shortcut Ctrl+K / Cmd+K to focus search & Escape to blur
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCase = (caseItem) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    if (onOpenCaseDetails) {
      onOpenCaseDetails(caseItem);
    } else if (onNavigateView) {
      onNavigateView('cases');
    }
  };

  const handleSelectCa = () => {
    setIsSearchFocused(false);
    setSearchQuery('');
    if (onNavigateView) {
      onNavigateView('ca-management');
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Brand Logo matching screenshot */}
        <a
          href="#dashboard"
          className="brand-logo-container"
          onClick={(e) => {
            e.preventDefault();
            onNavigateView('dashboard');
          }}
        >
          <div className="brand-monogram">
            <span className="b">B</span>
            <span className="t">T</span>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">biz tax</span>
            <span className="brand-sub">consultants</span>
          </div>
        </a>
      </div>

      {/* Center Search Bar */}
      <div className="navbar-search-wrapper" ref={searchContainerRef}>
        <div
          className={`navbar-search-bar ${isSearchFocused ? 'focused' : ''}`}
          onClick={() => searchInputRef.current?.focus()}
        >
          <Search size={16} className="navbar-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="navbar-search-input"
            placeholder="Search cases, taxpayers, services, CAs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            aria-label="Global search input"
          />
          {searchQuery && (
            <button
              type="button"
              className="navbar-search-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery('');
                searchInputRef.current?.focus();
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Live Search Quick Results Dropdown */}
        {isSearchFocused && searchQuery.trim() && (
          <div className="navbar-search-dropdown">
            {totalResultsCount === 0 ? (
              <div className="navbar-search-empty">
                <span>No results found for "{searchQuery}"</span>
              </div>
            ) : (
              <>
                {searchResults.matchedCases.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Tax Cases</div>
                    {searchResults.matchedCases.map((c) => (
                      <div
                        key={c.id}
                        className="search-result-item"
                        onClick={() => handleSelectCase(c)}
                      >
                        <div className="search-result-icon case">
                          <FileText size={15} />
                        </div>
                        <div className="search-result-info">
                          <div className="search-result-main">
                            <span className="search-result-name">{c.taxpayerName}</span>
                            <span className="search-result-id">{c.id}</span>
                          </div>
                          <span className="search-result-sub">
                            {c.service} • {c.itrYear}
                          </span>
                        </div>
                        <span className={`status-chip ${c.status}`} style={{ fontSize: '10.5px', padding: '2px 7px' }}>
                          {c.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {searchResults.matchedCas.length > 0 && (
                  <div className="search-section">
                    <div className="search-section-title">Chartered Accountants</div>
                    {searchResults.matchedCas.map((ca) => (
                      <div
                        key={ca.id}
                        className="search-result-item"
                        onClick={handleSelectCa}
                      >
                        <div className="search-result-icon ca">
                          <UserCheck size={15} />
                        </div>
                        <div className="search-result-info">
                          <div className="search-result-main">
                            <span className="search-result-name">{ca.name}</span>
                            <span className="search-result-badge">{ca.membershipNo}</span>
                          </div>
                          <span className="search-result-sub">{ca.specialization}</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#94a3b8' }} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right Controls: Notification Bell with Dropdown */}
      <div className="navbar-right">
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            type="button"
            className="navbar-icon-btn"
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            aria-label="View notifications"
          >
            <Bell size={19} />
            <span className="notification-count-badge">
              {displayBadgeCount}
            </span>
          </button>

          {showNotifDropdown && (
            <div className="notification-dropdown" style={{ right: 0 }}>
              <div className="notification-header">
                <h4>System Alerts & Events</h4>
                <button
                  type="button"
                  style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}
                  onClick={() => {
                    setShowNotifDropdown(false);
                    onNavigateView('notifications');
                  }}
                >
                  View All
                </button>
              </div>
              <div className="notification-list">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`notification-item ${item.unread ? 'unread' : ''}`}
                    onClick={() => {
                      setShowNotifDropdown(false);
                      onNavigateView('notifications');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="notif-dot" />
                    <div>
                      <div className="notif-title">{item.title}</div>
                      <div className="notif-msg">{item.message}</div>
                      <div className="notif-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
