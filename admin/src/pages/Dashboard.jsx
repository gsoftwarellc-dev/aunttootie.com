import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Dashboard() {
  const [premium, setPremium]         = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [recipes, setRecipes]         = useState([]);

  useEffect(() => {
    api.getPremium().then(setPremium);
    api.getSubscribers().then(setSubscribers);
    api.getRecipes().then(setRecipes);
  }, []);

  const activePremium    = premium.filter(m => m.status === 'active').length;
  const cancelledPremium = premium.filter(m => m.status === 'cancelled').length;

  const stats = [
    { label: 'Premium Members',    value: activePremium,       sub: `${cancelledPremium} cancelled`,    color: '#c9a84c' },
    { label: 'Newsletter Subs',    value: subscribers.length,  sub: 'total subscribers',                color: '#2e7d52' },
    { label: 'Recipes',            value: recipes.length,      sub: `${recipes.filter(r=>r.premium).length} premium`,  color: '#c0392b' },
  ];

  const recent = [...premium].slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back. Here's what's happening.</p>
      </div>

      <div className="stats">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value" style={{ color: s.color }}>{s.value}</div>
            <div className="sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Recent Premium Members</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '32px' }}>No members yet</td></tr>
              ) : recent.map(m => (
                <tr key={m.id}>
                  <td>{m.first_name} {m.last_name}</td>
                  <td>{m.email}</td>
                  <td><span className={`badge ${m.status === 'active' ? 'badge-green' : 'badge-red'}`}>{m.status}</span></td>
                  <td>{new Date(m.joined_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
