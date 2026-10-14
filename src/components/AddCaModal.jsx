import React, { useState } from 'react';
import { X, UserPlus, Eye, EyeOff } from 'lucide-react';

export default function AddCaModal({ isOpen, onClose, onAddCa }) {
  const [formData, setFormData] = useState({
    name: '',
    membershipNo: '',
    qualification: 'FCA, B.Com',
    specialization: 'Personal ITR & Capital Gains',
    experienceYears: 5,
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    maxCapacity: 15,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide the Chartered Accountant’s name.');
      return;
    }
    if (!formData.membershipNo.trim()) {
      setError('Please enter the valid ICAI Membership Number.');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter contact email address.');
      return;
    }
    if (!formData.password) {
      setError('Please enter an account password for this CA.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    const newCa = {
      id: `ca-${Date.now()}`,
      name: formData.name.startsWith('CA ') ? formData.name : `CA ${formData.name}`,
      membershipNo: formData.membershipNo.toUpperCase(),
      qualification: formData.qualification,
      specialization: formData.specialization,
      experienceYears: Number(formData.experienceYears) || 5,
      email: formData.email,
      phone: formData.phone || '+91 98000 00000',
      password: formData.password,
      activeCases: 0,
      maxCapacity: Number(formData.maxCapacity) || 15,
      rating: 5.0,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      joinedDate: 'Just Now',
    };

    onAddCa(newCa);
    setFormData({
      name: '',
      membershipNo: '',
      qualification: 'FCA, B.Com',
      specialization: 'Personal ITR & Capital Gains',
      experienceYears: 5,
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      maxCapacity: 15,
    });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Register Chartered Accountant</h3>
            <p className="modal-subtitle">
              Onboard a certified CA to receive and review taxpayer return files
            </p>
          </div>
          <button type="button" className="modal-close-btn" onClick={handleClose}>
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
                  fontWeight: '600',
                }}
              >
                {error}
              </div>
            )}

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  placeholder="e.g. Vikram Mehra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">ICAI Membership No *</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  placeholder="e.g. ICAI-589201"
                  value={formData.membershipNo}
                  onChange={(e) => setFormData({ ...formData, membershipNo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  placeholder="e.g. FCA, DISA, CS"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Specialization Domain</label>
              <select
                className="filter-select"
                style={{ width: '100%', height: '42px' }}
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              >
                <option value="Personal ITR & Capital Gains">Personal ITR & Capital Gains</option>
                <option value="Corporate Tax, High Net-Worth & NRI">Corporate Tax, High Net-Worth & NRI</option>
                <option value="Business Tax, Statutory Audits & GST Appeals">
                  Business Tax, Statutory Audits & GST Appeals
                </option>
                <option value="Salaried Returns, Freelance 44ADA & TDS">
                  Salaried Returns, Freelance 44ADA & TDS
                </option>
                <option value="International Tax & Transfer Pricing">International Tax & Transfer Pricing</option>
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Official Email *</label>
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  placeholder="ca.name@biztax.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: '14px', height: '42px' }}
                  placeholder="+91 98450 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Account Password *</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    style={{ paddingLeft: '14px', paddingRight: '40px', height: '42px' }}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-suffix-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div className="input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-input"
                    style={{ paddingLeft: '14px', paddingRight: '40px', height: '42px' }}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="input-suffix-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Maximum Case Capacity</label>
              <input
                type="number"
                min="5"
                max="50"
                className="form-input"
                style={{ paddingLeft: '14px', height: '42px' }}
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
              />
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                Default limit of active cases assigned simultaneously
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-action">
              <UserPlus size={15} /> Save & Register CA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
