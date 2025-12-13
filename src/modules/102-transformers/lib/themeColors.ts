import * as THREE from 'three'

// CSS variable RGB values (from globals.css)
// Light mode defaults - these can be read from CSS at runtime
const LIGHT_COLORS = {
  query: [59, 130, 246],
  key: [249, 115, 22],
  value: [34, 197, 94],
  attention: [168, 85, 247],
  encoder: [56, 189, 248],
  decoder: [251, 146, 60],
} as const

// Convert RGB array to hex string
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

// Convert RGB array to Three.js Color
function rgbToThreeColor(rgb: readonly [number, number, number]): THREE.Color {
  return new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255)
}

// Pre-computed colors for Three.js
export const THEME_COLORS = {
  query: rgbToThreeColor(LIGHT_COLORS.query),
  key: rgbToThreeColor(LIGHT_COLORS.key),
  value: rgbToThreeColor(LIGHT_COLORS.value),
  attention: rgbToThreeColor(LIGHT_COLORS.attention),
  encoder: rgbToThreeColor(LIGHT_COLORS.encoder),
  decoder: rgbToThreeColor(LIGHT_COLORS.decoder),
} as const

// Hex versions for materials that need hex strings
export const THEME_HEX = {
  query: rgbToHex(...LIGHT_COLORS.query),
  key: rgbToHex(...LIGHT_COLORS.key),
  value: rgbToHex(...LIGHT_COLORS.value),
  attention: rgbToHex(...LIGHT_COLORS.attention),
  encoder: rgbToHex(...LIGHT_COLORS.encoder),
  decoder: rgbToHex(...LIGHT_COLORS.decoder),
} as const

// Generate head colors using HSL like MultiHeadSection
export function getHeadColor(index: number): THREE.Color {
  const hue = (index * 45) / 360
  return new THREE.Color().setHSL(hue, 0.7, 0.5)
}

export function getHeadHex(index: number): string {
  return getHeadColor(index).getHexString()
}

// Get all 8 head colors
export const HEAD_COLORS = Array.from({ length: 8 }, (_, i) => getHeadColor(i))

// Utility to create a glowing material
export function createGlowMaterial(
  color: THREE.Color,
  emissiveIntensity: number = 0.3
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: emissiveIntensity,
    transparent: true,
    opacity: 0.9,
  })
}

// Utility to create a line material for attention beams
export function createBeamMaterial(
  color: THREE.Color,
  opacity: number = 0.6
): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: opacity,
    linewidth: 2,
  })
}
