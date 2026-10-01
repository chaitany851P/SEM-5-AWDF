import React from 'react';

function Skills({ skillList = [] }) {
  return (
    <section className="section-card">
      <h2>Technical Skills</h2>
      <ul className="skills-list">
        {skillList.map((skill) => (
          <li key={skill} className="skill-tag">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
