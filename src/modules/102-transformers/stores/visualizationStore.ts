import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  VisualizationState,
  ComponentId,
  CameraState,
  VisualizationMode,
  TourStage,
} from '../types/visualization'
import { DEFAULT_CAMERA, ANIMATION_STEPS, TOUR_STAGES } from '../types/visualization'
import type { Vector3Tuple } from 'three'

const initialSelection = {
  hoveredComponent: null,
  selectedComponent: null,
  hoveredToken: null,
  focusedLayer: null,
  focusedHead: null,
}

const initialAnimation = {
  playback: 'idle' as const,
  speed: 1,
  stepIndex: 0,
  stepProgress: 0,
}

export const useVisualizationStore = create<VisualizationState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    mode: 'explore',
    tourStage: null,
    tourActive: false,

    camera: DEFAULT_CAMERA,

    selection: initialSelection,

    animation: initialAnimation,

    showAttentionBeams: true,
    showLabels: true,
    selectedHead: null, // null = show all

    // Mode actions
    setMode: (mode: VisualizationMode) => set({ mode }),

    startTour: () =>
      set({
        mode: 'guided',
        tourActive: true,
        tourStage: 1,
        animation: { ...initialAnimation, playback: 'paused' },
        camera: {
          position: TOUR_STAGES[0].cameraPosition,
          target: TOUR_STAGES[0].cameraTarget,
        },
      }),

    nextTourStage: () => {
      const { tourStage } = get()
      if (tourStage === null) return

      if (tourStage < 4) {
        const nextStage = (tourStage + 1) as TourStage
        const stageData = TOUR_STAGES[nextStage - 1]
        set({
          tourStage: nextStage,
          camera: {
            position: stageData.cameraPosition,
            target: stageData.cameraTarget,
          },
        })
      } else {
        // Tour complete
        set({
          tourActive: false,
          tourStage: null,
          mode: 'explore',
          camera: DEFAULT_CAMERA,
        })
      }
    },

    endTour: () =>
      set({
        tourActive: false,
        tourStage: null,
        mode: 'explore',
        camera: DEFAULT_CAMERA,
      }),

    // Camera actions
    setCamera: (camera: Partial<CameraState>) =>
      set((state) => ({
        camera: { ...state.camera, ...camera },
      })),

    setCameraPreset: (position: Vector3Tuple, target: Vector3Tuple) =>
      set({
        camera: { position, target },
      }),

    // Selection actions
    setHovered: (component: ComponentId | null) =>
      set((state) => ({
        selection: { ...state.selection, hoveredComponent: component },
      })),

    setSelected: (component: ComponentId | null) =>
      set((state) => ({
        selection: { ...state.selection, selectedComponent: component },
      })),

    setHoveredToken: (index: number | null) =>
      set((state) => ({
        selection: { ...state.selection, hoveredToken: index },
      })),

    setFocusedLayer: (layer: number | null) =>
      set((state) => ({
        selection: { ...state.selection, focusedLayer: layer },
      })),

    setFocusedHead: (head: number | null) =>
      set((state) => ({
        selection: { ...state.selection, focusedHead: head },
      })),

    // Playback actions
    play: () =>
      set((state) => ({
        animation: { ...state.animation, playback: 'playing' },
      })),

    pause: () =>
      set((state) => ({
        animation: { ...state.animation, playback: 'paused' },
      })),

    togglePlayback: () =>
      set((state) => ({
        animation: {
          ...state.animation,
          playback: state.animation.playback === 'playing' ? 'paused' : 'playing',
        },
      })),

    setSpeed: (speed: number) =>
      set((state) => ({
        animation: { ...state.animation, speed },
      })),

    nextStep: () =>
      set((state) => {
        const nextIndex = Math.min(state.animation.stepIndex + 1, ANIMATION_STEPS.length - 1)
        return {
          animation: { ...state.animation, stepIndex: nextIndex, stepProgress: 0 },
        }
      }),

    prevStep: () =>
      set((state) => {
        const prevIndex = Math.max(state.animation.stepIndex - 1, 0)
        return {
          animation: { ...state.animation, stepIndex: prevIndex, stepProgress: 0 },
        }
      }),

    goToStep: (index: number) =>
      set((state) => ({
        animation: {
          ...state.animation,
          stepIndex: Math.max(0, Math.min(index, ANIMATION_STEPS.length - 1)),
          stepProgress: 0,
        },
      })),

    setStepProgress: (progress: number) =>
      set((state) => ({
        animation: { ...state.animation, stepProgress: progress },
      })),

    // Display options
    setSelectedHead: (head: number | null) => set({ selectedHead: head }),

    toggleAttentionBeams: () =>
      set((state) => ({ showAttentionBeams: !state.showAttentionBeams })),

    toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

    // Reset
    reset: () =>
      set({
        mode: 'explore',
        tourStage: null,
        tourActive: false,
        camera: DEFAULT_CAMERA,
        selection: initialSelection,
        animation: initialAnimation,
        showAttentionBeams: true,
        showLabels: true,
        selectedHead: null,
      }),
  }))
)

// Selectors for optimized subscriptions
export const selectPlayback = (state: VisualizationState) => state.animation.playback
export const selectStepIndex = (state: VisualizationState) => state.animation.stepIndex
export const selectHovered = (state: VisualizationState) => state.selection.hoveredComponent
export const selectSelected = (state: VisualizationState) => state.selection.selectedComponent
export const selectTourActive = (state: VisualizationState) => state.tourActive
export const selectTourStage = (state: VisualizationState) => state.tourStage
export const selectMode = (state: VisualizationState) => state.mode
export const selectCamera = (state: VisualizationState) => state.camera
export const selectSelectedHead = (state: VisualizationState) => state.selectedHead
