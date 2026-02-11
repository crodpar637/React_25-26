import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Holistic } from "@mediapipe/holistic";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * Componente Holistic:
 * - Detecta cuerpo + manos con UN SOLO WASM
 * - Emite estados simples:
 *   'manos_arriba', 'salto', 'normal', 'sin_cuerpo'
 */
export default function BodyPose({ onPose }) {
  const webcamRef = useRef(null);
  const holisticRef = useRef(null);
  const baselineRef = useRef(null);
  const intervalRef = useRef(null);

  const [status, setStatus] = useState("iniciando");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (holisticRef.current) return;

    const holistic = new Holistic({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1675469404/${file}`,
    });

    holistic.setOptions({
      modelComplexity: 0,
      smoothLandmarks: true,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      const pose = results.poseLandmarks;

      if (!pose) {
        setStatus("sin_cuerpo");
        onPose?.("sin_cuerpo");
        return;
      }

      // Índices clave del cuerpo
      const leftShoulder = pose[11];
      const rightShoulder = pose[12];
      const leftWrist = pose[15];
      const rightWrist = pose[16];
      const nose = pose[0];

      const shouldersY = (leftShoulder.y + rightShoulder.y) / 2;
      const wristsY = (leftWrist.y + rightWrist.y) / 2;

      if (!baselineRef.current) baselineRef.current = nose.y;

      // 🟢 Manos arriba
      if (wristsY < shouldersY - 0.03) {
        setStatus("manos_arriba");
        onPose?.("manos_arriba");
        return;
      }

      // 🟡 Salto (nariz sube respecto a línea base)
      if (nose.y < baselineRef.current - 0.05) {
        setStatus("salto");
        onPose?.("salto");
        return;
      }

      setStatus("normal");
      onPose?.("normal");
    });

    holisticRef.current = holistic;
    setStatus("listo");

    intervalRef.current = setInterval(async () => {
      const video = webcamRef.current?.video;
      if (video && video.readyState === 4) {
        try {
          await holistic.send({ image: video });
        } catch (e) {
          console.error("Error procesando frame en Holistic:", e);
        }
      }
    }, 300);

    return () => {
      clearInterval(intervalRef.current);
      holistic.close();
      holisticRef.current = null;
    };
  }, [onPose]);

  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ mb: 1 }}>
        Movimiento detectado: <b>{status}</b>
      </Typography>

      <Webcam
        ref={webcamRef}
        style={{
          width: 240,
          height: 180,
          display: "block",
          marginBottom: 8,
        }}
      />

      <Accordion expanded={open} onChange={() => setOpen((o) => !o)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Movimientos detectables (Holistic)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>
              <b>manos_arriba</b>: muñecas por encima de los hombros
            </li>
            <li>
              <b>salto</b>: elevación brusca de la cabeza
            </li>
            <li>
              <b>normal</b>: postura neutra
            </li>
            <li>
              <b>sin_cuerpo</b>: no se detecta persona
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
