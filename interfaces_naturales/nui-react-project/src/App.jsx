import React, { useState } from "react";
import VoiceControl from "./components/VoiceControl";
import HandGesture from "./components/HandGesture";
import BodyPose from "./components/BodyPose";
import ARScene from "./components/ARScene";
import ToolsList from "./components/ToolsList";
import VoiceCommands from "./components/VoiceCommands";
import { Container, Grid, Paper, Typography, Box } from '@mui/material';

export default function App() {
  // Estados principales de la app
  const [command, setCommand] = useState("Esperando comando..."); // texto o comando detectado por voz
  const [gesture, setGesture] = useState("Ninguno"); // gesto detectado por MediaPipe Hands
  const [pose, setPose] = useState("Quieto"); // movimiento/pose detectada por MediaPipe Pose

  // Estados de la escena AR (visibilidad, color y escala)
  const [arVisible, setArVisible] = useState(true);
  const [arColor, setArColor] = useState("orange");
  const [arScale, setArScale] = useState(1);

  // Idioma actual para reconocimiento de voz (es / en)
  const [voiceLang, setVoiceLang] = useState('es');

  // Flags para indicar uso de cada modalidad (útil para criterios de evaluación)
  const [voiceUsed, setVoiceUsed] = useState(false);
  const [handUsed, setHandUsed] = useState(false);
  const [bodyUsed, setBodyUsed] = useState(false);

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>Interfaz Natural de Usuario (NUI)</Typography>

      {/* Indicadores rápidos de estado detectado */}
      <Box sx={{ mb: 2 }}>
      <Typography>Indicadores rápidos de estado detectado</Typography>
        <Typography><b>Voz:</b> {command}</Typography>
        <Typography><b>Gesto:</b> {gesture}</Typography>
        <Typography><b>Movimiento:</b> {pose}</Typography>
      </Box>

      {/* Grid principal: escena (izquierda) y controles (derecha) */}
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 2 }}>
            <ARScene visible={arVisible} color={arColor} scale={arScale} />

            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item size={{ xs: 12, md: 6}}>
                <HandGesture onGesture={(g) => {
                  setGesture(g);
                  if (g !== 'sin_mano') setHandUsed(true);
                  if (g === 'mano_abierta') setArVisible(true);
                  if (g === 'puño') setArVisible(false);
                }} />
              </Grid>
              <Grid item size={{ xs: 12, md: 6}}>
                <BodyPose onPose={(p) => {
                  setPose(p);
                  if (p !== 'normal' && p !== 'sin_cuerpo') setBodyUsed(true);
                  if (p === 'manos_arriba') setArScale((s) => Math.min(3, s + 0.4));
                  if (p === 'salto') setArColor('hotpink');
                }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 2 }}>
            <VoiceControl voiceLang={voiceLang} onLanguageChange={(l) => setVoiceLang(l)} onCommand={(c) => {
              setCommand(c);
              setVoiceUsed(true);
              if (c === 'show') setArVisible(true);
              else if (c === 'hide') setArVisible(false);
              else if (c.startsWith('color:')) setArColor(c.split(':')[1]);
              else if (c === 'scale:up') setArScale((s) => Math.min(3, s + 0.25));
              else if (c === 'scale:down') setArScale((s) => Math.max(0.3, s - 0.25));
            }} />

            <VoiceCommands lang={voiceLang} />
            <ToolsList />

            {/* <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Criterios de evaluación</Typography>
              <ul>
                <li><b>a) Herramientas identificadas:</b> Sí (lista arriba)</li>
                <li><b>b) Interfaz NUI creada:</b> Sí (voz, gesto, movimiento, AR)</li>
                <li><b>c) Reconocimiento de voz usado:</b> {voiceUsed ? 'Sí' : 'No'}</li>
                <li><b>d) Detección de movimiento corporal usada:</b> {bodyUsed ? 'Sí' : 'No'}</li>
                <li><b>e) Detección de partes del cuerpo (manos):</b> {handUsed ? 'Sí' : 'No'}</li>
                <li><b>f) Realidad aumentada integrada:</b> Sí (escena AR reactiva)</li>
              </ul>
            </Box> */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
