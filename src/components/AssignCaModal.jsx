import React, { useState } from 'react';
import { X, UserCheck, Check } from 'lucide-react';

export default function AssignCaModal({
  isOpen,
  onClose,
  targetCase,
  cas,
  onAssign,
}) {
  const [selectedCaId, setSelectedCaId] = useState(
    targetCase?.assignedCaId || (cas.length > 0 ? cas[0].id : '')
  );

  if (!isOpen || !targetCase) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    const chosenCa = cas.find((c) => c.id === selectedCaId);
    if (!chosenCa) return;

    onAssign(targetCase.id, chosenCa);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Assign Chartered Accountant</h3>
            <p className="modal-subtitle">
              Allocate case {targetCase.id} to a qualified CA based on domain match & availability
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleConfirm}>
          <div className="modal-body">
            {/* Case Summary Pill */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                flexShrink: 0,
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                  Target Taxpayer Case
                </div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                  {targetCase.taxpayerName} ({targetCase.id})
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>
                  {targetCase.service} • {targetCase.itrYear} • PAN: <b>{targetCase.pan}</b>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`status-chip ${targetCase.status}`}>
                  {targetCase.stage}
                </span>
              </div>
            </div>

            {/* CA Selection list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minHeight: 0 }}>
              <label className="form-label">Select Chartered Accountant</label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  padding: '4px',
                }}
              >
                {cas.map((ca) => {
                  const isSelected = selectedCaId === ca.id;
                  const isAvailable = ca.activeCases < ca.maxCapacity;

                  return (
                    <div
                      key={ca.id}
                      onClick={() => setSelectedCaId(ca.id)}
                      style={{
                        padding: '10px 14px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        borderRadius: '10px',
                        background: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.15s ease',
                        boxSizing: 'border-box',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={ca.avatar}
                          alt={ca.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80';
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                              {ca.name}
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                fontFamily: 'monospace',
                                background: '#e0e7ff',
                                color: '#3730a3',
                                padding: '1px 5px',
                                borderRadius: '4px',
                              }}
                            >
                              {ca.membershipNo}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>
                            {ca.specialization}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: isAvailable ? '#059669' : '#dc2626',
                          }}
                        >
                          Workload: {ca.activeCases}/{ca.maxCapacity}
                        </div>
                        {isSelected && (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '11px',
                              color: '#2563eb',
                              fontWeight: '700',
                              marginTop: '2px',
                            }}
                          >
                            <Check size={13} /> Selected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              <UserCheck size={15} /> Confirm Case Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
