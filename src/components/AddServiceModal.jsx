import React, { useState } from 'react';
import { X, Plus, Layers, CheckCircle2 } from 'lucide-react';

export default function AddServiceModal({ isOpen, onClose, onAddService }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Individual Tax',
    price: 2499,
    sla: '24 - 48 Hours',
    description: '',
    documents: 'Form 16, Form 26AS, AIS/TIS Report, Bank Statement',
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter a service name.');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Please provide a valid price.');
      return;
    }

    const docList = formData.documents
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const newService = {
      id: `srv-${Date.now()}`,
      name: formData.name,
      code: formData.code || formData.name.replace(/\s+/g, '-').toUpperCase().slice(0, 10),
      category: formData.category,
      price: Number(formData.price),
      sla: formData.sla,
      description: formData.description || 'Standard Chartered Accountant verified tax return preparation and CPC e-filing.',
      documents: docList.length > 0 ? docList : ['Form 16', 'Bank Statement'],
      status: 'Active',
      popular: false,
    };

    onAddService(newService);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Create Tax Advisory Service</h3>
            <p className="modal-subtitle">
              Add a new ITR filing tier, GST service, or advisory package to the catalog
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  borderRadius: '8px',
                  fontSize: '13px',
                  border: '1px solid #fecaca',
                }}
              >
                {error}
              </div>
            )}

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Service Title *</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '14px' }}
                  placeholder="e.g. ITR-U Updated Return"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Code</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '14px' }}
                  placeholder="e.g. ITR-U-UPDATE"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="filter-select"
                  style={{ width: '100%', height: '44px' }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Individual Tax">Individual Tax</option>
                  <option value="Business Tax">Business Tax</option>
                  <option value="International Tax">International Tax</option>
                  <option value="GST & Indirect Tax">GST & Indirect Tax</option>
                  <option value="Corporate Compliance">Corporate Compliance</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price (INR ₹) *</label>
                <input
                  type="number"
                  min="0"
                  className="form-input"
                  style={{ paddingLeft: '14px' }}
                  placeholder="2499"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">SLA Turnaround Guarantee</label>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '14px' }}
                placeholder="e.g. 24 - 48 Hours"
                value={formData.sla}
                onChange={(e) => setFormData({ ...formData, sla: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Documents (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '14px' }}
                placeholder="Form 16, AIS/TIS, 26AS, Bank Statements"
                value={formData.documents}
                onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Description</label>
              <textarea
                className="form-input"
                rows={3}
                style={{ height: 'auto', padding: '10px 14px' }}
                placeholder="Explain the coverage, eligibility, and CA verification scope..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              <Plus size={15} /> Save & Publish Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
