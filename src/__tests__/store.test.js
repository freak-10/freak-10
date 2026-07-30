import { describe, it, expect, beforeEach } from 'vitest'
import { useStore } from '../store'

describe('Zustand Camera Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.getState().resetZone()
  })

  it('initializes with the overview zone and default camera coordinates', () => {
    const state = useStore.getState()
    expect(state.currentZone).toBe('overview')
    expect(state.cameraTarget).toEqual([0, 1, -2])
    expect(state.cameraPosition).toEqual([0, 2, 7])
  })

  it('updates zone and camera coordinates correctly when setZone is called', () => {
    useStore.getState().setZone('movies', [1, 2, 3], [4, 5, 6])
    const state = useStore.getState()
    
    expect(state.currentZone).toBe('movies')
    expect(state.cameraTarget).toEqual([1, 2, 3])
    expect(state.cameraPosition).toEqual([4, 5, 6])
  })

  it('resets zone and coordinates back to default when resetZone is called', () => {
    // First, set it to something else
    useStore.getState().setZone('desk', [2, 1, 0], [4, 2, 2])
    
    // Then reset
    useStore.getState().resetZone()
    
    const state = useStore.getState()
    expect(state.currentZone).toBe('overview')
    expect(state.cameraTarget).toEqual([0, 1, -2])
    expect(state.cameraPosition).toEqual([0, 2, 7])
  })
})
