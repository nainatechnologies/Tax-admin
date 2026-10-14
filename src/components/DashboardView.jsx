import React, { useState, useMemo, useEffect } from 'react';
import MetricCards from './MetricCards';
import { Search, Folder, UserCheck, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DashboardView({
  metrics,
  cases,
  onNavigateView,
  onOpenAssignCa,
  onOpenCaseDetails,
  onOpenAddCaModal,
  onOpenAddServiceModal,
}) {
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Reset to page 1 on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStage, searchQuery]);

  // Filtering cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Stage filter
      if (selectedStage !== 'all' && c.status !== selectedStage) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = c.id.toLowerCase().includes(q);
        const matchName = c.taxpayerName.toLowerCase().includes(q);
        const matchEmail = c.taxpayerEmail.toLowerCase().includes(q);
        const matchService = c.service.toLowerCase().includes(q);
        const matchCa = c.assignedCaName.toLowerCase().includes(q);
        return matchId || matchName || matchEmail || matchService || matchCa;
      }
      return true;
    });
  }, [cases, selectedStage, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCases.length / pageSize) || 1;
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCases.slice(start, start + pageSize);
  }, [filteredCases, currentPage]);

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredCases.length);

  return (
    <div className="view-container">
      {/* 6 Metric Summary Cards */}
      <MetricCards metrics={metrics} onCardClick={onNavigateView} />

      {/* Tax Return Operations Ledger */}
      <div className="panel-card">
        <div className="panel-header">
          <div className="panel-title-block">
            <h2 className="panel-title">Tax Return Operations Ledger</h2>
            <p className="panel-subtitle">
              Manage workflow stages, assign Chartered Accountants, and monitor client returns
            </p>
          </div>

          <div className="panel-controls">
            {/* Stage filter dropdown */}
            <select
              className="filter-select"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              aria-label="Filter by stage"
            >
              <option value="all">All Stages ({cases.length})</option>
              <option value="pending-assignment">
                Pending CA Assignment ({cases.filter((c) => c.status === 'pending-assignment').length})
              </option>
              <option value="under-review">
                Documents Under Review ({cases.filter((c) => c.status === 'under-review').length})
              </option>
              <option value="in-progress">
                In Progress ({cases.filter((c) => c.status === 'in-progress').length})
              </option>
              <option value="verification">
                Verification ({cases.filter((c) => c.status === 'verification').length})
              </option>
              <option value="completed">
                Completed ({cases.filter((c) => c.status === 'completed').length})
              </option>
            </select>

            {/* Search Input */}
            <div className="search-box-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Taxpayer Name</th>
                <th>Service & ITR Year</th>
                <th>Vault Docs</th>
                <th>Assigned</th>
                <th>Stage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No tax cases match the selected filter.
                  </td>
                </tr>
              ) : (
                paginatedCases.map((row) => {
                  const isUnassigned = !row.assignedCaId || row.assignedCaName === 'Unassigned';
                  return (
                    <tr key={row.id}>
                      {/* Case ID */}
                      <td>
                        <span className="case-id-text">{row.id}</span>
                      </td>

                      {/* Taxpayer Name & Email */}
                      <td>
                        <div className="taxpayer-cell">
                          <span className="taxpayer-name">{row.taxpayerName}</span>
                          <span className="taxpayer-email">{row.taxpayerEmail}</span>
                        </div>
                      </td>

                      {/* Service & ITR Year */}
                      <td>
                        <div className="service-cell">
                          <span className="service-name">{row.service}</span>
                          <span className="service-year-tag">{row.itrYear}</span>
                        </div>
                      </td>

                      {/* Vault Docs */}
                      <td>
                        <button
                          type="button"
                          className="vault-pill"
                          onClick={() => onOpenCaseDetails(row)}
                          title="Click to view documents vault"
                        >
                          <Folder size={13} />
                          <span>{row.vaultDocsCount} Files</span>
                        </button>
                      </td>

                      {/* Assigned CA */}
                      <td>
                        {isUnassigned ? (
                          <button
                            type="button"
                            className="assigned-ca-pill unassigned"
                            onClick={() => onOpenAssignCa(row)}
                            title="Click to assign a CA"
                          >
                            <UserCheck size={13} />
                            <span>Assign CA</span>
                          </button>
                        ) : (
                          <div className="assigned-ca-pill">
                            <span style={{ fontSize: '13px' }}>👨‍💼</span>
                            <span>{row.assignedCaName}</span>
                          </div>
                        )}
                      </td>

                      {/* Status / Stage Chip */}
                      <td>
                        <span className={`status-chip ${row.status}`}>
                          {row.stage}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="table-actions">
                          {isUnassigned ? (
                            <button
                              type="button"
                              className="btn-sm-action primary"
                              onClick={() => onOpenAssignCa(row)}
                            >
                              <UserCheck size={12} /> Assign
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn-sm-action outline"
                              onClick={() => onOpenAssignCa(row)}
                              title="Reassign or change CA"
                            >
                              Reassign
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn-sm-action outline"
                            onClick={() => onOpenCaseDetails(row)}
                            title="View case timeline and taxpayer filing details"
                          >
                            <Eye size={12} /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Clean Fixed Pagination Footer */}
        {filteredCases.length > 0 && (
          <div className="table-pagination">
            <span className="pagination-info">
              Showing <b>{startIndex}</b> to <b>{endIndex}</b> of <b>{filteredCases.length}</b> Cases
            </span>

            <div className="pagination-controls">
              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} /> Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`pagination-page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
