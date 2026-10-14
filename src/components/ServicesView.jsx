import React, { useState } from 'react';
import { Layers, Plus, CheckCircle2, Clock, FileCheck, IndianRupee, Tag } from 'lucide-react';

export default function ServicesView({
  services,
  onOpenAddServiceModal,
  onToggleServiceStatus,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Individual Tax',
    'Business Tax',
    'International Tax',
    'GST & Indirect Tax',
    'Corporate Compliance',
  ];

  const filteredServices = services.filter((srv) => {
    if (selectedCategory === 'all') return true;
    return srv.category === selectedCategory;
  });

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header">
        <div>
          <h1 className="view-header-title">Tax Advisory & Filing Catalog</h1>
          <p className="view-header-sub">
            Configure e-filing plans, standard turnaround SLAs, and required compliance documents
          </p>
        </div>

        <button
          type="button"
          className="btn-cta"
          onClick={onOpenAddServiceModal}
        >
          <Plus size={16} /> Add New Tax Service
        </button>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              border: selectedCategory === cat ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
              backgroundColor: selectedCategory === cat ? '#1e3a8a' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#475569',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {cat === 'all' ? 'All Services' : cat}
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            {service.popular && (
              <span className="service-badge-popular">★ Most Popular</span>
            )}

            <div>
              <span className="service-category-tag">{service.category}</span>
              <h3 className="service-card-title">{service.name}</h3>
              <p className="service-card-desc">{service.description}</p>

              <div className="service-pricing-row">
                <span className="service-price">
                  ₹{Number(service.price).toLocaleString('en-IN')}
                </span>
                <span className="service-sla-pill">
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {service.sla} SLA
                </span>
              </div>
            </div>

            {/* Checklist of required documents */}
            <div className="service-docs-list">
              <span className="service-docs-label">Mandatory Vault Documents</span>
              {service.documents.map((doc, idx) => (
                <div key={idx} className="service-doc-item">
                  <FileCheck size={13} color="#059669" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            {/* Status toggle & code */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid #f1f5f9',
                fontSize: '12px',
              }}
            >
              <span style={{ fontFamily: 'monospace', color: '#64748b' }}>
                Code: {service.code || service.id}
              </span>

              <button
                type="button"
                onClick={() => onToggleServiceStatus(service.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  border: service.status === 'Active' ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                  background: service.status === 'Active' ? '#ecfdf5' : '#f1f5f9',
                  color: service.status === 'Active' ? '#059669' : '#64748b',
                }}
              >
                ● {service.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
