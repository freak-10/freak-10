import { create } from 'zustand'
import * as THREE from 'three'

let timeoutId

export const useStore = create((set) => {
  // Global Idle Tracking Logic
  const resetIdle = () => {
    set({ isIdle: false })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => set({ isIdle: true }), 5000)
  }

  if (typeof window !== 'undefined') {
    timeoutId = setTimeout(() => set({ isIdle: true }), 5000)
    ;['pointermove', 'wheel', 'touchstart', 'keydown'].forEach(evt => 
      window.addEventListener(evt, resetIdle, { passive: true })
    )
  }

  return {
    // Day/Night state
    isDaytime: true,
    toggleTime: () => set((state) => ({ isDaytime: !state.isDaytime })),
  
    // Global Idle state
    isIdle: false,
    setIdle: (idle) => set({ isIdle: idle }),
  
    // Camera coordinates (Perspective starts at the doorway)
    currentZone: 'overview',
    cameraTarget: [0, 1, -2],
    cameraPosition: [0, 2, 7],
    
    // Store camera controls ref to read current position before zooming
    controls: null,
    setControls: (controls) => set({ controls }),
    
    previousCameraPosition: null,
    previousCameraTarget: null,
    
    // Transition to a specific zone
    setZone: (zone, target, position) => set((state) => {
      let prevPos = state.previousCameraPosition
      let prevTarget = state.previousCameraTarget
      
      // If we are currently in overview, save the exact current camera position/target
      if (state.currentZone === 'overview' && state.controls) {
        const p = new THREE.Vector3()
        const t = new THREE.Vector3()
        state.controls.getPosition(p)
        state.controls.getTarget(t)
        prevPos = [p.x, p.y, p.z]
        prevTarget = [t.x, t.y, t.z]
      }
      
      return {
        currentZone: zone,
        cameraTarget: target,
        cameraPosition: position,
        previousCameraPosition: prevPos,
        previousCameraTarget: prevTarget
      }
    }),
    
    // Reset back to previous overview location
    resetZone: () => set((state) => ({
      currentZone: 'overview',
      cameraTarget: state.previousCameraTarget || [0, 1, -2],
      cameraPosition: state.previousCameraPosition || [0, 2, 7]
    }))
  }
})
