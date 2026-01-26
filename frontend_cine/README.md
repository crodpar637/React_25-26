# 🎬 MOVIES DB - Aplicación de Gestión de Cine

Aplicación web moderna para la gestión integral de directores y películas. Permite crear, editar, visualizar y eliminar directores y películas, con características avanzadas como filtrado por fechas, visualización gráfica y exportación a PDF.

---

## 📋 Características Principales

### Directores
- ✅ **Crear directores** - Formulario con validaciones (nombre mín. 10 caracteres, biografía mín. 50 caracteres)
- ✅ **Editar directores** - Modificar cualquier dato del director con validaciones
- ✅ **Visualizar directores** - Listado en tabla con información completa
- ✅ **Visualizar en tarjetas** - Vista alternativa en grid de tarjetas con fotos
- ✅ **Filtrado por fecha** - Filtrar directores por rango de fechas de nacimiento
- ✅ **Gráfica de películas** - Pie chart mostrando cantidad de películas por director
- ✅ **Eliminar directores** - Borrar directores de la base de datos
- ✅ **Exportar a PDF** - Generar reportes con tabla de directores

### Películas
- ✅ **Crear películas** - Formulario con selección de director y validaciones
- ✅ **Editar películas** - Modificar datos de película incluyendo director asignado
- ✅ **Visualizar películas** - Listado completo en tabla con información detallada
- ✅ **Filtrado por fecha** - Filtrar películas por rango de fechas de lanzamiento
- ✅ **Filtrado por director** - Filtrar películas por director específico
- ✅ **Eliminar películas** - Borrar películas de la base de datos
- ✅ **Exportar a PDF** - Generar reportes con tabla de películas

---

## 🛠 Stack Tecnológico

### Frontend
- **React 19.2.0** - Librería de interfaz de usuario con hooks modernos
- **React Router v7.10.1** - Enrutamiento del lado del cliente
- **Vite 7.2.4** - Herramienta de construcción y desarrollo ultrarrápida
- **TypeScript/JavaScript ES6+** - Lenguaje de programación

### UI & Estilos
- **Material-UI (MUI) 7.3.6** - Librería de componentes de diseño
- **@mui/icons-material** - Iconos profesionales
- **@mui/x-date-pickers** - Selectores de fecha avanzados
- **@mui/lab** - Componentes experimentales

### Utilidades
- **Axios 1.6.0** - Cliente HTTP para solicitudes API
- **Dayjs 1.11.19** - Manipulación de fechas (localizado al español)
- **Recharts 3.6.0** - Gráficos y visualizaciones de datos
- **html2canvas** - Captura de elementos HTML a canvas
- **jsPDF** - Generación de documentos PDF
- **@react-pdf/renderer** - Componentes PDF específicos para React

### Desarrollo
- **ESLint** - Linter de código JavaScript
- **Prettier** - Formateador de código

---

## 📂 Estructura del Proyecto

```
frontend_cine/
├── src/
│   ├── api.js                          # Configuración de Axios e interceptores
│   ├── App.jsx                         # Enrutamiento principal y rutas
│   ├── main.jsx                        # Punto de entrada de la aplicación
│   │
│   ├── pages/
│   │   ├── Home.jsx                    # Layout principal con navbar
│   │   └── ErrorPage.jsx               # Página de error para rutas no encontradas
│   │
│   ├── components/
│   │   ├── Navbar.jsx                  # Barra de navegación responsiva
│   │   ├── Inicio.jsx                  # Página de bienvenida
│   │   │
│   │   ├── ListadoDirectores.jsx       # Tabla de directores con CRUD
│   │   ├── ListadoCardsDirectores.jsx  # Directores en vista grid de tarjetas
│   │   ├── ListadoDirectorFiltro.jsx   # Directores con filtro por fecha
│   │   ├── ListadoDirectoresFiltroPDF.jsx # Componente PDF directores
│   │   │
│   │   ├── AltaDirector.jsx            # Formulario crear director
│   │   ├── EditarDirector.jsx          # Formulario editar director
│   │   ├── GraficaDirectores.jsx       # Gráfica pie chart películas/director
│   │   │
│   │   ├── ListadoPeliculas.jsx        # Tabla de películas con CRUD
│   │   ├── ListadoPeliculasFiltro.jsx  # Películas con filtro fecha y director
│   │   ├── ListadoPeliculasFiltroPDF.jsx # Componente PDF películas
│   │   │
│   │   ├── AltaPelicula.jsx            # Formulario crear película
│   │   └── EditarPelicula.jsx          # Formulario editar película
│   │
│   └── utils/
│       └── generatePDF.js              # Utilidad para generar PDF desde HTML
│
├── public/
│   └── index.html                      # Plantilla HTML principal
│
├── vite.config.js                      # Configuración de Vite
├── package.json                        # Dependencias y scripts
├── eslint.config.js                    # Configuración de ESLint
├── README.md                           # Este archivo
└── .gitignore                          # Archivos ignorados por Git
```

