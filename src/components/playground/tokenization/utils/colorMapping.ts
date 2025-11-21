/**
 * Color mapping utilities for token visualization
 * Follows HackLearn's design system (cyan, emerald, purple accents)
 */

import type { TokenType, TokenColorScheme } from '../types/tokenization';

/**
 * Consistent color scheme for token types across all visualizations
 */
export const TOKEN_COLORS: Record<TokenType, TokenColorScheme> = {
  normal: {
    bg: 'bg-slate-700/50',
    border: 'border-slate-500/50',
    text: 'text-gray-200',
    glow: 'shadow-slate-500/10',
  },
  special: {
    bg: 'bg-purple-500/20',
    border: 'border-purple-400/50',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/20',
  },
  glitch: {
    bg: 'bg-red-500/20',
    border: 'border-red-400/50',
    text: 'text-red-300',
    glow: 'shadow-red-500/30',
  },
  number: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400/50',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/20',
  },
  whitespace: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-400/50',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/20',
  },
  byte: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400/50',
    text: 'text-yellow-300',
    glow: 'shadow-yellow-500/20',
  },
  suspicious: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-400/50',
    text: 'text-orange-300',
    glow: 'shadow-orange-500/20',
  },
};

/**
 * Get Tailwind classes for token type color coding
 */
export const getTokenColorClasses = (type: TokenType): string => {
  const colors = TOKEN_COLORS[type];
  return `${colors.bg} ${colors.border} ${colors.text}`;
};

/**
 * Get token color scheme object
 */
export const getTokenColorScheme = (type: TokenType): TokenColorScheme => {
  return TOKEN_COLORS[type];
};

/**
 * Animation variants for token entrance
 */
export const tokenAnimationVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.02,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
  },
};

/**
 * Legend items for token type visualization
 */
export const LEGEND_ITEMS = [
  { type: 'normal' as const, label: 'Normal' },
  { type: 'number' as const, label: 'Number' },
  { type: 'special' as const, label: 'Special' },
  { type: 'glitch' as const, label: 'Glitch' },
  { type: 'suspicious' as const, label: 'Suspicious' },
  { type: 'whitespace' as const, label: 'Whitespace' },
  { type: 'byte' as const, label: 'Byte' },
];
