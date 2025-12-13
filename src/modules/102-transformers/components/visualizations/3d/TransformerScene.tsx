import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useVisualizationStore } from '../../../stores/visualizationStore'
import { ANIMATION_STEPS } from '../../../types/visualization'
import { Lighting } from './controls/Lighting'
import { CameraController } from './controls/CameraController'
import { EncoderStack } from './components/EncoderStack'
import { DecoderStack } from './components/DecoderStack'
import { TokenParticles } from './components/TokenParticles'
import { AttentionBeams } from './components/AttentionBeams'
import { CrossAttentionBridge } from './components/CrossAttentionBridge'

// Duration per step in seconds (at 1x speed)
const STEP_DURATION = 3

export function TransformerScene() {
  const playback = useVisualizationStore((s) => s.animation.playback)
  const speed = useVisualizationStore((s) => s.animation.speed)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)
  const setStepProgress = useVisualizationStore((s) => s.setStepProgress)
  const nextStep = useVisualizationStore((s) => s.nextStep)
  const goToStep = useVisualizationStore((s) => s.goToStep)

  const progressRef = useRef(0)

  // Animation loop
  useFrame((_, delta) => {
    if (playback !== 'playing') return

    // Advance progress
    progressRef.current += (delta * speed) / STEP_DURATION
    setStepProgress(Math.min(progressRef.current, 1))

    // Move to next step when complete
    if (progressRef.current >= 1) {
      progressRef.current = 0

      if (stepIndex < ANIMATION_STEPS.length - 1) {
        nextStep()
      } else {
        // Loop back to start
        goToStep(0)
      }
    }
  })

  return (
    <>
      {/* Lighting */}
      <Lighting />

      {/* Camera controls */}
      <CameraController />

      {/* Background */}
      <color attach="background" args={['#0f172a']} />
      <fog attach="fog" args={['#0f172a', 10, 30]} />

      {/* Ground grid */}
      <gridHelper args={[20, 20, '#334155', '#1e293b']} position={[0, -0.5, 0]} />

      {/* Encoder Stack */}
      <EncoderStack />

      {/* Decoder Stack */}
      <DecoderStack />

      {/* Input Tokens */}
      <TokenParticles type="input" />

      {/* Output Tokens */}
      <TokenParticles type="output" />

      {/* Attention Beams */}
      <AttentionBeams type="encoder-self" />
      <AttentionBeams type="decoder-self" />
      <AttentionBeams type="cross" />

      {/* Cross-Attention Bridge */}
      <CrossAttentionBridge />
    </>
  )
}
