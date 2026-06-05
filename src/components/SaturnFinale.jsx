import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

const basePhotos = [
  "/WhatsApp Image 2026-06-01 at 21.31.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.31.46.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.33.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.03.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.34.55.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.36.15.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.37.13.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.01.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.38.17.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.39.05.jpeg", 
  "/WhatsApp Image 2026-06-01 at 21.39.33.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.41.00.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.42.29.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.43.10.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (1).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (2).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11 (3).jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.11.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.46.12.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.49.jpeg",
  "/WhatsApp Image 2026-06-01 at 21.47.50.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.43.45.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.45.17.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.48.35.jpeg",
  "/WhatsApp Image 2026-06-05 at 22.49.00.jpeg"
];

// Duplicate photos to make the rings very dense
const allPhotos = [...basePhotos, ...basePhotos, ...basePhotos, ...basePhotos]; // 108 photos

// Spread across 4 rings for a massive dense asteroid field effect
const ring1Photos = allPhotos.slice(0, 18);
const ring2Photos = allPhotos.slice(18, 42);
const ring3Photos = allPhotos.slice(42, 70);
const ring4Photos = allPhotos.slice(70, 108);

// 1. Planet Core (Golden Particle Sphere)
const ParticleSphere = () => {
  const pointsRef = useRef();
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 4.0;
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#F2D57E" transparent opacity={0.8} />
    </points>
  );
};

// 2. Glowing Core Background (Now Interactive!)
const GlowSphere = ({ secretRevealed, onReveal }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (secretRevealed && meshRef.current) {
      // Pulse effect when revealed
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
      meshRef.current.material.color.set("#FFD700");
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onReveal();
      }}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <sphereGeometry args={[4.2, 32, 32]} />
      <meshBasicMaterial color="#D4AF37" transparent opacity={0.15} depthWrite={false} />
    </mesh>
  );
};

// 3. Dense Stardust Ring
const ParticleRing = () => {
  const pointsRef = useRef();
  const particleCount = 15000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 5.5 + Math.random() * 6.5; // Spread from 5.5 to 12.0
      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.15; // Ring thickness
      pos[i * 3 + 2] = radius * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF37" transparent opacity={0.4} />
    </points>
  );
};

// 4. Orbiting Photos (Using Drei Html)
const PhotoOrbits = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03; // Smooth slow rotation
    }
  });

  const renderRing = (photos, radius, offsetAngle = 0, yOffset = 0) => {
    return photos.map((src, i) => {
      const angle = (i / photos.length) * Math.PI * 2 + offsetAngle;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      
      return (
        <group key={i} position={[x, yOffset, z]}>
          <Html transform center distanceFactor={18} zIndexRange={[100, 0]}>
            <div className="w-4 h-4 md:w-4 md:h-4 rounded-full border-[0.5px] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)] overflow-hidden bg-black flex items-center justify-center pointer-events-none select-none">
              <img src={src} className="w-full h-full object-cover pointer-events-none select-none" draggable={false} loading="lazy" />
            </div>
          </Html>
        </group>
      );
    });
  };

  return (
    <group ref={groupRef}>
      {renderRing(ring1Photos, 5.8, 0, 0.4)}
      {renderRing(ring2Photos, 7.5, Math.PI / 3, 0)}
      {renderRing(ring3Photos, 9.5, Math.PI / 4, -0.2)}
      {renderRing(ring4Photos, 11.5, Math.PI / 6, -0.5)}
    </group>
  );
};

