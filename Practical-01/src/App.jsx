import React, { useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('About');

  const studentName = 'Chaitanya';
  const roleTitle = 'Frontend & Full-Stack Developer';
  const customThemeColor = '#1d4ed8';

  const mySkills = [
    'HTML5 & CSS3',
    'JavaScript (ES6+)',
    'React.js',
    'Vite Build Tool',
    'Component Architecture',
    'Git & GitHub'
  ];

  return (
    <div className="app-container">
      <Header
        name={studentName}
        title={roleTitle}
        themeColor={customThemeColor}
      />
      <NavBar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />
      <main className="content-wrap">
        <About
          bio="Hello! I am an IT Engineering student passionate about building clean, high-performance, and modular web applications using modern React component architecture."
        />
        <Skills skillList={mySkills} />
      </main>
      <Footer email="student@charusat.edu.in" year={2026} />
    </div>
  );
}

export default App;
