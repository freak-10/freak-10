import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Box } from '@react-three/drei'
import { useStore } from '../store'

export default function CeilingFan({ position }) {
  const fanRef = useRef()
  const isDaytime = useStore((state) => state.isDaytime)

  // Rotate the fan blades every frame
  useFrame((state, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.y += delta * 2.5 // Adjust speed here
    }
  })

  return (
    <group position={position}>
      {/* Base attaching to ceiling - moved slightly up to intersect ceiling */}
      <Cylinder args={[0.3, 0.3, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>
      
      {/* Downrod */}
      <Cylinder args={[0.05, 0.05, 0.8]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#3a3a3a" />
      </Cylinder>
      
      {/* Motor housing */}
      <Cylinder args={[0.4, 0.4, 0.3]} position={[0, -1.05, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>

      {/* Rotating Blades Group */}
      <group ref={fanRef} position={[0, -1.15, 0]}>
        {/* Blade 1 */}
        <Box args={[0.15, 0.05, 1.8]} position={[0, 0, 1.1]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#3d2b1f" /> {/* Warm wood color */}
        </Box>
        {/* Blade 2 */}
        <Box args={[0.15, 0.05, 1.8]} position={[0, 0, -1.1]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
        {/* Blade 3 */}
        <Box args={[1.8, 0.05, 0.15]} position={[1.1, 0, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
        {/* Blade 4 */}
        <Box args={[1.8, 0.05, 0.15]} position={[-1.1, 0, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#3d2b1f" />
        </Box>
      </group>
      
      {/* Light bulb dome under the fan */}
      <Cylinder args={[0.2, 0.25, 0.15]} position={[0, -1.25, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={isDaytime ? 0.8 : 1.5} />
      </Cylinder>
      
      {/* PointLight coming from the fan (Dim during day, bright at night) */}
      <pointLight position={[0, -1.5, 0]} intensity={isDaytime ? 100 : 300} color="#ffeedd" distance={40} decay={2} castShadow />
    </group>
  )
}
