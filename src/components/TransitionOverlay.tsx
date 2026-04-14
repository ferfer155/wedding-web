import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// ==========================================
// OPTIMASI PERFORMA: GLOBAL MATERIALS & GEOS
// Disesuaikan dengan palet warna gambar (Warm Cream, Sage Green, Dusty Rose)
// Menggabungkan bentuk pintu dari kode asli
// ==========================================

// Tema Warm Cream & Soft Beige
const frameMaterial = new THREE.MeshStandardMaterial({
  color: "#F8EFE0", // Warm cream/beige matching the arch
  roughness: 0.3,
  metalness: 0.1,
});

const glassMaterial = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  opacity: 0.25,
  transparent: true,
  roughness: 0.1,
});

const roseGoldMaterial = new THREE.MeshStandardMaterial({
  color: "#C2A878", // Muted soft gold/brown
  roughness: 0.3,
  metalness: 0.5,
});

const roseGoldLightMaterial = new THREE.MeshStandardMaterial({
  color: "#D4BC8C",
  roughness: 0.2,
  metalness: 0.6,
});

const leafMaterial = new THREE.MeshStandardMaterial({
  color: "#9CA586", // Sage green dari dedaunan
  roughness: 0.6,
});

const flowerMatDark = new THREE.MeshStandardMaterial({
  color: "#D2A5A5", // Dusty rose / pink kecoklatan
  roughness: 0.7,
});
const flowerMatLight = new THREE.MeshStandardMaterial({
  color: "#E8D3D3", // Pale blush
  roughness: 0.7,
});
const flowerMatWhite = new THREE.MeshStandardMaterial({
  color: "#FDFBF4", // Warm white / bunga krem
  roughness: 0.7,
});

// Material dinding
const roomMaterial = new THREE.MeshStandardMaterial({
  color: "#FCF6E8", // Warna latar belakang warm cream terang
  roughness: 1,
});
const backWallMaterial = new THREE.MeshBasicMaterial({ color: "#FCF6E8" });

// Geometri (Disederhanakan untuk performa tinggi)
const roseGeometry = new THREE.IcosahedronGeometry(1, 0); // Detail diturunkan ke 0
const leafGeometry = new THREE.SphereGeometry(1, 8, 8); // Segmen dikurangi dari 16x16 ke 8x8
const cylinderGeo = new THREE.CylinderGeometry(0.35, 0.35, 1, 16); // Segmen silinder dikurangi dari 32 ke 16

