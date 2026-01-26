/**
 * @fileoverview Componente raíz de la aplicación con configuración de enrutamiento
 * 
 * Define la estructura de rutas principal de la aplicación de gestión de cine.
 * Utiliza React Router v7 para manejar la navegación entre diferentes vistas
 * (directores, películas, inicio, etc.)
 * 
 * @module App
 * @requires react-router-dom
 */

import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

// Componentes de la página principal
import Inicio from "./components/Inicio";
import ListadoDirectores from "./components/ListadoDirectores";
import AltaDirector from "./components/AltaDirector";
import EditarDirector from "./components/EditarDirector"
import ListadoCardsDirectores from "./components/ListadoCardsDirectores";
import ListadoDirectorFiltro from "./components/ListadoDirectorFiltro";
import ListadoPeliculas from "./components/ListadoPeliculas";
import ListadoPeliculasFiltro from "./components/ListadoPeliculasFiltro";
import EditarPelicula from "./components/EditarPelicula";
import AltaPelicula from "./components/AltaPelicula";
import GraficaDirectores from "./components/GraficaDirectores";

// Páginas de layout
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

/**
 * Configuración de rutas de la aplicación
 * 
 * Estructura:
 * - Ruta raíz "/" carga el layout Home con navbar
 * - Subrutas para directores (listado, alta, edición, filtros, gráfica)
 * - Subrutas para películas (listado, alta, edición, filtros)
 * - Página de error centralizada
 * 
 * @type {Router}
 */
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
    children: [
      // Ruta raíz - Página de inicio
      { index: true, Component: Inicio },
      
      // Rutas de Directores
      {
        path: "/directors",
        element: <ListadoDirectores/>,
      },
      {
        path: "/directors/cards",
        element: <ListadoCardsDirectores />,
      },
      {
        path: "/directors/filter",
        element: <ListadoDirectorFiltro />,
      },
      {
        path: "/directors/graph",
        element: <GraficaDirectores />,
      },
      {
        path: "/directors/new",
        element: <AltaDirector />,
      },
      {
        path: "/directors/edit/:id_director",
        element: <EditarDirector />,
      },
      
      // Rutas de Películas
      {
        path: "/movies",
        element: <ListadoPeliculas/>,
      },
      {
        path: "/movies/filter",
        element: <ListadoPeliculasFiltro/>,
      },
      {
        path: "/movies/edit/:id_movie",
        element: <EditarPelicula/>,
      },
      {
        path: "/movies/new",
        element: <AltaPelicula/>,
      },
    ],
  },
]);

/**
 * Componente raíz de la aplicación
 * 
 * Renderiza el proveedor de rutas que habilita la navegación en toda la aplicación
 * 
 * @component
 * @returns {JSX.Element} Proveedor de rutas configurado
 */
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