---

## ⚙️ Instalación

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend en ejecución en `http://localhost:3000`

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <url-repositorio>
cd frontend_cine

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (si aplica)
# Crear archivo .env si es necesario
# VITE_API_URL=http://localhost:3000/api

# 4. Ejecutar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# La aplicación estará disponible en http://localhost:5173
```

---

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```
Inicia servidor Vite con hot reload. Accede a `http://localhost:5173`

### Compilación Producción
```bash
npm run build
```
Genera carpeta `dist/` con aplicación optimizada

### Vista Previa Producción
```bash
npm run preview
```
Simula servidor producción con archivos compilados

### Linting y Validación
```bash
npm run lint
```
Valida código con ESLint

---

## 🔧 Configuración API

El cliente se conecta a un backend en:
```
http://localhost:3000/api
```

**Endpoints principales:**

```javascript
// Directores
GET    /api/directors/           # Listar todos
POST   /api/directors/           # Crear
PUT    /api/directors/{id}       # Editar
DELETE /api/directors/{id}       # Eliminar
GET    /api/directors/graph      # Datos para gráfica

// Películas
GET    /api/movies/              # Listar todas
POST   /api/movies/              # Crear
PUT    /api/movies/{id}          # Editar
DELETE /api/movies/{id}          # Eliminar
```

**Configuración en [api.js](src/api.js):**
- BaseURL: `http://localhost:3000/api`
- Timeout: 5000ms
- Headers: `Content-Type: application/json`
- Interceptores para manejo de errores

---

## 📍 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|------------|
| `/` | Inicio | Página de bienvenida |
| `/directors` | ListadoDirectores | Tabla de todos los directores |
| `/directors/cards` | ListadoCardsDirectores | Directores en vista tarjetas |
| `/directors/filter` | ListadoDirectorFiltro | Directores con filtro por fecha |
| `/directors/graph` | GraficaDirectores | Gráfica de películas por director |
| `/directors/new` | AltaDirector | Formulario crear director |
| `/directors/:id_director/edit` | EditarDirector | Formulario editar director |
| `/movies` | ListadoPeliculas | Tabla de todas las películas |
| `/movies/filter` | ListadoPeliculasFiltro | Películas con filtros |
| `/movies/new` | AltaPelicula | Formulario crear película |
| `/movies/:id_movie/edit` | EditarPelicula | Formulario editar película |
| `*` | ErrorPage | Página de error 404 |

---

## 📝 Validaciones de Formularios

### Director (Alta y Edición)
| Campo | Validación |
|-------|-----------|
| **Nombre** | Mínimo 10 caracteres, máximo 100 |
| **Fecha Nacimiento** | Entre 1800-01-01 y hoy |
| **Biografía** | Mínimo 50 caracteres, máximo 1000 |
| **Foto URL** | Formato URL válido (http/https) |

### Película (Alta y Edición)
| Campo | Validación |
|-------|-----------|
| **Título** | Mínimo 3 caracteres, máximo 100 |
| **Sinopsis** | Mínimo 20 caracteres, máximo 1000 |
| **Fecha Lanzamiento** | Entre 1800-01-01 y hoy |
| **Director** | Selección obligatoria de director |

