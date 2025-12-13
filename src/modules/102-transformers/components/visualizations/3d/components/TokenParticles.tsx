import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { EXAMPLE_SENTENCES } from '../../../../data/constants'

interface TokenParticlesProps {
  position?: [number, number, number]
  type: 'input' | 'output'
}

const TOKENS = EXAMPLE_SENTENCES.primary.tokens
const TOKEN_SPACING = 0.4

export function TokenParticles({ position = [0, 0, 0], type }: TokenParticlesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)
  const stepProgress = useVisualizationStore((s) => s.animation.stepProgress)
  const showLabels = useVisualizationStore((s) => s.showLabels)
  const hoveredToken = useVisualizationStore((s) => s.selection.hoveredToken)
  const setHoveredToken = useVisualizationStore((s) => s.setHoveredToken)

  // Calculate visibility and animation based on step
  const { visible, animating } = useMemo(() => {
    if (type === 'input') {
      return {
        visible: stepIndex >= 0,
        animating: stepIndex === 0,
      }
    } else {
      return {
        visible: stepIndex >= 7,
        animating: stepIndex === 7,
      }
    }
  }, [stepIndex, type])

  // Token positions - spread along Z axis
  const tokenPositions = useMemo(() => {
    return TOKENS.map((_, i) => {
      const z = (i - (TOKENS.length - 1) / 2) * TOKEN_SPACING
      return [0, 0, z] as [number, number, number]
    })
  }, [])

  if (!visible) return null

  const xOffset = type === 'input' ? -3 : 3
  const baseY = -0.5

  return (
    <group ref={groupRef} position={[position[0] + xOffset, position[1] + baseY, position[2]]}>
      {TOKENS.map((token, i) => (
        <TokenSphere
          key={i}
          token={token}
          index={i}
          position={tokenPositions[i]}
          isHovered={hoveredToken === i}
          onHover={() => setHoveredToken(i)}
          onLeave={() => setHoveredToken(null)}
          animating={animating}
          animationProgress={stepProgress}
          showLabel={showLabels}
          type={type}
        />
      ))}
    </group>
  )
}

interface TokenSphereProps {
  token: string
  index: number
  position: [number, number, number]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  animating: boolean
  animationProgress: number
  showLabel: boolean
  type: 'input' | 'output'
}

function TokenSphere({
  token,
  index,
  position,
  isHovered,
  onHover,
  onLeave,
  animating,
  animationProgress,
  showLabel,
  type,
}: TokenSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animation: tokens appear one by one
  const tokenProgress = useMemo(() => {
    if (!animating) return 1
    const tokenDelay = index * 0.08
    return Math.max(0, Math.min(1, (animationProgress - tokenDelay) / 0.15))
  }, [animating, animationProgress, index])

  // Color based on type and special tokens
  const color = useMemo(() => {
    // Highlight "it" and "animal" tokens
    if (index === 1 || index === 7) {
      return new THREE.Color(168 / 255, 85 / 255, 247 / 255) // Purple for attention highlight
    }
    return type === 'input'
      ? new THREE.Color(59 / 255, 130 / 255, 246 / 255) // Blue
      : new THREE.Color(34 / 255, 197 / 255, 94 / 255) // Green
  }, [index, type])

  // Hover animation
  useFrame(() => {
    if (!meshRef.current) return
    const targetScale = isHovered ? 1.3 : 1
    const currentScale = meshRef.current.scale.x
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale * tokenProgress, 0.1))
  })

  const opacity = tokenProgress * (isHovered ? 1 : 0.85)

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => {
          e.stopPropagation()
          onHover()
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          onLeave()
          document.body.style.cursor = 'auto'
        }}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.6 : 0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Token label */}
      {showLabel && tokenProgress > 0.5 && (
        <Text
          position={[0, -0.25, 0]}
          fontSize={0.1}
          color="#94a3b8"
          anchorX="center"
          anchorY="top"
          maxWidth={0.5}
        >
          {token}
        </Text>
      )}
    </group>
  )
}
