import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.db-root {
  --violet: #7C3AED;
  --violet-light: #A78BFA;
  --violet-dark: #5B21B6;
  --rose: #F43F5E;
  --amber: #F59E0B;
  --emerald: #10B981;
  --cream: #FDF8F3;
  --ink: #1A0A2E;
  --muted: #6B7280;
  --card: #FFFFFF;
  --border: rgba(124,58,237,0.10);
  font-family: 'DM Sans', sans-serif;
  background: #F5F3FF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Topbar ── */
.db-topbar {
  background: #fff;
  border-bottom: 1px solid rgba(124,58,237,0.08);
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 12px rgba(124,58,237,0.06);
}
.db-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.db-brand-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #7C3AED, #A855F7);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(124,58,237,0.25);
}
.db-brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
}
.db-topbar-right { display: flex; align-items: center; gap: 14px; }
.db-notif {
  width: 38px; height: 38px;
  background: #F5F3FF;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 17px;
  position: relative;
  transition: background 0.2s;
}
.db-notif:hover { background: #EDE9FE; }
.db-notif-dot {
  position: absolute;
  top: 7px; right: 8px;
  width: 7px; height: 7px;
  background: var(--rose);
  border-radius: 50%;
  border: 1.5px solid #fff;
}
.db-avatar {
  width: 38px; height: 38px;
  background: linear-gradient(135deg, #7C3AED, #A855F7);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid rgba(124,58,237,0.2);
  transition: transform 0.2s;
}
.db-avatar:hover { transform: scale(1.05); }
.db-logout {
  padding: 8px 16px;
  background: transparent;
  border: 1.5px solid rgba(244,63,94,0.25);
  border-radius: 10px;
  color: var(--rose);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.db-logout:hover { background: rgba(244,63,94,0.06); border-color: var(--rose); }

/* ── Main layout ── */
.db-body { display: flex; flex: 1; }

/* ── Sidebar ── */
.db-sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid rgba(124,58,237,0.08);
  padding: 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: calc(100vh - 64px);
}
.db-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  transition: all 0.18s;
}
.db-nav-item:hover { background: #F5F3FF; color: var(--violet); }
.db-nav-item.active { background: #EDE9FE; color: var(--violet); font-weight: 600; }
.db-nav-icon { font-size: 17px; }
.db-nav-section {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #C4B5CC;
  padding: 14px 14px 6px;
}

/* ── Main content ── */
.db-main { flex: 1; padding: 32px; overflow-y: auto; }

/* ── Hero welcome ── */
.db-welcome {
  background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #A855F7 100%);
  border-radius: 20px;
  padding: 32px 36px;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.db-welcome::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.db-welcome-blob {
  position: absolute;
  width: 200px; height: 200px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  top: -60px; right: -40px;
}
.db-welcome-left { position: relative; z-index: 1; }
.db-welcome-tag {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 8px;
}
.db-welcome-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 10px;
}
.db-welcome-title em { font-style: italic; color: rgba(255,255,255,0.75); }
.db-welcome-sub { font-size: 14px; color: rgba(255,255,255,0.65); font-weight: 300; }
.db-welcome-right { position: relative; z-index: 1; font-size: 72px; opacity: 0.85; }

/* ── Stats grid ── */
.db-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.db-stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 22px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 1px 8px rgba(124,58,237,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
.db-stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(124,58,237,0.10); }
.db-stat-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.db-stat-icon.violet { background: #EDE9FE; }
.db-stat-icon.rose   { background: #FFF1F2; }
.db-stat-icon.amber  { background: #FEF3C7; }
.db-stat-icon.green  { background: #D1FAE5; }
.db-stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1;
}
.db-stat-label { font-size: 12px; color: var(--muted); margin-top: 3px; }

/* ── Two-col grid ── */
.db-grid-2 { display: grid; grid-template-columns: 1fr 340px; gap: 20px; margin-bottom: 28px; }

/* ── Card base ── */
.db-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 8px rgba(124,58,237,0.05);
  overflow: hidden;
}
.db-card-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.db-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
}
.db-card-link {
  font-size: 12.5px;
  color: var(--violet);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}
.db-card-link:hover { opacity: 0.7; }

/* ── Programs list ── */
.db-prog-item {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid rgba(124,58,237,0.05);
  transition: background 0.15s;
  cursor: pointer;
}
.db-prog-item:last-child { border-bottom: none; }
.db-prog-item:hover { background: #FAFAFA; }
.db-prog-icon {
  width: 42px; height: 42px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}
.db-prog-info { flex: 1; }
.db-prog-name { font-size: 14px; font-weight: 600; color: var(--ink); }
.db-prog-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
.db-prog-badge {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
}
.db-prog-badge.active { background: #D1FAE5; color: #065F46; }
.db-prog-badge.upcoming { background: #FEF3C7; color: #92400E; }
.db-prog-badge.new { background: #EDE9FE; color: var(--violet-dark); }

/* ── Announcements ── */
.db-ann-item {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(124,58,237,0.05);
  display: flex;
  gap: 12px;
}
.db-ann-item:last-child { border-bottom: none; }
.db-ann-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}
.db-ann-dot.rose { background: var(--rose); }
.db-ann-dot.violet { background: var(--violet); }
.db-ann-dot.amber { background: var(--amber); }
.db-ann-text { font-size: 13.5px; color: var(--ink); font-weight: 500; line-height: 1.5; }
.db-ann-time { font-size: 11.5px; color: var(--muted); margin-top: 3px; }

/* ── Quick Actions ── */
.db-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 28px; }
.db-action-btn {
  background: #fff;
  border: 1.5px solid var(--border);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
}
.db-action-btn:hover {
  border-color: var(--violet-light);
  background: #F5F3FF;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(124,58,237,0.10);
}
.db-action-ico { font-size: 26px; }
.db-action-label { font-size: 13px; font-weight: 500; color: var(--ink); text-align: center; }

/* ── Progress ── */
.db-progress-wrap { padding: 20px 24px; }
.db-progress-item { margin-bottom: 18px; }
.db-progress-item:last-child { margin-bottom: 0; }
.db-progress-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
.db-progress-label { font-size: 13.5px; font-weight: 500; color: var(--ink); }
.db-progress-pct { font-size: 13px; font-weight: 600; color: var(--violet); }
.db-progress-bar { height: 7px; background: #EDE9FE; border-radius: 10px; overflow: hidden; }
.db-progress-fill { height: 100%; border-radius: 10px; transition: width 0.6s ease; }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .db-stats { grid-template-columns: repeat(2, 1fr); }
  .db-grid-2 { grid-template-columns: 1fr; }
  .db-actions { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .db-sidebar { display: none; }
  .db-main { padding: 16px; }
  .db-topbar { padding: 0 16px; }
  .db-welcome { padding: 22px 20px; }
  .db-welcome-title { font-size: 22px; }
  .db-welcome-right { display: none; }
}
`;

const PROGRAMS = [
  { icon: '💻', bg: '#EDE9FE', name: 'Digital Literacy Bootcamp', meta: '12 sessions · Cohort 4', badge: 'active' },
  { icon: '🎤', bg: '#FFF1F2', name: 'Public Speaking Masterclass', meta: 'Starts Jun 15', badge: 'upcoming' },
  { icon: '💼', bg: '#D1FAE5', name: 'Entrepreneurship 101', meta: 'New program', badge: 'new' },
  { icon: '📊', bg: '#FEF3C7', name: 'Financial Independence', meta: 'Self-paced', badge: 'active' },
];

const ANNOUNCEMENTS = [
  { dot: 'rose',   text: 'New scholarship applications are open until June 30th.', time: '2 hours ago' },
  { dot: 'violet', text: 'Your Digital Literacy module 3 certificate is ready to download.', time: 'Yesterday' },
  { dot: 'amber',  text: 'Community meetup scheduled for June 20 in Sector 14.', time: '3 days ago' },
];

const QUICK_ACTIONS = [
  { icon: '📚', label: 'My Courses' },
  { icon: '🏆', label: 'Certificates' },
  { icon: '💬', label: 'Community' },
  { icon: '🤝', label: 'Mentorship' },
];

const SKILLS = [
  { label: 'Digital Literacy', pct: 72, color: 'linear-gradient(90deg,#7C3AED,#A855F7)' },
  { label: 'Communication',    pct: 55, color: 'linear-gradient(90deg,#F43F5E,#FB7185)' },
  { label: 'Financial Skills', pct: 40, color: 'linear-gradient(90deg,#F59E0B,#FCD34D)' },
  { label: 'Leadership',       pct: 28, color: 'linear-gradient(90deg,#10B981,#6EE7B7)' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');

  // Get stored user info (mobile number saved at login)
  const mobile = sessionStorage.getItem('sc_mobile') || '';
  const initials = mobile ? mobile.slice(-2) : 'SC';

  const handleLogout = () => {
    sessionStorage.removeItem('sc_mobile');
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard — She Can Foundation</title>
        <meta name="description" content="Your She Can Foundation member dashboard — track programs, certificates, and progress." />
      </Helmet>

      <style>{styles}</style>

      <div className="db-root">
        {/* ── Top Bar ── */}
        <header className="db-topbar">
          <a className="db-brand" href="/home">
            <div className="db-brand-icon">🌸</div>
            <span className="db-brand-name">She Can Foundation</span>
          </a>
          <div className="db-topbar-right">
            <button className="db-notif" title="Notifications">
              🔔
              <span className="db-notif-dot" />
            </button>
            <div className="db-avatar" title={`+91 ${mobile}`}>{initials}</div>
            <button className="db-logout" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className="db-body">
          {/* ── Sidebar ── */}
          <aside className="db-sidebar">
            <span className="db-nav-section">Main</span>
            {['Dashboard', 'My Programs', 'Progress', 'Certificates'].map(item => (
              <button
                key={item}
                className={`db-nav-item ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                <span className="db-nav-icon">
                  {item === 'Dashboard'    ? '🏠' :
                   item === 'My Programs'  ? '📚' :
                   item === 'Progress'     ? '📈' : '🏆'}
                </span>
                {item}
              </button>
            ))}
            <span className="db-nav-section">Community</span>
            {['Forum', 'Mentorship', 'Events'].map(item => (
              <button
                key={item}
                className={`db-nav-item ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                <span className="db-nav-icon">
                  {item === 'Forum'      ? '💬' :
                   item === 'Mentorship' ? '🤝' : '📅'}
                </span>
                {item}
              </button>
            ))}
            <span className="db-nav-section">Account</span>
            {['Profile', 'Settings'].map(item => (
              <button
                key={item}
                className={`db-nav-item ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
              >
                <span className="db-nav-icon">{item === 'Profile' ? '👤' : '⚙️'}</span>
                {item}
              </button>
            ))}
          </aside>

          {/* ── Main ── */}
          <main className="db-main">
            {/* Welcome Banner */}
            <div className="db-welcome">
              <div className="db-welcome-blob" />
              <div className="db-welcome-left">
                <p className="db-welcome-tag">Member Dashboard</p>
                <h1 className="db-welcome-title">
                  Welcome back, <em>She Can!</em>
                </h1>
                <p className="db-welcome-sub">
                  +91 {mobile} · Continue your journey today 🌸
                </p>
              </div>
              <div className="db-welcome-right">🌸</div>
            </div>

            {/* Stats */}
            <div className="db-stats">
              {[
                { icon: '📚', bg: 'violet', value: '4',   label: 'Active Programs' },
                { icon: '🏆', bg: 'green',  value: '2',   label: 'Certificates' },
                { icon: '⭐', bg: 'amber',  value: '87%', label: 'Avg. Progress' },
                { icon: '📅', bg: 'rose',   value: '3',   label: 'Upcoming Events' },
              ].map(s => (
                <div className="db-stat-card" key={s.label}>
                  <div className={`db-stat-icon ${s.bg}`}>{s.icon}</div>
                  <div>
                    <div className="db-stat-value">{s.value}</div>
                    <div className="db-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="db-actions">
              {QUICK_ACTIONS.map(a => (
                <button className="db-action-btn" key={a.label}>
                  <span className="db-action-ico">{a.icon}</span>
                  <span className="db-action-label">{a.label}</span>
                </button>
              ))}
            </div>

            {/* Programs + Announcements */}
            <div className="db-grid-2">
              {/* Programs */}
              <div className="db-card">
                <div className="db-card-header">
                  <span className="db-card-title">My Programs</span>
                  <span className="db-card-link">View all →</span>
                </div>
                {PROGRAMS.map(p => (
                  <div className="db-prog-item" key={p.name}>
                    <div className="db-prog-icon" style={{ background: p.bg }}>{p.icon}</div>
                    <div className="db-prog-info">
                      <div className="db-prog-name">{p.name}</div>
                      <div className="db-prog-meta">{p.meta}</div>
                    </div>
                    <span className={`db-prog-badge ${p.badge}`}>
                      {p.badge === 'active' ? 'Active' : p.badge === 'upcoming' ? 'Upcoming' : 'New'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Announcements + Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* Announcements */}
                <div className="db-card">
                  <div className="db-card-header">
                    <span className="db-card-title">Announcements</span>
                    <span className="db-card-link">All</span>
                  </div>
                  {ANNOUNCEMENTS.map((a, i) => (
                    <div className="db-ann-item" key={i}>
                      <div className={`db-ann-dot ${a.dot}`} />
                      <div>
                        <div className="db-ann-text">{a.text}</div>
                        <div className="db-ann-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skill Progress */}
                <div className="db-card">
                  <div className="db-card-header">
                    <span className="db-card-title">Skill Progress</span>
                  </div>
                  <div className="db-progress-wrap">
                    {SKILLS.map(s => (
                      <div className="db-progress-item" key={s.label}>
                        <div className="db-progress-row">
                          <span className="db-progress-label">{s.label}</span>
                          <span className="db-progress-pct">{s.pct}%</span>
                        </div>
                        <div className="db-progress-bar">
                          <div className="db-progress-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
