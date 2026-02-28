import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'Butter Chicken', price: '₹280', emoji: '🍗', desc: 'Tender chicken in rich tomato-cream sauce' },
  { name: 'Paneer Tikka', price: '₹220', emoji: '🧀', desc: 'Marinated cottage cheese grilled to perfection' },
  { name: 'Veg Biryani', price: '₹180', emoji: '🍚', desc: 'Fragrant basmati with seasonal vegetables' },
  { name: 'Dal Makhani', price: '₹160', emoji: '🫘', desc: 'Slow-cooked black lentils with butter & cream' },
  { name: 'Chicken Biryani', price: '₹260', emoji: '🍛', desc: 'Aromatic rice with succulent chicken pieces' },
  { name: 'Mango Lassi', price: '₹80', emoji: '🥭', desc: 'Sweet yogurt drink blended with fresh mango' },
];

const Home = () => (
  <div style={styles.page}>
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <p style={styles.tagline}>✦ Authentic Indian Cuisine ✦</p>
        <h1 style={styles.heroTitle}>A Journey of<br /><span style={styles.golden}>Flavour & Spice</span></h1>
        <p style={styles.heroDesc}>From the heart of India to your doorstep. Fresh ingredients, traditional recipes, unforgettable taste.</p>
        <div style={styles.heroBtns}>
          <Link to="/book-order" style={styles.primaryBtn}>Order Now →</Link>
          <Link to="/services" style={styles.secondaryBtn}>View Menu</Link>
        </div>
      </div>
    </section>

    <section style={styles.section}>
      <div style={styles.features}>
        {[
          { icon: '⚡', title: 'Fast Delivery', desc: '30-45 mins average delivery time' },
          { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Trained in authentic regional cuisines' },
          { icon: '🌿', title: 'Fresh Ingredients', desc: 'Sourced daily from local farms' },
          { icon: '💰', title: 'Best Value', desc: 'Premium quality at affordable prices' },
        ].map(f => (
          <div key={f.title} style={styles.featureCard}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <section style={{ ...styles.section, background: 'rgba(212,175,55,0.03)' }}>
      <div style={styles.sectionHeader}>
        <p style={styles.sectionLabel}>Our Specialties</p>
        <h2 style={styles.sectionTitle}>Popular Dishes</h2>
        <div style={styles.divider} />
      </div>
      <div style={styles.menuGrid}>
        {menuItems.map(item => (
          <div key={item.name} style={styles.menuCard}>
            <div style={styles.menuEmoji}>{item.emoji}</div>
            <h3 style={styles.menuName}>{item.name}</h3>
            <p style={styles.menuDesc}>{item.desc}</p>
            <div style={styles.menuFooter}>
              <span style={styles.menuPrice}>{item.price}</span>
              <Link to="/book-order" style={styles.orderBtn}>Order</Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section style={styles.cta}>
      <h2 style={styles.ctaTitle}>Ready to Satisfy Your Cravings?</h2>
      <p style={styles.ctaDesc}>Place your order now and experience the magic of Tasty Hub</p>
      <Link to="/book-order" style={styles.ctaBigBtn}>Book Your Order</Link>
    </section>
  </div>
);

const styles = {
  page: { paddingTop: '70px' },
  hero: { position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #0f0a05 0%, #1a0f02 40%, #0d1a0a 100%)' },
  heroContent: { position: 'relative', zIndex: 1, padding: '0 8%', maxWidth: '700px' },
  tagline: { color: '#D4AF37', fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' },
  heroTitle: { fontSize: 'clamp(42px, 7vw, 80px)', color: '#f5ede0', fontFamily: '"Playfair Display", serif', lineHeight: '1.15', marginBottom: '24px', fontWeight: '700' },
  golden: { color: '#D4AF37' },
  heroDesc: { fontSize: '18px', color: '#9a8f7a', lineHeight: '1.8', marginBottom: '40px', maxWidth: '500px' },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  primaryBtn: { background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', padding: '15px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '16px' },
  secondaryBtn: { border: '2px solid rgba(212,175,55,0.5)', color: '#D4AF37', padding: '15px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '16px' },
  section: { padding: '80px 5%' },
  features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' },
  featureCard: { background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '32px 24px', textAlign: 'center' },
  featureIcon: { fontSize: '40px', display: 'block', marginBottom: '16px' },
  featureTitle: { color: '#f5ede0', fontSize: '18px', marginBottom: '8px', fontFamily: '"Playfair Display", serif' },
  featureDesc: { color: '#9a8f7a', fontSize: '14px', lineHeight: '1.6' },
  sectionHeader: { textAlign: 'center', marginBottom: '50px' },
  sectionLabel: { color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' },
  sectionTitle: { color: '#f5ede0', fontSize: 'clamp(28px, 4vw, 42px)', fontFamily: '"Playfair Display", serif', marginBottom: '16px' },
  divider: { width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', margin: '0 auto' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' },
  menuCard: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '28px' },
  menuEmoji: { fontSize: '48px', marginBottom: '16px' },
  menuName: { color: '#f5ede0', fontSize: '20px', fontFamily: '"Playfair Display", serif', marginBottom: '8px' },
  menuDesc: { color: '#9a8f7a', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' },
  menuFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  menuPrice: { color: '#D4AF37', fontSize: '22px', fontWeight: '700', fontFamily: '"Playfair Display", serif' },
  orderBtn: { background: 'rgba(212,175,55,0.15)', color: '#D4AF37', padding: '8px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  cta: { background: 'linear-gradient(135deg, #1a1005, #0f0a05)', padding: '100px 5%', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)' },
  ctaTitle: { color: '#f5ede0', fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: '"Playfair Display", serif', marginBottom: '20px' },
  ctaDesc: { color: '#9a8f7a', fontSize: '18px', marginBottom: '40px' },
  ctaBigBtn: { background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', padding: '18px 50px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '18px', display: 'inline-block' },
};

export default Home;