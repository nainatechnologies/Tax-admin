import React, { useState } from 'react';
import {
  X,
  Folder,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  User,
  ArrowRight,
} from 'lucide-react';

export default function CaseDetailsModal({
  isOpen,
  onClose,
  caseItem,
  onUpdateStage,
  onOpenAssignCa,
}) {
  const [selectedStage, setSelectedStage] = useState(caseItem?.stage || 'In Progress');

  if (!isOpen || !caseItem) return null;

  const stagesList = [
    'Pending CA Assignment',
    'Documents Under Review',
    'In Progress',
    'Verification',
    'Completed',
  ];

  const handleStageChange = (newStage) => {
    setSelectedStage(newStage);
    if (onUpdateStage) {
      onUpdateStage(caseItem.id, newStage);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="case-id-text" style={{ fontSize: '16px' }}>{caseItem.id}</span>
              <span className={`status-chip ${caseItem.status}`}>{caseItem.stage}</span>
            </div>
            <p className="modal-subtitle">
              ITR Return Operations & Compliance Audit Trail
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Taxpayer & Filing Overview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                Taxpayer Profile
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                {caseItem.taxpayerName}
              </div>
              <div style={{ fontSize: '12px', color: '#475569' }}>{caseItem.taxpayerEmail}</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>{caseItem.phone}</div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                PAN: <b style={{ fontFamily: 'monospace' }}>{caseItem.pan}</b>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                Filing Specifications
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                {caseItem.service}
              </div>
              <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>
                Financial Year: {caseItem.itrYear}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Assessment Year: {caseItem.assessmentYear}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600', marginTop: '4px' }}>
                Filing Fee: ₹{caseItem.amount} ({caseItem.paymentStatus})
              </div>
            </div>
          </div>

          {/* Assigned CA block */}
          <div
            style={{
              padding: '14px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={18} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
                  Assigned Professional
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                  {caseItem.assignedCaName}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-sm-action primary"
              onClick={() => {
                onClose();
                onOpenAssignCa(caseItem);
              }}
            >
              Change CA
            </button>
          </div>

          {/* Vault Documents Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                Vault Documents Repository ({caseItem.vaultDocsCount})
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Encrypted via AES-256 Cloud Vault
              </span>
            </div>

            {caseItem.vaultDocsCount === 0 ? (
              <div
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '10px',
                  color: '#64748b',
                  fontSize: '13px',
                }}
              >
                No documents uploaded yet by client. Request sent to {caseItem.taxpayerEmail}.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {caseItem.vaultDocs.map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} color="#2563eb" />
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>
                        {doc}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn-sm-action outline"
                      onClick={() => alert(`Simulated Download: ${doc}`)}
                    >
                      <Download size={13} /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stage Update */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="form-label">Workflow Stage Progression</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {stagesList.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStageChange(st)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: caseItem.stage === st ? '1px solid #2563eb' : '1px solid #e2e8f0',
                    background: caseItem.stage === st ? '#eff6ff' : '#ffffff',
                    color: caseItem.stage === st ? '#1d4ed8' : '#475569',
                    cursor: 'pointer',
                  }}
                >
                  {caseItem.stage === st ? '✓ ' : ''}
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
