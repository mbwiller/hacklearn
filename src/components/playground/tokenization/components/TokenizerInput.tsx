/**
 * Tokenizer Input Component
 * Real-time text input with tokenization feedback
 */

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Type, RefreshCw, Download } from 'lucide-react';

interface TokenizerInputProps {
  value: string;
  onChange: (text: string) => void;
  isTokenizing: boolean;
  placeholder?: string;
}

export const TokenizerInput = ({
  value,
  onChange,
  isTokenizing,
  placeholder = 'Type or paste text to tokenize...',
}: TokenizerInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const clearInput = useCallback(() => {
    onChange('');
  }, [onChange]);

  const loadExample = useCallback(() => {
    onChange(
      'The quick brown fox jumps over the lazy dog. ' +
      'This is a test of tokenization with numbers like 42, 2024, and 3.14159.'
    );
  }, [onChange]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg">
            <Type className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Input Text</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadExample}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-all"
          >
            <Download className="w-4 h-4" />
            Load Example
          </button>
          <button
            onClick={clearInput}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-300 hover:bg-white/10 rounded-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        animate={{
          borderColor: isFocused
            ? 'rgba(34, 211, 238, 0.5)'
            : 'rgba(255, 255, 255, 0.1)',
        }}
        className="relative backdrop-blur-xl bg-white/5 rounded-xl border transition-all"
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white rounded-xl px-6 py-4 resize-none focus:outline-none font-mono text-sm leading-relaxed min-h-[120px]"
          rows={5}
        />

        {/* Character/Token count badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3 text-xs">
          <span className="px-2 py-1 bg-white/10 rounded-lg text-gray-400">
            {value.length} chars
          </span>
          {isTokenizing && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400"
            >
              Tokenizing...
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
