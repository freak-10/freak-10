import { Plane } from '@react-three/drei'
import * as THREE from 'three'
import CeilingFan from './CeilingFan'
import Window from './Window'
import Door from './Door'
import GamingDesk from './GamingDesk'
import WallSocket from './WallSocket'
import { useStore } from '../store'

export default function Room() {
  const isDaytime = useStore((state) => state.isDaytime)

  // Lighter brown/taupe walls for a warm middle-ground palette
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: '#a1887f', // Soft mid-tone warm brown
    roughness: 0.8,
    side: THREE.DoubleSide
  })
  
  // Warm wooden floor tone (kept as requested)
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: '#3e2723', 
    roughness: 0.7 
  })


  return (
    <group>
      {/* Dynamic ambient light based on time of day */}
      <ambientLight intensity={isDaytime ? 0.6 : 0.2} color="#ffffff" />
      
      {/* Hemisphere light gives a natural gradient from sky to ground, making corners visible */}
      {isDaytime && (
        <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.8} />
      )}
      
      {/* Sunlight streaming into the room from the top-middle of the window */}
      {isDaytime && (
        <directionalLight 
          position={[0, 7, -11.8]} // High up and in the middle of the window
          intensity={3} 
          color="#fffdeb" 
          castShadow 
          shadow-bias={-0.0001}
        />
      )}

      {/* The Spinning Ceiling Fan (light reduced since it's daytime) */}
      <CeilingFan position={[0, 6, -5]} />

      {/* Floor */}
      <Plane args={[16, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]} receiveShadow>
        <primitive object={floorMaterial} attach="material" />
      </Plane>

      {/* Ceiling */}
      <Plane args={[16, 20]} rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -2]} receiveShadow>
        <primitive object={wallMaterial} attach="material" />
      </Plane>

      {/* Left Wall */}
      <Plane args={[20, 6]} rotation={[0, Math.PI / 2, 0]} position={[-8, 3, -2]} receiveShadow>
        <primitive object={wallMaterial} attach="material" />
      </Plane>

      {/* Right Wall */}
      <Plane args={[20, 6]} rotation={[0, -Math.PI / 2, 0]} position={[8, 3, -2]} receiveShadow>
        <primitive object={wallMaterial} attach="material" />
      </Plane>

      {/* 
        BACK WALL (Split into 4 parts for a 4x3 window cutout) 
        Cutout center: X=0, Y=3.5. Width=4, Height=3
      */}
      <group position={[0, 0, -12]}>
        {/* Top Wall Segment */}
        <Plane args={[16, 1]} position={[0, 5.5, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
        {/* Bottom Wall Segment */}
        <Plane args={[16, 2]} position={[0, 1, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
        {/* Left Wall Segment */}
        <Plane args={[6, 3]} position={[-5, 3.5, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
        {/* Right Wall Segment */}
        <Plane args={[6, 3]} position={[5, 3.5, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
      </group>

      {/* The Window Component (placed exactly in the cutout) */}
      <Window position={[0, 3.5, -12]} />

      {/* Wall Sockets under the window */}
      <WallSocket position={[-1.5, 0.6, -11.95]} />
      <WallSocket position={[0, 0.6, -11.95]} />
      <WallSocket position={[1.5, 0.6, -11.95]} />

      {/* 
        FRONT WALL (Split into 3 parts for a 3.2x5.4 door cutout) 
        Cutout center: X=0, rest on floor. Width=3.2, Height=5.4
      */}
      <group position={[0, 0, 8]} rotation={[0, Math.PI, 0]}>
        {/* Top Wall Segment */}
        <Plane args={[16, 0.6]} position={[0, 5.7, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
        {/* Left Wall Segment (From inside room, looking at front wall, it's rotated by PI, so X is inverted) */}
        {/* Let's just place them based on absolute X for the group */}
        <Plane args={[6.4, 5.4]} position={[-4.8, 2.7, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
        {/* Right Wall Segment */}
        <Plane args={[6.4, 5.4]} position={[4.8, 2.7, 0]} receiveShadow>
          <primitive object={wallMaterial} attach="material" />
        </Plane>
      </group>

      {/* The Door Component (placed exactly in the cutout) */}
      {/* Rotation Math.PI to face inwards */}
      <Door position={[0, 0, 8]} rotation={[0, Math.PI, 0]} />

      {/* Primary Zones */}
      {/* Gaming Zone (Desk) */}
      {/* Right edge touches right wall (X=8). Desk width is 5.2. Center is 8 - 2.6 = 5.4 */}
      {/* Back edge touches back wall (Z=-12). Desk depth is 2.4. Center is -12 + 1.2 = -10.8 */}
      <GamingDesk position={[5.4, 0, -10.8]} />
    </group>
  )
}
