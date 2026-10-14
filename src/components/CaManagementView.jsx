import React, { useState } from 'react';
import { Briefcase, UserPlus, Star, Phone, Mail, Award, CheckCircle, Search } from 'lucide-react';

export default function CaManagementView({
  cas,
  onOpenAddCaModal,
  onOpenAssignCaWithCa,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCas = cas.filter((ca) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      ca.name.toLowerCase().includes(q) ||
      ca.membershipNo.toLowerCase().includes(q) ||
      ca.specialization.toLowerCase().includes(q)
    );
  });

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Chartered Accountants (CA) Network</h1>
          <p className="view-header-sub">
            ICAI verified chartered accountants handling tax computations, audits, and e-filing
          </p>
        </div>

        <button
          type="button"
          className="btn-cta"
          onClick={onOpenAddCaModal}
        >
          <UserPlus size={16} /> Add Chartered Accountant
        </button>
      </div>

      {/* Quick Search & Summary Stats */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1e3a8a',
            }}
          >
            Total Verified CAs: <b>{cas.length}</b>
          </div>
          <div
            style={{
              background: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
              fontWeight: '600',
              color: '#059669',
            }}
          >
            Active On-Duty: <b>{cas.filter((c) => c.status === 'Active').length}</b>
          </div>
        </div>

        <div className="search-box-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, ICAI no, specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px' }}
          />
        </div>
      </div>

      {/* CA Grid Cards */}
      <div className="ca-grid">
        {filteredCas.map((ca) => {
          const loadPercent = Math.round((ca.activeCases / ca.maxCapacity) * 100);
          const isHighLoad = loadPercent >= 75;

          return (
            <div key={ca.id} className="ca-card">
              <div className="ca-card-top">
                <img
                  src={ca.avatar}
                  alt={ca.name}
                  className="ca-avatar"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
                  }}
                />
                <div className="ca-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h3 className="ca-name">{ca.name}</h3>
                    <CheckCircle size={14} color="#059669" />
                  </div>
                  <span className="ca-membership">{ca.membershipNo}</span>
                  <span className="ca-qualification">{ca.qualification}</span>
                </div>
              </div>

              {/* Specialization */}
              <div className="ca-specialization-box">
                <div className="ca-specialization-label">Domain Expertise</div>
                <div>{ca.specialization}</div>
              </div>

              {/* Workload Progress Bar */}
              <div className="workload-section">
                <div className="workload-header">
                  <span>Current Workload</span>
                  <span style={{ color: isHighLoad ? '#dc2626' : '#2563eb' }}>
                    {ca.activeCases} / {ca.maxCapacity} Cases ({loadPercent}%)
                  </span>
                </div>
                <div className="workload-bar-bg">
                  <div
                    className={`workload-bar-fill ${isHighLoad ? 'high' : ''}`}
                    style={{ width: `${loadPercent}%` }}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={13} /> {ca.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={13} /> {ca.phone}
                </div>
              </div>

              {/* Footer */}
              <div className="ca-card-footer">
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', color: '#0f172a' }}>
                  <Star size={15} color="#eab308" fill="#eab308" />
                  <span>{ca.rating}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' }}>
                    ({ca.experienceYears} yrs exp)
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-sm-action primary"
                  onClick={() => onOpenAssignCaWithCa && onOpenAssignCaWithCa(ca)}
                >
                  Assign Case
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
