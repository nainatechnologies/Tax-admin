import React, { useState } from 'react';
import { Folder, FileText, Download, Search, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function DocumentsView({ cases, onOpenCaseDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Aggregate all documents from cases
  const allDocs = [];
  cases.forEach((c) => {
    (c.vaultDocs || []).forEach((docName, idx) => {
      let docType = 'Form 16 / Salary';
      if (docName.toLowerCase().includes('26as')) docType = 'Form 26AS';
      else if (docName.toLowerCase().includes('ais')) docType = 'AIS / TIS';
      else if (docName.toLowerCase().includes('bank') || docName.toLowerCase().includes('sbi') || docName.toLowerCase().includes('hdfc')) docType = 'Bank Statements';
      else if (docName.toLowerCase().includes('pnl') || docName.toLowerCase().includes('pl') || docName.toLowerCase().includes('balance')) docType = 'Financials & P&L';
      else if (docName.toLowerCase().includes('foreign') || docName.toLowerCase().includes('passport') || docName.toLowerCase().includes('w2')) docType = 'NRI & Foreign Tax';

      allDocs.push({
        id: `${c.id}-doc-${idx}`,
        fileName: docName,
        docType,
        caseId: c.id,
        taxpayerName: c.taxpayerName,
        taxpayerEmail: c.taxpayerEmail,
        pan: c.pan,
        uploadDate: c.filingDate,
        size: '1.4 MB',
        status: 'Encrypted & Verified',
        parentCase: c,
      });
    });
  });

  const filteredDocs = allDocs.filter((d) => {
    if (filterCategory !== 'all' && d.docType !== filterCategory) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      d.fileName.toLowerCase().includes(q) ||
      d.taxpayerName.toLowerCase().includes(q) ||
      d.caseId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Encrypted Tax Document Vault</h1>
          <p className="view-header-sub">
            Secure client financial records, Form 16, AIS reports, and audit certificates
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#059669', background: '#ecfdf5', padding: '6px 14px', borderRadius: '8px', border: '1px solid #a7f3d0', fontWeight: '600' }}>
          <ShieldCheck size={16} /> 256-Bit Bank Grade Encryption
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <div className="panel-title-block">
            <h2 className="panel-title">Vault Records ({allDocs.length} Total Documents)</h2>
            <p className="panel-subtitle">Access taxpayer uploads with role-based CA permission</p>
          </div>

          <div className="panel-controls">
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Document Types</option>
              <option value="Form 16 / Salary">Form 16 / Salary</option>
              <option value="Form 26AS">Form 26AS</option>
              <option value="AIS / TIS">AIS / TIS</option>
              <option value="Bank Statements">Bank Statements</option>
              <option value="Financials & P&L">Financials & P&L</option>
              <option value="NRI & Foreign Tax">NRI & Foreign Tax</option>
            </select>

            <div className="search-box-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search file name or taxpayer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Category</th>
                <th>Taxpayer</th>
                <th>Linked Case</th>
                <th>File Size</th>
                <th>Vault Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={18} color="#2563eb" />
                      <div>
                        <div style={{ fontWeight: '600', color: '#0f172a' }}>{doc.fileName}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Uploaded: {doc.uploadDate}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px' }}>
                      {doc.docType}
                    </span>
                  </td>
                  <td>
                    <div className="taxpayer-cell">
                      <span className="taxpayer-name">{doc.taxpayerName}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace' }}>{doc.pan}</span>
                    </div>
                  </td>
                  <td>
                    <span className="case-id-text">{doc.caseId}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{doc.size}</span>
                  </td>
                  <td>
                    <span className="status-chip completed">
                      <Lock size={11} /> {doc.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-sm-action outline"
                      onClick={() => alert(`Simulated Download of encrypted document: ${doc.fileName}`)}
                    >
                      <Download size={13} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
