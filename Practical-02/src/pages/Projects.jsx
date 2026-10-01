import React from 'react';

function Projects() {
  const projectList = [
    {
      id: 1,
      name: 'Campus Task Management System',
      description: 'A full-stack collaborative task management application featuring JWT authentication and MongoDB persistence.',
      tech: 'React, Node.js, Express, MongoDB'
    },
    {
      id: 2,
      name: 'Interactive Developer Portfolio',
      description: 'A responsive single page application showcasing reusable component structures, client-side routing, and theme management.',
      tech: 'React, Vite, React Router v6'
    },
    {
      id: 3,
      name: 'RESTful API Services Engine',
      description: 'A modular Express.js backend with custom logging, centralized error handling, and in-memory cache layers.',
      tech: 'Node.js, Express, Node-Cache'
    }
  ];

  return (
    <div className="section-card">
      <h2>Featured Projects</h2>
      <p style={{ color: 'var(--text-muted)' }}>
        Hardcoded projects list demonstrating multi-page routing via React Router:
      </p>

      <div className="projects-grid">
        {projectList.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <span className="skill-tag" style={{ fontSize: '0.8rem' }}>
              {project.tech}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
