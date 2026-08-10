import React from 'react';
import { teamMembers, groupInfo, groupProjects } from './data/teamData';
import DotBackground from './components/DotBackground';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <DotBackground />

      {/* Minimalist Top Navigation with Brand on Left & Client CTA on Right */}
      <header className="navbar">
        <div className="nav-brand">
          <h2>DevTeam</h2>
          <span>Software Engineering Group</span>
        </div>
        <a href="#contact" className="nav-cta">Let's Talk</a>
      </header>

      <main className="main-content">
        {/* 1. Team Members Section */}
        <section className="section">
          <h3>Meet the Team</h3>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="card team-card">
                <div className="avatar-container">
                  <img src={member.avatar} alt={member.name} className="avatar" />
                </div>
                <h4>{member.name}</h4>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="skills">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="badge">{skill}</span>
                  ))}
                </div>

                {/* Social Links Section */}
                <div className="social-links">
                  {member.socials?.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                      GitHub
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                      LinkedIn
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Group Description Section */}
        <section className="section group-desc-section">
          <h3>{groupInfo.title}</h3>
          <p className="group-description">{groupInfo.description}</p>
        </section>

        {/* 3. Highlighted Projects Section */}
        <section className="section">
          <h3>Highlighted Software & Projects</h3>
          <div className="project-grid">
            {groupProjects.map((project) => (
              <div key={project.id} className="card project-card">
                <h4>{project.title}</h4>
                <p className="project-desc">{project.description}</p>
                <p className="tech"><strong>Stack:</strong> {project.tech.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Contact Section */}
        <section id="contact" className="section contact-section">
          <h3>Ready to Build Something Together?</h3>
          <p className="group-description" style={{ marginBottom: '20px' }}>
            We are available for collaborative software development projects and freelance work.
          </p>
          <a href="mailto:your-email@example.com" className="contact-btn">Get in Touch</a>
        </section>
      </main>
    </div>
  );
}

export default App;