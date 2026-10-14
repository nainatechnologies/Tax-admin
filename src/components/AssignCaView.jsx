import React from 'react';
import { UserCheck, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function AssignCaView({
  cases,
  cas,
  onOpenAssignModal,
}) {
  const pendingCases = cases.filter(
    (c) => c.status === 'pending-assignment' || !c.assignedCaId || c.assignedCaName === 'Unassigned'
  );

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-header-title">CA Workload & Case Assignment Portal</h1>
          <p className="view-header-sub">
            Review incoming taxpayer filings awaiting professional Chartered Accountant allocation
          </p>
        </div>
      </div>

      {pendingCases.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            padding: '48px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            All Taxpayer Cases Are Assigned!
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '400px' }}>
            Zero unassigned returns in queue. Every client case has a designated Chartered Accountant overseeing their filing.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              padding: '12px 18px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#b45309',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            <AlertCircle size={18} />
            <span>
              <b>{pendingCases.length} Tax Returns</b> require immediate Chartered Accountant allocation to meet SLA deadlines.
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))',
              gap: '18px',
            }}
          >
            {pendingCases.map((c) => (
              <div
                key={c.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="case-id-text" style={{ fontSize: '14px' }}>{c.id}</span>
                    <span className="status-chip pending-assignment">Pending CA</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginTop: '10px' }}>
                    {c.taxpayerName}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {c.taxpayerEmail} • PAN: <b style={{ fontFamily: 'monospace' }}>{c.pan}</b>
                  </div>

                  <div
                    style={{
                      marginTop: '14px',
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                      Requested Service
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e3a8a' }}>
                      {c.service} ({c.itrYear})
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569' }}>
                      Vault Documents Uploaded: <b>{c.vaultDocsCount} Files</b>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Paid Fee: <b>₹{c.amount}</b>
                  </span>

                  <button
                    type="button"
                    className="btn-cta"
                    style={{ height: '36px', padding: '0 14px', fontSize: '12px' }}
                    onClick={() => onOpenAssignModal(c)}
                  >
                    <UserCheck size={14} /> Assign CA Now <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available CAs workload snapshot */}
      <div className="panel-card" style={{ marginTop: '12px' }}>
        <div className="panel-header">
          <div className="panel-title-block">
            <h2 className="panel-title">Available Chartered Accountants & Current Capacity</h2>
            <p className="panel-subtitle">Select an available CA with optimal load for quick turnaround</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Chartered Accountant</th>
                <th>ICAI Reg</th>
                <th>Domain Specialization</th>
                <th>Experience</th>
                <th>Workload Status</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {cas.map((ca) => {
                const loadPercent = Math.round((ca.activeCases / ca.maxCapacity) * 100);
                const isAvailable = ca.activeCases < ca.maxCapacity;

                return (
                  <tr key={ca.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={ca.avatar}
                          alt={ca.name}
                          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
                          }}
                        />
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>{ca.name}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: '600' }}>
                        {ca.membershipNo}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px' }}>{ca.specialization}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px' }}>{ca.experienceYears} Years</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '130px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: isAvailable ? '#059669' : '#dc2626' }}>
                          {ca.activeCases} / {ca.maxCapacity} Active
                        </div>
                        <div className="workload-bar-bg" style={{ height: '5px' }}>
                          <div
                            className="workload-bar-fill"
                            style={{
                              width: `${loadPercent}%`,
                              background: isAvailable ? '#2563eb' : '#dc2626',
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>★ {ca.rating}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
