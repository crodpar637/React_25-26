import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Hands } from "@mediapipe/hands";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Componente que usa MediaPipe Hands para detectar la presencia y
// gesto de la mano. Emite los estados: 'mano_abierta', 'puño', 'sin_mano'.
export default function HandGesture({ onGesture }) {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("Iniciando cámara...");
  const [open, setOpen] = useState(true); // controla colapso de la lista

  useEffect(() => {
    // Cargar MediaPipe Hands desde CDN de forma estable
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`
    });

    // Limitar a una mano para este ejemplo
    hands.setOptions({ maxNumHands: 1 });

    // onResults se llama con los landmarks cuando MediaPipe procesa la imagen
    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const lm = results.multiHandLandmarks[0];
        // Usamos la distancia promedio de las puntas al muñeca como heurística
        // para distinguir mano abierta vs puño. lm[i] contiene {x,y,z} normalizados.
        const wrist = lm[0];
        const tips = [lm[8], lm[12], lm[16], lm[20]];
        const avgDist = tips.reduce((acc, t) => acc + Math.hypot(t.x - wrist.x, t.y - wrist.y), 0) / tips.length;
        const isOpen = avgDist > 0.12; // umbral empírico para coordenadas normalizadas
        const gesture = isOpen ? "mano_abierta" : "puño";
        setStatus(gesture);
        onGesture(gesture);
      } else {
        setStatus("sin_mano");
        onGesture("sin_mano");
      }
    });

    // Inicializar MediaPipe y luego empezar a procesar frames
    hands.initialize().then(() => {
      setStatus("Listo");
      
      // Enviamos frames periódicamente a MediaPipe para su procesamiento
      const interval = setInterval(async () => {
        if (webcamRef.current?.video) {
          try {
            await hands.send({ image: webcamRef.current.video });
          } catch (error) {
            console.error("Error procesando frame en Hands:", error);
          }
        }
      }, 300);

      return () => clearInterval(interval);
    }).catch((error) => {
      console.error("Error inicializando MediaPipe Hands:", error);
      setStatus("Error inicializando");
    });
  }, [onGesture]);

  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ mb: 1 }}>Gesto: <b>{status}</b></Typography>
      <Webcam ref={webcamRef} style={{ width: 240, height: 180, display: 'block', marginBottom: 8 }} />

      <Accordion expanded={open} onChange={() => setOpen(o => !o)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Movimientos detectables (mano)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li><b>mano_abierta</b>: muestra la escena AR</li>
            <li><b>puño</b>: oculta la escena AR</li>
            <li><b>sin_mano</b>: no hay acción</li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
