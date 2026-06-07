import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch]           = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await api.getSubscribers();
    setSubscribers(Array.isArray(data) ? data : []);
  }

  async function remove(id) {
    if (!confirm('Remove this subscriber?')) return;
    await api.deleteSubscriber(id);
    load();
  }

  const filtered = subscribers.filter(s =>
    `${s.first_name || ''} ${s.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1>Newsletter Subscribers</h1>
        <p>{subscribers.length} total subscribers</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>All Subscribers</h2>
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
                <th>#</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Subscribed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#999', padding: '32px' }}>No subscribers found</td></tr>
              ) : filtered.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: '#999' }}>{i + 1}</td>
                  <td>{s.first_name || '—'}</td>
                  <td>{s.email}</td>
                  <td>{new Date(s.subscribed_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}>Delete</button>
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
