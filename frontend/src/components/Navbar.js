import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/book-order', label: 'Book Order' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <span style={styles.logo}>🍛</span>
        <span style={styles.brandName}>Tasty Hub</span>
      </div>
      <div style={styles.links}>
        {links.map(link => (
          <Link key={link.to} to={link.to}
            style={{ ...styles.link, ...(location.pathname === link.to ? styles.activeLink : {}) }}
            onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link to="/book-order" style={styles.ctaBtn}>Order Now</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 5%', height: '70px',
    background: 'rgba(15,10,5,0.95)', backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(212,175,55,0.3)',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '28px' },
  brandName: { fontSize: '22px', fontWeight: '700', color: '#D4AF37', fontFamily: '"Playfair Display", serif' },
  links: { display: 'flex', alignItems: 'center', gap: '8px' },
  link: { color: '#e0d5c5', textDecoration: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' },
  activeLink: { color: '#D4AF37', background: 'rgba(212,175,55,0.1)' },
  ctaBtn: { background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', padding: '9px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', marginLeft: '8px' },
};

export default Navbar;