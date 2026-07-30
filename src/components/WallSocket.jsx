import { Box } from '@react-three/drei'

export default function WallSocket({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wall Plate */}
      <Box args={[0.3, 0.45, 0.02]} receiveShadow castShadow>
        <meshStandardMaterial color="#eeeeee" roughness={0.5} />
      </Box>
      
      {/* Top Outlet Holes */}
      <Box args={[0.02, 0.06, 0.01]} position={[-0.06, 0.08, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>
      <Box args={[0.02, 0.06, 0.01]} position={[0.06, 0.08, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>
      {/* Ground hole */}
      <Box args={[0.03, 0.03, 0.01]} position={[0, 0.13, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>

      {/* Bottom Outlet Holes */}
      <Box args={[0.02, 0.06, 0.01]} position={[-0.06, -0.08, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>
      <Box args={[0.02, 0.06, 0.01]} position={[0.06, -0.08, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>
      {/* Ground hole */}
      <Box args={[0.03, 0.03, 0.01]} position={[0, -0.03, 0.01]}>
        <meshBasicMaterial color="#111" />
      </Box>
    </group>
  )
}
