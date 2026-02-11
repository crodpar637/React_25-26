import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Paper, Typography, Box } from '@mui/material';

// Pequeño componente 3D que representa un cubo giratorio.
// Props:
// - color: color del material
// - scale: escala del objeto
// - visible: muestra/oculta el objeto
function Cube({ color = "orange", scale = 1, visible = true }) {
  const ref = useRef();
  // useFrame rota el mesh continuamente; delta asegura velocidad independiente del FPS
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });
  if (!visible) return null;
  return (
    <mesh ref={ref} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// ARScene es una escena 3D pequeña (simulada) para demostrar interacción.
// Ahora envuelta en Paper para apariencia consistente con MUI.
export default function ARScene({ visible = true, color = "orange", scale = 1 }) {
  return (
    <Paper sx={{ p: 1, borderRadius: 1 }}>
      <Typography variant="h6">Escena AR (simulada)</Typography>
      <Box sx={{ height: 320 }}>
        <Canvas style={{ height: '100%' }}>
          <ambientLight />
          <pointLight position={[5, 5, 5]} />
          <Cube visible={visible} color={color} scale={scale} />
        </Canvas>
      </Box>
    </Paper>
  );
}
