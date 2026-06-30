"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Bounds, Center, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

function Model({ url }: { url: string }) {
  // segundo arg = usar DRACO (decoder via CDN gstatic) para geometria comprimida
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} />;
}

export default function Model3DViewer({ url }: { url: string }) {
  // Só monta o Canvas no cliente (evita erro de WebGL no prerender estático).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center text-sm text-muted">
        Carregando 3D…
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [3, 1.6, 3], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
    >
      <color attach="background" args={["#0a0e14"]} />
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.4} groundColor="#0a0e14" />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Center>
            <Model url={url} />
          </Center>
        </Bounds>
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={0.9}
        enablePan={false}
        minDistance={1}
        maxDistance={20}
      />
    </Canvas>
  );
}