// 5. Shooting Stars
const ShootingStar = () => {
  const ref = useRef();
  const [params] = useState(() => ({
    x: 20 + Math.random() * 30,
    y: 10 + Math.random() * 20,
    z: -20 + Math.random() * 40,
    speed: 30 + Math.random() * 40,
    delay: Math.random() * 5
  }));

  useFrame((state, delta) => {
    if (params.delay > 0) {
      params.delay -= delta;
      ref.current.position.set(1000, 1000, 1000); // hide while delayed
      return;
    }
    
    ref.current.position.x -= params.speed * delta;
    ref.current.position.y -= params.speed * 0.4 * delta;
    ref.current.position.z -= params.speed * 0.4 * delta;
    
    // Reset
    if (ref.current.position.x < -40) {
      params.delay = 3 + Math.random() * 7;
      ref.current.position.set(
        20 + Math.random() * 30,
        10 + Math.random() * 20,
        -20 + Math.random() * 40
      );
      params.speed = 30 + Math.random() * 40;
    }
  });

  return (
    <mesh ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <cylinderGeometry args={[0.015, 0.08, 6, 8]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
    </mesh>
  );
};

const ShootingStars = () => (
  <group>
    {[...Array(4)].map((_, i) => <ShootingStar key={i} />)}
  </group>
);

// 6. WebGL Scene
const WebGLScene = ({ secretRevealed, onReveal }) => {
  return (
    <Canvas camera={{ position: [0, 5, 18], fov: 60 }} className="w-full h-full cursor-grab active:cursor-grabbing">
      <ambientLight intensity={1} />
      
      {/* Outer Space Background */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ShootingStars />
      
      <GlowSphere secretRevealed={secretRevealed} onReveal={onReveal} />
      <ParticleSphere />
      
      {/* Tilted Saturn System */}
      <group rotation={[0.15, 0, -0.1]}>
        <ParticleRing />
        <PhotoOrbits />
      </group>

      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.8} 
        enableZoom={true} 
        minDistance={5}
        maxDistance={35}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

const SaturnFinale = () => {
  const [phase, setPhase] = useState(1);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    // Phase 1: 0-4s (Center text only)
    const timer1 = setTimeout(() => { setPhase(2); }, 4000); 
    // Phase 2: 4-7s (Text moves top-left, Saturn fades in)
    const timer2 = setTimeout(() => { setPhase(3); }, 7000); 
    // Phase 3: 7s+ ("To many more beautiful years" appears top-right)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center">
      
      {/* The 3D Interactive World (Appears in Phase 2) */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            <WebGLScene secretRevealed={secretRevealed} onReveal={() => setSecretRevealed(!secretRevealed)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Center Text */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="centerText"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} 
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#D4AF37] px-4 sm:px-6 text-center drop-shadow-[0_0_25px_rgba(212,175,55,0.8)] tracking-wide leading-tight">
              Happy Birthday Sayangkuuuu....
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Phase 2 & 3: Top-Left Text */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            key="cornerText"
            initial={{ opacity: 0, x: -50, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
            className="absolute top-6 sm:top-8 left-4 sm:left-8 md:left-10 z-50 max-w-[150px] sm:max-w-[200px] md:max-w-[300px] pointer-events-none"
          >
            <p className="text-xs sm:text-sm md:text-lg font-serif text-[#D4AF37]/90 italic drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              Happy Birthday Sayangkuuuu....
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Top-Right Closing Text */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-6 sm:top-8 right-4 sm:right-8 md:right-10 z-50 text-right max-w-[180px] sm:max-w-[220px] md:max-w-[350px] pointer-events-none"
          >
            <h2 className="text-sm sm:text-lg md:text-3xl font-serif text-[#FFF8E7] mb-1 sm:mb-2 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              We’ve gone through many chapters together, But the best chapters haven't written yet
            </h2>
            <p className="text-[#EFA8C2] font-light italic text-[13px] sm:text-md md:text-lg drop-shadow-md">
              "You are the reason I keep going."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Overlay (Fades in late) */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute bottom-6 z-50 pointer-events-none flex flex-col items-center w-full"
          >
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5], textShadow: ["0px 0px 5px rgba(212,175,55,0.2)", "0px 0px 15px rgba(212,175,55,0.9)", "0px 0px 5px rgba(212,175,55,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#D4AF37] text-[10px] md:text-xs tracking-[0.2em] uppercase font-light mb-4 drop-shadow-md"
            >
              Swipe untuk explore & Klik Inti Saturnus untuk buka pesan
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Prompt */}
      <AnimatePresence>
        {phase === 3 && !secretRevealed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 2 }}
            className="absolute bottom-20 z-50 pointer-events-none w-full flex justify-center"
          >

          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Reveal Message */}
      <AnimatePresence>
        {secretRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setSecretRevealed(false)}
            className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-auto cursor-pointer"
          >
            <div className="bg-gradient-to-b from-black/80 to-[#1a1114]/90 backdrop-blur-xl px-8 py-12 md:px-14 md:py-16 rounded-2xl border border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.2),inset_0_0_30px_rgba(212,175,55,0.1)] text-center max-w-sm md:max-w-xl mx-4 flex flex-col items-center">
              <h3 className="text-2xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] via-[#D4AF37] to-[#B38B22] mb-6 leading-relaxed md:leading-loose tracking-wide drop-shadow-sm">
                I love you more than all the stars in the sky.
              </h3>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-6"></div>
              <p className="text-[#D4AF37]/70 text-[10px] md:text-xs font-sans tracking-[0.3em] uppercase font-light">
                You are my entire universe. ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SaturnFinale;
