import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { TRANSFORMER_CONFIG } from '../../../../data/constants'

const LAYER_SPACING = 0.8

export function CrossAttentionBridge() {
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)
  const showAttentionBeams = useVisualizationStore((s) => s.showAttentionBeams)

  // Only show during cross-attention step
  const visible = stepIndex >= 6 && showAttentionBeams

  if (!visible) return null

  return (
    <group>
      {/* Connection lines between encoder output and decoder cross-attention */}
      {Array.from({ length: TRANSFORMER_CONFIG.N }, (_, i) => (
        <BridgeLine
          key={i}
          layerIndex={i + 1}
          isActive={stepIndex >= 6}
        />
      ))}

      {/* Main bridge indicator */}
      <BridgeIndicator position={[0, 3.5, 0]} />
    </group>
  )
}

interface BridgeLineProps {
  layerIndex: number
  isActive: boolean
}

function BridgeLine({ layerIndex, isActive }: BridgeLineProps) {
  const lineRef = useRef<THREE.Line | null>(null)

  const y = layerIndex * LAYER_SPACING
  const encoderX = -3 + 1.2 // Right edge of encoder
  const decoderX = 3 - 1.3 // Left edge of decoder (cross-attention position)

  // Animate opacity
  useFrame(({ clock }) => {
    if (!lineRef.current) return
    const material = lineRef.current.material as THREE.LineBasicMaterial

    if (isActive) {
      // Flowing animation
      const flow = 0.4 + 0.3 * Math.sin(clock.elapsedTime * 2 + layerIndex * 0.5)
      material.opacity = flow
    } else {
      material.opacity = 0.1
    }
  })

  // Create curved connection
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(encoderX, y, 0),
      new THREE.Vector3(0, y + 0.5, 0),
      new THREE.Vector3(decoderX, y, 0)
    )
    const points = curve.getPoints(30)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [y, encoderX, decoderX])

  return (
    <primitive
      object={new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: '#a855f7', transparent: true, opacity: 0.3 })
      )}
      ref={lineRef}
    />
  )
}

interface BridgeIndicatorProps {
  position: [number, number, number]
}

function BridgeIndicator({ position }: BridgeIndicatorProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Pulse animation
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const scale = 1 + 0.1 * Math.sin(clock.elapsedTime * 2)
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}
