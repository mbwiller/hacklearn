/**
 * Token Metadata Panel Component
 * Shows detailed information about a hovered token
 */

import { motion } from 'framer-motion';
import { Info, Hash, Binary, FileCode } from 'lucide-react';
import type { TokenMetadata } from '../types/tokenization';

interface TokenMetadataPanelProps {
  metadata: TokenMetadata;
}

export const TokenMetadataPanel = ({ metadata }: TokenMetadataPanelProps) => {
  const { token, unicodePoints, hexBytes, binaryRep } = metadata;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="backdrop-blur-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-xl p-6 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg">
          <Info className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">Token Details</h3>
      </div>

      <div className="space-y-4">
        {/* Token Text */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Text</div>
          <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-white">
            "{token.text === ' ' ? '␣' : token.text === '\n' ? '↵' : token.text}"
          </div>
        </div>

        {/* Token ID */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Hash className="w-3 h-3" />
              Token ID
            </div>
            <div className="px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 font-mono text-purple-300">
              {token.id}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Position</div>
            <div className="px-3 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 font-mono text-cyan-300">
              {token.position}
            </div>
          </div>
        </div>

        {/* Type */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Token Type</div>
          <div className="px-3 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/30 font-mono text-emerald-300 capitalize">
            {token.type}
          </div>
        </div>

        {/* Unicode Points */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <FileCode className="w-3 h-3" />
            Unicode Points
          </div>
          <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-gray-300 break-all">
            {unicodePoints.join(' ')}
          </div>
        </div>

        {/* Hex Bytes */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Binary className="w-3 h-3" />
            UTF-8 Bytes (Hex)
          </div>
          <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-gray-300 break-all">
            {hexBytes || 'N/A'}
          </div>
        </div>

        {/* Binary */}
        <div>
          <div className="text-xs text-gray-400 mb-1">Binary Representation</div>
          <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-xs text-gray-300 break-all overflow-x-auto">
            {binaryRep || 'N/A'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