---

## 🎨 Componentes Principales

### [Navbar.jsx](src/components/Navbar.jsx)
Barra de navegación responsiva con:
- Logo "MOVIES DB" con icono de película
- Menú desplegable para Directores (xs: hamburger, md+: dropdown)
- Menú desplegable para Películas (xs: hamburger, md+: dropdown)
- 10 enlaces de navegación
- Diseño mobile-first

### [ListadoDirectores.jsx](src/components/ListadoDirectores.jsx)
Tabla de directores con:
- Visualización de: nombre, foto, fecha nacimiento, biografía
- Botones: Editar, Eliminar, Imprimir como PDF
- Carga dinámica de datos
- Manejo de errores

### [ListadoPeliculas.jsx](src/components/ListadoPeliculas.jsx)
Tabla de películas con:
- Visualización de: título, director, fecha lanzamiento, sinopsis
- Botones: Editar, Eliminar, Imprimir como PDF
- Carga dinámica de datos
- Relaciones director-película

### [AltaDirector.jsx](src/components/AltaDirector.jsx)
Formulario para crear director:
- DatePicker para fecha de nacimiento
- Validación de URL para foto
- Diálogo modal de resultado
- Navegación automática tras éxito

### [AltaPelicula.jsx](src/components/AltaPelicula.jsx)
Formulario para crear película:
- Select dropdown de directores
- DatePicker para fecha de lanzamiento
- Validaciones especiales
- Diálogo modal de resultado

### [EditarDirector.jsx](src/components/EditarDirector.jsx)
Formulario para editar director:
- Carga datos actuales al montar
- Mismas validaciones que alta
- PUT request para actualizar
- Navegación tras actualización exitosa

### [EditarPelicula.jsx](src/components/EditarPelicula.jsx)
Formulario para editar película:
- Carga datos y directores disponibles
- Permite cambiar director asignado
- Validaciones de película
- Actualización en servidor

### [GraficaDirectores.jsx](src/components/GraficaDirectores.jsx)
Gráfica pie chart con:
- Cantidad de películas por director
- 50 colores distintos para directores
- Legend e información de tooltip
- Responsive con Material-UI

### [ListadoDirectorFiltro.jsx](src/components/ListadoDirectorFiltro.jsx)
Directores con filtrado:
- Filtro por rango de fechas de nacimiento
- useMemo para optimización
- Visualización en tarjetas
- Exportación a PDF

### [ListadoPeliculasFiltro.jsx](src/components/ListadoPeliculasFiltro.jsx)
Películas con filtrado avanzado:
- Filtro por rango de fechas de lanzamiento
- Filtro por director específico
- Combinación de múltiples filtros
- Exportación a PDF

### [generatePDF.js](src/utils/generatePDF.js)
Utilidad para generar PDF:
- Convierte elementos HTML a PDF
- html2canvas para captura con resolución 2x
- Cálculo proporcional de altura
- Excluye elementos con clase "omitir-pdf"

---

## 📊 Flujos de Datos

### Crear Director
```
Formulario AltaDirector
    ↓
Validación de datos
    ↓
POST /api/directors/
    ↓
Backend crea registro
    ↓
Diálogo de éxito
    ↓
Navegar a /directors
```

### Editar Director
```
URL: /directors/:id_director/edit
    ↓
useEffect fetcha datos actuales
    ↓
Formulario EditarDirector prellenado
    ↓
Usuario modifica campos
    ↓
PUT /api/directors/{id}
    ↓
Diálogo de éxito
    ↓
Navegar a /directors
```

### Filtrar y Exportar Películas
```
Página ListadoPeliculasFiltro
    ↓
Seleccionar fecha inicio/fin
    ↓
Seleccionar director (opcional)
    ↓
useMemo filtra datos
    ↓
Visualizar resultados en tarjetas
    ↓
Botón "Exportar a PDF"
    ↓
ListadoPeliculasFiltroPDF renderiza
    ↓
pdf.save() descarga archivo
```

---

## 🚨 Manejo de Errores

