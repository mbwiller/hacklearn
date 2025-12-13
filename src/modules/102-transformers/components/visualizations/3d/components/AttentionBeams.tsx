import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { EXAMPLE_SENTENCES } from '../../../../data/constants'
import { softmax } from '../../../../lib/utils'
import { HEAD_COLORS } from '../../../../lib/themeColors'

const TOKENS = EXAMPLE_SENTENCES.primary.tokens
const TOKEN_SPACING = 0.4

interface AttentionBeamsProps {
  type: 'encoder-self' | 'decoder-self' | 'cross'
}

export function AttentionBeams({ type }: AttentionBeamsProps) {
  const showAttentionBeams = useVisualizationStore((s) => s.showAttentionBeams)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)
  const selectedHead = useVisualizationStore((s) => s.selectedHead)
  const hoveredToken = useVisualizationStore((s) => s.selection.hoveredToken)

  // Determine visibility based on animation step
  const visible = useMemo(() => {
    if (!showAttentionBeams) return false

    switch (type) {
      case 'encoder-self':
        return stepIndex >= 2 && stepIndex <= 4
      case 'decoder-self':
        return stepIndex >= 5 && stepIndex <= 7
      case 'cross':
        return stepIndex >= 6
      default:
        return false
    }
  }, [showAttentionBeams, stepIndex, type])

  // Generate attention weights
  const attentionWeights = useMemo(() => {
    return generateAttentionPattern(type, hoveredToken)
  }, [type, hoveredToken])

  // Position based on type - must be before conditional return to respect hooks rules
  const basePosition = useMemo((): [number, number, number] => {
    switch (type) {
      case 'encoder-self':
        return [-3, 2, 0]
      case 'decoder-self':
        return [3, 2, 0]
      case 'cross':
        return [0, 3, 0]
      default:
        return [0, 0, 0]
    }
  }, [type])

  if (!visible) return null

  return (
    <group position={basePosition}>
      {attentionWeights.map((row, i) =>
        row.map((weight, j) => {
          // Filter based on selected head or show all
          if (weight < 0.1) return null

          // For decoder self-attention, only show causal (i >= j)
          if (type === 'decoder-self' && j > i) return null

          // Calculate positions
          const fromZ = (i - (TOKENS.length - 1) / 2) * TOKEN_SPACING
          const toZ = (j - (TOKENS.length - 1) / 2) * TOKEN_SPACING

          // Cross attention: from decoder (right) to encoder (left)
          const fromX = type === 'cross' ? 2 : 0
          const toX = type === 'cross' ? -2 : 0

          return (
            <AttentionLine
              key={`${i}-${j}`}
              from={[fromX, 0, fromZ]}
              to={[toX, 0, toZ]}
              weight={weight}
              headIndex={selectedHead}
              isHighlighted={
                (i === 7 && j === 1) || (i === 1 && j === 7) // "it" <-> "animal"
              }
            />
          )
        })
      )}
    </group>
  )
}

interface AttentionLineProps {
  from: [number, number, number]
  to: [number, number, number]
  weight: number
  headIndex: number | null
  isHighlighted: boolean
}

function AttentionLine({ from, to, weight, headIndex, isHighlighted }: AttentionLineProps) {
  const lineRef = useRef<THREE.Line | null>(null)

  // Color based on head or default purple
  const color = useMemo(() => {
    if (isHighlighted) {
      return new THREE.Color(1, 0.8, 0) // Gold for highlighted connections
    }
    if (headIndex !== null) {
      return HEAD_COLORS[headIndex]
    }
    return new THREE.Color(168 / 255, 85 / 255, 247 / 255) // Default purple
  }, [headIndex, isHighlighted])

  // Animate opacity
  useFrame(({ clock }) => {
    if (!lineRef.current) return
    const material = lineRef.current.material as THREE.LineBasicMaterial

    // Pulse effect for highlighted connections
    if (isHighlighted) {
      const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 3)
      material.opacity = weight * (0.6 + 0.4 * pulse)
    } else {
      material.opacity = weight * 0.6
    }
  })

  // Create curved line geometry
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 0.3, (from[2] + to[2]) / 2),
      new THREE.Vector3(...to)
    )
    const points = curve.getPoints(20)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [from, to])

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: weight * 0.6 }))} ref={lineRef} />
  )
}

// Generate attention patterns based on type
function generateAttentionPattern(_type: string, hoveredToken: number | null): number[][] {
  const size = TOKENS.length
  const weights: number[][] = []

  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      let score: number

      // If a token is hovered, emphasize its connections
      if (hoveredToken !== null) {
        if (i === hoveredToken || j === hoveredToken) {
          score = Math.exp(-Math.abs(i - j) * 0.3) + 0.3
        } else {
          score = 0.05
        }
      } else {
        // Default contextual pattern
        const distance = Math.abs(i - j)
        score = Math.exp(-distance * 0.3)

        // Special case: "it" (index 7) attends strongly to "animal" (index 1)
        if ((i === 7 && j === 1) || (i === 1 && j === 7)) {
          score = 2.5
        }
      }

      row.push(score)
    }
    weights.push(softmax(row))
  }

  return weights
}
