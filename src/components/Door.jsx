import { Box, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Door({ position, rotation }) {
  const frameColor = '#2c1a12' // Dark wood
  const doorColor = '#4e342e'  // Medium wood
  const knobColor = '#d4af37'  // Gold/Brass

  return (
    <group position={position} rotation={rotation}>
      {/* Door Frame (Constructed from 3 pieces to leave a hollow center) */}
      <group position={[0, 0, 0]}>
        {/* Left Frame */}
        <Box args={[0.2, 5.4, 0.2]} position={[-1.5, 2.7, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={frameColor} roughness={0.9} />
        </Box>
        {/* Right Frame */}
        <Box args={[0.2, 5.4, 0.2]} position={[1.5, 2.7, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={frameColor} roughness={0.9} />
        </Box>
        {/* Top Frame */}
        <Box args={[3.2, 0.2, 0.2]} position={[0, 5.3, 0]} receiveShadow castShadow>
          <meshStandardMaterial color={frameColor} roughness={0.9} />
        </Box>
      </group>

      {/* The Door itself (Width: 2.8, Height: 5.2, Depth: 0.1) */}
      <group position={[0, 2.6, 0.05]}>
        <Box args={[2.8, 5.2, 0.1]} receiveShadow castShadow>
          <meshStandardMaterial color={doorColor} roughness={0.8} />
        </Box>

        {/* Door panels for stylized detail */}
        {/* Placed explicitly at Z=0.06 to rest on the surface (Z=0.05) and prevent z-fighting */}
        <Box args={[2.2, 2.0, 0.04]} position={[0, 1.2, 0.06]} receiveShadow castShadow>
          <meshStandardMaterial color={doorColor} roughness={0.9} />
        </Box>
        <Box args={[2.2, 2.0, 0.04]} position={[0, -1.2, 0.06]} receiveShadow castShadow>
          <meshStandardMaterial color={doorColor} roughness={0.9} />
        </Box>

        {/* Door Knob */}
        <group position={[1.1, 0, 0.1]}>
          {/* Base */}
          <Cylinder args={[0.08, 0.08, 0.05]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Cylinder>
          {/* Handle */}
          <Sphere args={[0.06]} position={[0, 0, 0.1]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Sphere>
        </group>

        {/* Clothes Hanger (Top Center) */}
        <group position={[0, 1.8, 0.05]}>
          {/* Wooden Base */}
          <Box args={[1.6, 0.2, 0.05]} receiveShadow castShadow>
            <meshStandardMaterial color={frameColor} roughness={0.9} />
          </Box>
          {/* Peg 1 */}
          <Cylinder args={[0.02, 0.02, 0.15]} position={[-0.5, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Sphere args={[0.03]} position={[-0.5, 0, 0.18]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Sphere>
          
          {/* Peg 2 */}
          <Cylinder args={[0.02, 0.02, 0.15]} position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Sphere args={[0.03]} position={[0, 0, 0.18]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Sphere>

          {/* Peg 3 */}
          <Cylinder args={[0.02, 0.02, 0.15]} position={[0.5, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Sphere args={[0.03]} position={[0.5, 0, 0.18]} receiveShadow castShadow>
            <meshStandardMaterial color={knobColor} metalness={0.8} roughness={0.2} />
          </Sphere>
        </group>
      </group>
    </group>
  )
}
