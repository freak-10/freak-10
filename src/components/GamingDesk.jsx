import { Box, Cylinder, Capsule, RoundedBox, QuadraticBezierLine } from '@react-three/drei'
import * as THREE from 'three'
import InteractiveHighlight from './InteractiveHighlight'
import { useStore } from '../store'

function DualMonitors({ position, rotation }) {
  const frameColor = '#111'
  const screenColor = '#050505' // Dark screen
  const standColor = '#222'

  return (
    <group position={position} rotation={rotation}>
      
      {/* --- PRIMARY MONITOR (Curved, Center) --- */}
      <group position={[0, 0.6, -0.2]}>
        {/* Main Stand */}
        <Cylinder args={[0.3, 0.4, 0.05, 16]} position={[0, -0.575, -0.1]} castShadow receiveShadow>
          <meshStandardMaterial color={standColor} roughness={0.5} />
        </Cylinder>
        <Cylinder args={[0.05, 0.05, 0.6, 8]} position={[0, -0.3, -0.1]} castShadow receiveShadow>
          <meshStandardMaterial color={standColor} roughness={0.5} />
        </Cylinder>

        {/* Center Segment */}
        <Box args={[1.4, 1.2, 0.05]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} roughness={0.7} />
        </Box>
        <Box args={[1.3, 1.1, 0.02]} position={[0, 0, 0.02]}>
          <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
        </Box>

        {/* Left Curve */}
        <group position={[-0.95, 0, 0.1]} rotation={[0, Math.PI / 8, 0]}>
          <Box args={[0.6, 1.2, 0.05]} castShadow receiveShadow>
            <meshStandardMaterial color={frameColor} roughness={0.7} />
          </Box>
          <Box args={[0.5, 1.1, 0.02]} position={[0, 0, 0.02]}>
            <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
          </Box>
        </group>

        {/* Right Curve */}
        <group position={[0.95, 0, 0.1]} rotation={[0, -Math.PI / 8, 0]}>
          <Box args={[0.6, 1.2, 0.05]} castShadow receiveShadow>
            <meshStandardMaterial color={frameColor} roughness={0.7} />
          </Box>
          <Box args={[0.5, 1.1, 0.02]} position={[0, 0, 0.02]}>
            <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
          </Box>
        </group>
      </group>

      {/* --- SECONDARY MONITOR (Flat, Right side) --- */}
      <group position={[2.2, 0.6, 0.2]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Secondary Stand */}
        <Cylinder args={[0.2, 0.3, 0.05, 16]} position={[0, -0.575, -0.1]} castShadow receiveShadow>
          <meshStandardMaterial color={standColor} roughness={0.5} />
        </Cylinder>
        <Cylinder args={[0.04, 0.04, 0.6, 8]} position={[0, -0.3, -0.1]} castShadow receiveShadow>
          <meshStandardMaterial color={standColor} roughness={0.5} />
        </Cylinder>

        {/* Frame */}
        <Box args={[1.6, 1.0, 0.05]} castShadow receiveShadow>
          <meshStandardMaterial color={frameColor} roughness={0.7} />
        </Box>
        {/* Screen */}
        <Box args={[1.5, 0.9, 0.02]} position={[0, 0, 0.02]}>
          <meshStandardMaterial color={screenColor} roughness={0.2} metalness={0.8} />
        </Box>
      </group>
      
      {/* --- WIRING --- */}
      {/* Primary monitor cable */}
      <QuadraticBezierLine
        start={[0, 0.3, -0.2]} // From primary stand
        mid={[0.2, 0.05, -0.6]} 
        end={[0.4, 0, -1.0]} // Trailing back off the desk
        color="#111"
        lineWidth={3}
      />
      
      {/* Secondary monitor cable */}
      <QuadraticBezierLine
        start={[2.2, 0.3, 0.1]} // From secondary stand
        mid={[1.5, 0.05, -0.2]} 
        end={[1.0, 0, -1.0]} // Trailing back off the desk merging
        color="#111"
        lineWidth={3}
      />
    </group>
  )
}

