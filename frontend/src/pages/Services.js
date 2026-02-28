import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const menuData = {
  'Main Course': [
    { name: 'Butter Chicken', price: 280, emoji: '🍗', desc: 'Tender chicken in rich tomato-cream sauce', veg: false },
    { name: 'Paneer Butter Masala', price: 220, emoji: '🧀', desc: 'Cottage cheese in buttery tomato gravy', veg: true },
    { name: 'Dal Makhani', price: 180, emoji: '🫘', desc: 'Slow-cooked black lentils with butter & cream', veg: true },
    { name: 'Chicken Tikka Masala', price: 290, emoji: '🍖', desc: 'Grilled chicken in spiced masala sauce', veg: false },
    { name: 'Shahi Paneer', price: 230, emoji: '🍛', desc: 'Royal cottage cheese in rich cashew gravy', veg: true },
    { name: 'Mutton Rogan Josh', price: 340, emoji: '🥩', desc: 'Slow-cooked lamb in Kashmiri spices', veg: false },
  ],
  'Rice & Biryani': [
    { name: 'Veg Biryani', price: 200, emoji: '🍚', desc: 'Fragrant basmati with seasonal vegetables', veg: true },
    { name: 'Chicken Biryani', price: 280, emoji: '🍛', desc: 'Aromatic rice with succulent chicken', veg: false },
    { name: 'Mutton Biryani', price: 340, emoji: '🍲', desc: 'Dum-cooked lamb biryani with saffron', veg: false },
    { name: 'Paneer Biryani', price: 240, emoji: '🍚', desc: 'Fragrant rice with spiced paneer', veg: true },
  ],
  'Breads': [
    { name: 'Butter Naan', price: 40, emoji: '🫓', desc: 'Soft leavened bread with butter', veg: true },
    { name: 'Garlic Naan', price: 50, emoji: '🫓', desc: 'Naan topped with garlic & butter', veg: true },
    { name: 'Tandoori Roti', price: 30, emoji: '🫓', desc: 'Whole wheat bread from clay oven', veg: true },
    { name: 'Paratha', price: 60, emoji: '🫓', desc: 'Flaky layered flatbread with ghee', veg: true },
  ],
  'Beverages': [
    { name: 'Mango Lassi', price: 90, emoji: '🥭', desc: 'Sweet yogurt drink with mango pulp', veg: true },
    { name: 'Sweet Lassi', price: 70, emoji: '🥛', desc: 'Classic chilled yogurt drink', veg: true },
    { name: 'Masala Chai', price: 40, emoji: '☕', desc: 'Spiced Indian milk tea', veg: true },
    { name: 'Fresh Lime Soda', price: 60, emoji: '🍋', desc: 'Refreshing lime with soda water', veg: true },
    { name: 'Coca Cola', price: 50, emoji: '🥤', desc: 'Chilled cold drink 300ml', veg: true },
  ],
};

const Services = () => {
  const [activeTab, setActiveTab] = useState('Main Course');
  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <p style={styles.label}>Explore Our Menu</p>
        <h1 style={styles.heroTitle}>Our <span style={styles.golden}>Services</span></h1>
        <p style={styles.heroSub}>Fresh, authentic Indian food delivered to your door in 30-45 minutes</p>
      </div>
      <div style={styles.infoBar}>
        {[['⚡', '30-45 Min Delivery'], ['💵', 'Free Delivery Above ₹400'], ['🔥', 'Fresh & Hot Guaranteed'], ['📦', 'Safe Packaging']].map(([icon, txt]) => (
          <div key={txt} style={styles.infoItem}>
            <span style={{ fontSize: '24px' }}>{icon}</span>
            <span style={styles.infoTxt}>{txt}</span>
          </div>
        ))}
      </div>
      <div style={styles.container}>
        <div style={styles.tabs}>
          {Object.keys(menuData).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}>
              {tab}
            </button>
          ))}
        </div>
        <div style={styles.menuGrid}>
          {menuData[activeTab].map(item => (
            <div key={item.name} style={styles.card}>
              <div style={styles.cardTop}>
                <span style={styles.emoji}>{item.emoji}</span>
                <span style={{ ...styles.badge, background: item.veg ? 'rgba(50,200,80,0.15)' : 'rgba(200,50,50,0.15)', color: item.veg ? '#22c55e' : '#ef4444' }}>
                  {item.veg ? '🟢 Veg' : '🔴 Non-veg'}
                </span>
              </div>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemDesc}>{item.desc}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{item.price}</span>
                <Link to="/book-order" style={styles.orderBtn}>Add to Order</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px' },
  hero: { background: 'linear-gradient(135deg, #0f0a05, #1a0f02)', padding: '80px 5%', textAlign: 'center' },
  label: { color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' },
  heroTitle: { fontSize: 'clamp(36px, 5vw, 60px)', color: '#f5ede0', fontFamily: '"Playfair Display", serif', marginBottom: '16px' },
  heroSub: { color: '#9a8f7a', fontSize: '18px' },
  golden: { color: '#D4AF37' },
  infoBar: { background: '#120d07', borderBottom: '1px solid rgba(212,175,55,0.15)', padding: '20px 5%', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' },
  infoItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  infoTxt: { color: '#e0d5c5', fontSize: '15px', fontWeight: '600' },
  container: { padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' },
  tabs: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' },
  tab: { padding: '10px 24px', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)', background: 'transparent', color: '#9a8f7a', cursor: 'pointer', fontSize: '15px', fontFamily: '"Lato", sans-serif' },
  activeTab: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', borderColor: '#D4AF37' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
  card: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '28px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  emoji: { fontSize: '44px' },
  badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  itemName: { color: '#f5ede0', fontSize: '19px', fontFamily: '"Playfair Display", serif', marginBottom: '8px' },
  itemDesc: { color: '#9a8f7a', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#D4AF37', fontSize: '24px', fontWeight: '700', fontFamily: '"Playfair Display", serif' },
  orderBtn: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(212,175,55,0.3)' },
};

export default Services;