import { useState, useEffect } from 'react';
import { api } from '../api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    const data = await api.getCategories();
    setCategories(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    setError('');
    const res = await api.createCategory(newName.trim());
    if (res.message && res.message !== 'Updated') {
      setError(res.message);
    } else {
      setNewName('');
      load();
    }
    setAdding(false);
  };

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setError('');
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;
    setSaving(true);
    setError('');
    const res = await api.updateCategory(id, editName.trim());
    if (res.message && res.message !== 'Updated') {
      setError(res.message);
    } else {
      setEditingId(null);
      load();
    }
    setSaving(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete category "${name}"? Recipes using this category won't be affected.`)) return;
    await api.deleteCategory(id);
    load();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Categories</h1>
        <p>Manage recipe categories shown on the site and in the recipe editor.</p>
      </div>

      {/* Add new */}
      <div className="card" style={{ marginBottom: 24, padding: '20px 24px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Add New Category</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            style={{ flex: 1, maxWidth: 340 }}
            placeholder="Category name…"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn btn-primary" onClick={handleAdd} disabled={adding || !newName.trim()}>
            {adding ? 'Adding…' : '+ Add'}
          </button>
        </div>
        {error && <p style={{ color: 'var(--tomato)', fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>

      {/* List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '32px 24px', color: 'var(--text-light)' }}>Loading…</p>
        ) : categories.length === 0 ? (
          <p style={{ padding: '32px 24px', color: 'var(--text-light)' }}>No categories yet.</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {categories.map((cat, i) => (
              <li
                key={cat.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  borderBottom: i < categories.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                {/* Drag handle visual */}
                <span style={{ color: 'var(--border)', fontSize: 16, cursor: 'default', userSelect: 'none' }}>⠿</span>

                {editingId === cat.id ? (
                  <>
                    <input
                      style={{ flex: 1, maxWidth: 320 }}
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleUpdate(cat.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(cat.id)} disabled={saving}>
                      {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{cat.name}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => startEdit(cat)}>Rename</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat.id, cat.name)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
