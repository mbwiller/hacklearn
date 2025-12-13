import { motion, AnimatePresence } from 'framer-motion'
import { useVisualizationStore } from '../../../../stores/visualizationStore'
import { COMPONENT_INFO } from '../../../../types/visualization'
import type { ComponentId } from '../../../../types/visualization'

export function InfoPanel() {
  const hoveredComponent = useVisualizationStore((s) => s.selection.hoveredComponent)
  const selectedComponent = useVisualizationStore((s) => s.selection.selectedComponent)

  // Show info for selected or hovered component
  const componentId = selectedComponent || hoveredComponent

  // Get info for the component
  const info = componentId ? getComponentInfo(componentId) : null

  return (
    <AnimatePresence>
      {info && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-72"
        >
          <div className="bg-slate-900/95 backdrop-blur-md rounded-xl p-5 border border-slate-700 shadow-2xl">
            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-3">{info.description}</p>

            {/* Details list */}
            {info.details && info.details.length > 0 && (
              <ul className="space-y-1 mb-3">
                {info.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-accent-attention mt-1">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            )}

            {/* Link to section */}
            {info.linkedSection && (
              <a
                href={`#${info.linkedSection}`}
                className="inline-flex items-center gap-1 text-xs text-accent-attention hover:text-accent-attention/80 transition-colors"
              >
                Learn more in {info.linkedSection} section
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function getComponentInfo(componentId: ComponentId): typeof COMPONENT_INFO[string] | null {
  // Direct match
  if (COMPONENT_INFO[componentId]) {
    return COMPONENT_INFO[componentId]
  }

  // Parse component ID for layer-specific info
  const encoderMatch = componentId.match(/^encoder-layer-(\d+)(-(.+))?$/)
  if (encoderMatch) {
    const layer = encoderMatch[1]
    const subComponent = encoderMatch[3]

    if (subComponent === 'attention') {
      return {
        title: `Encoder Layer ${layer} - Self-Attention`,
        description: 'Multi-head self-attention allows each token to attend to all other tokens in the input.',
        details: [
          '8 parallel attention heads',
          'Each head learns different patterns',
          'Outputs are concatenated and projected',
        ],
        linkedSection: 'multi-head',
      }
    }

    if (subComponent === 'ffn') {
      return {
        title: `Encoder Layer ${layer} - Feed-Forward`,
        description: 'Position-wise feed-forward network applies the same transformation to each position.',
        details: [
          'Two linear transformations with ReLU',
          'Inner dimension: 2048',
          'Output dimension: 512',
        ],
        linkedSection: 'encoder',
      }
    }

    return {
      title: `Encoder Layer ${layer}`,
      description: 'One of six identical encoder layers that process the input sequence.',
      details: [
        'Self-attention sublayer',
        'Feed-forward sublayer',
        'Residual connections around each',
        'Layer normalization after each sublayer',
      ],
      linkedSection: 'encoder',
    }
  }

  const decoderMatch = componentId.match(/^decoder-layer-(\d+)(-(.+))?$/)
  if (decoderMatch) {
    const layer = decoderMatch[1]
    const subComponent = decoderMatch[3]

    if (subComponent === 'masked-attention') {
      return {
        title: `Decoder Layer ${layer} - Masked Self-Attention`,
        description: 'Masked attention prevents the decoder from seeing future tokens during training.',
        details: [
          'Causal masking applied',
          'Each position can only attend to earlier positions',
          'Enables autoregressive generation',
        ],
        linkedSection: 'decoder',
      }
    }

    if (subComponent === 'cross-attention') {
      return {
        title: `Decoder Layer ${layer} - Cross-Attention`,
        description: 'Cross-attention allows the decoder to attend to all encoder output positions.',
        details: [
          'Queries from decoder',
          'Keys and Values from encoder',
          'Connects encoder and decoder',
        ],
        linkedSection: 'decoder',
      }
    }

    if (subComponent === 'ffn') {
      return {
        title: `Decoder Layer ${layer} - Feed-Forward`,
        description: 'Same feed-forward structure as encoder layers.',
        linkedSection: 'decoder',
      }
    }

    return {
      title: `Decoder Layer ${layer}`,
      description: 'One of six identical decoder layers that generate the output sequence.',
      details: [
        'Masked self-attention sublayer',
        'Cross-attention sublayer',
        'Feed-forward sublayer',
      ],
      linkedSection: 'decoder',
    }
  }

  // Check for stack-level IDs
  if (componentId === 'encoder') {
    return COMPONENT_INFO.encoder
  }
  if (componentId === 'decoder') {
    return COMPONENT_INFO.decoder
  }

  return null
}
