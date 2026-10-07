import React from 'react';

function About({ bio }) {
  return (
    <section className="section-card">
      <h2>About Me</h2>
      <p>
        {bio ||
          'I am an IT Engineering student specializing in Full-Stack Web Development, modern component-driven architectures, and scalable cloud solutions.'}
      </p>
    </section>
  );
}

export default About;
