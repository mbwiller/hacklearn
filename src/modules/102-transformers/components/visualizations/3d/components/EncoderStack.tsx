import { useMemo } from 'react'
import { Text } from '@react-three/drei'
import { TransformerLayer } from './TransformerLayer'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { TRANSFORMER_CONFIG } from '../../../../data/constants'

interface EncoderStackProps {
  position?: [number, number, number]
}

const LAYER_SPACING = 0.8

export function EncoderStack({ position = [-3, 0, 0] }: EncoderStackProps) {
  const showLabels = useVisualizationStore((s) => s.showLabels)
  const stepIndex = useVisualizationStore((s) => s.animation.stepIndex)

  // Determine which layers are active based on animation step
  const activeLayers = useMemo(() => {
    // Steps: 0-1 = input, 2 = L1-3, 3 = L4-6, 4 = complete
    if (stepIndex < 2) return []
    if (stepIndex === 2) return [1, 2, 3]
    if (stepIndex >= 3) return [1, 2, 3, 4, 5, 6]
    return []
  }, [stepIndex])

  return (
    <group position={position}>
      {/* Stack label */}
      {showLabels && (
        <Text
          position={[0, TRANSFORMER_CONFIG.N * LAYER_SPACING + 0.5, 0]}
          fontSize={0.3}
          color="#0ea5e9"
          anchorX="center"
          anchorY="bottom"
          fontWeight="bold"
        >
          Encoder
        </Text>
      )}

      {/* 6 encoder layers */}
      {Array.from({ length: TRANSFORMER_CONFIG.N }, (_, i) => (
        <TransformerLayer
          key={i}
          layerIndex={i + 1}
          stackType="encoder"
          position={[0, (i + 1) * LAYER_SPACING, 0]}
          isActive={activeLayers.includes(i + 1)}
          showLabel={i === 0 || i === TRANSFORMER_CONFIG.N - 1}
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
