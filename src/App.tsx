import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SunriseBackground from './components/SunriseBackground';
import TypewriterEffect from './components/TypewriterEffect';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTraveling, setIsTraveling] = useState(false);

  const morandiColors = {
    primary: '#E0AEE9',    // Soft beige
    secondary: '#E8D5C4',  // Light peach
    accent: '#685DC2',     // Dusty rose
    background: '#F5F1ED', // Cream
    text: '#FFFFFF',       // White (was Muted brown)
    dark: '#FFFFFF',       // White (was Dark brown)
    light: '#F8F6F3'       // Very light cream
  };

  const handleViewWorkClick = () => {
    setActiveSection('projects');
    setIsTraveling(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsTraveling(false);
    }, 3000);
  };

  const sections = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' }
  ];

  return (
    <div className="app">
      <SunriseBackground isTraveling={isTraveling} />
      <div className="content-overlay" style={{ backgroundColor: 'rgba(245, 241, 237, 0)' }}>
      {/* Navigation */}
      <nav className="navbar">
        <motion.div 
          className="nav-brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveSection('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/character-icon.svg" alt="Character" className="nav-icon" />
          <span style={{ color: morandiColors.dark }}>Feiyang Xu</span>
        </motion.div>
        
        <motion.ul 
          className="nav-links"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {sections.map((section) => (
            <motion.li 
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                style={{
                  color: activeSection === section.id ? morandiColors.dark : morandiColors.text,
                  backgroundColor: activeSection === section.id ? morandiColors.primary : 'transparent'
                }}
              >
                {section.title}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Main Content */}
      <motion.main 
        className="main-content"
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'home' && (
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <TypewriterEffect
                  baseText="Hi, I'm"
                  roles={[
                    "full-stack developer",
                    "UI/UX designer", 
                    "creative problem solver",
                  ]}
                  colors={morandiColors}
                />
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: morandiColors.accent, color: morandiColors.light }}
                  onClick={handleViewWorkClick}
                >
                  View My Work
                </motion.button>
              </div>
              
              <div className="hero-image">
                <img src="/character-icon.svg" alt="Character" className="hero-character" />
              </div>
      </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2 style={{ color: morandiColors.dark }}>About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p style={{ color: morandiColors.text }}>
                  I'm a dedicated software developer with a passion for creating elegant solutions 
                  to complex problems. With expertise in modern web technologies, I focus on 
                  building user-centered applications that make a difference.
                </p>
                <div className="skills">
                  <h3 style={{ color: morandiColors.dark }}>Skills</h3>
                  <div className="skill-tags">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'Three.js', 'Framer Motion'].map((skill) => (
                      <span
                        key={skill}
                        className="skill-tag"
                        style={{ backgroundColor: morandiColors.secondary, color: morandiColors.dark }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-image">
                <img src="/character-icon.svg" alt="Character" className="about-character" />
              </div>
      </div>
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section">
            <h2 style={{ color: morandiColors.dark }}>Projects</h2>
            <div className="projects-grid">
              {[
                {
                  title: 'AudioNovel',
                  description: 'AI-powered audio novel system that transforms complex classical texts into simplified, easy-to-understand audio stories using generative AI',
                  tech: ['Python', 'MongoDB', 'React', 'TypeScript', 'Generative AI', 'Text Simplification'],
                  link: 'https://github.com/Feiyang0303/audionovel',
                  image: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="currentColor"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )
                },
                {
                  title: 'CapySpend',
                  description: 'AI-powered personal finance platform with agentic AI that automatically creates budgets and savings goals. Your financial companion that turns chaos into clarity.',
                  tech: ['JavaScript', 'TypeScript', 'React', 'AI/ML', 'PostgreSQL'],
                  link: 'https://github.com/StealthHydra179/spurhacks2025',
                  image: '/capyspend.png'
                },
                {
                  title: 'Starduo',
                  description: 'A React Native app for friends and couples to connect, built with Expo and TypeScript',
                  tech: ['JavaScript', 'React', 'Expo', 'TypeScript'],
                  link: 'https://github.com/starlyze/starduo',
                  image: '/starduo.png'
                },
                {
                  title: 'VolunTrack',
                  description: 'As President of VolunTrack, leading a team dedicated to connecting volunteers and non-profit organizations through an efficient search engine across iOS, Android, and web platforms.',
                  tech: ['JavaScript', 'React Native', 'Mobile Development', 'Cross-platform', 'Search Engine', 'Leadership'],
                  link: 'https://github.com/Feiyang0303/VolunTrack_Mobile/tree/feiyang',
                  image: '/voluntrack.png'
                }
              ].map((project, index) => (
                <div
                  key={project.title}
                  className="project-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ 
                      marginRight: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      width: '70px',
                      height: '70px',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {typeof project.image === 'string' ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            borderRadius: '12px',
                            border: `2px solid ${morandiColors.primary}`
                          }}
                        />
                      ) : (
                        <div style={{ 
                          color: morandiColors.accent,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: morandiColors.light,
                          borderRadius: '12px',
                          border: `2px solid ${morandiColors.primary}`
                        }}>
                          {project.image}
                        </div>
                      )}
                    </div>
                    <h3 style={{ color: morandiColors.dark, margin: 0 }}>{project.title}</h3>
                  </div>
                  <p style={{ color: morandiColors.text }}>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="tech-tag"
                        style={{ backgroundColor: morandiColors.primary, color: morandiColors.dark }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      backgroundColor: morandiColors.accent, 
                      color: morandiColors.light,
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      marginTop: '1rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    View on GitHub →
                  </motion.a>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="contact-section">
            <h2 style={{ color: morandiColors.dark }}>Get In Touch</h2>
            <div className="contact-content" style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '3rem',
              alignItems: 'start'
            }}>
              <div className="contact-info">
                <p style={{ color: morandiColors.text, fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  I'm always interested in new opportunities and exciting projects. 
                  Let's work together to create something amazing!
                </p>
                
                <div className="contact-methods">
                  <motion.a
                    href="mailto:f82xu@uwaterloo.ca"
                    className="contact-link"
                    whileHover={{ scale: 1.05 }}
                    style={{ 
                      backgroundColor: 'rgba(104, 93, 194, 0.8)', 
                      color: morandiColors.light,
                    }}
                  >
                    Email
                  </motion.a>
                  <motion.a
                    href="https://github.com/Feiyang0303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    whileHover={{ scale: 1.05 }}
                    style={{ 
                      backgroundColor: 'rgba(240, 181, 218, 0.8)', 
                      color: morandiColors.dark,
                    }}
                  >
                    GitHub
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/feiyang-xu0303/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    whileHover={{ scale: 1.05 }}
                    style={{ 
                      backgroundColor: 'rgba(224, 174, 233, 0.8)', 
                      color: morandiColors.dark,
                    }}
                  >
                    LinkedIn
                  </motion.a>
                </div>
              </div>

              <div className="contact-form" style={{ 
                padding: '2rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(248, 246, 243, 0.3)',
                backdropFilter: 'blur(15px)',
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ 
                  color: morandiColors.dark, 
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  textAlign: 'center'
                }}>Send me a message</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: morandiColors.dark,
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: morandiColors.dark,
                        fontSize: '1rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: morandiColors.dark,
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>Email</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: morandiColors.dark,
                        fontSize: '1rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: morandiColors.dark,
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>Message</label>
                    <textarea
                      placeholder="Tell me about your project or opportunity..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: morandiColors.dark,
                        fontSize: '1rem',
                        resize: 'vertical',
                        backdropFilter: 'blur(10px)',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(104, 93, 194, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: 'rgba(104, 93, 194, 0.9)',
                      color: morandiColors.light,
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '0.5rem',
                      boxShadow: '0 4px 15px rgba(104, 93, 194, 0.2)'
                    }}
                  >
                    Send Message ✨
                  </motion.button>
                </form>
              </div>
            </div>
          </section>
        )}
      </motion.main>
      </div>
    </div>
  );
};

export default App;
