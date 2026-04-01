import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";

//3d networks
const AbstractNetwork = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#8c2e7c" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 1, -2]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial color="#f4e6f1" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-2.5, -1, -1]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial color="#6f2362" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
      <Sparkles count={50} scale={8} size={4} speed={0.2} opacity={0.5} color="#8c2e7c" />
    </group>
  );
};
const SponsorHeader = () => {
  return (
    <header className="relative h-[65vh] min-h-[500px] w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      {/*background 3d*/}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <AbstractNetwork />
        </Canvas>
      </div>

      {/*gradient overlay*/}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)]" />

      {/*content*/}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-(--primary-dark)/30 border border-(--primary)/50 text-(--secondary) text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            Partner With Us
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white"
          style={{ textShadow: "0 10px 30px rgba(140,46,124,0.3)" }}
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