import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Contact <span style={styles.golden}>Us</span></h1>
        <p style={styles.heroSub}>We'd love to hear from you</p>
      </div>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <h2 style={styles.h2}>Our Information</h2>
            {[
              { icon: '📍', title: 'Address', lines: ['123 Spice Lane, Koregaon Park', 'Pune, Maharashtra - 411001'] },
              { icon: '📞', title: 'Phone', lines: ['+91 98765 43210', 'Mon-Sun: 10AM - 11PM'] },
              { icon: '✉️', title: 'Email', lines: ['info@spiceroute.in'] },
            ].map(card => (
              <div key={card.title} style={styles.infoCard}>
                <span style={styles.infoIcon}>{card.icon}</span>
                <div>
                  <h3 style={styles.infoTitle}>{card.title}</h3>
                  {card.lines.map(l => <p key={l} style={styles.infoText}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>
          <div style={styles.formCard}>
            <h2 style={styles.h2}>Send a Message</h2>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <span style={{ fontSize: '48px' }}>✅</span>
                <p style={{ color: '#f5ede0', marginTop: '16px', fontSize: '18px' }}>Thank you!</p>
                <p style={{ color: '#9a8f7a' }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} style={styles.backBtn}>Send Another</button>
              </div>
            ) : (
              <>
                {['name', 'email', 'message'].map(field => (
                  <div key={field} style={styles.field}>
                    <label style={styles.fieldLabel}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    {field === 'message'
                      ? <textarea style={{ ...styles.input, minHeight: '130px', resize: 'vertical' }} placeholder="How can we help?" value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                      : <input style={styles.input} placeholder={field === 'email' ? 'your@email.com' : 'Your name'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                    }
                  </div>
                ))}
                <button onClick={() => form.name && form.email && form.message && setSent(true)} style={styles.sendBtn}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { paddingTop: '70px', minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg, #0f0a05, #1a0f02)', padding: '80px 5%', textAlign: 'center' },
  heroTitle: { fontSize: 'clamp(36px, 5vw, 60px)', color: '#f5ede0', fontFamily: '"Playfair Display", serif', marginBottom: '16px' },
  heroSub: { color: '#9a8f7a', fontSize: '18px' },
  golden: { color: '#D4AF37' },
  container: { padding: '80px 5%', maxWidth: '1200px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' },
  h2: { color: '#f5ede0', fontSize: '28px', fontFamily: '"Playfair Display", serif', marginBottom: '32px' },
  infoCard: { display: 'flex', gap: '20px', background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '24px', marginBottom: '16px' },
  infoIcon: { fontSize: '32px', flexShrink: 0 },
  infoTitle: { color: '#D4AF37', fontSize: '16px', fontWeight: '700', marginBottom: '6px' },
  infoText: { color: '#9a8f7a', fontSize: '14px' },
  formCard: { background: '#120d07', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '40px' },
  field: { marginBottom: '20px' },
  fieldLabel: { display: 'block', color: '#c9b88a', fontSize: '14px', fontWeight: '600', marginBottom: '8px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', padding: '12px 16px', color: '#f5ede0', fontSize: '15px', fontFamily: '"Lato", sans-serif', outline: 'none', boxSizing: 'border-box' },
  sendBtn: { width: '100%', background: 'linear-gradient(135deg, #D4AF37, #B8860B)', color: '#0f0a05', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: '"Lato", sans-serif' },
  backBtn: { marginTop: '20px', background: 'rgba(212,175,55,0.15)', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontFamily: '"Lato", sans-serif' },
};

export default Contact;