/**
 * Main tokenization hook for managing state and real-time tokenization
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { TokenizerResult, TokenizerModel } from '../types/tokenization';
import { tokenizeText } from '../utils/tokenizers';

// Debounce delay for tokenization (150ms balances responsiveness with performance)
const DEBOUNCE_DELAY = 150;

export const useTokenization = (initialText: string = '') => {
  const [text, setText] = useState(initialText);
  const [model, setModel] = useState<TokenizerModel>('gpt-4');
  const [result, setResult] = useState<TokenizerResult | null>(null);
  const [isTokenizing, setIsTokenizing] = useState(false);

  /**
   * Tokenize the current text with the selected model
   */
  const performTokenization = useCallback((inputText: string, selectedModel: TokenizerModel) => {
    if (!inputText.trim()) {
      setResult(null);
      setIsTokenizing(false);
      return;
    }

    setIsTokenizing(true);
    try {
      const tokenized = tokenizeText(inputText, selectedModel);
      setResult(tokenized);
    } catch (error) {
      console.error('Tokenization error:', error);
      setResult(null);
    } finally {
      setIsTokenizing(false);
    }
  }, []);

  /**
   * Debounced tokenization effect
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      performTokenization(text, model);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [text, model, performTokenization]);

  /**
   * Update text and trigger tokenization
   */
  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  /**
   * Update model and trigger re-tokenization
   */
  const updateModel = useCallback((newModel: TokenizerModel) => {
    setModel(newModel);
  }, []);

  /**
   * Clear all state
   */
  const clear = useCallback(() => {
    setText('');
    setResult(null);
  }, []);

  return {
    text,
    model,
    result,
    isTokenizing,
    updateText,
    updateModel,
    clear,
  };
};
