import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Spaceship component using GLB model
const Spaceship: React.FC<{ onClick: () => void; isTraveling: boolean }> = ({ onClick, isTraveling }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const [isBoosting, setIsBoosting] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Load the GLB model with error handling
  const { scene } = useGLTF('/spaceship.glb', true, true, (error) => {
    console.error('Error loading GLB model:', error);
  });

  // Check if model loaded
  React.useEffect(() => {
    if (scene) {
      console.log('GLB model loaded successfully');
      setModelLoaded(true);
    }
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      timeRef.current += 0.02;
      
      // Gentle horizontal floating
      const floatOffset = Math.sin(timeRef.current * 0.8) * 0.5;
      
      // Boost effect when traveling
      if (isTraveling) {
        setIsBoosting(true);
        // Move forward and up during boost
        groupRef.current.position.z += 0.2;
        groupRef.current.rotation.z += 0.05;
        // Tilt upward during boost
        groupRef.current.rotation.x = -0.3;
        // Keep Y position at bottom during boost
        groupRef.current.position.y = -8;
        groupRef.current.position.x = floatOffset;
      } else {
        setIsBoosting(false);
        // Smoothly return to original position and rotation
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.05);
        // Return to bottom position with floating
        groupRef.current.position.y = -8;
        groupRef.current.position.x = floatOffset;
      }
      
      // Gentle rotation (always active)
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, -8, 0]}
    >
      {/* GLB Model */}
      {modelLoaded && (
        <primitive 
          object={scene} 
          scale={[4, 4, 4]} 
          position={[0, 0, 0]}
        />
      )}
      
      {/* Fallback geometry if GLB fails to load */}
      {!modelLoaded && (
        <mesh 
          scale={[4, 4, 4]}
        >
          <coneGeometry args={[0.5, 2, 8]} />
          <meshStandardMaterial 
            color="#C0C0C0" 
            emissive="#404040"
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
      
      {/* Boost effect - engine exhaust */}
      {isBoosting && (
        <group position={[0, -2, 0]}>
          {/* Main exhaust plume */}
          <mesh position={[0, -1, 0]} scale={[1, 2, 1]}>
            <coneGeometry args={[0.5, 2, 8]} />
            <meshStandardMaterial 
              color="#FF6B35" 
              emissive="#FF6B35"
              emissiveIntensity={2.0}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Secondary exhaust rings */}
          {[1, 2, 3].map((i) => (
            <mesh key={i} position={[0, -1 - i * 0.5, 0]} scale={[1 + i * 0.2, 0.2, 1 + i * 0.2]}>
              <torusGeometry args={[0.3, 0.1, 8, 16]} />
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700"
                emissiveIntensity={1.5}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Glow effect around spaceship */}
      <mesh position={[0, 0, 0]} scale={[8, 8, 8]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial 
          color="#E8D5C4" 
          transparent
          opacity={0.15}
          emissive="#E8D5C4"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Diamond-like star with real light rays (光芒)
const DiamondStar: React.FC<{ position: [number, number, number]; size: number; color: string }> = ({ position, size, color }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  const timeRef = useRef(0);
  const twinkleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (groupRef.current) {
      timeRef.current += 0.01;
      twinkleRef.current += 0.03;
      
      // Smoother floating animation with sine wave
      const floatOffset = Math.sin(timeRef.current * 0.8) * 0.5;
      groupRef.current.position.y = initialY + floatOffset;
      
      // Gentle horizontal drift
      groupRef.current.position.x += 0.001 * Math.cos(timeRef.current * 0.3);
      
      // Twinkling effect - natural star twinkle
      const twinkle = Math.sin(twinkleRef.current) * 0.2 + 0.8; // Varies between 0.6 and 1.0
      groupRef.current.scale.setScalar(size * twinkle);
      
      // Reset position when it goes too far
      if (groupRef.current.position.y > 12) {
        groupRef.current.position.y = -12;
        groupRef.current.position.x = position[0];
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Real light rays (光芒) - 8 directions using cones */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
        <mesh key={index} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <coneGeometry args={[0.05, size * 1.5, 4]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={3.0}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      
      {/* Additional light rays for more shine */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, index) => (
        <mesh key={`extra-${index}`} rotation={[0, 0, (angle * Math.PI) / 180]}>
          <coneGeometry args={[0.03, size * 1.2, 4]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive="#FFFFFF"
            emissiveIntensity={2.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      
      {/* Bright diamond core */}
      <mesh>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={5.0}
        />
      </mesh>
      
      {/* Inner white core */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF"
          emissiveIntensity={4.0}
        />
      </mesh>
      
      {/* Tiny bright center */}
      <mesh scale={[0.3, 0.3, 0.3]}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          emissive="#FFFFFF"
          emissiveIntensity={6.0}
        />
      </mesh>
    </group>
  );
};

// Galaxy of diamond stars with shooting effect
const GalaxyStars: React.FC<{ isTraveling: boolean }> = ({ isTraveling }) => {
  const starsRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const [originalPositions, setOriginalPositions] = useState<Array<[number, number, number]>>([]);
  const [shootingPhase, setShootingPhase] = useState<'normal' | 'converging' | 'spreading'>('normal');
  const [boostStartTime, setBoostStartTime] = useState(0);
  
  // Generate initial star positions
  React.useEffect(() => {
    const positions: Array<[number, number, number]> = [];
    for (let i = 0; i < 400; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30 - 5;
      positions.push([x, y, z]);
    }
    setOriginalPositions(positions);
  }, []);

  useFrame((state) => {
    if (starsRef.current && originalPositions.length > 0) {
      timeRef.current += 0.02;
      
      // Handle shooting effect phases
      if (isTraveling) {
        if (shootingPhase === 'normal') {
          setShootingPhase('converging');
          setBoostStartTime(timeRef.current);
        }
      } else {
        if (shootingPhase !== 'normal') {
          setShootingPhase('normal');
        }
      }
      
      // Update star positions based on phase
      const children = starsRef.current.children;
      children.forEach((child, index) => {
        if (index < originalPositions.length) {
          const originalPos = originalPositions[index];
          let targetPos: [number, number, number];
          
          if (shootingPhase === 'converging') {
            // Stars converge to center (spaceship position) - 2 seconds
            const elapsedTime = timeRef.current - boostStartTime;
            const progress = Math.min(elapsedTime * 0.5, 1); // 0.5 = 2 seconds duration
            targetPos = [
              originalPos[0] * (1 - progress),
              originalPos[1] * (1 - progress) + (-8 * progress), // Converge to spaceship Y position
              originalPos[2] * (1 - progress)
            ];
            
            if (progress >= 1) {
              setShootingPhase('spreading');
            }
          } else if (shootingPhase === 'spreading') {
            // Stars spread out from center and continue the effect for the full boost duration
            const elapsedTime = timeRef.current - boostStartTime;
            const spreadProgress = Math.min((elapsedTime - 2) * 0.125, 1); // 0.125 = 8 seconds duration for spreading
            const spreadDistance = 100;
            const angle = (index / originalPositions.length) * Math.PI * 2;
            const radius = spreadDistance * spreadProgress;
            
            targetPos = [
              Math.cos(angle) * radius,
              -8 + Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius * 0.3
            ];
          } else {
            // Normal floating animation
            const floatOffset = Math.sin(timeRef.current * 0.8 + index * 0.1) * 0.5;
            const driftOffset = Math.cos(timeRef.current * 0.3 + index * 0.05) * 0.3;
            targetPos = [
              originalPos[0] + driftOffset,
              originalPos[1] + floatOffset,
              originalPos[2]
            ];
          }
          
          // Smooth position transition
          child.position.lerp(new THREE.Vector3(...targetPos), 0.1);
        }
      });
    }
  });

  const stars = [];
  
  // Generate diamond stars with different colors and sizes
  for (let i = 0; i < 400; i++) {
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 30 - 5;
    
    // Color distribution: Morandi palette - soft pastels
    const colorRand = Math.random();
    let color, size;
    
    if (colorRand < 0.3) {
      // Soft beige diamonds
      color = '#D4C4B7';
      size = Math.random() * 0.3 + 0.15;
    } else if (colorRand < 0.55) {
      // Light cream diamonds
      color = '#F8F6F3';
      size = Math.random() * 0.4 + 0.2;
    } else if (colorRand < 0.8) {
      // Soft lavender diamonds
      color = '#E0AEE9';
      size = Math.random() * 0.4 + 0.2;
    } else {
      // Dusty rose diamonds
      color = '#B8A9A9';
      size = Math.random() * 0.4 + 0.2;
    }
    
    stars.push(
      <DiamondStar 
        key={i} 
        position={[x, y, z]} 
        size={size} 
        color={color}
      />
    );
  }
  
  return <group ref={starsRef}>{stars}</group>;
};

// Golden glitter particles
const GlitterParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 300;
  const timeRef = useRef(0);
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    
    // Softer Morandi colors for glitter
    colors[i * 3] = Math.random() * 0.2 + 0.8; // Soft cream to white
    colors[i * 3 + 1] = Math.random() * 0.2 + 0.8;
    colors[i * 3 + 2] = Math.random() * 0.1 + 0.9;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  useFrame(() => {
    if (particlesRef.current) {
      timeRef.current += 0.005;
      
      // Smoother rotation with easing
      particlesRef.current.rotation.y += 0.0001 * Math.sin(timeRef.current * 0.3);
      particlesRef.current.rotation.x += 0.00005 * Math.cos(timeRef.current * 0.2);
      
      // Gentle floating motion
      particlesRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.5;
    }
  });
  
  return (
    <points ref={particlesRef} position={[0, 0, -8]}>
      <primitive object={geometry} />
      <pointsMaterial 
        size={0.15}
        vertexColors 
        transparent 
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  );
};

// White sparkles
const Sparkles: React.FC = () => {
  const sparklesRef = useRef<THREE.Points>(null);
  const sparkleCount = 250;
  const timeRef = useRef(0);
  
  const positions = new Float32Array(sparkleCount * 3);
  const colors = new Float32Array(sparkleCount * 3);
  
  for (let i = 0; i < sparkleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 55;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    
    // Bright white sparkles
    colors[i * 3] = 1.0;
    colors[i * 3 + 1] = 1.0;
    colors[i * 3 + 2] = 1.0;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  useFrame(() => {
    if (sparklesRef.current) {
      timeRef.current += 0.008;
      
      // Smoother rotation with easing
      sparklesRef.current.rotation.y += 0.0002 * Math.sin(timeRef.current * 0.4);
      
      // Gentle floating motion
      sparklesRef.current.position.y = Math.sin(timeRef.current * 0.6) * 0.3;
    }
  });
  
  return (
    <points ref={sparklesRef} position={[0, 0, -3]}>
      <primitive object={geometry} />
      <pointsMaterial 
        size={0.08}
        vertexColors 
        transparent 
        opacity={1.0}
        sizeAttenuation={true}
      />
    </points>
  );
};

// Main scene component
const MagicalScene: React.FC<{ isTraveling: boolean }> = ({ isTraveling }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      timeRef.current += 0.003;
      
      // Smoother overall rotation with easing
      groupRef.current.rotation.y += 0.0001 * Math.sin(timeRef.current * 0.2);
      
      // Gentle breathing motion
      const scale = 1 + Math.sin(timeRef.current * 0.5) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sparkles */}
      <Sparkles />
      
      {/* Golden glitter particles */}
      <GlitterParticles />
      
      {/* Galaxy of diamond stars */}
      <GalaxyStars isTraveling={isTraveling} />
      
      {/* Spaceship - always show, let it handle boost state */}
      <Spaceship onClick={() => {}} isTraveling={isTraveling} />
    </group>
  );
};

// Main component with Canvas
const SunriseBackground: React.FC<{ isTraveling: boolean }> = ({ isTraveling }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'auto'
    }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ 
          background: `
            radial-gradient(ellipse 90% 60% at 20% 20%, #FF8AB3 0%, transparent 40%),
            radial-gradient(ellipse 80% 50% at 80% 30%, #C69BD8 0%, transparent 40%),
            radial-gradient(ellipse 85% 60% at 40% 60%, #FFA8B8 0%, transparent 40%),
            radial-gradient(ellipse 95% 70% at 70% 70%, #C8B8FF 0%, transparent 40%),
            radial-gradient(ellipse 90% 60% at 10% 80%, #5A8BFF 0%, transparent 40%),
            radial-gradient(ellipse 110% 80% at 50% 50%, #3A6BCC 0%, #5A8BFF 25%, #C8B8FF 50%, #FFA8B8 70%, #C69BD8 85%, #FF8AB3 100%)
          `,
          animation: 'cloudDrift 30s ease-in-out infinite',
          zIndex: 1
        }}
      >
        {/* Ambient light - much brighter and softer */}
        <ambientLight intensity={2.0} color="#F8F6F3" />
        
        {/* Directional light - softer and warmer */}
        <directionalLight 
          position={[0, 10, 5]} 
          intensity={1.5} 
          color="#E8D5C4"
        />
        
        {/* Point lights for atmosphere - Morandi pastels */}
        <pointLight 
          position={[0, 0, 10]} 
          intensity={1.2} 
          color="#D4C4B7"
          distance={60}
        />
        <pointLight 
          position={[-10, 5, 5]} 
          intensity={1.0} 
          color="#E0AEE9"
          distance={40}
        />
        <pointLight 
          position={[10, -5, 5]} 
          intensity={1.0} 
          color="#B8A9A9"
          distance={40}
        />
        
        <MagicalScene isTraveling={isTraveling} />
        
        {/* Spaceship - always show, let it handle boost state */}
        <Spaceship onClick={() => {}} isTraveling={isTraveling} />
      </Canvas>
    </div>
  );
};

export default SunriseBackground;

// Preload the GLB model
useGLTF.preload('/spaceship.glb'); 