import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('facebook');
  const [forceError, setForceError] = useState(false);

  const fetchRepositories = () => {
    setLoading(true);
    setError(null);

    // If simulated error mode is toggled, intentionally call an invalid URL
    const targetUrl = forceError
      ? 'https://api.github.com/invalid-endpoint-for-testing-error'
      : `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} (${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories();
  }, [username, forceError]);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="section-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2>Live GitHub Repositories (REST API)</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <input
              type="checkbox"
              checked={forceError}
              onChange={(e) => setForceError(e.target.checked)}
            />{' '}
            Simulate API Error
          </label>
        </div>
      </div>

      <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        This page fetches real data asynchronously from GitHub's REST API using React's <code>useEffect</code>, handles loading/error lifecycles, and dynamically renders cards.
      </p>

      {/* Filter and User Bar */}
      <div className="search-bar-row">
        <input
          type="text"
          className="form-input"
          placeholder="🔍 Search fetched repositories by name or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Asynchronous Lifecycle States */}
      {loading && <Spinner message={`Loading public repositories for @${username}...`} />}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={fetchRepositories}
        />
      )}

      {!loading && !error && (
        <>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Showing <strong>{filteredRepos.length}</strong> of <strong>{repos.length}</strong> repositories
          </p>

          <div className="projects-grid">
            {filteredRepos.map((repo) => (
              <div key={repo.id} className="project-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3>{repo.name}</h3>
                  <span className="star-badge" title="GitHub Stars">
                    ⭐ {repo.stargazers_count}
                  </span>
                </div>
                <p>{repo.description || 'No description provided by author.'}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span className="skill-tag" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                    {repo.language || 'Code'}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    View Source &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredRepos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No repositories match your search criteria "{searchTerm}".
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
