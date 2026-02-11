# NUI React Project — Guía rápida

Proyecto de ejemplo que integra interfaces naturales de usuario (NUI): voz, gestos, detección de postura y una escena AR simulada.

## Requisitos
- Node.js (>=14)
- Navegador moderno (Chrome/Edge) con soporte para Web Speech API y acceso a cámara.

> Nota: Web Speech API funciona en `https` y en `localhost` (Chrome). Da permisos de cámara cuando el navegador lo solicite.

## Instalación
Desde la raíz del proyecto ejecuta:

```bash
npm install react-webcam @mediapipe/hands @mediapipe/pose @react-three/fiber three
```

Si falta alguna dependencia del proyecto (por ejemplo `react` o `react-dom`), instálalas según tu `package.json`.

## Ejecutar (desarrollo)

```bash
npm run dev
```

Abrir `http://localhost:3000` (o el puerto que muestre tu servidor).

## Componentes y mapeos (cómo evaluar criterios)

- `ToolsList` — Lista las herramientas usadas (MediaPipe, Web Speech API, react-webcam, @react-three/fiber).
- `VoiceControl` — Usa Web Speech API y mapea comandos de voz a acciones:
  - "mostrar" → `show` (muestra la escena AR)
  - "ocultar" → `hide` (oculta la escena AR)
  - "rojo" / "verde" / "azul" → `color:red|green|blue`
  - "aumentar" / "agrandar" → `scale:up`
  - "disminuir" / "achicar" → `scale:down`

- `HandGesture` — Usa MediaPipe Hands. Señala los siguientes estados que se muestran en la UI:
  - `mano_abierta` → acción: muestra la AR
  - `puño` → acción: oculta la AR
  - `sin_mano`

- `BodyPose` — Usa MediaPipe Pose. Detecta y emite:
  - `manos_arriba` → aumenta la escala del objeto AR
  - `salto` → cambia el color del objeto AR a `hotpink`
  - `normal` / `sin_cuerpo`

- `ARScene` — Escena 3D reactiva (simulada) que acepta `visible`, `color` y `scale`.

## Pruebas rápidas (ejemplos)

1. Permite el uso de la cámara.
2. Haz clic en el botón `🎤 Hablar` y di: "mostrar" → la escena AR debe aparecer.
3. Di: "rojo" → el cubo AR debe cambiar a rojo.
4. Muestra la palma (mano abierta) frente a la cámara → la UI debe indicar `mano_abierta` y mostrar la AR.
5. Haz un puño frente a la cámara → debe indicar `puño` y ocultar la AR.
6. Levanta las manos por encima de los hombros → debe indicar `manos_arriba` y aumentar la escala del cubo.
7. Salta brevemente frente a la cámara (o acércate/aleja la cabeza) → puede detectar `salto` y cambiar color.

## Limitaciones y notas
- Detección basada en modelos **cliente** (MediaPipe vía CDN). La precisión depende de la calidad de la cámara y la iluminación.
- Web Speech API puede devolver texto imperfecto; los mapeos son simples heurísticos para demostración.
