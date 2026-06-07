import { useEffect, useState } from 'react';
import { api } from '../api';

export default function PremiumMembers() {
  const [members, setMembers] = useState([]);
  const [search, setSearch]   = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await api.getPremium();
    setMembers(Array.isArray(data) ? data : []);
  }

  async function toggleStatus(m) {
    const next = m.status === 'active' ? 'cancelled' : 'active';
    await api.updatePremiumStatus(m.id, next);
    load();
  }

  async function remove(id) {
    if (!confirm('Remove this member?')) return;
    await api.deletePremium(id);
    load();
  }

  const filtered = members.filter(m =>
    `${m.first_name} ${m.last_name} ${m.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Premium Members</h1>
        <p>{members.filter(m => m.status === 'active').length} active · {members.filter(m => m.status === 'cancelled').length} cancelled</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Members</h2>
          <input
            placeholder="Search name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 240 }}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#999', padding: '32px' }}>No members found</td></tr>
              ) : filtered.map(m => (
                <tr key={m.id}>
                  <td>{m.first_name} {m.last_name}</td>
                  <td>{m.email}</td>
                  <td>
                    <span className={`badge ${m.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>{new Date(m.joined_at).toLocaleDateString()}</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(m)}>
                      {m.status === 'active' ? 'Cancel' : 'Reactivate'}
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(m.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
