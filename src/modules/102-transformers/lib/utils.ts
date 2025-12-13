import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Compute softmax for visualization
export function softmax(arr: number[]): number[] {
  const maxVal = Math.max(...arr)
  const exps = arr.map(x => Math.exp(x - maxVal))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map(x => x / sum)
}

// Generate attention weights for demo
export function generateAttentionWeights(size: number, pattern: 'uniform' | 'diagonal' | 'contextual' = 'contextual'): number[][] {
  const weights: number[][] = []

  for (let i = 0; i < size; i++) {
    const row: number[] = []
    for (let j = 0; j < size; j++) {
      let score: number

      switch (pattern) {
        case 'uniform':
          score = 1
          break
        case 'diagonal':
          score = i === j ? 3 : 0.5
          break
        case 'contextual':
        default:
          // Create interesting patterns - nearby tokens attend more
          const distance = Math.abs(i - j)
          score = Math.exp(-distance * 0.3) + Math.random() * 0.3
          break
      }
      row.push(score)
    }
    // Apply softmax to each row
    const softmaxRow = softmax(row)
    weights.push(softmaxRow)
  }

  return weights
}

// Linear interpolation
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
