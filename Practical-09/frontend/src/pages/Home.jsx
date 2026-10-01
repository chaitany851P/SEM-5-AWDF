import React, { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const [showSpecialization, setShowSpecialization] = useState(false);

  const skills = [
    'React.js',
    'React Router v6',
    'Component Architecture',
    'State & Props Flow',
    'JavaScript ES6+',
    'Vite Build Tool'
  ];

  return (
    <div>
      <Header
        name="Chaitanya"
        title="Full-Stack Developer & React Enthusiast"
        themeColor="#2563eb"
      />

      <button
        type="button"
        className="toggle-banner-btn"
        onClick={() => setShowSpecialization(!showSpecialization)}
      >
        {showSpecialization ? 'Hide Details' : 'Show Focus Areas (useState Toggle)'}
      </button>

      {showSpecialization && (
        <div className="info-banner">
          <strong>Current Focus:</strong> Deep-diving into SPA routing, reactive state workflows, and full-stack API architectures.
        </div>
      )}

      <About bio="Welcome to my interactive portfolio! Here I demonstrate modern React engineering techniques including dynamic client-side routing, controlled input state, and modular component composition." />
      <Skills skillList={skills} />
    </div>
  );
}

export default Home;
