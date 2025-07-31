import React from 'react';

interface ResumeProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    dark: string;
    light: string;
  };
}

const Resume: React.FC<ResumeProps> = ({ colors }) => {
  return (
    <div className="resume-container" style={{ 
      padding: '2rem',
      backgroundColor: 'rgba(248, 246, 243, 0.3)',
      borderRadius: '20px',
      backdropFilter: 'blur(15px)',
      border: `1px solid rgba(255, 255, 255, 0.2)`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          color: colors.dark, 
          fontSize: '2rem', 
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          Feiyang Xu
        </h1>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.3rem', 
          fontWeight: '600',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Education
        </h2>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.1rem', margin: 0 }}>
                University of Waterloo
              </h3>
              <p style={{ color: colors.text, fontSize: '0.9rem', margin: '0.2rem 0' }}>
                Bachelor of Computer Science
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '0.9rem' }}>
              Anticipated Graduation: April 2030
            </span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.3rem', 
          fontWeight: '600',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Experience
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.1rem', margin: 0 }}>
                Research Assistant
              </h3>
              <p style={{ color: colors.text, fontSize: '0.9rem', margin: '0.2rem 0' }}>
                Yangzhou University
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '0.9rem' }}>
              December 2024 - Present
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '0.9rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Conduct research under Professor Qiang on natural language processing and text simplification for educational use</li>
            <li>Develop a multi-agent prompt framework using large language models, simulating expert roles to adapt complex texts into age-appropriate scripts</li>
            <li>Designed and implemented an AI-powered audio novel system that transforms classical literature into simplified, child-friendly audio stories</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.1rem', margin: 0 }}>
                President
              </h3>
              <p style={{ color: colors.text, fontSize: '0.9rem', margin: '0.2rem 0' }}>
                VolunTrack Non-Profit Organization
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '0.9rem' }}>
              January 2023 - Present
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '0.9rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Lead a global, student-run nonprofit that connects youth with verified volunteer opportunities through a mobile and web platform</li>
            <li>Managed the end-to-end development of the VolunTrack app using React Native, Firebase, and Expo, with AI-powered personalized opportunity recommendations</li>
          </ul>
        </div>
      </div>

      {/* Awards and Achievements */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.3rem', 
          fontWeight: '600',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Awards and Achievements
        </h2>
        <ul style={{ 
          color: colors.text, 
          fontSize: '0.9rem', 
          margin: '0.5rem 0',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Mathematics Global Scholarships (2025):</strong> Awarded the $25,000 Mathematics Global Scholarship at the University of Waterloo</li>
        </ul>
      </div>

      {/* Technical Skills */}
      <div>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.3rem', 
          fontWeight: '600',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Technical Skills
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
              Languages
            </h4>
            <p style={{ color: colors.text, fontSize: '0.9rem', margin: 0 }}>
              Python, Java, C/C++, C#, TypeScript, JavaScript, HTML/CSS, SQL
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
              Frameworks
            </h4>
            <p style={{ color: colors.text, fontSize: '0.9rem', margin: 0 }}>
              React, React Native, Next.js, Angular, Expo, Node.js, Git, MongoDB, PostgreSQL
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1rem', margin: '0 0 0.5rem 0' }}>
              Design
            </h4>
            <p style={{ color: colors.text, fontSize: '0.9rem', margin: 0 }}>
              Figma, Three.js, Blender, Fusion 360
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume; 