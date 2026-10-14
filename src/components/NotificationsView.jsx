import React from 'react';
import { Bell, Check, Clock, ShieldAlert, CreditCard, FileCheck, CheckCircle2 } from 'lucide-react';

export default function NotificationsView({
  notifications,
  onMarkAllRead,
}) {
  const getIcon = (type) => {
    switch (type) {
      case 'case':
        return <FileCheck size={18} color="#2563eb" />;
      case 'payment':
        return <CreditCard size={18} color="#059669" />;
      case 'success':
        return <CheckCircle2 size={18} color="#059669" />;
      case 'warning':
        return <ShieldAlert size={18} color="#d97706" />;
      default:
        return <Bell size={18} color="#2563eb" />;
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Notifications & System Alerts</h1>
          <p className="view-header-sub">
            Audit logging of taxpayer submissions, payment confirmations, and e-filing milestones
          </p>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={onMarkAllRead}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Check size={14} /> Mark All as Read
        </button>
      </div>

      <div className="panel-card">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '18px 24px',
                borderBottom: '1px solid #f1f5f9',
                background: item.unread ? '#fbfcfe' : '#ffffff',
                transition: 'background 0.15s ease',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getIcon(item.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                    {item.title}
                  </h4>
                  {item.unread && (
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#2563eb',
                        background: '#eff6ff',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                  {item.message}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  <Clock size={12} /> {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
