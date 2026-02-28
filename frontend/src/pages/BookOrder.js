import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MENU_ITEMS = ['Butter Chicken', 'Paneer Butter Masala', 'Dal Makhani', 'Chicken Tikka Masala', 'Shahi Paneer', 'Mutton Rogan Josh', 'Veg Biryani', 'Chicken Biryani', 'Mutton Biryani', 'Paneer Biryani'];
const DISHES = ['Butter Naan', 'Garlic Naan', 'Tandoori Roti', 'Paratha', 'Steamed Rice', 'Fried Rice'];
const BEVERAGES = ['Mango Lassi', 'Sweet Lassi', 'Masala Chai', 'Fresh Lime Soda', 'Coca Cola', 'Water Bottle'];

const PRICES = {
  'Butter Chicken': 280, 'Paneer Butter Masala': 220, 'Dal Makhani': 180, 'Chicken Tikka Masala': 290,
  'Shahi Paneer': 230, 'Mutton Rogan Josh': 340, 'Veg Biryani': 200, 'Chicken Biryani': 280,
  'Mutton Biryani': 340, 'Paneer Biryani': 240, 'Butter Naan': 40, 'Garlic Naan': 50,
  'Tandoori Roti': 30, 'Paratha': 60, 'Steamed Rice': 80, 'Fried Rice': 120,
  'Mango Lassi': 90, 'Sweet Lassi': 70, 'Masala Chai': 40, 'Fresh Lime Soda': 60,
  'Coca Cola': 50, 'Water Bottle': 25,
};