### Errores HTTP
```javascript
// En Axios interceptor (api.js)
- 404: "No encontrado"
- 400: "Solicitud inválida"
- 5xx: "Error del servidor"
```

### Mensajes de Error
Los errores se muestran en:
- Diálogos modales en formularios
- Alerts en componentes
- Console del navegador (desarrollo)

### Validaciones
- Cliente: Validación inmediata en formularios
- Servidor: Validaciones adicionales (backend)

---

## 📱 Diseño Responsivo

Aplicación completamente responsiva con breakpoints MUI:
- **xs** (0px+): Dispositivos móviles
- **sm** (600px+): Tablets pequeñas
- **md** (900px+): Tablets y escritorio
- **lg** (1200px+): Escritorio completo
- **xl** (1536px+): Pantallas grandes

Material-UI `Grid` con `size` prop proporciona:
- Layouts flexibles
- Ajuste automático de columnas
- Componentes responsivos (Navbar, tablas, tarjetas)

---

## 🔐 Seguridad

- Headers CORS configurados
- Timeout de 5000ms en requests
- Validación en cliente y servidor
- Variables de entorno para configuración
- No expone contraseñas en requests

---

## 📦 Dependencias Clave

```json
{
  "react": "^19.2.0",
  "react-router-dom": "^7.10.1",
  "vite": "^7.2.4",
  "@mui/material": "^7.3.6",
  "@mui/x-date-pickers": "^7.x.x",
  "axios": "^1.6.0",
  "dayjs": "^1.11.19",
  "recharts": "^3.6.0",
  "html2canvas": "^latest",
  "jspdf": "^latest",
  "@react-pdf/renderer": "^latest"
}
```

---

## 🚀 Despliegue

### Estrategias de Despliegue

#### 1. **Vercel** (Recomendado)
```bash
npm install -g vercel
vercel
```
- Despliegue automático en commits
- Preview automático en PRs
- Variables de entorno desde UI

#### 2. **Netlify**
```bash
npm install -g netlify-cli
netlify deploy
```
- Conectar con GitHub
- Build automático

#### 3. **GitHub Pages**
```bash
# En vite.config.js
export default {
  base: '/nombre-repositorio/',
  ...
}

npm run build
# Subir contenido de dist/
```

#### 4. **Servidor Tradicional**
```bash
npm run build
# Copiar carpeta dist/ a servidor web
# Configurar rewrite de rutas hacia index.html
```

### Variables de Entorno Producción
```env
VITE_API_URL=https://backend-produccion.com/api
VITE_ENV=production
```

### Checklist Despliegue
- [ ] npm run build sin errores
- [ ] npm run preview funciona correctamente
- [ ] Rutas del backend están correctas
- [ ] CORS está habilitado en backend
- [ ] Imágenes y assets cargan correctamente
- [ ] Formularios envían a API correcta
- [ ] PDF generation funciona en navegador destino
- [ ] Responsive funciona en móviles

---

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Material-UI Documentation](https://mui.com)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com)
- [Recharts Documentation](https://recharts.org)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

---

## 🐛 Troubleshooting

### Problema: "Cannot GET /"
**Solución:** Configurar servidor para reescribir todas las rutas a index.html

### Problema: "API not found"
**Solución:** Verificar que backend está ejecutándose en `http://localhost:3000`

### Problema: "CORS error"
**Solución:** Configurar CORS en backend para permitir `http://localhost:5173`

### Problema: "PDF no genera"
**Solución:** Verificar que html2canvas y jsPDF están instaladas

### Problema: "Fechas incorrectas"
**Solución:** Verificar que dayjs está localizado en español (es)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

## 👨‍💻 Desarrollo y Contribución

### Estructura de Commits
```
git commit -m "feat: agregar filtro por director"
git commit -m "fix: resolver error de validación"
git commit -m "docs: actualizar README"
```

### Pull Requests
1. Fork el repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Add feature'`
4. Push rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📞 Soporte

Para reportar bugs o solicitar features, abrir un issue en el repositorio.

---

**Última actualización:** 2024  
**Versión:** 1.0.0  
**Autor:** Equipo de Desarrollo
