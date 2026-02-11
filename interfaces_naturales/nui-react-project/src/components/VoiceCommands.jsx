import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

// Comandos disponibles mostrados en pantalla para referencia del usuario.
const commands = {
  es: [
    { phrase: "mostrar", action: "show (muestra AR)" },
    { phrase: "ocultar", action: "hide (oculta AR)" },
    { phrase: "rojo", action: "color:red" },
    { phrase: "verde", action: "color:green" },
    { phrase: "azul", action: "color:blue" },
    { phrase: "aumentar / agrandar", action: "scale:up" },
    { phrase: "disminuir / achicar", action: "scale:down" },
  ],
  en: [
    { phrase: "show", action: "show (shows AR)" },
    { phrase: "hide", action: "hide (hides AR)" },
    { phrase: "red", action: "color:red" },
    { phrase: "green", action: "color:green" },
    { phrase: "blue", action: "color:blue" },
    { phrase: "increase / bigger / zoom in", action: "scale:up" },
    { phrase: "decrease / smaller / zoom out", action: "scale:down" },
  ],
};

export default function VoiceCommands({ lang = "es" }) {
  // Selecciona la lista según el idioma activo
  const list = commands[lang] || commands.es;
  return (
    <div style={{ margin: "10px 0" }}>
      <Typography variant="subtitle1" gutterBottom>
        Comandos de voz ({lang === "es" ? "Español" : "English"})
      </Typography>
      <List dense>
        {list.map((c) => (
          <ListItem
            key={c.phrase}
            dense
          >
            <ListItemText
              primary={c.phrase}
              secondary={c.action}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
