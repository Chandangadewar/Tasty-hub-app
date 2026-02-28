import React from 'react';

const About = () => (
  <div style={styles.page}>
    <div style={styles.hero}>
      <h1 style={styles.heroTitle}>About <span style={styles.golden}>Tasty Hub</span></h1>
      <p style={styles.heroSub}>Our story, our passion, our promise</p>
    </div>
    <div style={styles.container}>
      <div style={styles.storyGrid}>
        <div>
          <p style={styles.label}>Our Story</p>
          <h2 style={styles.h2}>A Legacy of Authentic Flavours</h2>
          <p style={styles.text}>Founded in 2010, Tasty Hub was born from a simple dream — to share the rich, diverse flavours of Indian cuisine with the world. Our journey began in a small kitchen in Pune, where our founder Chef Rajesh Kumar prepared recipes passed down through generations.</p>
          <p style={styles.text}>Today, we serve hundreds of families daily, bringing the warmth and comfort of home-cooked Indian food to your doorstep. Every dish is crafted with hand-picked spices, fresh produce, and the heart of a home chef.</p>
          <div style={styles.statsRow}>
            {[['14+', 'Years Experience'], ['500+', 'Happy Customers Daily'], ['80+', 'Menu Items'], ['4.8★', 'Average Rating']].map(([val, lab]) => (
              <div key={lab} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLab}>{lab}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.imageBox}>
          <div style={styles.imagePlaceholder}>
            <span style={{ fontSize: '100px' }}>🍛</span>
            <p style={{ color: '#D4AF37', marginTop: '16px', fontFamily: '"Playfair Display", serif', fontSize: '20px' }}>Est. 2010</p>
          </div>
        </div>
      </div>
      <div style={styles.valuesSection}>
        <p style={styles.label}>What We Stand For</p>
        <h2 style={styles.h2}>Our Core Values</h2>
        <div style={styles.valuesGrid}>
          {[
            { icon: '🌿', title: 'Fresh & Natural', desc: 'We source ingredients daily from trusted local farmers and suppliers.' },
            { icon: '🏺', title: 'Tradition First', desc: 'Every recipe follows authentic regional methods honouring Indian heritage.' },
            { icon: '❤️', title: 'Made with Love', desc: 'Our chefs bring passion to each preparation. Cooking is our calling.' },
            { icon: '🚀', title: 'Reliability', desc: 'On-time delivery, consistent quality, and exceptional service every day.' },
          ].map(v => (
            <div key={v.title} style={styles.valueCard}>
              <span style={styles.valueIcon}>{v.icon}</span>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg, #0f0a05, #1a0f02)', padding: '80px 5%', textAlign: 'center' },
  heroTitle: { fontSize: 'clamp(36px, 5vw, 60px)', color: '#f5ede0', fontFamily: '"Playfair Display", serif', marginBottom: '16px' },
  heroSub: { color: '#9a8f7a', fontSize: '18px' },
  golden: { color: '#D4AF37' },
  container: { padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' },
  storyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '80px', alignItems: 'center' },
  label: { color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '12px' },
  h2: { color: '#f5ede0', fontSize: 'clamp(24px, 3vw, 36px)', fontFamily: '"Playfair Display", serif', marginBottom: '24px' },
  text: { color: '#9a8f7a', lineHeight: '1.8', fontSize: '16px', marginBottom: '16px' },
  statsRow: { display: 'flex', gap: '30px', marginTop: '32px', flexWrap: 'wrap' },
  stat: { textAlign: 'center' },
  statVal: { display: 'block', color: '#D4AF37', fontSize: '28px', fontWeight: '700', fontFamily: '"Playfair Display", serif' },
  statLab: { display: 'block', color: '#9a8f7a', fontSize: '13px', marginTop: '4px' },
  imageBox: { display: 'flex', justifyContent: 'center' },
  imagePlaceholder: { width: '100%', maxWidth: '400px', aspectRatio: '1', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  valuesSection: { marginBottom: '80px' },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginTop: '40px' },
  valueCard: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '32px' },
  valueIcon: { fontSize: '40px', display: 'block', marginBottom: '16px' },
  valueTitle: { color: '#f5ede0', fontSize: '20px', fontFamily: '"Playfair Display", serif', marginBottom: '12px' },
  valueDesc: { color: '#9a8f7a', lineHeight: '1.7', fontSize: '15px' },
};

export default About;