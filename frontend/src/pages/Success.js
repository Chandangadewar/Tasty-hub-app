import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();
  const bookingId = state?.bookingId || '---';
  const customerName = state?.customerName || 'Valued Customer';
  const total = state?.total || 0;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <span style={styles.icon}>✅</span>
        <h1 style={styles.title}>Order Placed Successfully!</h1>
        <p style={styles.subtitle}>Thank you, <span style={styles.golden}>{customerName}</span>! Your order has been received.</p>
        <div style={styles.details}>
          {[['Order ID', `#${bookingId}`], ['Total Amount', `₹${total}`], ['Estimated Delivery', '30 – 45 minutes'], ['Status', 'Pending Confirmation']].map(([label, value]) => (
            <div key={label} style={styles.detailRow}>
              <span style={styles.detailLabel}>{label}</span>
              <span style={{ ...styles.detailValue, ...(label === 'Status' ? { color: '#D4AF37' } : {}) }}>{value}</span>
            </div>
          ))}
        </div>
        <p style={styles.note}>📱 We'll notify you via call when your order is on its way!</p>
        <div style={styles.btns}>
          <Link to="/" style={styles.homeBtn}>Back to Home</Link>
          <Link to="/book-order" style={styles.newOrderBtn}>Place Another Order</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0a05', padding: '90px 5% 60px' },
  card: { background: '#120d07', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '20px', padding: '60px 40px', maxWidth: '600px', width: '100%', textAlign: 'center' },
  icon: { fontSize: '80px', display: 'block', marginBottom: '24px' },
  title: { color: '#f5ede0', fontSize: 'clamp(28px, 4vw, 40px)', fontFamily: '"Playfair Display", serif', marginBottom: '16px' },
  subtitle: { color: '#9a8f7a', fontSize: '18px', marginBottom: '40px' },
  golden: { color: '#D4AF37' },
  details: { background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '24px', marginBottom: '32px', textAlign: 'left' },
  detailRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(212,175,55,0.08)' },
  detailLabel: { color: '#9a8f7a', fontSize: '15px' },
  detailValue: { color: '#f5ede0', fontWeight: '600', fontSize: '15px' },
  note: { color: '#9a8f7a', fontSize: '15px', marginBottom: '32px', background: 'rgba(212,175,55,0.05)', padding: '12px', borderRadius: '8px' },
  btns: { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' },
  homeBtn: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', border: '1px solid rgba(212,175,55,0.3)' },
  newOrderBtn: { background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' },
};

export default Success;