import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Settings() {
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getSettings().then(data => {
      if (data?.premium_price) setPrice(data.premium_price);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const num = parseFloat(price);
    if (isNaN(num) || num <= 0) return setError('Please enter a valid price.');
    setError('');
    setSaving(true);
    await api.saveSettings({ premium_price: num.toFixed(2) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage site-wide settings.</p>
      </div>

      <div className="card" style={{ maxWidth: 480, padding: '28px 28px 24px' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Premium Membership</h2>

        {loading ? (
          <p style={{ color: 'var(--text-light)' }}>Loading…</p>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', marginBottom: 8 }}>
                Monthly Price (USD)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', width: 180 }}>
                <span style={{ padding: '9px 12px', background: '#f5f5f0', fontSize: 14, color: 'var(--text-light)', fontWeight: 600, borderRight: '1px solid var(--border)' }}>$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={e => { setPrice(e.target.value); setSaved(false); }}
                  style={{ border: 'none', borderRadius: 0, padding: '9px 12px', fontSize: 15, fontWeight: 600, width: '100%', outline: 'none' }}
                  placeholder="9.00"
                />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 8 }}>
                This is the price shown on the Subscribe page.
              </p>
            </div>

            {error && <p style={{ color: 'var(--tomato)', fontSize: 12, marginBottom: 12 }}>{error}</p>}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              {saved && <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>✓ Saved</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
