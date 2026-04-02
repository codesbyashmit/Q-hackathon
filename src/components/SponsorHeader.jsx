import { useRef, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sparkles, Float, Center } from "@react-three/drei";
import { SVGLoader } from "three-stdlib";
const QuantumLogo3D = () => {
  const logoPath = import.meta.env.BASE_URL + 'qu-logo.svg';
  const svg = useLoader(SVGLoader, logoPath);
  const shapes = useMemo(() => svg.paths.flatMap(p => p.toShapes(true)), [svg]);

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1}>
      <Center scale={0.015}> 
        <group rotation={[Math.PI, 0, 0]}> 
          {shapes.map((shape, index) => (
            <mesh key={index}>
              <extrudeGeometry 
                args={[shape, { 
                  depth: 30, 
                  bevelEnabled: true, 
                  bevelThickness: 2, 
                  bevelSize: 1, 
                  bevelSegments: 3, 
                  curveSegments: 12 
                }]} 
              />
              <meshPhysicalMaterial
                color="#e51a80" 
                emissive="#8c2e7c"
                emissiveIntensity={0.4}
                metalness={0.8}
                roughness={0.15}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
          ))}
        </group>
      </Center>
    </Float>
  );
};

const AbstractNetwork = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.35; 
    groupRef.current.rotation.x = Math.cos(t * 0.3) * 0.15; 
  });

  return (
    <group ref={groupRef}>
      
      {/*main logo*/}
      <Suspense fallback={null}>
        <QuantumLogo3D />
      </Suspense>
      
      {/*right side wireframe*/}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[5.5, 1, -3]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#6f2362" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      
      {/*leftside wireframe*/}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[-5.5, -1, -2]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#8c2e7c" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -6]}>
          <torusGeometry args={[4.5, 0.01, 16, 64]} />
          <meshBasicMaterial color="#e51a80" transparent opacity={0.15} />
        </mesh>
      </Float>

      <Sparkles count={100} scale={18} size={2} speed={0.4} opacity={0.15} color="#ffffff" />
      <Sparkles count={80} scale={15} size={2} speed={0.2} opacity={0.7} color="#e51a80" />
      <Sparkles count={150} scale={22} size={4} speed={0.5} opacity={0.75} color="#FF00D9" />
      <Sparkles count={120} scale={20} size={3} speed={0.3} opacity={0.5} color="#ffffff" />
    </group>
  );
};
const SponsorHeader = () => {
  return (
    <header className="relative h-[70vh] min-h-[550px] w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      <div className="absolute inset-0 z-0 opacity-90">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <AbstractNetwork />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md shadow-lg">
            Partner With Us
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white"
          style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
        >
          Sponsor <span style={{ color: "var(--primary)" }}>Q-Hackathon</span> 2026
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl font-medium text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Support the next generation of innovators and secure prime brand visibility among India's top student developers, designers, and tech enthusiasts.
        </motion.p>
      </div>
    </header>
  );
};

export default SponsorHeader;