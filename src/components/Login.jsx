import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ onLoginSuccess, adminCredentials }) {
  const currentAdminUser = adminCredentials?.username || 'admin@biztax.com';
  const currentAdminPass = adminCredentials?.password || 'admin123';

  const [username, setUsername] = useState(currentAdminUser);
  const [password, setPassword] = useState(currentAdminPass);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username or registered email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (adminCredentials) {
        if (
          username.trim().toLowerCase() !== adminCredentials.username.toLowerCase() ||
          password !== adminCredentials.password
        ) {
          setError('Invalid credentials. Please verify your username and updated password.');
          return;
        }
      }

      onLoginSuccess({
        username: username.trim(),
        role: 'Super Admin',
        name: 'Admin Super',
        email: username.includes('@') ? username : `${username}@biztax.com`,
      });
    }, 300);
  };

  const handleFillDemo = () => {
    setUsername(currentAdminUser);
    setPassword(currentAdminPass);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Header: Exact match to uploaded reference */}
        <div className="login-header">
          <div className="login-logo">
            <div className="brand-monogram">
              <span className="b">B</span>
              <span className="t">T</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-name">biz tax</span>
              <span className="brand-sub">consultants</span>
            </div>
          </div>

          <h1 className="login-title">Tax Administrator Portal</h1>
          <p className="login-subtitle">
            Sign in to manage client tax returns, assign CAs, and oversee filings.
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '13px',
              border: '1px solid #fecaca',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username or Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username or Email
            </label>
            <div className="input-container">
              <span className="input-icon">
                <Mail size={18} strokeWidth={1.6} />
              </span>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="e.g. admin@biztax.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="form-label">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="link-btn"
                onClick={() => alert(`Active admin password: ${currentAdminPass}`)}
              >
                Forgot Password?
              </button>
            </div>
            <div className="input-container">
              <span className="input-icon">
                <Lock size={18} strokeWidth={1.6} />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="input-suffix-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.6} />
                ) : (
                  <Eye size={18} strokeWidth={1.6} />
                )}
              </button>
            </div>
          </div>

          {/* Remember this session */}
          <div className="form-row-space" style={{ margin: '2px 0 4px' }}>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-checkbox"
              />
              <span>Remember this session</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              'Authenticating...'
            ) : (
              <>
                Sign In to Dashboard <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Demo / Admin Access Card */}
        <div className="demo-credentials-card">
          <div className="demo-credentials-info">
            <span className="demo-credentials-title">ADMIN ACCESS</span>
            <span className="demo-credentials-text">
              User: <b>{currentAdminUser}</b> | Pass: <b>{currentAdminPass}</b>
            </span>
          </div>
          <button type="button" className="btn-fill-demo" onClick={handleFillDemo}>
            <span style={{ color: '#ea580c', marginRight: '3px' }}>⚡</span> Auto Fill
          </button>
        </div>
      </div>
    </div>
  );
}
