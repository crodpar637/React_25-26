import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

// Componente que controla el reconocimiento de voz.
// - `voiceLang` controla el idioma inicial ('es' o 'en').
// - `onLanguageChange` notifica cambios de idioma al padre.
// - `onCommand` recibe comandos mapeados (ej. 'show', 'color:red') o texto crudo.
export default function VoiceControl({ onCommand, voiceLang = 'es', onLanguageChange }) {
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState(voiceLang);

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("SpeechRecognition no disponible en este navegador");
    const recognition = new SpeechRecognition();
    // Ajusta el idioma del reconocedor según la selección del usuario
    recognition.lang = lang === 'es' ? 'es-ES' : 'en-US';

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      // Obtenemos el texto detectado por el reconocedor
      const text = event.results[0][0].transcript.toLowerCase();

      // Mapas simples de expresiones regulares a comandos internos
      // permiten que el padre reciba instrucciones estructuradas.
      const maps = {
        es: [
          [/mostrar/, 'show'],
          [/ocultar/, 'hide'],
          [/rojo/, 'color:red'],
          [/verde/, 'color:green'],
          [/azul/, 'color:blue'],
          [/aumentar|agrandar/, 'scale:up'],
          [/disminuir|achicar/, 'scale:down']
        ],
        en: [
          [/show/, 'show'],
          [/hide/, 'hide'],
          [/red/, 'color:red'],
          [/green/, 'color:green'],
          [/blue/, 'color:blue'],
          [/increase|bigger|zoom in/, 'scale:up'],
          [/decrease|smaller|zoom out/, 'scale:down']
        ]
      };

      const list = maps[lang] || maps.es;
      for (const [rx, cmd] of list) {
        if (rx.test(text)) {
          // Si coincide, enviamos el comando estructurado al padre
          onCommand(cmd);
          return;
        }
      }

      // Si no hay coincidencias, devolvemos el texto crudo para que
      // la aplicación lo muestre o lo interprete de otra forma.
      onCommand(text);
    };

    recognition.start();
  };

  const handleLangChange = (e) => {
    setLang(e.target.value);
    if (onLanguageChange) onLanguageChange(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="voice-lang-label">Idioma</InputLabel>
        <Select
          labelId="voice-lang-label"
          value={lang}
          label="Idioma"
          onChange={handleLangChange}
        >
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="en">English</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color={listening ? 'error' : 'primary'} onClick={startRecognition}>
        {listening ? '🔴 Escuchando...' : '🎤 Hablar'}
      </Button>
    </Box>
  );
}

