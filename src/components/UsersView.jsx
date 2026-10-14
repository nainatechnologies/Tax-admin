import React, { useState } from 'react';
import { Users, Search, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

export default function UsersView({ cases, onOpenCaseDetails }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique users or build from cases
  const usersList = [
    {
      id: 'usr-1',
      name: 'Shyam',
      email: 'shyam@gmail.com',
      pan: 'ABCPS1234F',
      phone: '+91 98450 88712',
      category: 'Salaried Individual',
      casesCount: 1,
      joined: '12 Oct 2024',
      status: 'Active',
      caseId: '#CASE-722714',
    },
    {
      id: 'usr-2',
      name: 'Sowmya',
      email: 'sowmya@gmail.com',
      pan: 'BCDPS5678K',
      phone: '+91 97200 44109',
      category: 'Salaried Individual',
      casesCount: 1,
      joined: '13 Oct 2024',
      status: 'Active',
      caseId: '#CASE-830123',
    },
    {
      id: 'usr-3',
      name: 'Amitabh Verma',
      email: 'amitabh.v@gmail.com',
      pan: 'AFIPV9012M',
      phone: '+91 98110 33219',
      category: 'Investor / Trader',
      casesCount: 1,
      joined: '14 Oct 2024',
      status: 'Active',
      caseId: '#CASE-492104',
    },
    {
      id: 'usr-4',
      name: 'Pooja Hegde',
      email: 'pooja.h@yahoo.com',
      pan: 'BKTPH4321Q',
      phone: '+91 99401 77218',
      category: 'Salaried Individual',
      casesCount: 1,
      joined: '14 Oct 2024',
      status: 'Active',
      caseId: '#CASE-618492',
    },
    {
      id: 'usr-5',
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@fintech.io',
      pan: 'CGZPR8876L',
      phone: '+91 98840 99011',
      category: 'Business Owner',
      casesCount: 1,
      joined: '11 Oct 2024',
      status: 'Active',
      caseId: '#CASE-309184',
    },
    {
      id: 'usr-6',
      name: 'Kavita Krishnan',
      email: 'kavita.k@gmail.com',
      pan: 'DNKPK2299R',
      phone: '+91 96500 12048',
      category: 'NRI Taxpayer',
      casesCount: 1,
      joined: '10 Oct 2024',
      status: 'Active',
      caseId: '#CASE-512093',
    },
    {
      id: 'usr-7',
      name: 'Rohan Malhotra',
      email: 'rohan.m@outlook.com',
      pan: 'EQWPM7744S',
      phone: '+91 94220 55190',
      category: 'Freelance Professional (44ADA)',
      casesCount: 1,
      joined: '09 Oct 2024',
      status: 'Active',
      caseId: '#CASE-781042',
    },
    {
      id: 'usr-8',
      name: 'Divya Sundaram',
      email: 'divya.s@gmail.com',
      pan: 'FXGPS5511D',
      phone: '+91 98402 11993',
      category: 'Salaried Individual',
      casesCount: 1,
      joined: '08 Oct 2024',
      status: 'Active',
      caseId: '#CASE-928410',
    },
    {
      id: 'usr-9',
      name: 'Naveen Reddy',
      email: 'naveen.r@gmail.com',
      pan: 'GZTPR3322H',
      phone: '+91 97000 66311',
      category: 'Crypto & Stock Investor',
      casesCount: 1,
      joined: '13 Oct 2024',
      status: 'Active',
      caseId: '#CASE-104928',
    },
  ];

  const filteredUsers = usersList.filter((u) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.pan.toLowerCase().includes(q)
    );
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Registered Taxpayer Accounts</h1>
          <p className="view-header-sub">
            Verified client profiles, PAN registrations, and filed tax returns history
          </p>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <div className="panel-title-block">
            <h2 className="panel-title">Taxpayers Directory ({usersList.length})</h2>
            <p className="panel-subtitle">Authenticated users with linked PAN and active e-filing vaults</p>
          </div>

          <div className="search-box-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, PAN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Taxpayer Name</th>
                <th>PAN Number</th>
                <th>Category</th>
                <th>Contact Details</th>
                <th>Linked Case</th>
                <th>Member Since</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const targetCase = cases.find((c) => c.id === user.caseId);

                return (
                  <tr key={user.id}>
                    <td>
                      <div className="taxpayer-cell">
                        <span className="taxpayer-name">{user.name}</span>
                        <span className="taxpayer-email">{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: '700',
                          background: '#f1f5f9',
                          padding: '3px 7px',
                          borderRadius: '4px',
                          fontSize: '13px',
                        }}
                      >
                        {user.pan}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '13px', color: '#475569' }}>
                        {user.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        <div>{user.phone}</div>
                      </div>
                    </td>
                    <td>
                      {targetCase ? (
                        <button
                          type="button"
                          className="vault-pill"
                          onClick={() => onOpenCaseDetails(targetCase)}
                        >
                          <ExternalLink size={13} /> {user.caseId}
                        </button>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>None</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        {user.joined}
                      </span>
                    </td>
                    <td>
                      <span className="status-chip completed">● Active</span>
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
