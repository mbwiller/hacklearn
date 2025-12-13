import { motion } from 'framer-motion'
import { drawPath } from '../../../lib/animations'

interface ArrowProps {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  strokeWidth?: number
  opacity?: number
  animated?: boolean
  curved?: boolean
  label?: string
}

export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = 'currentColor',
  strokeWidth = 2,
  opacity = 1,
  animated = true,
  curved = false,
  label,
}: ArrowProps) {
  const dx = x2 - x1
  const dy = y2 - y1
  const angle = Math.atan2(dy, dx)

  // Arrowhead dimensions
  const headLength = 10
  const headAngle = Math.PI / 6

  // Calculate arrowhead points
  const headX1 = x2 - headLength * Math.cos(angle - headAngle)
  const headY1 = y2 - headLength * Math.sin(angle - headAngle)
  const headX2 = x2 - headLength * Math.cos(angle + headAngle)
  const headY2 = y2 - headLength * Math.sin(angle + headAngle)

  // Path for the line
  let linePath: string
  if (curved) {
    // Create a curved path using quadratic bezier
    const midX = (x1 + x2) / 2
    const midY = (y1 + y2) / 2
    const controlOffset = Math.abs(dx) * 0.3 || Math.abs(dy) * 0.3
    const controlX = midX
    const controlY = midY - controlOffset
    linePath = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`
  } else {
    linePath = `M ${x1} ${y1} L ${x2} ${y2}`
  }

  const arrowheadPath = `M ${headX1} ${headY1} L ${x2} ${y2} L ${headX2} ${headY2}`

  return (
    <g opacity={opacity}>
      {/* Main line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={animated ? drawPath : undefined}
        initial={animated ? 'hidden' : undefined}
        animate={animated ? 'visible' : undefined}
      />

      {/* Arrowhead */}
      <motion.path
        d={arrowheadPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.2 }}
      />

      {/* Label */}
      {label && (
        <motion.text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 10}
          textAnchor="middle"
          className="text-xs fill-text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  )
}

interface DataFlowArrowProps {
  startX: number
  startY: number
  endX: number
  endY: number
  color?: string
  delay?: number
}

export function DataFlowArrow({
  startX,
  startY,
  endX,
  endY,
  color = 'rgb(var(--color-attention))',
  delay = 0,
}: DataFlowArrowProps) {
  const path = `M ${startX} ${startY} L ${endX} ${endY}`
  const pathLength = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  )

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeDasharray={pathLength}
      strokeDashoffset={pathLength}
      initial={{ strokeDashoffset: pathLength }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}
