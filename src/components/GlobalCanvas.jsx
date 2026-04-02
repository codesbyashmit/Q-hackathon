import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sparkles, Center, Float } from "@react-three/drei"; // Brought Float back!
import { SVGLoader } from "three-stdlib";
import { useScroll, useTransform, useSpring } from "framer-motion"; // Added useSpring!

const TravelingLogo = () => {
  const logoPath = import.meta.env.BASE_URL + 'qu-logo.svg';
  const svg = useLoader(SVGLoader, logoPath);
  const shapes = useMemo(() => svg.paths.flatMap(p => p.toShapes(true)), [svg]);

  // 1. Track global scroll progress
  const { scrollYProgress } = useScroll();

  // 2. THE FIX: Wrap the raw scroll data in a fluid Spring physics model
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  // 3. Map the SMOOTHED scroll to X position (pushed slightly wider to -3.5 and 3.5)
  const xPosition = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [-3.5, 3.5, -3.5, 3.5, -3.5]
  );

  // 4. Map the SMOOTHED scroll to Rotation
  const yRotation = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [0, Math.PI * 2, Math.PI * 4, Math.PI * 6, Math.PI * 8]
  );

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = xPosition.get();
      groupRef.current.rotation.y = yRotation.get();
    }
  });

  return (
    <group ref={groupRef}>
      {/* THE FIX: Wrap the logo in Float so it bobs up and down continuously */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
        <Center scale={0.015}>
          <group rotation={[Math.PI, 0, 0]}>
            {shapes.map((shape, index) => (
              <mesh key={index}>
                <extrudeGeometry args={[shape, { depth: 30, bevelEnabled: true, bevelSize: 1 }]} />
                <meshPhysicalMaterial
                  color="#e51a80"
                  emissive="#8c2e7c"
                  emissiveIntensity={0.3}
                  metalness={0.6}
                  roughness={0.2}
                  transparent={true}
                  opacity={0.35} 
                />
              </mesh>
            ))}
          </group>
        </Center>
      </Float>
    </group>
  );
};

const GlobalCanvas = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        <TravelingLogo />

        <Sparkles count={150} scale={15} size={2} speed={0.2} opacity={0.4} color="#8c2e7c" />
        <Sparkles count={50} scale={12} size={4} speed={0.4} opacity={0.6} color="#e51a80" />
      </Canvas>
    </div>
  );
};

export default GlobalCanvas;