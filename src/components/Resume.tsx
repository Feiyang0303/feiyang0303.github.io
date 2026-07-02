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
          fontSize: '2.35rem', 
          fontWeight: '800',
          marginBottom: '0.5rem'
        }}>
          Feiyang Xu
        </h1>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.45rem', 
          fontWeight: '700',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Education
        </h2>
        <div style={{ marginBottom: '1rem' }}>
          <div className="resume-item-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
                University of Waterloo
              </h3>
              <p style={{ color: colors.text, fontSize: '1rem', margin: '0.2rem 0' }}>
                Bachelor of Computer Science
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '1rem', whiteSpace: 'nowrap' }}>
              Anticipated Graduation: April 2029
            </span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.45rem', 
          fontWeight: '700',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Experience
        </h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="resume-item-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
                DevOps Engineering Intern
              </h3>
              <p style={{ color: colors.text, fontSize: '1rem', margin: '0.2rem 0' }}>
                Xello Inc. · Toronto, ON
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '1rem', whiteSpace: 'nowrap' }}>
              May 2026 – Present
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Built GitHub webhook integrations and CI/CD tooling (Node.js, Jenkins, Octopus Deploy) to automate deployments for Xello's college and career readiness platform</li>
            <li>Supported reliable release pipelines for a product serving K-12 schools and daily student users across North America</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="resume-item-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
                Undergraduate Research Assistant (ML Engineering)
              </h3>
              <p style={{ color: colors.text, fontSize: '1rem', margin: '0.2rem 0' }}>
                University of Waterloo (Supervisor: Prof. Justin Wan) · Waterloo, ON
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '1rem', whiteSpace: 'nowrap' }}>
              Feb 2026 – Present
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Conduct research on latent diffusion watermarking robustness under Prof. Justin Wan, designing controlled perturbation experiments to measure detection fidelity across adversarial conditions</li>
            <li>Contribute reproducible benchmark protocols, statistical analysis, and experimental documentation toward publication on generative model provenance</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="resume-item-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
                Research Assistant (Applied AI)
              </h3>
              <p style={{ color: colors.text, fontSize: '1rem', margin: '0.2rem 0' }}>
                Yangzhou University · Remote
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '1rem', whiteSpace: 'nowrap' }}>
              Dec 2024 – Jul 2025
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Architected a multi-agent NLP pipeline orchestrating 11 specialized LLM agents for long-context literature parsing via deterministic Python execution graphs</li>
            <li>Engineered A/B evaluation pipelines to collect user feedback and iteratively tune prompts and generation parameters for production-quality output</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div className="resume-item-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: 0, fontWeight: '700' }}>
                Software Developer Intern
              </h3>
              <p style={{ color: colors.text, fontSize: '1rem', margin: '0.2rem 0' }}>
                Utility Automation Solutions · Remote
              </p>
            </div>
            <span style={{ color: colors.text, fontSize: '1rem', whiteSpace: 'nowrap' }}>
              Apr 2024 – Apr 2025
            </span>
          </div>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Delivered a production-grade C# and WPF desktop application used by utility operators to automate critical grid fault location, safety triage, and real-time telemetry analysis</li>
          </ul>
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.45rem', 
          fontWeight: '700',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Projects
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            Diffusion Watermarking
          </h3>
          <p style={{ color: colors.text, fontSize: '0.95rem', margin: '0 0 0.5rem 0', fontStyle: 'italic' }}>
            Python, PyTorch, NumPy
          </p>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Built a scalable PyTorch evaluation suite to benchmark watermark robustness against image compression and adversarial noise injection</li>
            <li>Engineered Fourier-domain signal processing pipelines that increased Tree-Ring watermark detection rate by 3x</li>
            <li>Architected a modular latent diffusion backend supporting DDIM inversion without modifying base model weights</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            CapySpend
          </h3>
          <p style={{ color: colors.text, fontSize: '0.95rem', margin: '0 0 0.5rem 0', fontStyle: 'italic' }}>
            React, TypeScript, Node.js, Express, PostgreSQL, Plaid API, OpenAI
          </p>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Integrated the Plaid API within an Express backend to securely sync real-time ledger records, designing indexed PostgreSQL transaction schemas to guarantee fast relational queries</li>
            <li>Engineered an autonomous financial co-pilot leveraging OpenAI's structured tool-calling capabilities to dynamically parse arbitrary user text and trigger appropriate transaction categorization workflows</li>
            <li>Built a secure full-stack Single Page Application (SPA) implementing signed stateful JWT authorization layers and custom React routing hooks to protect sensitive financial domains</li>
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: colors.dark, fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
            AudioNovel
          </h3>
          <p style={{ color: colors.text, fontSize: '0.95rem', margin: '0 0 0.5rem 0', fontStyle: 'italic' }}>
            Python, Flask, MongoDB Atlas, Cohere, ElevenLabs
          </p>
          <ul style={{ 
            color: colors.text, 
            fontSize: '1rem', 
            margin: '0.5rem 0',
            paddingLeft: '1.5rem'
          }}>
            <li>Built a scalable Flask REST API documented via OpenAPI specifications, integrating a companion React front-end utilizing secure cryptographically-salted bcrypt user authentications</li>
            <li>Leveraged Cohere embed-english-v3.0 models to index contextual dense vector embeddings inside MongoDB Atlas, backing an optimized k-NN semantic search API endpoint</li>
            <li>Designed a 10-stage asynchronous background queue processing architecture to ingest text uploads and synthesize multi-character narration files via ElevenLabs TTS API integrations</li>
          </ul>
        </div>
      </div>

      {/* Awards */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.45rem', 
          fontWeight: '700',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Awards
        </h2>
        <ul style={{ 
          color: colors.text, 
          fontSize: '0.9rem', 
          margin: '0.5rem 0',
          paddingLeft: '1.5rem'
        }}>
          <li><strong>Euclid Math Contest Honorable Mention (2024):</strong> Ranked Top 10 in Canada </li>
          <li><strong>University of Waterloo Mathematics Global Scholarship:</strong> Awarded $25,000 for academic excellence</li>
        </ul>
      </div>

      {/* Technical Skills */}
      <div>
        <h2 style={{ 
          color: colors.dark, 
          fontSize: '1.45rem', 
          fontWeight: '700',
          borderBottom: `2px solid ${colors.primary}`,
          paddingBottom: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'left'
        }}>
          Technical Skills
        </h2>
        <div className="resume-skills-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
              Languages
            </h4>
            <p style={{ color: colors.text, fontSize: '1rem', margin: 0 }}>
              Python, Java, C/C++, C#, TypeScript, JavaScript, HTML/CSS, SQL
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
              Frameworks
            </h4>
            <p style={{ color: colors.text, fontSize: '1rem', margin: 0 }}>
              React, React Native, Next.js, Angular, Expo, Node.js, Git, MongoDB, PostgreSQL
            </p>
          </div>
          <div>
            <h4 style={{ color: colors.dark, fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: '700' }}>
              Design
            </h4>
            <p style={{ color: colors.text, fontSize: '1rem', margin: 0 }}>
              Figma, Three.js, Blender, Fusion 360
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume; 