import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import CanvasLoader from './CanvasLoader';
import { SceneModel } from './SceneModel';

// Simple rig to move the camera based on pointer position (Parallax)
function CameraRig() {
    useFrame((state) => {
        state.camera.position.lerp(
            new THREE.Vector3(
                (state.pointer.x * Math.PI) / 8,
                (state.pointer.y * Math.PI) / 8,
                5
            ),
            0.05
        );
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

const BackgroundScene = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-br from-indigo-950 via-purple-900 to-black">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                {/* Environmental Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Environment preset="night" />

                {/* Ambient background particles */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Main 3D Subject */}
                <Suspense fallback={<CanvasLoader />}>
                    <Float
                        speed={2} // Animation speed
                        rotationIntensity={0.5} // XYZ rotation intensity
                        floatIntensity={0.5} // Up/down float intensity
                    >
                        <SceneModel position={[0, -0.5, 0]} scale={1.2} />
                    </Float>
                </Suspense>

                <CameraRig />
            </Canvas>

            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
    );
};

export default BackgroundScene;
