import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.grid}>
      <div>
        <h3 style={styles.brand}>🍛 Tasty Hub</h3>
        <p style={styles.desc}>Authentic Indian cuisine delivered fresh to your doorstep.</p>
      </div>
      <div>
        <h4 style={styles.heading}>Quick Links</h4>
        {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/book-order', 'Book Order'], ['/contact', 'Contact']].map(([to, label]) => (
          <div key={to}><Link to={to} style={styles.link}>{label}</Link></div>
        ))}
      </div>
      <div>
        <h4 style={styles.heading}>Contact</h4>
        <p style={styles.text}>📍 123 Spice Lane, Pune, MH 411001</p>
        <p style={styles.text}>📞 +91 98765 43210</p>
        <p style={styles.text}>✉️ info@Tasty Hub.in</p>
        <p style={styles.text}>🕐 Mon-Sun: 10AM – 11PM</p>
      </div>
    </div>
    <div style={styles.bottom}>
      <p style={styles.copy}>© 2025 Tasty Hub Restaurant. All Rights Reserved.</p>
      <Link to="/admin/login" style={styles.adminLink}>Admin Panel</Link>
    </div>
  </footer>
);

const styles = {
  footer: { background: '#0a0604', borderTop: '1px solid rgba(212,175,55,0.2)', padding: '60px 5% 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' },
  brand: { fontSize: '22px', color: '#D4AF37', marginBottom: '12px', fontFamily: '"Playfair Display", serif' },
  desc: { color: '#9a8f7a', lineHeight: '1.7', fontSize: '14px' },
  heading: { color: '#D4AF37', marginBottom: '16px', fontSize: '16px' },
  link: { color: '#9a8f7a', textDecoration: 'none', display: 'block', marginBottom: '8px', fontSize: '14px' },
  text: { color: '#9a8f7a', marginBottom: '8px', fontSize: '14px' },
  bottom: { borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  copy: { color: '#6a5f4a', fontSize: '13px' },
  adminLink: { color: '#6a5f4a', textDecoration: 'none', fontSize: '13px', padding: '4px 12px', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '4px' }
};

export default Footer;