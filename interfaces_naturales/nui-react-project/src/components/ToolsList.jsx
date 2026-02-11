import React from "react";
import { List, ListItem, ListItemText, Typography } from '@mui/material';

// Componente simple que lista las  y librerías usadas
// para construir las interfaces naturales de usuario (NUI).
export default function ToolsList() {
  const tools = [
    { name: "Web Speech API", purpose: "Reconocimiento de voz" },
    { name: "MediaPipe Hands", purpose: "Detección de partes de la mano / gestos" },
    { name: "MediaPipe Pose", purpose: "Detección de postura y movimiento del cuerpo" },
    { name: "react-webcam", purpose: "Acceso a cámara en navegador" },
    { name: "@react-three/fiber", purpose: "Renderizado 3D / AR simple" }
  ];

  return (
    <div style={{ margin: "10px 0" }}>
      <Typography variant="subtitle1" gutterBottom> Herramientas usadas</Typography>
      <List dense>
        {tools.map((t) => (
          <ListItem key={t.name}>
            <ListItemText primary={t.name} secondary={t.purpose} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
