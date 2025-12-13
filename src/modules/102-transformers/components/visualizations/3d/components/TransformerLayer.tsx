import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import type { ComponentId, StackType } from '../../../../types/visualization'

interface TransformerLayerProps {
  layerIndex: number
  stackType: StackType
  position: [number, number, number]
  isActive?: boolean
  showLabel?: boolean
}

const LAYER_SIZE: [number, number, number] = [2, 0.4, 1.5]

export function TransformerLayer({
  layerIndex,
  stackType,
  position,
  isActive = false,
  showLabel = true,
}: TransformerLayerProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  const setHoveredComponent = useVisualizationStore((s) => s.setHovered)
  const setSelectedComponent = useVisualizationStore((s) => s.setSelected)
  const hoveredComponent = useVisualizationStore((s) => s.selection.hoveredComponent)
  const selectedComponent = useVisualizationStore((s) => s.selection.selectedComponent)
  const showLabels = useVisualizationStore((s) => s.showLabels)

  const componentId: ComponentId = `${stackType}-layer-${layerIndex}`
  const isHovered = hoveredComponent === componentId
  const isSelected = selectedComponent === componentId

  // Color based on stack type
  const baseColor = useMemo(() => {
    return stackType === 'encoder'
      ? new THREE.Color(56 / 255, 189 / 255, 248 / 255) // Sky blue
      : new THREE.Color(251 / 255, 146 / 255, 60 / 255) // Orange
  }, [stackType])

  // Hover/selection animation
  useFrame(() => {
    if (!meshRef.current) return

    const targetScale = isHovered ? 1.05 : isSelected ? 1.03 : 1
    const currentScale = meshRef.current.scale.x
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
    meshRef.current.scale.setScalar(newScale)
  })

  const emissiveIntensity = isActive ? 0.4 : isHovered ? 0.3 : isSelected ? 0.2 : 0.1
  const opacity = isActive ? 0.95 : 0.85

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={LAYER_SIZE}
        radius={0.05}
        smoothness={4}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHoveredComponent(componentId)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          setHoveredComponent(null)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedComponent(isSelected ? null : componentId)
        }}
      >
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Layer label */}
      {showLabel && showLabels && (
        <Text
          position={[0, LAYER_SIZE[1] / 2 + 0.15, LAYER_SIZE[2] / 2 + 0.05]}
          fontSize={0.15}
          color="#64748b"
          anchorX="center"
          anchorY="bottom"
        >
          {`L${layerIndex}`}
        </Text>
      )}

      {/* Sub-components: Attention and FFN blocks */}
      <AttentionSubBlock
        position={[-0.5, 0, 0]}
        stackType={stackType}
        layerIndex={layerIndex}
        isMasked={stackType === 'decoder'}
      />
      <FFNSubBlock position={[0.5, 0, 0]} stackType={stackType} layerIndex={layerIndex} />
    </group>
  )
}

interface AttentionSubBlockProps {
  position: [number, number, number]
  stackType: StackType
  layerIndex: number
  isMasked?: boolean
}

function AttentionSubBlock({ position, stackType, layerIndex, isMasked }: AttentionSubBlockProps) {
  const [hovered, setHovered] = useState(false)
  const setHoveredComponent = useVisualizationStore((s) => s.setHovered)

  const blockType = isMasked ? 'masked-attention' : 'attention'
  const componentId: ComponentId = `${stackType}-layer-${layerIndex}-${blockType}`

  // Purple for attention
  const color = new THREE.Color(168 / 255, 85 / 255, 247 / 255)

  return (
    <mesh
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredComponent(componentId)
      }}
      onPointerLeave={() => {
        setHovered(false)
        setHoveredComponent(null)
      }}
    >
      <boxGeometry args={[0.6, 0.25, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.4 : 0.15}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

interface FFNSubBlockProps {
  position: [number, number, number]
  stackType: StackType
  layerIndex: number
}

function FFNSubBlock({ position, stackType, layerIndex }: FFNSubBlockProps) {
  const [hovered, setHovered] = useState(false)
  const setHoveredComponent = useVisualizationStore((s) => s.setHovered)

  const componentId: ComponentId = `${stackType}-layer-${layerIndex}-ffn`

  // Green for FFN
  const color = new THREE.Color(34 / 255, 197 / 255, 94 / 255)

  return (
    <mesh
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredComponent(componentId)
      }}
      onPointerLeave={() => {
        setHovered(false)
        setHoveredComponent(null)
      }}
    >
      <boxGeometry args={[0.6, 0.25, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.4 : 0.15}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}
