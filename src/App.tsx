import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SunriseBackground from './components/SunriseBackground';
import TypewriterEffect from './components/TypewriterEffect';
import Resume from './components/Resume';
import { EMAILJS_CONFIG } from './config/emailjs';
import './App.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isTraveling, setIsTraveling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', contactForm);
    console.log('EmailJS Config:', EMAILJS_CONFIG);
    console.log('Form validation check:');
    console.log('- Name:', contactForm.name, 'Length:', contactForm.name.length, 'Trimmed:', contactForm.name.trim().length, 'Empty?', !contactForm.name.trim());
    console.log('- Email:', contactForm.email, 'Length:', contactForm.email.length, 'Trimmed:', contactForm.email.trim().length, 'Empty?', !contactForm.email.trim());
    console.log('- Message:', contactForm.message, 'Length:', contactForm.message.length, 'Trimmed:', contactForm.message.trim().length, 'Empty?', !contactForm.message.trim());
    
    // Basic validation
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      console.log('Validation failed - empty fields detected');
      console.log('Name empty?', !contactForm.name.trim());
      console.log('Email empty?', !contactForm.email.trim());
      console.log('Message empty?', !contactForm.message.trim());
      setSubmitStatus('error');
      return;
    }

    console.log('Validation passed, proceeding with EmailJS...');

    setIsSubmitting(true);
    
    // EmailJS configuration
    const templateParams = {
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message
    };

    try {
      // Check if EmailJS is properly configured
      if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
          EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        
        console.log('EmailJS not configured yet, using fallback mailto method');
        
        // Fallback to mailto method until EmailJS is set up
        const mailtoLink = `mailto:f82xu@uwaterloo.ca?subject=Contact from ${encodeURIComponent(contactForm.name)}&body=${encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`)}`;
        
        window.location.href = mailtoLink;
        
        // Reset form and show success
        setContactForm({ name: '', email: '', message: '' });
        setSubmitStatus('success');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
        
        return;
      }

      console.log('Using EmailJS to send email');
      
      console.log('EmailJS template params:', templateParams);
      console.log('Sending to EmailJS with:');
      console.log('- Service ID:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('- Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
      console.log('- Public Key:', EMAILJS_CONFIG.PUBLIC_KEY);

      // Send email using EmailJS
      try {
        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        console.log('EmailJS result:', result);

        if (result.status === 200) {
          console.log('✅ Email sent successfully! Check your inbox and spam folder.');
          console.log('📧 Email should be sent to: feiyangxuca@gmail.com');
          console.log('📋 Template used: template_92rs3o9');
          console.log('🔗 Service used: service_2qfjuv6 (Gmail)');
          console.log('📨 EmailJS response:', result);
          console.log('💡 If you don\'t receive the email:');
          console.log('   1. Check your Gmail inbox at feiyangxuca@gmail.com');
          console.log('   2. Check Gmail spam/junk folder');
          console.log('   3. Check Gmail "All Mail" folder');
          console.log('   4. Check Gmail filters and settings');
          console.log('   5. Template variables should be: {{name}}, {{email}}, {{message}}');
          // Reset form and show success
          setContactForm({ name: '', email: '', message: '' });
          setSubmitStatus('success');
          
          // Reset status after 3 seconds
          setTimeout(() => {
            setSubmitStatus('idle');
          }, 3000);
        } else {
          console.error('EmailJS returned non-200 status:', result.status);
          setSubmitStatus('error');
        }
      } catch (emailjsError) {
        console.error('EmailJS specific error:', emailjsError);
        throw emailjsError; // Re-throw to be caught by outer catch
      }
      
    } catch (error: any) {
      console.error('Email sending failed:', error);
      console.error('Error details:', {
        message: error.message || 'Unknown error',
        stack: error.stack || 'No stack trace',
        config: EMAILJS_CONFIG,
        status: error.status,
        text: error.text,
        response: error.response
      });
      
      // Check for specific EmailJS errors
      if (error.status === 422) {
        console.error('422 Error - This usually means template variables mismatch or invalid data');
        console.error('Template variables expected by EmailJS:', templateParams);
      }
      
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Updating ${field}:`, value);
    setContactForm(prev => {
      const newState = {
        ...prev,
        [field]: value
      };
      console.log('New form state:', newState);
      return newState;
    });
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

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
          onClick={() => {
            setActiveSection('home');
            setIsMobileMenuOpen(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/character-icon.svg" alt="Character" className="nav-icon" />
          <span style={{ color: morandiColors.dark }}>Feiyang Xu</span>
        </motion.div>
        
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <motion.ul 
          className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}
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
                onClick={() => {
                  setActiveSection(section.id);
                  setIsMobileMenuOpen(false);
                }}
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
            <div className="about-content-wrapper" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '3rem',
              maxWidth: '1000px',
              margin: '0 auto 3rem auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <p style={{ 
                color: morandiColors.text, 
                fontSize: '1.2rem', 
                lineHeight: '1.8', 
                flex: '1',
                minWidth: 'min(300px, 100%)',
                textAlign: 'left'
              }}>
                I am a Computer Science student at the University of Waterloo with a strong interest in full-stack development. I enjoy working across both frontend and backend systems, and I'm passionate about building thoughtful, user-focused applications that solve meaningful problems.
              </p>
              <div className="profile-image-container" style={{
                width: '200px',
                height: '200px',
                minWidth: '150px',
                maxWidth: '200px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `3px solid ${morandiColors.primary}`,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                flexShrink: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <img 
                  src="/IMG_0788_web.png" 
                  alt="Feiyang Xu" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', e);
                    console.error('Image src:', (e.target as HTMLImageElement).src);
                    // Hide the image and show a fallback
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const container = target.parentElement;
                    if (container) {
                      container.innerHTML = '<div style="color: white; font-size: 1.2rem; text-align: center;">Profile Photo</div>';
                    }
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully');
                    console.log('Image src:', (document.querySelector('img[alt="Feiyang Xu"]') as HTMLImageElement)?.src);
                  }}
                />
              </div>
            </div>
            <div className="resume-section">
              <Resume colors={morandiColors} />
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
                  title: 'Diffusion Watermarking',
                  description: 'Research implementation of Tree-Ring and WatermarkDM approaches for invisible, robust fingerprinting in diffusion-generated images, with evaluation pipelines for JPEG compression and adversarial attacks.',
                  tech: ['Python', 'PyTorch', 'NumPy', 'Stable Diffusion', 'Signal Processing'],
                  link: 'https://github.com/Feiyang0303/Diffusion_watermarking',
                  image: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 6V3M12 21V18M6 12H3M21 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )
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
            <div className="contact-content">
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
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(76, 175, 80, 0.2)',
                      border: '1px solid rgba(76, 175, 80, 0.5)',
                      color: '#4CAF50',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}
                  >
                    ✨ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(244, 67, 54, 0.2)',
                      border: '1px solid rgba(244, 67, 54, 0.5)',
                      color: '#F44336',
                      textAlign: 'center',
                      marginBottom: '1rem'
                    }}
                  >
                    ❌ Please fill in all fields correctly.
                  </motion.div>
                )}
                
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      color: morandiColors.dark,
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>Name *</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: '#2c3e50',
                        fontSize: '1rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = morandiColors.accent;
                        e.target.style.boxShadow = `0 0 0 3px rgba(104, 93, 194, 0.1)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = morandiColors.primary;
                        e.target.style.boxShadow = 'none';
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
                    }}>Email *</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: '#2c3e50',
                        fontSize: '1rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = morandiColors.accent;
                        e.target.style.boxShadow = `0 0 0 3px rgba(104, 93, 194, 0.1)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = morandiColors.primary;
                        e.target.style.boxShadow = 'none';
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
                    }}>Message *</label>
                    <textarea
                      placeholder="Feel free to reach out to me!"
                      value={contactForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: `2px solid ${morandiColors.primary}`,
                        backgroundColor: 'rgba(248, 246, 243, 0.6)',
                        color: '#2c3e50',
                        fontSize: '1rem',
                        resize: 'vertical',
                        backdropFilter: 'blur(10px)',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = morandiColors.accent;
                        e.target.style.boxShadow = `0 0 0 3px rgba(104, 93, 194, 0.1)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = morandiColors.primary;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 8px 25px rgba(104, 93, 194, 0.3)' } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: isSubmitting ? 'rgba(104, 93, 194, 0.5)' : 'rgba(104, 93, 194, 0.9)',
                      color: morandiColors.light,
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '0.5rem',
                      boxShadow: '0 4px 15px rgba(104, 93, 194, 0.2)'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message ✨'}
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
