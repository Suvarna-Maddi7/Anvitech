import * as THREE from 'three';

// ── Shared matte material factory ─────────────────────────────────────────────
// Returns a NEW material per call (R3F manages disposal), but uses the same
// color / roughness recipe for every environment so the look stays consistent.
export function matteMaterial(color: string, roughness = 0.85, metalness = 0.0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

// ── Colour palette ─────────────────────────────────────────────────────────────
export const C = {
  floor:     '#F5F5F0',
  wall:      '#FDFDFC',
  wallDark:  '#EBEBE6',
  roof:      '#A8B8C8',
  roofDark:  '#7A8A9A',
  glass:     '#E0F2FE',
  metal:     '#B0BEC5',
  wood:      '#E6CBA8',
  green:     '#A7D4A0',
  dark:      '#607D8B',
  accent:    '#4F46E5',
} as const;
