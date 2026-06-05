import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { adminLogin, memberLogin, memberRegister } from '../services/api';
import { useAuth } from '../context/AuthContext';

/* ─── Inline styles ────────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

const styles = `
  ${FONTS}

  .login-root *,
  .login-root *::before,
  .login-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    --violet: #7C3AED;
    --violet-light: #A78BFA;
    --violet-dark: #5B21B6;
    --rose: #F43F5E;
    --cream: #FDF8F3;
    --ink: #1A0A2E;
    --muted: #6B7280;
    --border: rgba(124,58,237,0.15);
    min-height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
  }

  /* — Blobs — */
  .lp-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
  .lp-blob-1 { width:500px;height:500px;background:rgba(167,139,250,0.18);top:-120px;left:-100px; }
  .lp-blob-2 { width:400px;height:400px;background:rgba(244,63,94,0.10);bottom:-80px;right:-80px; }
  .lp-blob-3 { width:260px;height:260px;background:rgba(124,58,237,0.12);top:40%;left:45%; }

  /* — Layout — */
  .lp-split {
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* — Brand panel — */
  .lp-brand {
    width: 42%;
    background: linear-gradient(145deg,#4C1D95 0%,#7C3AED 55%,#A855F7 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 52px;
    position: relative;
    overflow: hidden;
  }
  .lp-brand::before {
    content:'';
    position:absolute;
    inset:0;
    background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .lp-brand::after {
    content:'';
    position:absolute;
    width:340px;height:340px;
    border-radius:50%;
    border:1px solid rgba(255,255,255,0.12);
    bottom:-80px;right:-80px;
  }
  .lp-logo { display:flex;align-items:center;gap:12px; }
  .lp-logo-icon {
    width:42px;height:42px;
    background:rgba(255,255,255,0.15);
    border-radius:12px;
    display:flex;align-items:center;justify-content:center;
    font-size:22px;
    backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.2);
  }
  .lp-logo-text {
    font-family:'Playfair Display',serif;
    color:#fff;font-size:18px;font-weight:700;letter-spacing:0.3px;
  }
  .lp-brand-center { flex:1;display:flex;flex-direction:column;justify-content:center; }
  .lp-tagline {
    font-family:'Playfair Display',serif;
    font-size:clamp(28px,3.5vw,42px);
    color:#fff;line-height:1.25;font-weight:700;margin-bottom:20px;
  }
  .lp-tagline em { font-style:italic;color:rgba(255,255,255,0.75); }
  .lp-desc { color:rgba(255,255,255,0.65);font-size:15px;line-height:1.7;max-width:320px;font-weight:300; }
  .lp-stats { display:flex;gap:28px;padding-top:36px;border-top:1px solid rgba(255,255,255,0.15); }
  .lp-stat { color:#fff; }
  .lp-stat-num { font-family:'Playfair Display',serif;font-size:26px;font-weight:700;line-height:1; }
  .lp-stat-label { font-size:11px;color:rgba(255,255,255,0.55);text-transform:uppercase;letter-spacing:1px;margin-top:4px; }

  /* — Form panel — */
  .lp-form-panel {
    flex:1;
    display:flex;align-items:center;justify-content:center;
    padding:48px 40px;
    background:var(--cream);
  }
  .lp-form-card { width:100%;max-width:420px; }

  /* — Tab switcher — */
  .lp-tabs {
    display:flex;
    background:rgba(124,58,237,0.07);
    border-radius:14px;padding:5px;
    margin-bottom:38px;
    border:1px solid var(--border);
  }
  .lp-tab {
    flex:1;padding:11px 16px;
    border:none;background:transparent;border-radius:10px;
    cursor:pointer;
    font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;
    color:var(--muted);
    transition:all 0.25s ease;
    display:flex;align-items:center;justify-content:center;gap:7px;
  }
  .lp-tab.active {
    background:#fff;color:var(--violet);
    box-shadow:0 2px 10px rgba(124,58,237,0.12);
  }

  /* — Heading — */
  .lp-heading { margin-bottom:30px; }
  .lp-subtitle {
    font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;
    color:var(--violet);margin-bottom:8px;
  }
  .lp-title {
    font-family:'Playfair Display',serif;
    font-size:30px;color:var(--ink);font-weight:700;line-height:1.2;
  }
  .lp-hint { font-size:13.5px;color:var(--muted);margin-top:8px;font-weight:300; }

  /* — Fields — */
  .lp-field { margin-bottom:20px; }
  .lp-field label { display:block;font-size:12.5px;font-weight:500;color:var(--ink);margin-bottom:7px;letter-spacing:0.2px; }
  .lp-input-wrap { position:relative; }
  .lp-input-icon { position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:15px;opacity:0.45;pointer-events:none; }
  .lp-field input {
    width:100%;padding:12px 14px 12px 40px;
    background:#fff;border:1.5px solid var(--border);border-radius:12px;
    font-family:'DM Sans',sans-serif;font-size:14px;color:var(--ink);
    outline:none;transition:border 0.2s,box-shadow 0.2s;
  }
  .lp-field input:focus { border-color:var(--violet);box-shadow:0 0 0 3px rgba(124,58,237,0.10); }
  .lp-field input::placeholder { color:#C4B5CC;font-weight:300; }
  .lp-eye {
    position:absolute;right:14px;top:50%;transform:translateY(-50%);
    background:none;border:none;cursor:pointer;font-size:15px;
    opacity:0.4;transition:opacity 0.2s;padding:0;line-height:1;
  }
  .lp-eye:hover { opacity:0.75; }

  /* — Role badge — */
  .lp-role-badge {
    display:inline-flex;align-items:center;gap:6px;
    background:rgba(244,63,94,0.08);border:1px solid rgba(244,63,94,0.2);
    border-radius:20px;padding:5px 12px;
    font-size:12px;font-weight:500;color:var(--rose);margin-bottom:24px;
  }

  /* — Forgot — */
  .lp-forgot-row { display:flex;justify-content:flex-end;margin-top:-10px;margin-bottom:22px; }
  .lp-forgot { font-size:12.5px;color:var(--violet);text-decoration:none;font-weight:500;transition:opacity 0.2s; }
  .lp-forgot:hover { opacity:0.7; }

  /* — Submit — */
  .lp-submit {
    width:100%;padding:14px;
    background:linear-gradient(135deg,var(--violet) 0%,#A855F7 100%);
    color:#fff;border:none;border-radius:12px;
    font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;
    cursor:pointer;transition:all 0.25s ease;
    display:flex;align-items:center;justify-content:center;gap:8px;
    letter-spacing:0.2px;position:relative;overflow:hidden;
  }
  .lp-submit::before {
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,#5B21B6 0%,var(--violet) 100%);
    opacity:0;transition:opacity 0.25s;
  }
  .lp-submit:hover::before { opacity:1; }
  .lp-submit:active { transform:scale(0.98); }
  .lp-submit span,.lp-submit svg { position:relative;z-index:1; }
  .lp-submit:disabled { pointer-events:none;opacity:0.8; }

  /* — Spinner — */
  .lp-spinner {
    width:16px;height:16px;
    border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;
    border-radius:50%;
    animation:lp-spin 0.7s linear infinite;
    position:relative;z-index:1;
  }
  @keyframes lp-spin { to { transform:rotate(360deg); } }

  /* — Banner — */
  .lp-banner {
    padding:12px 16px;border-radius:10px;font-size:13.5px;
    margin-bottom:20px;
    display:flex;align-items:center;gap:8px;
    animation:lp-fadein 0.3s ease;
  }
  .lp-banner.error { background:rgba(244,63,94,0.08);color:#BE123C;border:1px solid rgba(244,63,94,0.2); }
  .lp-banner.success { background:rgba(124,58,237,0.07);color:var(--violet-dark);border:1px solid rgba(124,58,237,0.15); }
  @keyframes lp-fadein { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }

  /* — Divider — */
  .lp-divider { display:flex;align-items:center;gap:12px;margin:24px 0; }
  .lp-divider::before,.lp-divider::after { content:'';flex:1;height:1px;background:var(--border); }
  .lp-divider span { font-size:12px;color:var(--muted);white-space:nowrap;font-weight:400; }

  /* — Mobile number prefix — */
  .lp-country-code {
    position:absolute;left:38px;top:50%;transform:translateY(-50%);
    font-size:14px;color:var(--ink);font-weight:500;pointer-events:none;
    opacity:0.7;
  }
  .lp-field input[name="mobile"] { padding-left:72px; }

  .lp-demo {
    width:100%;padding:12px;
    background:#fff;border:1.5px solid var(--border);border-radius:12px;
    font-family:'DM Sans',sans-serif;font-size:13.5px;color:var(--ink);
    cursor:pointer;transition:all 0.2s;
    display:flex;align-items:center;justify-content:center;gap:8px;font-weight:400;
  }
  .lp-demo:hover { border-color:var(--violet-light);background:rgba(124,58,237,0.03); }

  /* — Footer — */
  .lp-footer { text-align:center;margin-top:28px;font-size:12.5px;color:var(--muted); }
  .lp-footer a { color:var(--violet);text-decoration:none;font-weight:500; }

  /* — Success — */
  .lp-success {
    text-align:center;padding:40px 20px;
    animation:lp-fadein 0.4s ease;
  }
  .lp-success-circle {
    width:80px;height:80px;
    background:linear-gradient(135deg,var(--violet),#A855F7);
    border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:36px;
    margin:0 auto 24px;
    box-shadow:0 12px 32px rgba(124,58,237,0.25);
  }
  .lp-success-title { font-family:'Playfair Display',serif;font-size:26px;color:var(--ink);margin-bottom:10px; }
  .lp-success-msg { font-size:14px;color:var(--muted);line-height:1.6;font-weight:300; }

  /* — Responsive — */
  @media (max-width:768px) {
    .lp-split { flex-direction:column; }
    .lp-brand { width:100%;padding:36px 28px;min-height:auto; }
    .lp-tagline { font-size:26px; }
    .lp-stats { gap:20px; }
    .lp-form-panel { padding:36px 24px; }
    .lp-blob-1 { width:300px;height:300px; }
    .lp-blob-2 { width:250px;height:250px; }
  }
`;

/* ─── Member Login Form ──────────────────────────────────────────────────────── */
function UserLoginForm() {
  const navigate  = useNavigate();
  const [mobile,   setMobile]   = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!mobile || mobile.length !== 10) { setError('Please enter a valid 10-digit mobile number.'); return; }
    if (!password)                        { setError('Please enter a password.'); return; }
    if (password.length < 6)             { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      let data;
      try {
        // Try login — existing user must match their saved password
        ({ data } = await memberLogin({ mobile, password }));
      } catch (loginErr) {
        const status = loginErr.response?.status;
        if (status === 401) {
          // Wrong password for existing account
          setError('Incorrect password. Please try again.');
          setLoading(false);
          return;
        }
        // 404 = no account yet → register (first time)
        ({ data } = await memberRegister({ mobile, password }));
      }
      localStorage.setItem('sc_token', data.token);
      sessionStorage.setItem('sc_mobile', mobile);
      toast.success(data.user?.name ? `Welcome, ${data.user.name}! 🌸` : 'Welcome! 🌸');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="lp-heading">
        <p className="lp-subtitle">Member Portal</p>
        <h1 className="lp-title">Sign in to<br />your account</h1>
        <p className="lp-hint">New here? Enter any password to create your account.</p>
      </div>

      {error && <div className="lp-banner error">⚠ {error}</div>}

      {/* Mobile */}
      <div className="lp-field">
        <label htmlFor="user-mobile">Mobile Number</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">📱</span>
          <span className="lp-country-code">+91</span>
          <input
            id="user-mobile"
            type="tel"
            name="mobile"
            placeholder="98765 43210"
            value={mobile}
            onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            maxLength={10}
            inputMode="numeric"
            autoFocus
          />
        </div>
      </div>

      {/* Password */}
      <div className="lp-field">
        <label htmlFor="user-password">Password</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔒</span>
          <input
            id="user-password"
            type={showPw ? 'text' : 'password'}
            name="password"
            placeholder="Enter or create a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="button" className="lp-eye" onClick={() => setShowPw(!showPw)}>
            {showPw ? '🙈' : '👁'}
          </button>
        </div>
      </div>

      <div className="lp-forgot-row">
        <a href="#" className="lp-forgot">Forgot password?</a>
      </div>

      <button type="submit" className="lp-submit" disabled={loading}>
        {loading
          ? <><div className="lp-spinner" /><span>Please wait…</span></>
          : <span>Sign In →</span>}
      </button>

      <p className="lp-footer">
        First time? Just enter your mobile + choose a password to get started.
      </p>
    </form>
  );
}

/* ─── Admin Login Form ───────────────────────────────────────────────────────── */
function AdminLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Admin credentials are required.'); return; }
    if (!/\S+@\S+\.\S+/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    setLoading(true);
    try {
      const { data } = await adminLogin(form);
      login(data.token, data.user);
      setSuccess(true);
      toast.success('Welcome back, Administrator!');
      setTimeout(() => navigate('/admin/dashboard'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => setForm({ email: 'admin@shecanfoundation.org', password: 'admin@123' });

  if (success) return (
    <div className="lp-success">
      <div className="lp-success-circle">🛡</div>
      <h2 className="lp-success-title">Access Granted</h2>
      <p className="lp-success-msg">Welcome back, Administrator.<br />Redirecting to the dashboard…</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="lp-heading">
        <p className="lp-subtitle">Admin Portal</p>
        <h1 className="lp-title">Dashboard<br />Access</h1>
        <p className="lp-hint">Restricted to authorized personnel only.</p>
      </div>

      <div className="lp-role-badge">🛡 Administrator Access</div>

      {error && <div className="lp-banner error">⚠ {error}</div>}

      <div className="lp-field">
        <label htmlFor="admin-email">Admin Email</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">✉</span>
          <input id="admin-email" type="email" name="email" placeholder="admin@shecanfoundation.org" value={form.email} onChange={handleChange} />
        </div>
      </div>

      <div className="lp-field">
        <label htmlFor="admin-password">Admin Password</label>
        <div className="lp-input-wrap">
          <span className="lp-input-icon">🔑</span>
          <input id="admin-password" type={showPw ? 'text' : 'password'} name="password" placeholder="Enter admin password" value={form.password} onChange={handleChange} />
          <button type="button" className="lp-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
        </div>
      </div>

      <div className="lp-forgot-row">
        <a href="#" className="lp-forgot">Contact super admin</a>
      </div>

      <button type="submit" className="lp-submit" disabled={loading}>
        {loading ? <><div className="lp-spinner" /><span>Authenticating…</span></> : <span>Access Dashboard →</span>}
      </button>

      <div className="lp-divider"><span>demo credentials</span></div>
      <button type="button" className="lp-demo" onClick={fillDemo}>⚡ <span>Fill demo credentials</span></button>

      <p className="lp-footer">Not an admin? <a href="/login">Go to member login</a></p>
    </form>
  );
}

/* ─── Root Component ─────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState('user');

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  return (
    <>
      <Helmet>
        <title>Sign In — She Can Foundation</title>
        <meta name="description" content="Sign in to your She Can Foundation member account or access the admin dashboard." />
      </Helmet>

      <style>{styles}</style>

      <div className="login-root">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />

        <div className="lp-split">
          {/* ── Brand panel ── */}
          <div className="lp-brand">
            <div className="lp-logo">
              <div className="lp-logo-icon">🌸</div>
              <span className="lp-logo-text">She Can Foundation</span>
            </div>

            <div className="lp-brand-center">
              <h2 className="lp-tagline">
                Every woman <em>deserves</em> the chance to rise.
              </h2>
              <p className="lp-desc">
                We equip women with education, technology skills, and community
                support to build lives of independence and impact.
              </p>
            </div>

            <div className="lp-stats">
              <div className="lp-stat">
                <div className="lp-stat-num">5,200+</div>
                <div className="lp-stat-label">Women Supported</div>
              </div>
              <div className="lp-stat">
                <div className="lp-stat-num">320</div>
                <div className="lp-stat-label">Workshops</div>
              </div>
              <div className="lp-stat">
                <div className="lp-stat-num">48</div>
                <div className="lp-stat-label">Communities</div>
              </div>
            </div>
          </div>

          {/* ── Form panel ── */}
          <div className="lp-form-panel">
            <div className="lp-form-card">
              {/* Tab switcher */}
              <div className="lp-tabs">
                <button
                  type="button"
                  className={`lp-tab ${tab === 'user' ? 'active' : ''}`}
                  onClick={() => setTab('user')}
                  id="tab-member"
                >
                  👤 Member Login
                </button>
                <button
                  type="button"
                  className={`lp-tab ${tab === 'admin' ? 'active' : ''}`}
                  onClick={() => setTab('admin')}
                  id="tab-admin"
                >
                  🛡 Admin Login
                </button>
              </div>

              {tab === 'user' ? <UserLoginForm key="user" /> : <AdminLoginForm key="admin" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
