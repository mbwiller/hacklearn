import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useVisualizationStore, selectCamera } from '../../../../stores/visualizationStore'
import * as THREE from 'three'

export function CameraController() {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()
  const cameraState = useVisualizationStore(selectCamera)
  const tourActive = useVisualizationStore((s) => s.tourActive)

  // Target position for smooth camera animation
  const targetPosition = useRef(new THREE.Vector3(...cameraState.position))
  const targetLookAt = useRef(new THREE.Vector3(...cameraState.target))

  // Update targets when camera state changes
  useEffect(() => {
    targetPosition.current.set(...cameraState.position)
    targetLookAt.current.set(...cameraState.target)
  }, [cameraState.position, cameraState.target])

  // Smooth camera animation during tour
  useFrame(() => {
    if (tourActive && controlsRef.current) {
      // Lerp camera position
      camera.position.lerp(targetPosition.current, 0.02)

      // Lerp orbit target
      controlsRef.current.target.lerp(targetLookAt.current, 0.02)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={!tourActive}
      enableZoom={!tourActive}
      enableRotate={!tourActive}
      minDistance={3}
      maxDistance={20}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2}
      target={cameraState.target}
    />
  )
}
