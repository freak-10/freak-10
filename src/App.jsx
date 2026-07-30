import { Canvas } from '@react-three/fiber'
import { CameraControls, SoftShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { useRef, useEffect } from 'react'
import Room from './components/Room'
import { useStore } from './store'
import './index.css'

function CameraRig() {
  const controlsRef = useRef()
  const cameraTarget = useStore((state) => state.cameraTarget)
  const cameraPosition = useStore((state) => state.cameraPosition)

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        cameraPosition[0], cameraPosition[1], cameraPosition[2],
        cameraTarget[0], cameraTarget[1], cameraTarget[2],
        true // smooth transition
      )

      // Restrict camera to stay strictly within the room walls
      // Room dimensions: X(-8 to 8), Y(0 to 6), Z(-12 to 8)
      const box = new THREE.Box3(
        new THREE.Vector3(-7.8, 0.2, -11.8),
        new THREE.Vector3(7.8, 5.8, 7.8)
      )
      controlsRef.current.setBoundary(box)
      controlsRef.current.boundaryEnclosesCamera = true
    }
  }, [cameraTarget, cameraPosition])

  return (
    <CameraControls 
      ref={controlsRef} 
      makeDefault 
      minPolarAngle={0} 
      maxPolarAngle={Math.PI / 2 - 0.05} // Don't let camera go below floor
      maxDistance={12} // Restrict zoom out to keep inside the room
      minDistance={1}
      boundaryEnclosesCamera={true}
    />
  )
}

export default function App() {
  const isIdle = useStore((state) => state.isIdle)

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 50 }}>
        {import.meta.env.DEV && <Perf position="top-left" />}
        <Room />
        <CameraRig />
      </Canvas>

      {/* Global Idle Hint Tooltip */}
      <div style={{
        position: 'absolute',
        top: 24,
        right: 24,
        pointerEvents: 'none',
        opacity: isIdle ? 1 : 0,
        transform: isIdle ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        background: 'rgba(10, 17, 40, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
      }}>
        ✨ Tip: Try looking around the room, hovering, or clicking on highlighted objects!
      </div>
    </>
  )
}
