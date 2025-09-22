// import * as THREE from "three";
// import { useRef, useMemo, useState, useEffect } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment } from "@react-three/drei";
// import { EffectComposer, N8AO, Bloom } from "@react-three/postprocessing";
// import {
//   BallCollider,
//   Physics,
//   RigidBody,
//   CylinderCollider,
//   RapierRigidBody,
// } from "@react-three/rapier";

// const textureLoader = new THREE.TextureLoader();
// const imageUrls = [
//   "/images/react2.webp",
//   "/images/next2.webp",
//   "/images/node2.webp",
//   "/images/express.webp",
//   "/images/mongo.webp",
//   "/images/mysql.webp",
//   "/images/typescript.webp",
//   "/images/javascript.webp",
// ];
// const textures = imageUrls.map((url) => {
//   const tex = textureLoader.load(url);
//   tex.colorSpace = THREE.SRGBColorSpace;
//   return tex;
// });

// const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
// const spheres = [...Array(30)].map(() => ({
//   scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
// }));

// type SphereProps = {
//   vec?: THREE.Vector3;
//   scale: number;
//   r?: typeof THREE.MathUtils.randFloatSpread;
//   material: THREE.MeshPhysicalMaterial;
//   isActive: boolean;
// };

// function SphereGeo({
//   vec = new THREE.Vector3(),
//   scale,
//   r = THREE.MathUtils.randFloatSpread,
//   material,
//   isActive,
// }: SphereProps) {
//   const api = useRef<RapierRigidBody | null>(null);

//   useFrame((_state, delta) => {
//     if (!isActive) return;
//     delta = Math.min(0.1, delta);
//     const impulse = vec
//       .copy(api.current!.translation())
//       .normalize()
//       .multiply(
//         new THREE.Vector3(
//           -50 * delta * scale,
//           -150 * delta * scale,
//           -50 * delta * scale
//         )
//       );
//     api.current?.applyImpulse(impulse, true);
//   });

//   return (
//     <RigidBody
//       linearDamping={0.75}
//       angularDamping={0.15}
//       friction={0.2}
//       position={[r(20), r(20) - 25, r(20) - 10]}
//       ref={api}
//       colliders={false}
//     >
//       <BallCollider args={[scale]} />
//       <CylinderCollider
//         rotation={[Math.PI / 2, 0, 0]}
//         position={[0, 0, 1.2 * scale]}
//         args={[0.15 * scale, 0.275 * scale]}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         scale={scale}
//         geometry={sphereGeometry}
//         material={material}
//         rotation={[0.3, 1, 1]}
//       />
//     </RigidBody>
//   );
// }

// type PointerProps = { vec?: THREE.Vector3; isActive: boolean };

// function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
//   const ref = useRef<RapierRigidBody>(null);
//   useFrame(({ pointer, viewport }) => {
//     if (!isActive) return;
//     const targetVec = vec.lerp(
//       new THREE.Vector3(
//         (pointer.x * viewport.width) / 2,
//         (pointer.y * viewport.height) / 2,
//         0
//       ),
//       0.2
//     );
//     ref.current?.setNextKinematicTranslation(targetVec);
//   });
//   return (
//     <RigidBody
//       position={[100, 100, 100]}
//       type="kinematicPosition"
//       colliders={false}
//       ref={ref}
//     >
//       <BallCollider args={[2]} />
//     </RigidBody>
//   );
// }

// const TechStack = () => {
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     const workEl = document.getElementById("work");
//     if (!workEl) return;
//     const onScroll = () => {
//       const top = workEl.getBoundingClientRect().top;
//       setIsActive(top < window.innerHeight * 0.6);
//     };
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const materials = useMemo(
//     () =>
//       textures.map(
//         (texture) =>
//           new THREE.MeshPhysicalMaterial({
//             map: texture,
//             emissive: "#ffffff",
//             emissiveMap: texture,
//             emissiveIntensity: 0.45, // a touch stronger for glow
//             metalness: 0.5,
//             roughness: 1,
//             clearcoat: 0.1,
//           })
//       ),
//     []
//   );

//   return (
//     <div className="techstack">
//       <h2> My Techstack</h2>

//       <Canvas
//         shadows
//         gl={{ alpha: true, antialias: true, depth: true }}
//         camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
//         onCreated={(state) => {
//           const gl = state.gl;
//           gl.outputColorSpace = THREE.SRGBColorSpace;
//           gl.toneMapping = THREE.ACESFilmicToneMapping;
//           gl.toneMappingExposure = 1.5; // punchier contrast like the demo
//           gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
//         }}
//         className="tech-canvas"
//       >
//         <ambientLight intensity={0.6} />
//         <spotLight
//           position={[20, 20, 25]}
//           penumbra={1}
//           angle={0.2}
//           color="white"
//           castShadow
//           shadow-mapSize={[512, 512]}
//         />
//         <directionalLight position={[0, 5, -4]} intensity={1.4} />

//         <Physics gravity={[0, 0, 0]}>
//           <Pointer isActive={isActive} />
//           {spheres.map((props, i) => (
//             <SphereGeo
//               key={i}
//               {...props}
//               material={materials[Math.floor(Math.random() * materials.length)]}
//               isActive={isActive}
//             />
//           ))}
//         </Physics>

//         <Environment
//           files="/models/char_enviorment.hdr"
//           environmentIntensity={0.55}
//           environmentRotation={[0, 4, 2]}
//         />

//         <EffectComposer enableNormalPass={false}>
//           {/* AO adds depth; Bloom brings the purple glow back */}
//           <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
//           <Bloom intensity={1.0} luminanceThreshold={0.7} mipmapBlur />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// };

// export default TechStack;
// wherever you used the old <TechStack />:
// TechStackSimple.tsx
// TechStackShowcase.tsx
// import React from "react";

/** Color palette (kept from your original vibe)
 *  - Page bg:   #0b080c (set on <body> or wrapper)
 *  - Deep purple accent: #0f002c
 *  - Focus ring / highlight: #7a3cff
 */

import React from "react";
import "./styles/techstack-text.css";

type StackRow = {
  left: string;   // category
  mid: string;    // level tag (EXPERT / ADVANCED / ...)
  right: string;  // description
};

const ROWS: StackRow[] = [
  {
    left: "Frontend",
    mid: "EXPERT",
    right:
      "React, Next.js, TypeScript, modern state & data fetching, accessible UI, performance budgets.",
  },
  {
    left: "Backend",
    mid: "ADVANCED",
    right:
      "Node.js + Express, REST patterns, auth, sessions/JWT, input validation, logging.",
  },
  {
    left: "Databases",
    mid: "PROFICIENT",
    right:
      "MongoDB & MySQL: schema design, indexing basics, aggregation/joins, migrations, backups.",
  },
  {
    left: "Dev & DX",
    mid: "DAILY",
    right:
      "Git/GitHub, CI basics, eslint/prettier, env management, simple Docker, prod-safe builds.",
  },
];

export default function TechStackTimeline() {
  return (
    <section id="work" className="tstc-section">
      <h2 className="tstc-heading">
        <span>My</span> tech stack
      </h2>

      <div className="tstc-grid">
        {ROWS.map((r, i) => (
          <article className="tstc-row" style={{ ["--i" as any]: i }} key={i}>
            <div className="tstc-left">
              <h3 className="tstc-left-title">{r.left}</h3>
              <p className="tstc-left-sub">Core tools & methods</p>
            </div>

            <div className="tstc-mid">
              <span className="tstc-badge">{r.mid}</span>
            </div>

            <div className="tstc-right">
              <p>{r.right}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
