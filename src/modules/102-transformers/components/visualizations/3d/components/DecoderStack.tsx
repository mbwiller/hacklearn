import { useMemo } from 'react'
import { Text } from '@react-three/drei'
import { TransformerLayer } from './TransformerLayer'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { TRANSFORMER_CONFIG } from '../../../../data/constants'

interface DecoderStackProps {
  position?: [number, number, number]
}

const LAYER_SPACING = 0.8

export function DecoderStack({ position = [3, 0, 0] }: DecoderStackProps) {
  const showLabels = useVisualizationStore((s) => s.showLabels)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)

  // Determine which layers are active based on animation step
  const activeLayers = useMemo(() => {
    // Steps: 5 = decoder masked attn, 6 = cross-attn, 7 = output
    if (stepIndex < 5) return []
    if (stepIndex >= 5) return [1, 2, 3, 4, 5, 6]
    return []
  }, [stepIndex])

  return (
    <group position={position}>
      {/* Stack label */}
      {showLabels && (
        <Text
          position={[0, TRANSFORMER_CONFIG.N * LAYER_SPACING + 0.5, 0]}
          fontSize={0.3}
          color="#f97316"
          anchorX="center"
          anchorY="bottom"
          fontWeight="bold"
        >
          Decoder
        </Text>
      )}

      {/* 6 decoder layers */}
      {Array.from({ length: TRANSFORMER_CONFIG.N }, (_, i) => (
        <TransformerLayer
          key={i}
          layerIndex={i + 1}
          stackType="decoder"
          position={[0, (i + 1) * LAYER_SPACING, 0]}
          isActive={activeLayers.includes(i + 1)}
          showLabel={i === 0 || i === TRANSFORMER_CONFIG.N - 1}
        />
      ))}

      {/* Cross-attention indicator blocks */}
      {Array.from({ length: TRANSFORMER_CONFIG.N }, (_, i) => (
        <CrossAttentionIndicator
          key={`cross-${i}`}
          position={[-1.3, (i + 1) * LAYER_SPACING, 0]}
          isActive={stepIndex >= 6}
        />
      ))}

      {/* Base platform */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.5, 0.1, 2]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

interface CrossAttentionIndicatorProps {
  position: [number, number, number]
  isActive: boolean
}

function CrossAttentionIndicator({ position, isActive }: CrossAttentionIndicatorProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={isActive ? 0.6 : 0.1}
        transparent
        opacity={isActive ? 0.9 : 0.3}
      />
    </mesh>
  )
}
