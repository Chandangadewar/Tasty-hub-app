import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';

const STATUS_COLORS = {
  pending: { bg: 'rgba(234,179,8,0.15)', color: '#eab308' },
  confirmed: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  preparing: { bg: 'rgba(249,115,22,0.15)', color: '#f97316' },
  completed: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  cancelled: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
};

const AdminDashboard = () => {
  const { isAdmin, adminUser, logout } = useAdmin();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAdmin) { navigate('/admin/login'); return; }
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [b, s] = await Promise.all([
        axios.get('/api/bookings', { withCredentials: true }),
        axios.get('/api/admin/stats', { withCredentials: true })
      ]);
      setBookings(b.data.bookings || []);
      setStats(s.data.stats || {});
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/bookings/${id}/status`, { status }, { withCredentials: true });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selectedOrder?.id === id) setSelectedOrder(prev => ({ ...prev, status }));
      fetchData();
    } catch { alert('Failed to update status'); }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await axios.delete(`/api/bookings/${id}`, { withCredentials: true });
      setBookings(prev => prev.filter(b => b.id !== id));
      setSelectedOrder(null);
    } catch { alert('Failed to delete order'); }
  };

  const handleLogout = async () => { await logout(); navigate('/admin/login'); };
  const parseJSON = (val) => { try { return typeof val === 'string' ? JSON.parse(val) : val || []; } catch { return []; } };
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  if (loading) return <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#D4AF37', fontSize: '20px' }}>Loading...</div></div>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>🍛 Admin Dashboard</h1>
          <p style={styles.headerSub}>Welcome back, <span style={{ color: '#D4AF37' }}>{adminUser}</span></p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Logout</button>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'Total Orders', value: stats.total || 0, icon: '📋' },
          { label: 'Pending', value: stats.pending || 0, icon: '⏳' },
          { label: 'Completed', value: stats.completed || 0, icon: '✅' },
          { label: 'Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: '💰' },
        ].map(s => (
          <div key={s.label} style={styles.statCard}>
            <span style={styles.statIcon}>{s.icon}</span>
            <div><p style={styles.statValue}>{s.value}</p><p style={styles.statLabel}>{s.label}</p></div>
          </div>
        ))}
      </div>

      <div style={styles.filterRow}>
        {['all', 'pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ ...styles.filterBtn, ...(filter === f ? styles.filterActive : {}) }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button onClick={fetchData} style={styles.refreshBtn}>↻ Refresh</button>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>{['#ID', 'Customer', 'Mobile', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => <th key={h} style={styles.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={8} style={{ ...styles.td, textAlign: 'center', color: '#6a5f4a', padding: '40px' }}>No orders found</td></tr>
              : filtered.map(b => (
                <tr key={b.id} style={styles.tr} onClick={() => setSelectedOrder(b)}>
                  <td style={styles.td}>#{b.id}</td>
                  <td style={styles.td}>{b.customer_name}</td>
                  <td style={styles.td}>{b.mobile}</td>
                  <td style={styles.td}>{parseJSON(b.items).length + parseJSON(b.dishes).length + parseJSON(b.beverages).length} items</td>
                  <td style={{ ...styles.td, color: '#D4AF37', fontWeight: '700' }}>₹{b.total_amount}</td>
                  <td style={styles.td}><span style={{ ...styles.statusBadge, ...STATUS_COLORS[b.status] }}>{b.status}</span></td>
                  <td style={styles.td}>{new Date(b.created_at).toLocaleDateString('en-IN')}</td>
                  <td style={styles.td} onClick={e => e.stopPropagation()}>
                    <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} style={styles.select}>
                      {['pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div style={styles.modal} onClick={() => setSelectedOrder(null)}>
          <div style={styles.modalCard} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Order #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.modalGrid}>
              <div>
                {[['Customer', selectedOrder.customer_name], ['Mobile', selectedOrder.mobile], ['Address', selectedOrder.address]].map(([l, v]) => (
                  <div key={l}><p style={styles.modalLabel}>{l}</p><p style={styles.modalVal}>{v}</p></div>
                ))}
              </div>
              <div>
                <p style={styles.modalLabel}>Items Ordered</p>
                {[...parseJSON(selectedOrder.items), ...parseJSON(selectedOrder.dishes), ...parseJSON(selectedOrder.beverages)].map(i => <p key={i} style={styles.orderItem}>• {i}</p>)}
                <p style={styles.modalLabel}>Total</p>
                <p style={{ ...styles.modalVal, color: '#D4AF37', fontSize: '22px', fontWeight: '700' }}>₹{selectedOrder.total_amount}</p>
              </div>
            </div>
            <div style={styles.modalActions}>
              <span style={{ ...styles.statusBadge, ...STATUS_COLORS[selectedOrder.status] }}>{selectedOrder.status}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select value={selectedOrder.status} onChange={e => updateStatus(selectedOrder.id, e.target.value)} style={styles.select}>
                  {['pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => deleteOrder(selectedOrder.id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh', background: '#0a0604', padding: '90px 3% 60px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' },
  headerTitle: { color: '#f5ede0', fontSize: '28px', fontFamily: '"Playfair Display", serif', marginBottom: '4px' },
  headerSub: { color: '#9a8f7a', fontSize: '15px' },
  logoutBtn: { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontWeight: '600' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' },
  statCard: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' },
  statIcon: { fontSize: '36px' },
  statValue: { color: '#f5ede0', fontSize: '28px', fontWeight: '700', fontFamily: '"Playfair Display", serif' },
  statLabel: { color: '#9a8f7a', fontSize: '13px' },
  filterRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' },
  filterBtn: { padding: '8px 18px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.2)', background: 'transparent', color: '#9a8f7a', cursor: 'pointer', fontSize: '14px', fontFamily: '"Lato", sans-serif' },
  filterActive: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', borderColor: '#D4AF37' },
  refreshBtn: { marginLeft: 'auto', padding: '8px 18px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.3)', background: 'transparent', color: '#D4AF37', cursor: 'pointer', fontSize: '14px', fontFamily: '"Lato", sans-serif' },
  tableWrap: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '800px' },
  th: { background: 'rgba(212,175,55,0.08)', color: '#D4AF37', padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: '700', borderBottom: '1px solid rgba(212,175,55,0.15)' },
  td: { padding: '14px 16px', color: '#e0d5c5', fontSize: '14px', borderBottom: '1px solid rgba(212,175,55,0.06)', cursor: 'pointer' },
  tr: { transition: 'background 0.2s' },
  statusBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' },
  select: { background: '#1a120a', border: '1px solid rgba(212,175,55,0.3)', color: '#f5ede0', padding: '6px 10px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' },
  modal: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modalCard: { background: '#120d07', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '16px', padding: '36px', maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  modalTitle: { color: '#f5ede0', fontSize: '24px', fontFamily: '"Playfair Display", serif' },
  closeBtn: { background: 'none', border: 'none', color: '#9a8f7a', fontSize: '24px', cursor: 'pointer' },
  modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '28px' },
  modalLabel: { color: '#D4AF37', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', marginTop: '16px' },
  modalVal: { color: '#e0d5c5', fontSize: '15px' },
  orderItem: { color: '#9a8f7a', fontSize: '14px', marginBottom: '4px' },
  modalActions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(212,175,55,0.1)', flexWrap: 'wrap', gap: '12px' },
  deleteBtn: { background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontWeight: '600' },
};

export default AdminDashboard;  