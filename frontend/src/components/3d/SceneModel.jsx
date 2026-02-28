import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Torus } from '@react-three/drei';
import { useTimerStore } from '../../store/useTimerStore';
import * as THREE from 'three';

export function SceneModel(props) {
    const group = useRef();
    const core = useRef();
    const ring1 = useRef();
    const ring2 = useRef();
    const ring3 = useRef();

    const { isActive, mode } = useTimerStore();

    // Determine colors based on state
    const isFocus = mode.name === 'Focus';
    const mainColor = isActive ? (isFocus ? '#10b981' : '#f59e0b') : '#6366f1';

    useFrame((state, delta) => {
        if (!group.current) return;

        // Smoothly interpolate rotations and scale based on activity
        const targetSpeed = isActive ? (isFocus ? 2 : 0.5) : 0.2;

        // Inner core rotation
        if (core.current) {
            core.current.rotation.x += delta * targetSpeed * 0.5;
            core.current.rotation.y += delta * targetSpeed;
        }

        // Concentric rings rotation (gyroscopic effect)
        if (ring1.current) {
            ring1.current.rotation.x += delta * targetSpeed * 0.3;
            ring1.current.rotation.y += delta * targetSpeed * 0.7;
        }
        if (ring2.current) {
            ring2.current.rotation.y += delta * targetSpeed * 0.4;
            ring2.current.rotation.z += delta * targetSpeed * 0.6;
        }
        if (ring3.current) {
            ring3.current.rotation.x -= delta * targetSpeed * 0.5;
            ring3.current.rotation.z -= delta * targetSpeed * 0.2;
        }

        // Pulse scale based on time
        const pulse = 1 + Math.sin(state.clock.elapsedTime * targetSpeed) * 0.05;
        group.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Inner Core */}
            <Icosahedron ref={core} args={[0.5, 0]} castShadow receiveShadow>
                <meshStandardMaterial
                    color={mainColor}
                    roughness={0.1}
                    metalness={0.9}
                    emissive={mainColor}
                    emissiveIntensity={isActive ? 1.5 : 0.2}
                    wireframe={!isActive}
                />
            </Icosahedron>

            {/* Orbiting Rings */}
            <Torus ref={ring1} args={[0.8, 0.02, 16, 100]} castShadow receiveShadow>
                <meshStandardMaterial color={mainColor} roughness={0.3} metalness={0.8} />
            </Torus>

            <Torus ref={ring2} args={[1.0, 0.015, 16, 100]} rotation={[Math.PI / 3, 0, 0]} castShadow receiveShadow>
                <meshStandardMaterial color={mainColor} roughness={0.2} metalness={1} wireframe />
            </Torus>

            <Torus ref={ring3} args={[1.2, 0.03, 16, 100]} rotation={[0, Math.PI / 4, Math.PI / 6]} castShadow receiveShadow>
                <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} transparent opacity={0.3} />
            </Torus>
        </group>
    );
}
