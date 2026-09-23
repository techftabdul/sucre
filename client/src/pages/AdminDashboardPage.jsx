import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAdminAnalytics, getAdminBookings, updateBookingStatus } from '../services/api';
import { 
  TrendingUp, Calendar, DollarSign, Users, ShieldCheck, LogOut, 
  Search, Filter, CheckCircle2, Clock, XCircle, RefreshCw, Eye, Building2 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { admin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, bookings, inventory, crm
  const [analytics, setAnalytics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadAdminData();
  }, [isAuthenticated, statusFilter]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, bookingsRes] = await Promise.all([
        getAdminAnalytics(),
        getAdminBookings({ status: statusFilter, search })
      ]);
      setAnalytics(analyticsRes.data.data);
      setBookings(bookingsRes.data.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, { status: newStatus });
      loadAdminData();
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const formatCurrency = (amt) => {
    if (amt === undefined || amt === null) return '₦0';
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amt);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory pb-20">
      
      {/* Top Admin Header Bar */}
      <div className="bg-cathedral-card border-b border-cathedral-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold-400" />
            <div>
              <h1 className="font-serif font-bold text-lg text-cathedral-ivory">Admin Operations Portal</h1>
              <p className="text-[11px] text-cathedral-muted">Logged in as: <span className="text-gold-300 font-semibold">{admin?.name || 'Administrator'}</span></p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1.5 border border-rose-500/30"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-cathedral-border gap-4 overflow-x-auto pb-1">
          {[
            { id: 'analytics', label: 'Analytics Overview', icon: TrendingUp },
            { id: 'bookings', label: 'Bookings Manager', icon: Calendar },
            { id: 'inventory', label: 'Halls & Rates', icon: Building2 },
            { id: 'crm', label: 'Customer CRM', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-xs uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-gold-400 text-gold-400 font-bold'
                    : 'border-transparent text-cathedral-muted hover:text-cathedral-ivory'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-2">
                <div className="text-xs uppercase tracking-wider text-cathedral-muted">Total Revenue Expected</div>
                <div className="text-2xl font-serif font-bold text-gold-gradient">
                  {formatCurrency(analytics.totalRevenueExpected)}
                </div>
                <div className="text-[10px] text-cathedral-muted font-mono">Gross value of all bookings</div>
              </div>

              <div className="bg-cathedral-card p-6 rounded-2xl border border-emerald-500/30 space-y-2">
                <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">50% Deposits Collected</div>
                <div className="text-2xl font-serif font-bold text-emerald-400">
                  {formatCurrency(analytics.totalDepositsCollected)}
                </div>
                <div className="text-[10px] text-cathedral-muted">Verified Paystack transactions</div>
              </div>

              <div className="bg-cathedral-card p-6 rounded-2xl border border-amber-500/30 space-y-2">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Balances Outstanding</div>
                <div className="text-2xl font-serif font-bold text-amber-400">
                  {formatCurrency(analytics.totalBalancesOutstanding)}
                </div>
                <div className="text-[10px] text-cathedral-muted">Due 14 days prior to events</div>
              </div>

              <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-2">
                <div className="text-xs uppercase tracking-wider text-cathedral-muted">Total Booking Records</div>
                <div className="text-2xl font-serif font-bold text-cathedral-ivory">
                  {analytics.statusCounts?.TOTAL || 0}
                </div>
                <div className="text-[10px] text-cathedral-muted">Across all hall grades</div>
              </div>
            </div>

            {/* Status Breakdown Pills */}
            <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-4">
              <h3 className="font-serif font-bold text-base text-cathedral-ivory">Booking Status Breakdown</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-cathedral-elevated p-4 rounded-xl border border-cathedral-border">
                  <div className="text-cathedral-muted">Pending Deposits:</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">{analytics.statusCounts?.PENDING || 0}</div>
                </div>
                <div className="bg-cathedral-elevated p-4 rounded-xl border border-emerald-500/30">
                  <div className="text-emerald-400 font-semibold">50% Deposit Paid:</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">{analytics.statusCounts?.DEPOSIT_PAID || 0}</div>
                </div>
                <div className="bg-cathedral-elevated p-4 rounded-xl border border-gold-400/30">
                  <div className="text-gold-300 font-semibold">100% Fully Paid:</div>
                  <div className="text-lg font-bold text-gold-300 mt-1">{analytics.statusCounts?.FULLY_PAID || 0}</div>
                </div>
                <div className="bg-cathedral-elevated p-4 rounded-xl border border-rose-500/30">
                  <div className="text-rose-400">Cancelled / Void:</div>
                  <div className="text-lg font-bold text-rose-400 mt-1">{analytics.statusCounts?.CANCELLED || 0}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGER */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-cathedral-card p-4 rounded-2xl border border-cathedral-border">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
                {['ALL', 'DEPOSIT_PAID', 'PENDING', 'FULLY_PAID', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full font-semibold uppercase tracking-wider ${
                      statusFilter === st
                        ? 'bg-gold-400 text-cathedral-bg'
                        : 'bg-cathedral-elevated text-cathedral-muted hover:text-cathedral-ivory'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <button
                onClick={loadAdminData}
                className="px-4 py-1.5 rounded-full bg-cathedral-elevated text-gold-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-gold-500/10"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            </div>

            {/* Bookings Table */}
            <div className="bg-cathedral-card border border-cathedral-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-cathedral-ivory">
                  <thead className="bg-cathedral-elevated text-gold-400 font-serif font-bold border-b border-cathedral-border uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Client Name</th>
                      <th className="p-4">Event Date</th>
                      <th className="p-4">Hall</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Deposit (50%)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cathedral-border">
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-cathedral-muted">
                          No booking records found.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-cathedral-elevated/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-gold-300">{b.reference}</td>
                          <td className="p-4 font-semibold">{b.customerName}</td>
                          <td className="p-4 font-mono">{new Date(b.eventDate).toLocaleDateString()}</td>
                          <td className="p-4">{b.hall?.name}</td>
                          <td className="p-4 font-serif font-bold text-gold-gradient">{formatCurrency(b.totalAmount)}</td>
                          <td className="p-4 font-serif text-emerald-400 font-bold">{formatCurrency(b.depositAmount)}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                              b.status === 'DEPOSIT_PAID'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : b.status === 'FULLY_PAID'
                                ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40'
                                : b.status === 'CANCELLED'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}>
                              {b.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4 flex items-center gap-2">
                            <button
                              onClick={() => setSelectedBooking(b)}
                              className="p-1.5 rounded-lg bg-cathedral-elevated text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {b.status === 'DEPOSIT_PAID' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'FULLY_PAID')}
                                className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold"
                              >
                                Mark Paid
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-cathedral-ivory">Hall & Package Rates Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-4">
                <h4 className="font-serif font-bold text-gold-400 text-base">Halls Inventory (Grades 1 to 5)</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Grade 1: Intimate Sanctuary (250 Max)</span>
                    <span className="font-bold text-gold-300">₦650,000</span>
                  </li>
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Grade 2: Classic Pavilion (450 Max)</span>
                    <span className="font-bold text-gold-300">₦950,000</span>
                  </li>
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Grade 3: Grand Arch Ballroom (700 Max)</span>
                    <span className="font-bold text-gold-300">₦1,400,000</span>
                  </li>
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Grade 4: Prestige Royal Suite (900 Max)</span>
                    <span className="font-bold text-gold-300">₦1,950,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grade 5: The Cathedral Master Grandeur (1,500+ Max)</span>
                    <span className="font-bold text-gold-gradient font-serif">₦2,600,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-4">
                <h4 className="font-serif font-bold text-gold-400 text-base">Production Experience Packages</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Classic Experience</span>
                    <span className="font-bold text-gold-300">₦1,250,000</span>
                  </li>
                  <li className="flex justify-between border-b border-cathedral-border pb-2">
                    <span>Silver Experience (Most Popular)</span>
                    <span className="font-bold text-gold-300">₦1,750,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Gold Royal Cathedral Sovereign</span>
                    <span className="font-bold text-gold-gradient font-serif">₦2,800,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER CRM */}
        {activeTab === 'crm' && (
          <div className="bg-cathedral-card p-6 rounded-2xl border border-cathedral-border space-y-6">
            <h3 className="font-serif font-bold text-xl text-cathedral-ivory">Customer CRM Records</h3>
            <div className="space-y-4 text-xs">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 rounded-xl bg-cathedral-elevated border border-cathedral-border flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="font-bold text-sm text-cathedral-ivory">{b.customerName}</div>
                    <div className="text-cathedral-muted mt-0.5">Phone: <span className="text-gold-300">{b.customerPhone}</span> | Email: {b.customerEmail}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold-400 font-mono font-semibold">{b.reference}</div>
                    <div className="text-[10px] text-cathedral-muted">{b.eventType}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* DETAIL MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-cathedral-card border border-gold-400 rounded-3xl p-6 space-y-6 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b border-cathedral-border pb-4">
              <div>
                <div className="text-gold-400 font-mono font-bold">{selectedBooking.reference}</div>
                <h3 className="text-lg font-serif font-bold text-cathedral-ivory">{selectedBooking.customerName}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-cathedral-muted hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-cathedral-muted">Phone:</span><span>{selectedBooking.customerPhone}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Email:</span><span>{selectedBooking.customerEmail}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Event Type:</span><span>{selectedBooking.eventType}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Guests:</span><span>{selectedBooking.guestCount}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Total Amount:</span><span className="font-bold text-gold-gradient">{formatCurrency(selectedBooking.totalAmount)}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Deposit Paid (50%):</span><span className="font-bold text-emerald-400">{formatCurrency(selectedBooking.depositAmount)}</span></div>
              <div className="flex justify-between"><span className="text-cathedral-muted">Outstanding Balance:</span><span className="font-bold text-amber-400">{formatCurrency(selectedBooking.balanceAmount)}</span></div>
            </div>

            <div className="pt-4 border-t border-cathedral-border flex gap-3">
              {selectedBooking.status === 'DEPOSIT_PAID' && (
                <button
                  onClick={() => handleStatusChange(selectedBooking.id, 'FULLY_PAID')}
                  className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-bold uppercase text-[11px]"
                >
                  Mark Balance Paid (100%)
                </button>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 rounded-full bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory text-[11px]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
