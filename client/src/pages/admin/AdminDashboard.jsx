import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getSubmissions, deleteSubmission, getDonations } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import useDebounce from '../../hooks/useDebounce';

const ITEMS_PER_PAGE = 10;

// Confirmation Modal
const DeleteModal = ({ submission, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 className="font-display text-lg font-bold text-gray-900 text-center mb-2">Delete Submission</h3>
      <p className="text-gray-600 text-sm text-center mb-6">
        Are you sure you want to delete the submission from <strong>{submission?.name}</strong>? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-xl transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' or 'donations'

  // Submissions state
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Donations state
  const [donations, setDonations] = useState([]);
  const [donationPage, setDonationPage] = useState(1);
  const [donationPagination, setDonationPagination] = useState({ pages: 1, total: 0 });
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'submissions') {
        const { data } = await getSubmissions({ page, limit: ITEMS_PER_PAGE, search: debouncedSearch });
        setSubmissions(data.data);
        setPagination(data.pagination);
        setStats(data.stats);
      } else {
        const { data } = await getDonations({ page: donationPage, limit: ITEMS_PER_PAGE, search: debouncedSearch });
        setDonations(data.donations);
        setDonationPagination({ pages: data.pages, total: data.total });
        setTotalDonationAmount(data.totalDonationAmount);
      }
    } catch (err) {
      toast.error(`Failed to load ${activeTab}.`);
    } finally {
      setLoading(false);
    }
  }, [page, donationPage, debouncedSearch, activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset page numbers when tab or search changes
  useEffect(() => {
    setPage(1);
    setDonationPage(1);
  }, [activeTab, debouncedSearch]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully.');
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteSubmission(deleteTarget._id);
      toast.success('Submission deleted.');
      setDeleteTarget(null);
      fetchData();
    } catch {
      toast.error('Failed to delete submission.');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {deleteTarget && (
        <DeleteModal
          submission={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <div>
              <span className="font-display font-bold text-gray-900">She Can Foundation</span>
              <span className="ml-2 text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs and Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage organization information and records</p>
          </div>

          {/* Tab buttons */}
          <div className="flex bg-gray-200/60 p-1 rounded-xl self-start md:self-auto border border-gray-100">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'submissions'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              📨 Contact Submissions
            </button>
            <button
              onClick={() => setActiveTab('donations')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'donations'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ❤️ Donation Campaign
            </button>
          </div>
        </div>

        {/* Stats Cards depending on active tab */}
        {activeTab === 'submissions' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Submissions</p>
                  <p className="font-display text-4xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-2xl">📨</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Today's Submissions</p>
                  <p className="font-display text-4xl font-bold text-gray-900">{stats.today}</p>
                </div>
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl">📬</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Campaign Donations</p>
                  <p className="font-display text-4xl font-bold text-primary-600">₹{totalDonationAmount.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-2xl">🪙</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Donors Registered</p>
                  <p className="font-display text-4xl font-bold text-gray-900">{donationPagination.total.toLocaleString()}</p>
                </div>
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-2xl">❤️</div>
              </div>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
            <h2 className="font-display font-bold text-xl text-gray-900">
              {activeTab === 'submissions' ? 'Contact Form Messages' : 'Donor Registrations'}
            </h2>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={activeTab === 'submissions' ? "Search by name, email..." : "Search by name, email, txn..."}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full sm:w-72 pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : activeTab === 'submissions' ? (
            /* Contact Submissions list */
            submissions.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-4xl block mb-3">📭</span>
                <p className="text-gray-500">{search ? 'No submissions match your search.' : 'No submissions yet.'}</p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {['Name', 'Email', 'Phone', 'Subject', 'Date', 'Actions'].map(col => (
                          <th key={col} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {submissions.map(sub => (
                        <>
                          <tr
                            key={sub._id}
                            className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                            onClick={() => setExpandedRow(expandedRow === sub._id ? null : sub._id)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm shrink-0">
                                  {sub.name[0].toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-900 text-sm">{sub.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{sub.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{sub.phone || '—'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 max-w-[160px] truncate">{sub.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(sub.createdAt)}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={e => { e.stopPropagation(); setDeleteTarget(sub); }}
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                          {expandedRow === sub._id && (
                            <tr key={`${sub._id}-exp`} className="bg-primary-50/30">
                              <td colSpan={6} className="px-6 py-4">
                                <div className="text-sm text-gray-700">
                                  <span className="font-semibold text-gray-900 block mb-1">Message:</span>
                                  {sub.message}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile view submissions */}
                <div className="lg:hidden divide-y divide-gray-100">
                  {submissions.map(sub => (
                    <div key={sub._id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold">
                            {sub.name[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{sub.name}</div>
                            <div className="text-xs text-gray-500">{sub.email}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setDeleteTarget(sub)}
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{sub.subject}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">{sub.message}</div>
                      <div className="text-xs text-gray-400 mt-2">{formatDate(sub.createdAt)}</div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Showing {((page - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(page * ITEMS_PER_PAGE, pagination.total)} of {pagination.total} submissions
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                      >
                        ← Prev
                      </button>
                      {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                        const p = i + 1;
                        return (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                              page === p
                                ? 'bg-primary-600 text-white font-semibold'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                        disabled={page === pagination.pages}
                        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )
          ) : (
            /* Donations list */
            donations.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <span className="text-4xl block mb-3">🪙</span>
                <p className="text-gray-500">{search ? 'No donations match your search.' : 'No donations recorded yet.'}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {['Donor Info', 'Amount', 'Transaction ID', 'Campaign', 'Date', 'Status'].map(col => (
                          <th key={col} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {donations.map(don => (
                        <tr key={don._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm shrink-0">
                                {don.name[0].toUpperCase()}
                              </div>
                              <div>
                                <span className="font-semibold text-gray-900 text-sm block">{don.name}</span>
                                <span className="text-xs text-gray-500 block">{don.email}</span>
                                {don.phone && <span className="text-xs text-gray-400 block">{don.phone}</span>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-primary-600">₹{don.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-xs font-mono text-gray-600">{don.transactionId}</td>
                          <td className="px-6 py-4 text-xs text-gray-700 max-w-[180px] truncate">{don.campaign}</td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{formatDate(don.createdAt)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              don.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : don.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {don.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Donation Pagination */}
                {donationPagination.pages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                      Showing {((donationPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(donationPage * ITEMS_PER_PAGE, donationPagination.total)} of {donationPagination.total} donations
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDonationPage(p => Math.max(1, p - 1))}
                        disabled={donationPage === 1}
                        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                      >
                        ← Prev
                      </button>
                      {Array.from({ length: Math.min(5, donationPagination.pages) }, (_, i) => {
                        const p = i + 1;
                        return (
                          <button
                            key={p}
                            onClick={() => setDonationPage(p)}
                            className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                              donationPage === p
                                ? 'bg-primary-600 text-white font-semibold'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setDonationPage(p => Math.min(donationPagination.pages, p + 1))}
                        disabled={donationPage === donationPagination.pages}
                        className="px-3 py-2 text-sm border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
