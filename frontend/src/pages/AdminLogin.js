import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!form.username || !form.password) { setError('Please enter username and password'); return; }
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', form, { withCredentials: true });
      if (res.data.success) { login(res.data.username); navigate('/admin/dashboard'); }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <span style={styles.icon}>🔐</span>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.subtitle}>Secure access to Tasty Hub management panel</p>
        {['username', 'password'].map(field => (
          <div key={field} style={styles.field}>
            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type={field === 'password' ? 'password' : 'text'} style={styles.input}
              placeholder={`Enter ${field}`} value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
        ))}
        {error && <p style={styles.error}>⚠️ {error}</p>}
        <button onClick={handleLogin} disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Logging in...' : 'Login to Dashboard'}
        </button>
        <p style={styles.hint}>Default: admin / admin123</p>
      </div>
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0a05', padding: '90px 5%' },
  card: { background: '#120d07', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '20px', padding: '60px 40px', maxWidth: '440px', width: '100%', textAlign: 'center' },
  icon: { fontSize: '60px', display: 'block', marginBottom: '20px' },
  title: { color: '#f5ede0', fontSize: '32px', fontFamily: '"Playfair Display", serif', marginBottom: '12px' },
  subtitle: { color: '#9a8f7a', fontSize: '15px', marginBottom: '40px' },
  field: { textAlign: 'left', marginBottom: '20px' },
  label: { display: 'block', color: '#c9b88a', fontSize: '14px', fontWeight: '600', marginBottom: '8px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '13px 16px', color: '#f5ede0', fontSize: '15px', fontFamily: '"Lato", sans-serif', outline: 'none', boxSizing: 'border-box' },
  error: { color: '#ef4444', fontSize: '14px', marginBottom: '16px', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px' },
  btn: { width: '100%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: '"Lato", sans-serif' },
  hint: { color: '#6a5f4a', fontSize: '13px', marginTop: '16px', fontStyle: 'italic' },
};

export default AdminLogin;