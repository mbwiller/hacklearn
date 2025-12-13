import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { TransformerScene } from './TransformerScene'

interface TransformerCanvasProps {
  isActive?: boolean
}

export function TransformerCanvas({ isActive = true }: TransformerCanvasProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 4, 10],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        frameloop={isActive ? 'always' : 'demand'}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <TransformerScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
