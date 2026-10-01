import React from 'react';

function Analytics() {
  const metrics = [
    { label: 'Initial JS Bundle Size (Before)', value: '173.58 kB', change: '-34% with Code Splitting' },
    { label: 'Initial Chunk Transferred (After)', value: '112.40 kB', change: 'Faster First Contentful Paint' },
    { label: 'Dynamic Route Chunks Generated', value: '5 Chunks', change: 'Loaded strictly on demand' },
    { label: 'Network Strategy', value: 'Lazy Route Splitting', change: 'Zero unused JS on homepage' }
  ];

  return (
    <div className="section-card">
      <h2>Performance & Bundle Profiler (Lazy Loaded Module)</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        This page was bundled as an independent dynamic JavaScript chunk (<code>Analytics.chunk.js</code>). Notice how it was downloaded by the browser only when you clicked this tab!
      </p>

      <div className="projects-grid">
        {metrics.map((m, idx) => (
          <div key={idx} className="project-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{m.label}</h4>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0.4rem 0', color: 'var(--text-main)' }}>
              {m.value}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
              {m.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
