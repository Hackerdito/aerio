import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Grandes ondas orgánicas (Baja frecuencia)
    float t = uTime * 0.15;
    
    // Pliegue diagonal principal
    float wave1 = sin(pos.x * 0.4 + pos.y * 0.3 + t) * 1.5;
    // Ondulación secundaria
    float wave2 = sin(pos.x * 0.3 - t * 0.8) * 0.8;
    // Modulación transversal
    float wave3 = cos(pos.y * 0.5 + t * 1.2) * 0.6;
    
    float displacement = wave1 + wave2 + wave3;
    pos.z += displacement;
    
    // Suave deformación en X/Y para un aspecto más escultural y orgánico
    pos.x += sin(pos.y * 0.2 + t) * 0.4;
    pos.y += cos(pos.x * 0.2 + t) * 0.4;

    vElevation = displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Paleta de colores solicitada
    vec3 cBlack = vec3(0.0);
    vec3 cDarkBlue = vec3(0.008, 0.031, 0.090);  // #020817
    vec3 cDeepBlue = vec3(0.024, 0.106, 0.302);  // #061B4D
    vec3 cPrimary = vec3(0.027, 0.361, 1.0);     // #075CFF
    vec3 cElectric = vec3(0.086, 0.467, 1.0);    // #1677FF
    vec3 cHighlight = vec3(0.302, 0.612, 1.0);   // #4D9CFF

    // Normalizar la elevación (-2.9 a 2.9 aprox) a un rango útil para mezclar (0.0 a 1.0)
    float t = smoothstep(-1.5, 2.5, vElevation);

    vec3 color = mix(cBlack, cDarkBlue, smoothstep(0.0, 0.2, t));
    color = mix(color, cDeepBlue, smoothstep(0.2, 0.45, t));
    color = mix(color, cPrimary, smoothstep(0.45, 0.7, t));
    color = mix(color, cElectric, smoothstep(0.7, 0.9, t));
    
    // Highlight tipo "Satín" / Especular en los picos
    float spec = smoothstep(0.75, 0.9, t) * smoothstep(1.0, 0.9, t);
    color += cHighlight * spec * 0.8;
    
    // Zonas muy bajas desaparecen en negro puro para dar contraste fuerte
    color = mix(cBlack, color, smoothstep(0.05, 0.3, t));

    gl_FragColor = vec4(color, 1.0);
  }
`;

const Sculpture = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalizar de -1 a 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Rotación interactiva sutil
      targetRotation.current.x = y * 0.03;
      targetRotation.current.y = x * 0.05;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }

    if (meshRef.current) {
      // Oscilación global súper suave (cámara flotante)
      const oscX = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      const oscY = Math.cos(state.clock.elapsedTime * 0.2) * 0.02;

      // Efecto Scroll (desplaza un poco la rotación)
      const scrollEffectX = scrollY.current * 0.0005;

      // Lerp hacia la rotación objetivo + oscilación para efecto de inercia
      currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.current.x + oscX, 0.05);
      currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.current.y + oscY, 0.05);

      // Aplicar rotación base (para enfocar y angular la malla) y sumarle la interactiva
      meshRef.current.rotation.x = -0.3 + currentRotation.current.x - scrollEffectX;
      meshRef.current.rotation.y = -0.2 + currentRotation.current.y;
      meshRef.current.rotation.z = 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, -1, -4]}>
      {/* Geometría con alta subdivisión (180x180) y gran escala para ocupar el espacio visual */}
      <planeGeometry args={[26, 20, 180, 180]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default function Background3D() {
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] min-h-[900px] z-0 pointer-events-none overflow-hidden bg-black">
      {/* Conservamos un dpr entre 1 y 1.5 para mantener buen performance incluso con las altas subdivisiones del plano */}
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
        <Sculpture />
      </Canvas>
      {/* Máscara de gradiente en la parte inferior para fusionar suavemente con el resto del contenido de la web */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09070f] to-transparent pointer-events-none" />
    </div>
  );
}
