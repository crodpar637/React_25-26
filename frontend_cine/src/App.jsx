import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

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

import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
    children: [
      // Todo esto se ve en el Outlet
      { index: true, Component: Inicio }, // Esto se ve en la ruta padre
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
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
