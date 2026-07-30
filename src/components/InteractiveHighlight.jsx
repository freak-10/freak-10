import { useState, useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Box, useCursor, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'

export default function InteractiveHighlight({ 
  children, 
  tooltip = "Interact", 
  onClick, 
  boxArgs = [1, 1, 1], 
  boxPosition = [0, 0, 0],
  ...props
}) {
  const [hovered, setHovered] = useState(false)
  const lineRef = useRef()

  // Change cursor to pointer when hovered
  useCursor(hovered)

  // Generate a handdrawn, sketchy ellipse that overlaps itself
  const circlePoints = useMemo(() => {
    const pts = []
    const segments = 100
    // Use an ellipse based on boxArgs instead of a massive uniform circle
    const rx = boxArgs[0] * 0.55
    const ry = boxArgs[1] * 0.55
    for (let i = 0; i <= segments * 1.15; i++) {
      const theta = (i / segments) * Math.PI * 2
      const noise = Math.sin(theta * 6) * 0.04 + (Math.random() - 0.5) * 0.05
      pts.push([Math.cos(theta) * rx + noise, Math.sin(theta) * ry + noise, 0])
    }
    return pts
  }, [boxArgs])

  // Animate the line drawing effect based on user idle time
  useFrame((state, delta) => {
    if (lineRef.current) {
      // Read directly from the store without triggering a React re-render
      const isIdle = useStore.getState().isIdle
      
      if (isIdle) {
        // User is idle: smoothly fade the sketch in and animate the drawing
        lineRef.current.material.opacity = THREE.MathUtils.lerp(lineRef.current.material.opacity, 0.8, delta * 2)
        lineRef.current.material.dashOffset = -30 + (state.clock.elapsedTime * 30) % 60
      } else {
        // User is active: smoothly fade it out
        lineRef.current.material.opacity = THREE.MathUtils.lerp(lineRef.current.material.opacity, 0, delta * 10)
      }
    }
  })

  return (
    <group 
      {...props}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(e) }}
    >
      {/* The visible interactive object */}
      {children}

      {/* Invisible interaction hit box */}
      <Box args={boxArgs} position={boxPosition} visible={false}>
        <meshBasicMaterial />
      </Box>

      {/* Handdrawn Circle Being Drawn */}
      <group position={boxPosition}>
        <Line
          ref={lineRef}
          points={circlePoints}
          color="#ffffff"
          lineWidth={3} // Needs to be slightly thick to be visible
          dashed={true}
          dashSize={30}
          gapSize={30}
          transparent={true}
          opacity={0.8}
          depthTest={false}
          renderOrder={999}
        />
      </group>

      {/* Stylized True Glassmorphism Tooltip (No borders/shadows) */}
      {hovered && (
        <Html position={[boxPosition[0], boxPosition[1] + boxArgs[1]/2 + 0.4, boxPosition[2]]} center zIndexRange={[100, 0]}>
          <div style={{
            background: 'rgba(10, 17, 40, 0.4)', // Dark tint for glass
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: 'none', // Removed border
            boxShadow: 'none', // Removed shadow
            color: '#ffffff', // Clean white text
            padding: '10px 24px',
            borderRadius: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            animation: 'fadeInUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}>
            {tooltip}
          </div>
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(15px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </Html>
      )}
    </group>
  )
}
