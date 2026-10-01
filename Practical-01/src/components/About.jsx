import React from 'react';

function About({ bio }) {
  return (
    <section className="section-card" id="about">
      <h2>About Me</h2>
      <p>
        {bio ||
          'I am a passionate 5th Semester Information Technology student specializing in Full-Stack Web Development, modern component-driven architectures, and scalable cloud solutions.'}
      </p>
    </section>
  );
}

export default About;