// ==========================================
// DOOR PANEL
// ==========================================
const Door = ({
  side,
  isOpen,
}: {
  side: "left" | "right";
  isOpen: boolean;
}) => {
  const isLeft = side === "left";
  const groupRef = useRef<THREE.Group>(null);
  const doorPanelWidth = 2.7;
  const doorPanelHeight = 6.8;
  const doorHalfWidth = doorPanelWidth / 2;
  const doorPivotX = isLeft ? -doorPanelWidth : doorPanelWidth;
  const doorPanelOffsetX = isLeft ? doorHalfWidth : -doorHalfWidth;
  const handleX = isLeft ? doorHalfWidth - 0.35 : -(doorHalfWidth - 0.35);
  const hingeX = isLeft ? -(doorHalfWidth - 0.08) : doorHalfWidth - 0.08;

  useEffect(() => {
    if (isOpen && groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: isLeft ? -Math.PI * 0.58 : Math.PI * 0.58,
        duration: 3.5, // Menyesuaikan dengan durasi ayunan pintu animasi yg user beri
        ease: "power3.inOut",
      });
    } else if (!isOpen && groupRef.current) {
      groupRef.current.rotation.y = 0;
    }
  }, [isOpen, isLeft]);

  return (
    <group ref={groupRef} position={[doorPivotX, -0.5, 0]}>
      <group position={[doorPanelOffsetX, 0, 0]}>
        {/* === PANEL UTAMA === */}
        <mesh material={frameMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[doorPanelWidth, doorPanelHeight, 0.18]} />
        </mesh>

        {/* Kiri */}
        <mesh
          material={roseGoldMaterial}
          position={[-doorHalfWidth + 0.03, 0, 0.095]}
        >
          <boxGeometry args={[0.06, 6.8, 0.01]} />
        </mesh>
        {/* Kanan */}
        <mesh
          material={roseGoldMaterial}
          position={[doorHalfWidth - 0.03, 0, 0.095]}
        >
          <boxGeometry args={[0.06, 6.8, 0.01]} />
        </mesh>
        {/* Atas */}
        <mesh material={roseGoldMaterial} position={[0, 3.37, 0.095]}>
          <boxGeometry args={[doorPanelWidth, 0.06, 0.01]} />
        </mesh>
        {/* Bawah */}
        <mesh material={roseGoldMaterial} position={[0, -3.37, 0.095]}>
          <boxGeometry args={[doorPanelWidth, 0.06, 0.01]} />
        </mesh>

        {/* Kaca */}
        <mesh material={glassMaterial} position={[0, 1.5, 0.01]}>
          <boxGeometry args={[2.48, 3.8, 0.04]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, 1.5, 0.06]}>
          <boxGeometry args={[0.025, 3.8, 0.015]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, 0.5, 0.06]}>
          <boxGeometry args={[2.48, 0.025, 0.015]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, 2.5, 0.06]}>
          <boxGeometry args={[2.48, 0.025, 0.015]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, 3.45, 0.09]}>
          <boxGeometry args={[2.58, 0.04, 0.02]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, -0.42, 0.09]}>
          <boxGeometry args={[2.58, 0.04, 0.02]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[-1.25, 1.5, 0.09]}>
          <boxGeometry args={[0.04, 3.9, 0.02]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[1.25, 1.5, 0.09]}>
          <boxGeometry args={[0.04, 3.9, 0.02]} />
        </mesh>

        <mesh material={roseGoldMaterial} position={[0, -0.52, 0.095]}>
          <boxGeometry args={[2.58, 0.12, 0.02]} />
        </mesh>

        <mesh material={frameMaterial} position={[0, -2.1, 0.02]}>
          <boxGeometry args={[2.48, 2.9, 0.14]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, -2.1, 0.1]}>
          <boxGeometry args={[2.48, 2.9, 0.01]} />
        </mesh>
        <mesh material={frameMaterial} position={[0, -2.1, 0.104]}>
          <boxGeometry args={[2.36, 2.78, 0.01]} />
        </mesh>
        <mesh material={roseGoldMaterial} position={[0, -2.1, 0.108]}>
          <boxGeometry args={[2.36, 2.78, 0.005]} />
        </mesh>
        <mesh material={frameMaterial} position={[0, -2.1, 0.112]}>
          <boxGeometry args={[2.24, 2.65, 0.01]} />
        </mesh>

        <mesh
          material={roseGoldLightMaterial}
          position={[0, -2.1, 0.115]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <boxGeometry args={[0.35, 0.35, 0.015]} />
        </mesh>
        <mesh
          material={roseGoldMaterial}
          position={[0, -2.1, 0.128]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <boxGeometry args={[0.18, 0.18, 0.01]} />
        </mesh>

        <group position={[handleX, -0.4, 0.16]}>
          <mesh material={roseGoldMaterial}>
            <boxGeometry args={[0.055, 0.45, 0.03]} />
          </mesh>
          <mesh
            material={roseGoldLightMaterial}
            position={[isLeft ? 0.06 : -0.06, 0, 0.04]}
          >
            <cylinderGeometry args={[0.022, 0.022, 0.38, 8]} />
          </mesh>
          <mesh
            material={roseGoldLightMaterial}
            position={[isLeft ? 0.06 : -0.06, 0.22, 0.04]}
          >
            <sphereGeometry args={[0.032, 8, 8]} />
          </mesh>
          <mesh
            material={roseGoldLightMaterial}
            position={[isLeft ? 0.06 : -0.06, -0.22, 0.04]}
          >
            <sphereGeometry args={[0.032, 8, 8]} />
          </mesh>
          <mesh material={roseGoldMaterial} position={[0, -0.08, 0.032]}>
            <cylinderGeometry args={[0.018, 0.018, 0.035, 8]} />
          </mesh>
        </group>

        {[-2.2, 0, 2.2].map((hy, i) => (
          <group key={i} position={[hingeX, hy, 0.09]}>
            <mesh material={roseGoldMaterial}>
              <boxGeometry args={[0.06, 0.22, 0.02]} />
            </mesh>
            <mesh material={roseGoldMaterial} position={[0, 0, 0.015]}>
              <cylinderGeometry args={[0.014, 0.014, 0.22, 6]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// ==========================================
// ARCH / LENGKUNGAN ATAS
// ==========================================
const TopArch = () => (
  <group position={[0, 3.0, 0]}>
    <mesh material={frameMaterial}>
      <torusGeometry args={[2.7, 0.22, 12, 48, Math.PI]} />
    </mesh>
    <mesh material={roseGoldMaterial} position={[0, 0, 0.12]}>
      <torusGeometry args={[2.7, 0.04, 8, 48, Math.PI]} />
    </mesh>
    <mesh material={roseGoldMaterial} position={[0, 0, 0.12]}>
      <torusGeometry args={[2.48, 0.03, 8, 48, Math.PI]} />
    </mesh>
    <mesh material={roseGoldLightMaterial} position={[0, 0, 0.13]}>
      <torusGeometry args={[2.59, 0.015, 6, 48, Math.PI]} />
    </mesh>

    <mesh material={frameMaterial} position={[0, 0, 0]}>
      <boxGeometry args={[5.4, 0.44, 0.22]} />
    </mesh>
    <mesh material={roseGoldMaterial} position={[0, 0.24, 0.12]}>
      <boxGeometry args={[5.4, 0.04, 0.01]} />
    </mesh>
    <mesh material={roseGoldMaterial} position={[0, -0.24, 0.12]}>
      <boxGeometry args={[5.4, 0.04, 0.01]} />
    </mesh>

    <mesh
      material={glassMaterial}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
    >
      <cylinderGeometry
        args={[2.46, 2.46, 0.04, 24, 1, false, Math.PI / 2, Math.PI]}
      />
    </mesh>

    {[
      -Math.PI / 2,
      -Math.PI / 3,
      -Math.PI / 6,
      0,
      Math.PI / 6,
      Math.PI / 3,
      Math.PI / 2,
    ].map((angle, i) => (
      <mesh
        key={i}
        material={roseGoldMaterial}
        position={[0, 1.23, 0.08]}
        rotation={[0, 0, angle]}
      >
        <boxGeometry args={[0.022, 2.46, 0.012]} />
      </mesh>
    ))}
    <mesh material={roseGoldMaterial} position={[0, 1.23, 0.08]}>
      <torusGeometry args={[0.55, 0.022, 8, 24]} />
    </mesh>
    <mesh material={roseGoldLightMaterial} position={[0, 1.23, 0.09]}>
      <torusGeometry args={[0.28, 0.015, 8, 24]} />
    </mesh>

    <mesh material={frameMaterial} position={[0, 2.72, 0.1]}>
      <boxGeometry args={[0.38, 0.52, 0.2]} />
    </mesh>
    <mesh material={roseGoldMaterial} position={[0, 2.72, 0.22]}>
      <boxGeometry args={[0.28, 0.4, 0.04]} />
    </mesh>
    <mesh material={roseGoldLightMaterial} position={[0, 2.72, 0.24]}>
      <boxGeometry args={[0.14, 0.2, 0.02]} />
    </mesh>

    <mesh material={roseGoldMaterial} position={[0, 2.98, 0.1]}>
      <cylinderGeometry args={[0.05, 0.1, 0.3, 6]} />
    </mesh>
    <mesh material={roseGoldLightMaterial} position={[0, 3.16, 0.1]}>
      <sphereGeometry args={[0.08, 8, 8]} />
    </mesh>
  </group>
);

// ==========================================
// PILLAR
// ==========================================
const Pillar = ({
  position,
}: {
  position: [number, number, number];
  isLeft: boolean;
}) => (
  <group position={position}>
    <mesh position={[0, -3.6, 0]} material={frameMaterial}>
      <boxGeometry args={[1.1, 0.5, 0.7]} />
    </mesh>
    <mesh position={[0, -3.35, 0]} material={roseGoldMaterial}>
      <boxGeometry args={[0.92, 0.06, 0.58]} />
    </mesh>
    <mesh position={[0, -3.22, 0]} material={frameMaterial}>
      <boxGeometry args={[0.88, 0.22, 0.55]} />
    </mesh>
    <mesh position={[0, -3.1, 0]} material={roseGoldMaterial}>
      <boxGeometry args={[0.82, 0.04, 0.52]} />
    </mesh>

    <mesh
      position={[0, 0.45, 0]}
      material={frameMaterial}
      geometry={cylinderGeo}
      scale={[1, 6.5, 1]}
    ></mesh>

    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return (
        <mesh
          key={i}
          position={[Math.cos(angle) * 0.34, 0.45, Math.sin(angle) * 0.34]}
          material={roseGoldMaterial}
          rotation={[0, angle, 0]}
        >
          <boxGeometry args={[0.012, 6.5, 0.005]} />
        </mesh>
      );
    })}

    <mesh position={[0, 3.78, 0]} material={roseGoldMaterial}>
      <cylinderGeometry args={[0.44, 0.36, 0.1, 32]} />
    </mesh>
    <mesh position={[0, 3.9, 0]} material={frameMaterial}>
      <boxGeometry args={[0.95, 0.24, 0.6]} />
    </mesh>
    <mesh position={[0, 4.04, 0]} material={roseGoldMaterial}>
      <boxGeometry args={[1.0, 0.06, 0.65]} />
    </mesh>
    <mesh position={[0, 4.12, 0]} material={frameMaterial}>
      <boxGeometry args={[1.05, 0.14, 0.68]} />
    </mesh>
    <mesh position={[0, 4.2, 0]} material={roseGoldMaterial}>
      <boxGeometry args={[1.1, 0.04, 0.72]} />
    </mesh>
  </group>
);

// ==========================================
// WALLS & FLOOR
// ==========================================
const Walls = () => (
  <group>
    <mesh position={[0, 2, -18]} material={backWallMaterial}>
      <planeGeometry args={[60, 40]} />
    </mesh>
    <mesh
      position={[-18, 2, -8]}
      rotation={[0, Math.PI / 2, 0]}
      material={roomMaterial}
    >
      <planeGeometry args={[50, 40]} />
    </mesh>
    <mesh
      position={[18, 2, -8]}
      rotation={[0, -Math.PI / 2, 0]}
      material={roomMaterial}
    >
      <planeGeometry args={[50, 40]} />
    </mesh>
    <mesh
      position={[0, 18, -8]}
      rotation={[Math.PI / 2, 0, 0]}
      material={roomMaterial}
    >
      <planeGeometry args={[50, 50]} />
    </mesh>
    <mesh
      position={[0, -4.8, -8]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={roomMaterial}
    >
      <planeGeometry args={[50, 50]} />
    </mesh>
    {[-8, -4, 0, 4, 8].map((x) =>
      [-4, 0, -8, -12, -16].map((z) => (
        <mesh
          key={`${x}${z}`}
          position={[x, -4.79, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={roseGoldMaterial}
        >
          <planeGeometry args={[3.98, 3.98]} />
        </mesh>
      )),
    )}
    <mesh position={[0, -4.3, -18]} material={roseGoldMaterial}>
      <boxGeometry args={[40, 0.08, 0.06]} />
    </mesh>
  </group>
);

// ==========================================
// GATE SCENE
// ==========================================
const GateScene = ({ isOpen }: { isOpen: boolean }) => {
  const { camera, size } = useThree();

  // Hitung skala agar render di HP tidak terlalu besar (zoom-in)
  // Maximal scale 1.4, minimal scale 0.5 (disesuaikan dengan lebar layar)
  const responsiveScale = Math.min(
    1.4,
    Math.max(0.5, (size.width / 800) * 1.4),
  );

  useEffect(() => {
    if (isOpen) {
      gsap.to(camera.position, {
        z: -5,
        y: 0.5,
        duration: 4.2, // Sedikit lebih lambat dari pintu agar terasa luas
        ease: "power3.inOut", // Kamera melaju seperti drone
      });
      gsap.to(camera.rotation, {
        x: 0.05,
        duration: 4.2,
        ease: "power3.inOut",
      });
    } else {
      camera.position.set(0, 0, 9);
      camera.rotation.set(0, 0, 0);
    }
  }, [isOpen, camera]);

  return (
    <group scale={responsiveScale} position={[0, -0.5, 0]}>
      <TopArch />
      <Door side="left" isOpen={isOpen} />
      <Door side="right" isOpen={isOpen} />

      <Pillar position={[-3.4, -0.5, 0]} isLeft={true} />
      <Pillar position={[3.4, -0.5, 0]} isLeft={false} />

      {isOpen && (
        <>
          <Sparkles
            count={40}
            scale={15}
            size={4}
            speed={0.2}
            opacity={0.6}
            color="#C2A878" // Soft gold sparkles
            position={[0, 2, -5]}
          />
          <Sparkles
            count={40}
            scale={15}
            size={2}
            speed={0.4}
            opacity={0.5}
            color="#FFFFFF"
            position={[0, 2, -5]}
          />
        </>
      )}

      {/* Lighting disesuaikan menjadi warm white */}
      <pointLight
        position={[0, 3, -6]}
        intensity={isOpen ? 5 : 0}
        color="#FFF5E6"
        distance={25}
      />
    </group>
  );
};

// ==========================================
// TRANSITION OVERLAY
// ==========================================
export const TransitionOverlay = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    play: (onReadyToOpen?: () => void) => {
      const tl = gsap.timeline();

      // 1. Munculkan scene 3D secara mulus menutupi background 2D yang sedang zoom
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Panggil callback untuk me-render <DetailSection /> di balik layar
          if (onReadyToOpen) onReadyToOpen();
        },
      });

      // 2. Buka pintu 3D dan gerakkan kamera
      tl.add(() => {
        setIsOpen(true);
      }, "+=0.1"); // Jeda sangat singkat agar React sempat merender DetailSection

      // 3. Pudarkan background solid perlahan SAAT pintu mulai terbuka
      tl.to(
        bgRef.current,
        {
          opacity: 0,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "+=0.2",
      );

      // 4. Setelah kamera menembus pintu, pudarkan seluruh overlay 3D
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (containerRef.current)
              containerRef.current.style.display = "none";
          },
        },
        "+=2.0",
      ); // Menunggu kamera selesai maju
    },
  }));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[100] pointer-events-none opacity-0"
    >
      {/* Background utama mengikuti warna cream pastel ilustrasi */}
      <div ref={bgRef} className="absolute inset-0 bg-[#FCF6E8] z-0" />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 50 }}
          style={{ pointerEvents: "none" }}
          dpr={[1, 1]} // Optimasi ketat DPR di 1 untuk mobile agar transisi tidak patah-patah bersilangan dengan animasi CSS scale
          gl={{ powerPreference: "high-performance", antialias: false }} // Kurangi AA dan optimasi baterai
        >
          {/* Cahaya disesuaikan agar memberi kesan warm/hangat seperti matahari pagi/sore */}
          <ambientLight intensity={0.8} color="#FEF8ED" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            color="#FFF5E0"
          />
          <Environment preset="city" />
          <GateScene isOpen={isOpen} />
        </Canvas>
      </div>
    </div>
  );
});

TransitionOverlay.displayName = "TransitionOverlay";