const BookOrder = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer_name: '', mobile: '', address: '', special_notes: '' });
  const [items, setItems] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleSelect = (val, list, setList) => {
    setList(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const total = [...items, ...dishes, ...beverages].reduce((sum, item) => sum + (PRICES[item] || 0), 0);

  const validate = () => {
    const err = {};
    if (!form.customer_name.trim()) err.customer_name = 'Name is required';
    else if (form.customer_name.trim().length < 3) err.customer_name = 'Name must be at least 3 characters';
    if (!form.mobile.trim()) err.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile.trim())) err.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) err.address = 'Delivery address is required';
    else if (form.address.trim().length < 10) err.address = 'Please enter a complete address';
    if (items.length === 0) err.items = 'Please select at least one item';
    return err;
  };

  const handleSubmit = async () => {
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/bookings', { ...form, items, dishes, beverages, total_amount: total }, { withCredentials: true });
      if (res.data.success) {
        navigate('/success', { state: { bookingId: res.data.bookingId, customerName: form.customer_name, total } });
      }
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.label}>Place Your Order</p>
        <h1 style={styles.heroTitle}>Book Your <span style={styles.golden}>Meal</span></h1>
        <p style={styles.heroSub}>Fill in your details and we'll deliver fresh to your door</p>
      </div>
      <div style={styles.container}>
        <div style={styles.formGrid}>
          <div style={styles.formSection}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>📋 Your Details</h2>
              {[
                { key: 'customer_name', label: 'Full Name *', placeholder: 'Enter your full name', type: 'text' },
                { key: 'mobile', label: 'Mobile Number *', placeholder: '10-digit mobile number', type: 'text' },
                { key: 'address', label: 'Delivery Address *', placeholder: 'Full delivery address with landmark', type: 'textarea' },
                { key: 'special_notes', label: 'Special Notes (Optional)', placeholder: 'Any dietary restrictions...', type: 'textarea' },
              ].map(field => (
                <div key={field.key} style={styles.field}>
                  <label style={styles.fieldLabel}>{field.label}</label>
                  {field.type === 'textarea'
                    ? <textarea style={{ ...styles.input, ...styles.textarea, ...(errors[field.key] ? styles.inputError : {}) }} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
                    : <input style={{ ...styles.input, ...(errors[field.key] ? styles.inputError : {}) }} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: field.key === 'mobile' ? e.target.value.replace(/\D/g, '') : e.target.value })} maxLength={field.key === 'mobile' ? 10 : undefined} />
                  }
                  {errors[field.key] && <p style={styles.error}>{errors[field.key]}</p>}
                </div>
              ))}
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🍛 Select Items *</h2>
              {errors.items && <p style={styles.error}>{errors.items}</p>}
              <div style={styles.checkGrid}>
                {MENU_ITEMS.map(item => (
                  <label key={item} style={{ ...styles.checkItem, ...(items.includes(item) ? styles.checkItemSelected : {}) }}>
                    <input type="checkbox" checked={items.includes(item)} onChange={() => toggleSelect(item, items, setItems)} style={{ display: 'none' }} />
                    <span>{item}</span><span style={styles.itemPrice}>₹{PRICES[item]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🫓 Breads & Rice</h2>
              <div style={styles.checkGrid}>
                {DISHES.map(d => (
                  <label key={d} style={{ ...styles.checkItem, ...(dishes.includes(d) ? styles.checkItemSelected : {}) }}>
                    <input type="checkbox" checked={dishes.includes(d)} onChange={() => toggleSelect(d, dishes, setDishes)} style={{ display: 'none' }} />
                    <span>{d}</span><span style={styles.itemPrice}>₹{PRICES[d]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🥤 Beverages</h2>
              <div style={styles.checkGrid}>
                {BEVERAGES.map(b => (
                  <label key={b} style={{ ...styles.checkItem, ...(beverages.includes(b) ? styles.checkItemSelected : {}) }}>
                    <input type="checkbox" checked={beverages.includes(b)} onChange={() => toggleSelect(b, beverages, setBeverages)} style={{ display: 'none' }} />
                    <span>{b}</span><span style={styles.itemPrice}>₹{PRICES[b]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ ...styles.card, position: 'sticky', top: '90px' }}>
              <h2 style={styles.cardTitle}>🧾 Order Summary</h2>
              {items.length === 0 && dishes.length === 0 && beverages.length === 0
                ? <p style={styles.emptyMsg}>No items selected yet</p>
                : <>
                  {[...items, ...dishes, ...beverages].map(i => (
                    <div key={i} style={styles.summaryRow}><span>{i}</span><span style={styles.summaryPrice}>₹{PRICES[i]}</span></div>
                  ))}
                </>
              }
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalAmount}>₹{total}</span>
              </div>
              {total > 0 && total < 400 && <p style={styles.hint}>Add ₹{400 - total} more for free delivery!</p>}
              {total >= 400 && <p style={styles.freeDelivery}>🎉 You qualify for free delivery!</p>}
              {errors.submit && <p style={styles.error}>{errors.submit}</p>}
              <button onClick={handleSubmit} disabled={loading} style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Placing Order...' : 'Place Order →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg, #0f0a05, #1a0f02)', padding: '60px 5%', textAlign: 'center' },
  label: { color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' },
  heroTitle: { fontSize: 'clamp(32px, 4vw, 52px)', color: '#f5ede0', fontFamily: '"Playfair Display", serif', marginBottom: '12px' },
  heroSub: { color: '#9a8f7a', fontSize: '16px' },
  golden: { color: '#D4AF37' },
  container: { padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 360px', gap: '30px', alignItems: 'start' },
  formSection: { display: 'flex', flexDirection: 'column', gap: '24px' },
  card: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '32px' },
  cardTitle: { color: '#f5ede0', fontSize: '20px', fontFamily: '"Playfair Display", serif', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid rgba(212,175,55,0.1)' },
  field: { marginBottom: '20px' },
  fieldLabel: { display: 'block', color: '#c9b88a', fontSize: '14px', fontWeight: '600', marginBottom: '8px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '12px 16px', color: '#f5ede0', fontSize: '15px', fontFamily: '"Lato", sans-serif', outline: 'none', boxSizing: 'border-box' },
  textarea: { minHeight: '100px', resize: 'vertical' },
  inputError: { borderColor: '#ef4444' },
  error: { color: '#ef4444', fontSize: '13px', marginTop: '6px' },
  checkGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  checkItem: { display: 'flex', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', cursor: 'pointer', color: '#9a8f7a', fontSize: '14px' },
  checkItemSelected: { background: 'rgba(212,175,55,0.1)', borderColor: '#D4AF37', color: '#f5ede0' },
  itemPrice: { color: '#D4AF37', fontWeight: '700' },
  emptyMsg: { color: '#6a5f4a', textAlign: 'center', padding: '20px 0', fontStyle: 'italic' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(212,175,55,0.08)', color: '#9a8f7a', fontSize: '14px' },
  summaryPrice: { color: '#D4AF37', fontWeight: '600' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid rgba(212,175,55,0.3)' },
  totalLabel: { color: '#f5ede0', fontWeight: '700', fontSize: '18px' },
  totalAmount: { color: '#D4AF37', fontWeight: '700', fontSize: '26px', fontFamily: '"Playfair Display", serif' },
  hint: { color: '#9a8f7a', fontSize: '13px', marginTop: '10px', textAlign: 'center' },
  freeDelivery: { color: '#22c55e', fontSize: '13px', marginTop: '10px', textAlign: 'center' },
  submitBtn: { width: '100%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginTop: '20px', fontFamily: '"Lato", sans-serif' },
};

export default BookOrder;