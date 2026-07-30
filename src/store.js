import { create } from 'zustand'

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
    
    // Transition to a specific zone
    setZone: (zone, target, position) => set({
      currentZone: zone,
      cameraTarget: target,
      cameraPosition: position
    }),
    
    // Reset back to doorway overview
    resetZone: () => set({
      currentZone: 'overview',
      cameraTarget: [0, 1, -2],
      cameraPosition: [0, 2, 7]
    })
  }
})
