export function Lighting() {
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill light from opposite side */}
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />

      {/* Subtle rim light from behind */}
      <directionalLight position={[0, 5, -10]} intensity={0.2} />
    </>
  )
}