function Keyboard({ position, rotation }) {
  const baseColor = '#111'
  const keysColor = '#ffffff'

  // Standard 60% Keyboard Layout (widths in Units, 15U total width)
  const layout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2], // Number row + Backspace (15U)
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5], // Tab + QWERTY + \ (15U)
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25], // Caps + ASDF + Enter (15U)
    [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75], // Shift + ZXCV + Shift (15U)
    [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25] // Bottom row with Spacebar (15U)
  ]

  const kbWidth = 1.15
  const kbDepth = 0.35
  const uWidth = kbWidth / 15 // 1 Unit width
  const uDepth = kbDepth / 5  // 1 Unit depth
  const gap = 0.012

  return (
    <group position={position} rotation={rotation}>
      {/* Keyboard Base */}
      <Box args={[1.2, 0.04, 0.4]} position={[0, 0.02, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={baseColor} roughness={0.8} />
      </Box>

      {/* Keys block Base (dark underneath keys) */}
      <Box args={[1.15, 0.02, 0.35]} position={[0, 0.05, 0]} castShadow>
        <meshStandardMaterial color="#000" roughness={0.6} />
      </Box>

      {/* Grid of keys */}
      <group position={[-kbWidth / 2, 0.062, -kbDepth / 2]}>
        {layout.map((rowArr, rowIdx) => {
          let currentX = 0
          return rowArr.map((keyWidth, colIdx) => {
            const width = keyWidth * uWidth - gap
            const depth = uDepth - gap
            const xPos = currentX + width / 2 + gap / 2
            const zPos = rowIdx * uDepth + depth / 2 + gap / 2
            
            currentX += keyWidth * uWidth // Advance for next key

            return (
              <Box 
                key={`key-${rowIdx}-${colIdx}`} 
                args={[width, 0.005, depth]} 
                position={[xPos, 0, zPos]}
              >
                <meshBasicMaterial color={keysColor} />
              </Box>
            )
          })
        })}
      </group>
    </group>
  )
}

function Mouse({ position, rotation }) {
  const bodyColor = '#111'

  return (
    <group position={position} rotation={rotation}>
      {/* Mouse Body (Ergonomic rounded shape) */}
      <group position={[0, 0.035, 0]}>
        {/* Main body: a capsule laying flat along the Z axis, slightly squashed on the Y axis */}
        <Capsule args={[0.06, 0.12, 16, 16]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.6]} castShadow receiveShadow>
          <meshStandardMaterial color={bodyColor} roughness={0.7} />
        </Capsule>
        
        {/* Scroll Wheel */}
        <Cylinder args={[0.015, 0.015, 0.01, 16]} position={[0, 0.03, -0.06]} rotation={[0, 0, Math.PI / 2]}>
          <meshBasicMaterial color="#ffffff" />
        </Cylinder>
      </group>
    </group>
  )
}

