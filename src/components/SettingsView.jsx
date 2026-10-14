import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Save,
} from 'lucide-react';

export default function SettingsView({
  adminCredentials,
  onUpdateCredentials,
  onShowToast,
}) {
  // Credentials state
  const currentUsername = adminCredentials?.username || 'admin@biztax.com';
  const currentPassword = adminCredentials?.password || 'admin123';

  // Toggle visibility of current password card
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Username editing state
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(currentUsername);

  // Update password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPasswordInput: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentInput, setShowCurrentInput] = useState(false);
  const [showNewInput, setShowNewInput] = useState(false);
  const [showConfirmInput, setShowConfirmInput] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle Username update
  const handleSaveUsername = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setErrorMessage('Username/Email cannot be empty.');
      return;
    }
    if (onUpdateCredentials) {
      onUpdateCredentials({
        username: usernameInput.trim(),
        password: currentPassword,
      });
    }
    setIsEditingUsername(false);
    setSuccessMessage('Username updated successfully!');
    if (onShowToast) onShowToast('Admin username updated!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Handle Password update
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!passwordForm.currentPasswordInput) {
      setErrorMessage('Please enter your current password.');
      return;
    }

    if (passwordForm.currentPasswordInput !== currentPassword) {
      setErrorMessage('Incorrect current password. Please verify and try again.');
      return;
    }

    if (!passwordForm.newPassword) {
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('New password and confirmation password do not match.');
      return;
    }

    if (onUpdateCredentials) {
      onUpdateCredentials({
        username: currentUsername,
        password: passwordForm.newPassword,
      });
    }

    setPasswordForm({
      currentPasswordInput: '',
      newPassword: '',
      confirmPassword: '',
    });

    setSuccessMessage('Password updated successfully! Use new credentials on next login.');
    if (onShowToast) onShowToast('Password updated successfully!');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="view-container" style={{ gap: '12px' }}>
      {/* Header */}
      <div className="view-header" style={{ marginBottom: '0px' }}>
        <div>
          <h1 className="view-header-title" style={{ fontSize: '18px' }}>
            Admin Account & Credentials
          </h1>
          <p className="view-header-sub" style={{ fontSize: '12px' }}>
            Manage your admin access credentials, view active credentials, and update your password
          </p>
        </div>
      </div>

      {/* Feedback Messages */}
      {errorMessage && (
        <div
          style={{
            padding: '8px 14px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            borderRadius: '6px',
            fontSize: '12.5px',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={15} />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          style={{
            padding: '8px 14px',
            backgroundColor: '#ecfdf5',
            color: '#059669',
            borderRadius: '6px',
            fontSize: '12.5px',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={15} />
          <span>{successMessage}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
        {/* Card 1: Current Admin Credentials */}
        <div className="panel-card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
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
              <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: '#0f172a' }}>
                Current Administrator Profile
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Active login credentials for this admin portal
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Username Row */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Admin Username / Email
                </span>
                <button
                  type="button"
                  style={{ fontSize: '11.5px', color: '#2563eb', fontWeight: '600' }}
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                >
                  {isEditingUsername ? 'Cancel' : 'Change Username'}
                </button>
              </div>

              {isEditingUsername ? (
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    style={{ paddingLeft: '12px', height: '36px', fontSize: '13px' }}
                  />
                  <button
                    type="button"
                    className="btn-primary-action"
                    style={{ height: '36px', padding: '0 12px', fontSize: '12.5px' }}
                    onClick={handleSaveUsername}
                  >
                    <Save size={13} /> Save
                  </button>
                </div>
              ) : (
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                  {currentUsername}
                </div>
              )}
            </div>

            {/* Current Password Display */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Current Active Password
                </span>
                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11.5px',
                    color: '#2563eb',
                    fontWeight: '600',
                  }}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <>
                      <EyeOff size={13} /> Hide
                    </>
                  ) : (
                    <>
                      <Eye size={13} /> Show Password
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  fontFamily: showCurrentPassword ? 'inherit' : 'monospace',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#0f172a',
                  letterSpacing: showCurrentPassword ? 'normal' : '3px',
                }}
              >
                {showCurrentPassword ? currentPassword : '••••••••••••'}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Update Password Form */}
        <div className="panel-card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#faf5ff',
                color: '#7e22ce',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <KeyRound size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '14.5px', fontWeight: '700', color: '#0f172a' }}>
                Update Admin Password
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Change your security credentials for portal access
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Current Password Field */}
            <div className="form-group" style={{ gap: '3px' }}>
              <label className="form-label" style={{ fontSize: '12px' }}>Current Password *</label>
              <div className="input-container">
                <span className="input-icon">
                  <Lock size={14} />
                </span>
                <input
                  type={showCurrentInput ? 'text' : 'password'}
                  className="form-input"
                  style={{ height: '36px', fontSize: '13px' }}
                  placeholder="Enter current password"
                  value={passwordForm.currentPasswordInput}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPasswordInput: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="input-suffix-btn"
                  onClick={() => setShowCurrentInput(!showCurrentInput)}
                >
                  {showCurrentInput ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* New Password & Confirm Password in 2-column grid */}
            <div className="form-grid-2" style={{ gap: '10px' }}>
              <div className="form-group" style={{ gap: '3px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>New Password *</label>
                <div className="input-container">
                  <span className="input-icon">
                    <KeyRound size={14} />
                  </span>
                  <input
                    type={showNewInput ? 'text' : 'password'}
                    className="form-input"
                    style={{ height: '36px', fontSize: '13px' }}
                    placeholder="Min. 6 chars"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="input-suffix-btn"
                    onClick={() => setShowNewInput(!showNewInput)}
                  >
                    {showNewInput ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ gap: '3px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Confirm Password *</label>
                <div className="input-container">
                  <span className="input-icon">
                    <CheckCircle2 size={14} />
                  </span>
                  <input
                    type={showConfirmInput ? 'text' : 'password'}
                    className="form-input"
                    style={{ height: '36px', fontSize: '13px' }}
                    placeholder="Re-type password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="input-suffix-btn"
                    onClick={() => setShowConfirmInput(!showConfirmInput)}
                  >
                    {showConfirmInput ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '2px', height: '38px', fontSize: '13px' }}
            >
              <Lock size={14} /> Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
