import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  roles: string[];
  baseText: string;
  colors: {
    dark: string;
    accent: string;
    text: string;
  };
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ roles, baseText, colors }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    if (!isDeleting && currentText === currentRole) {
      // Finished typing current role, wait then start deleting
      setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // Wait 2 seconds before deleting
      return;
    }

    if (isDeleting && currentText === '') {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        setCurrentText(currentRole.slice(0, currentText.length + 1));
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);



  return (
    <div className="typewriter-container">
      {/* First line - Hi, I'm */}
      <motion.h1 
        style={{ color: colors.dark }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {baseText}
      </motion.h1>
      
      {/* Second line - Feiyang Xu */}
      <motion.h1 
        style={{ color: colors.accent }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Feiyang Xu
      </motion.h1>
      
      {/* Third line - Dynamic typing */}
      <motion.div
        className="typing-line"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ 
          color: colors.text,
          fontSize: '1.5rem',
          fontWeight: '400',
          minHeight: '2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span>{currentText}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ 
            color: colors.accent,
            marginLeft: '2px',
            fontWeight: 'bold'
          }}
        >
          |
        </motion.span>
      </motion.div>
      

    </div>
  );
};

export default TypewriterEffect; 