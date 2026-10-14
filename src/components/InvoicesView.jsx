import React, { useState } from 'react';
import { Receipt, Download, Search, CheckCircle2, Clock, IndianRupee, ArrowUpRight } from 'lucide-react';

export default function InvoicesView({ invoices }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices = invoices.filter((inv) => {
    if (filterStatus !== 'all' && inv.status !== filterStatus) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      inv.id.toLowerCase().includes(q) ||
      inv.taxpayerName.toLowerCase().includes(q) ||
      inv.caseId.toLowerCase().includes(q)
    );
  });

  const totalCollected = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Billing & GST Tax Invoices</h1>
          <p className="view-header-sub">
            Real-time automated billing records, GST reconciliation, and client payment receipts
          </p>
        </div>

        <button
          type="button"
          className="btn-cta"
          onClick={() => alert('Generating batch GST 3B summary report...')}
        >
          <Receipt size={16} /> Export GST Report
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
              Total Revenue Realized
            </div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IndianRupee size={22} />
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
              Paid Invoices
            </div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
              {invoices.filter((i) => i.status === 'Paid').length}
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '20px 24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
              Pending Invoices
            </div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
              {invoices.filter((i) => i.status !== 'Paid').length}
            </div>
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#fff7ed',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Invoices Table Card */}
      <div className="panel-card">
        <div className="panel-header">
          <div className="panel-title-block">
            <h2 className="panel-title">Invoices Ledger</h2>
            <p className="panel-subtitle">Official GST compliant tax invoices issued to taxpayers</p>
          </div>

          <div className="panel-controls">
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Invoices ({invoices.length})</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="search-box-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search invoice or taxpayer..."
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
                <th>Invoice No</th>
                <th>Taxpayer</th>
                <th>Service & Case</th>
                <th>Net + GST (18%)</th>
                <th>Total</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td>
                    <span className="case-id-text">{inv.id}</span>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{inv.date}</div>
                  </td>
                  <td>
                    <div className="taxpayer-cell">
                      <span className="taxpayer-name">{inv.taxpayerName}</span>
                      <span className="taxpayer-email">{inv.taxpayerEmail}</span>
                    </div>
                  </td>
                  <td>
                    <div className="service-cell">
                      <span className="service-name">{inv.service}</span>
                      <span className="service-year-tag">{inv.caseId}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px' }}>
                      ₹{inv.amount} + ₹{inv.gst}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: '800', color: '#0f172a' }}>
                      ₹{inv.total.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '12px',
                        background: '#f1f5f9',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontWeight: '500',
                      }}
                    >
                      {inv.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-chip ${inv.status === 'Paid' ? 'completed' : 'pending-assignment'}`}
                    >
                      ● {inv.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-sm-action outline"
                      onClick={() => alert(`Simulated Download for Invoice ${inv.id}`)}
                    >
                      <Download size={13} /> PDF
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