function Controller({ position, rotation }) {
  const bodyColor = '#e0e0e0' // White/gray controller like PS5/Xbox
  const stickColor = '#111'

  return (
    <group position={position} rotation={rotation}>
      
      {/* Main Body (Smooth rounded rectangle) */}
      <RoundedBox args={[0.35, 0.05, 0.15]} position={[0, 0.025, 0]} radius={0.02} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </RoundedBox>
      
      {/* Left Grip (Angled capsule extending backwards and outwards) */}
      <Capsule args={[0.06, 0.15, 16, 16]} position={[-0.15, 0.025, 0.1]} rotation={[Math.PI / 2, Math.PI / 6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </Capsule>
      
      {/* Right Grip (Angled capsule extending backwards and outwards) */}
      <Capsule args={[0.06, 0.15, 16, 16]} position={[0.15, 0.025, 0.1]} rotation={[Math.PI / 2, -Math.PI / 6, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </Capsule>

      {/* --- JOYSTICKS --- */}
      {/* Left Joystick */}
      <group position={[-0.1, 0.05, 0]}>
        {/* Stick Base */}
        <Cylinder args={[0.03, 0.03, 0.03, 16]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color={bodyColor} roughness={0.9} />
        </Cylinder>
        {/* Stick Pole */}
        <Cylinder args={[0.015, 0.015, 0.04, 8]} position={[0, 0.02, 0]} castShadow>
          <meshStandardMaterial color={stickColor} roughness={0.9} />
        </Cylinder>
        {/* Stick Cap */}
        <Cylinder args={[0.035, 0.035, 0.01, 16]} position={[0, 0.04, 0]} castShadow>
          <meshStandardMaterial color={stickColor} roughness={0.9} />
        </Cylinder>
      </group>
      
      {/* Right Joystick */}
      <group position={[0.05, 0.05, 0.05]}> {/* Asymmetrical layout like Xbox */}
        {/* Stick Base */}
        <Cylinder args={[0.03, 0.03, 0.03, 16]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial color={bodyColor} roughness={0.9} />
        </Cylinder>
        {/* Stick Pole */}
        <Cylinder args={[0.015, 0.015, 0.04, 8]} position={[0, 0.02, 0]} castShadow>
          <meshStandardMaterial color={stickColor} roughness={0.9} />
        </Cylinder>
        {/* Stick Cap */}
        <Cylinder args={[0.035, 0.035, 0.01, 16]} position={[0, 0.04, 0]} castShadow>
          <meshStandardMaterial color={stickColor} roughness={0.9} />
        </Cylinder>
      </group>
      
    </group>
  )
}

function PCTower({ position, rotation }) {
  const caseColor = '#111'
  const glassColor = '#222'
  const fanColor = '#ff0033'
  const portColor = '#444'

  return (
    <group position={position} rotation={rotation}>
      {/* Main Case */}
      <Box args={[0.8, 1.8, 1.6]} castShadow receiveShadow>
        <meshStandardMaterial color={caseColor} roughness={0.6} />
      </Box>

      {/* Superficial Glass Side Panel */}
      <Box args={[0.02, 1.7, 1.5]} position={[0.41, 0, 0]}>
        <meshStandardMaterial color={glassColor} roughness={0.2} metalness={0.8} opacity={0.8} transparent={true} />
      </Box>

      {/* Internal fake glow (superficial) */}
      <Box args={[0.6, 1.4, 1.2]} position={[0, 0, 0]}>
        <meshBasicMaterial color={fanColor} opacity={0.2} transparent={true} />
      </Box>

      {/* Front Panel Details */}
      <group position={[0, 0, 0.81]}>
        {/* Front Mesh */}
        <Box args={[0.7, 1.7, 0.02]}>
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </Box>
        
        {/* Fake front fans (flat circles to save geometry) */}
        <Cylinder args={[0.25, 0.25, 0.03, 8]} position={[0, 0.4, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={fanColor} />
        </Cylinder>
        <Cylinder args={[0.25, 0.25, 0.03, 8]} position={[0, -0.4, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={fanColor} />
        </Cylinder>

        {/* Start Button */}
        <Cylinder args={[0.04, 0.04, 0.05, 8]} position={[0.25, 0.75, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </Cylinder>
        
        {/* USB Ports */}
        <Box args={[0.08, 0.02, 0.05]} position={[-0.25, 0.75, 0.02]}>
          <meshStandardMaterial color={portColor} />
        </Box>
      </group>
    </group>
  )
}

export default function GamingDesk({ position, rotation }) {
  const setZone = useStore((state) => state.setZone)

  // Desktop Dimensions
  const deskWidth = 5.2
  const deskDepth = 2.4
  const deskHeight = 2.2
  const topThickness = 0.15

  const topColor = '#1a1a1a' // Dark sleek surface
  const cabinetColor = '#0f0f0f' // Very dark for cabinet body to create contrast
  const drawerColor = '#2b2b2b' // Lighter for drawers
  const handleColor = '#dcdcdc' // Bright metallic handle color
  const accentColor = '#363636' // Lighter accent for right cabinet door
  
  // Cabinet Dimensions
  const cabinetWidth = 1.4
  const cabinetHeight = deskHeight
  const cabinetDepth = 2.2
  
  // Positions
  const leftCabinetX = -deskWidth / 2 + cabinetWidth / 2
  const rightCabinetX = deskWidth / 2 - cabinetWidth / 2
  const cabinetZ = -0.1 // Push slightly back so tabletop overhangs the front

  return (
    <InteractiveHighlight
      position={position} 
      rotation={rotation}
      tooltip="View Gaming Desk 🎮"
      onClick={(e) => {
        e.stopPropagation()
        setZone('gamingDesk', [5.4, 2.3, -10.8], [5.4, 3.5, -6])
      }}
      boxArgs={[deskWidth + 0.2, deskHeight + 2, deskDepth + 0.2]} // Cover desk, monitors, PC
      boxPosition={[0, (deskHeight + 2) / 2, 0]}
    >
      {/* Table Top */}
      <Box 
        args={[deskWidth, topThickness, deskDepth]} 
        position={[0, deskHeight + topThickness / 2, 0]} 
        receiveShadow 
        castShadow
      >
        <meshStandardMaterial color={topColor} roughness={0.4} metalness={0.2} />
      </Box>

      {/* LEFT CABINET (3 Drawers) */}
      <group position={[leftCabinetX, cabinetHeight / 2, cabinetZ]}>
        {/* Main Cabinet Body */}
        <Box args={[cabinetWidth, cabinetHeight, cabinetDepth]} receiveShadow castShadow>
          <meshStandardMaterial color={cabinetColor} roughness={0.7} />
        </Box>
        
        {/* Drawers (3 stacked with visible gaps) */}
        {[-0.72, 0, 0.72].map((yOffset, i) => (
          <group key={`left-drawer-${i}`} position={[0, yOffset, cabinetDepth / 2 + 0.025]}>
            <Box args={[cabinetWidth - 0.1, cabinetHeight / 3 - 0.12, 0.05]} receiveShadow castShadow>
              <meshStandardMaterial color={drawerColor} roughness={0.6} metalness={0.1} />
            </Box>
            {/* Drawer Handle (Horizontal) - Thicker and sticking out more */}
            <Box args={[0.6, 0.06, 0.08]} position={[0, 0, 0.05]} receiveShadow castShadow>
              <meshStandardMaterial color={handleColor} metalness={0.9} roughness={0.2} />
            </Box>
          </group>
        ))}
      </group>

      {/* RIGHT CABINET (1 Large Door with vertical handle) */}
      <group position={[rightCabinetX, cabinetHeight / 2, cabinetZ]}>
        {/* Main Cabinet Body */}
        <Box args={[cabinetWidth, cabinetHeight, cabinetDepth]} receiveShadow castShadow>
          <meshStandardMaterial color={cabinetColor} roughness={0.7} />
        </Box>
        
        {/* Large Cabinet Door with slight gap around edges */}
        <group position={[0, 0, cabinetDepth / 2 + 0.025]}>
          <Box args={[cabinetWidth - 0.1, cabinetHeight - 0.1, 0.05]} receiveShadow castShadow>
            <meshStandardMaterial color={accentColor} roughness={0.6} metalness={0.1} />
          </Box>
          {/* Cabinet Handle (Vertical on the left side of the door) - Thicker */}
          <Box args={[0.06, 0.9, 0.08]} position={[-0.45, 0.4, 0.05]} receiveShadow castShadow>
            <meshStandardMaterial color={handleColor} metalness={0.9} roughness={0.2} />
          </Box>
        </group>
      </group>

      {/* Modesty Panel (Back support covering the middle leg room) */}
      <Box 
        args={[deskWidth - cabinetWidth * 2, deskHeight / 1.5, 0.05]} 
        position={[0, deskHeight / 2 + 0.3, -deskDepth / 2 + 0.1]} 
        receiveShadow 
        castShadow
      >
        <meshStandardMaterial color={cabinetColor} roughness={0.7} />
      </Box>

      {/* --- DESK ACCESSORIES --- */}
      {/* PC Tower placed on the left side of the desk */}
      <PCTower position={[-2.0, deskHeight + topThickness + 0.9, -0.2]} rotation={[0, 0.2, 0]} />

      {/* PC Power Cable (trailing down to the wall socket) */}
      <group>
        <QuadraticBezierLine
          start={[-2.0, deskHeight + topThickness + 0.2, -1.0]} // Back of PC Tower
          mid={[-3.0, 0.1, -1.0]} // Drooping down to the floor
          end={[-3.9, 0.52, -1.15]} // Plugging into the right-most wall socket's bottom receptacle
          color="#111"
          lineWidth={4}
        />
        {/* Physical Plug Body */}
        <Box args={[0.06, 0.08, 0.08]} position={[-3.9, 0.52, -1.11]} castShadow>
          <meshStandardMaterial color="#111" roughness={0.7} />
        </Box>
      </group>

      {/* Monitors placed towards the back */}
      <DualMonitors position={[0, deskHeight + topThickness, -0.5]} />
      
      {/* Extra Large Deskmat (Mousepad) */}
      <Box args={[2.2, 0.005, 0.8]} position={[0.1, deskHeight + topThickness + 0.0025, 0.3]} receiveShadow>
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </Box>

      {/* Keyboard placed on deskmat */}
      <Keyboard position={[-0.2, deskHeight + topThickness + 0.005, 0.3]} />
      
      {/* Mouse placed on deskmat to the right of keyboard */}
      <Mouse position={[0.8, deskHeight + topThickness + 0.005, 0.3]} />
      
      {/* Controller placed on the extreme right, under the second monitor */}
      <Controller position={[2.2, deskHeight + topThickness, 0.4]} rotation={[0, -0.2, 0]} />
    </InteractiveHighlight>
  )
}
