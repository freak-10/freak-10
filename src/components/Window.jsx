import { Box, Plane, Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'
import InteractiveHighlight from './InteractiveHighlight'

export default function Window({ position }) {
  const isDaytime = useStore((state) => state.isDaytime)
  const toggleTime = useStore((state) => state.toggleTime)

  const frameColor = '#2c1a12' // Dark wood for frame
  const grillColor = '#111'   // Dark metal for grill
  const curtainColor = '#fdfbf7' // Soft white curtains

  return (
    <InteractiveHighlight 
      position={position}
      tooltip={isDaytime ? "Switch to Night 🌙" : "Switch to Day ☀️"}
      onClick={toggleTime}
      boxArgs={[4.6, 3.6, 0.6]} // Slightly larger than the 4.2x3.2 frame
      boxPosition={[0, 0, 0]}
    >
      {/* 1. THE WINDOW FRAME (4.2 width x 3.2 height) */}
      <group position={[0, 0, 0]}>
        {/* Top frame */}
        <Box args={[4.2, 0.2, 0.2]} position={[0, 1.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} />
        </Box>
        {/* Bottom frame */}
        <Box args={[4.2, 0.2, 0.2]} position={[0, -1.5, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} />
        </Box>
        {/* Left frame */}
        <Box args={[0.2, 3.2, 0.2]} position={[-2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} />
        </Box>
        {/* Right frame */}
        <Box args={[0.2, 3.2, 0.2]} position={[2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} />
        </Box>
      </group>

      {/* 2. THE GRILLS */}
      <group position={[0, 0, 0]}>
        {/* Vertical grill */}
        <Box args={[0.05, 3, 0.05]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color={grillColor} metalness={0.8} roughness={0.2} />
        </Box>
        {/* Horizontal grill */}
        <Box args={[4, 0.05, 0.05]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color={grillColor} metalness={0.8} roughness={0.2} />
        </Box>
      </group>

      {/* 3. THE CURTAINS */}
      <group position={[0, 0, 0.1]}>
        {/* Left Curtain */}
        <Cylinder args={[0.3, 0.35, 3.5, 8]} position={[-2.3, 0, 0]} scale={[1, 1, 0.3]} castShadow>
          <meshStandardMaterial color={curtainColor} roughness={0.9} />
        </Cylinder>
        {/* Right Curtain */}
        <Cylinder args={[0.3, 0.35, 3.5, 8]} position={[2.3, 0, 0]} scale={[1, 1, 0.3]} castShadow>
          <meshStandardMaterial color={curtainColor} roughness={0.9} />
        </Cylinder>
        {/* Curtain Rod */}
        <Cylinder args={[0.05, 0.05, 5]} rotation={[0, 0, Math.PI / 2]} position={[0, 1.6, 0]} castShadow>
          <meshStandardMaterial color={grillColor} metalness={0.8} />
        </Cylinder>
      </group>

      {/* 4. THE WINDOW BACKDROP (Painted Sky & Sun/Moon) */}
      <group position={[0, 0, -0.1]}>
        {/* Flat sky covering the hole */}
        <Plane args={[4, 3]} position={[0, 0, 0]}>
          <meshBasicMaterial color={isDaytime ? "#7ec8e3" : "#0a1128"} />
        </Plane>
        
      </group>
    </InteractiveHighlight>
  )
}
