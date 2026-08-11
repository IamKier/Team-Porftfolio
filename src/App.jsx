import { useEffect, useState } from 'react';
import { teamMembers, groupInfo, groupProjects } from './data/teamData';
import DotBackground from './components/DotBackground';
import ThemeToggle from './components/ThemeToggle';
import useActiveSection from './hooks/useActiveSection';
import { ExternalIcon, GitHubIcon, MenuIcon, CloseIcon } from './components/Icons';
import { socialIcons } from './components/socialIcons';
import './App.css';

const SECTIONS = ['team', 'about', 'work', 'contact'];
const NAV_LINKS = [
  { id: 'team', label: 'Team' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
];

const initialsOf = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTIONS);

  // Close the mobile menu on Escape, and whenever the viewport grows back to
  // the width where the inline links reappear.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (e) => e.key === 'Escape' && setMenuOpen(false);
    const wide = window.matchMedia('(min-width: 721px)');
    const onWiden = (e) => e.matches && setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    wide.addEventListener('change', onWiden);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      wide.removeEventListener('change', onWiden);
    };
  }, [menuOpen]);

  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <DotBackground />

      <header className="nav">
        <div className="container nav__inner">
          <a href="#top" className="brand">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">DevTeam</span>
            <span className="brand__sub">Software Engineering Group</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : undefined}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <a href="#contact" className="btn btn--primary btn--sm nav__cta">Let's talk</a>
            <button
              type="button"
              className="icon-btn nav__toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
            <div className="container">
              {[...NAV_LINKS, { id: 'contact', label: 'Contact' }].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={active === link.id ? 'is-active' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="container hero" id="top">
          <p className="status">
            <span className="status__dot" aria-hidden="true" />
            Available for new projects
          </p>
          <h1>{groupInfo.tagline}</h1>
          <p className="hero__lead">{groupInfo.description}</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">View our work</a>
            <a href="#team" className="btn btn--ghost">Meet the team</a>
          </div>
        </section>

        {/* 1. Team Members */}
        <section id="team" className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">01 — Team</p>
              <h2>The people behind the work</h2>
            </div>

            <div className="team-grid">
              {teamMembers.map((member) => (
                <article key={member.id} className="card">
                  <div className="member__head">
                    {member.avatar ? (
                      <img src={member.avatar} alt="" className="avatar" />
                    ) : (
                      <div className="avatar avatar--initials" aria-hidden="true">
                        {initialsOf(member.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="member__name">{member.name}</h3>
                      <p className="member__role">{member.role}</p>
                    </div>
                  </div>

                  <p className="member__bio">{member.bio}</p>

                  <div className="tags">
                    {member.skills.map((skill) => (
                      <span key={skill} className="tag">{skill}</span>
                    ))}
                  </div>

                  {member.socials && (
                    <div className="socials">
                      {Object.entries(member.socials).map(([key, url]) => {
                        const social = socialIcons[key];
                        if (!social) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on ${social.label}`}
                          >
                            <social.Icon />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Group Description */}
        <section id="about" className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">02 — About</p>
              <h2>{groupInfo.title}</h2>
            </div>

            <div className="about">
              <p className="about__text">{groupInfo.about}</p>
              <dl className="highlights">
                {groupInfo.highlights.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3. Highlighted Projects */}
        <section id="work" className="section">
          <div className="container">
            <div className="section__head">
              <p className="eyebrow">03 — Work</p>
              <h2>Highlighted software &amp; projects</h2>
            </div>

            <div className="project-grid">
              {groupProjects.map((project, index) => (
                <article key={project.id} className="card project">
                  <div className="project__media">
                    {project.image ? (
                      <img src={project.image} alt={`${project.title} screenshot`} />
                    ) : (
                      <span className="project__monogram" aria-hidden="true">
                        {initialsOf(project.title)}
                      </span>
                    )}
                  </div>

                  <div className="project__body">
                    <p className="project__index">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="project__title">{project.title}</h3>
                    <p className="project__desc">{project.description}</p>

                    <div className="tags">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>

                    {(project.links?.live || project.links?.source) && (
                      <div className="project__links">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalIcon /> Live site
                          </a>
                        )}
                        {project.links.source && (
                          <a
                            href={project.links.source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitHubIcon /> Source
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Contact */}
        <section id="contact" className="section contact">
          <div className="container">
            <p className="eyebrow">04 — Contact</p>
            <h2>Ready to build something together?</h2>
            <p className="contact__lead">
              We are available for collaborative software development projects
              and freelance work.
            </p>
            <a href={`mailto:${groupInfo.email}`} className="btn btn--primary">
              Get in touch
            </a>
            <span className="contact__email">{groupInfo.email}</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} DevTeam</span>
          <span>Built with React &amp; Vite</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
