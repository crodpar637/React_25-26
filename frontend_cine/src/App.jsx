import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Inicio from "./components/Inicio";
import ListadoDirectores from "./components/ListadoDirectores";

import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      // Todo esto se ve en el Outlet
      { index: true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/directors",
        element: <ListadoDirectores/>,
      },
      {
        path: "/directors/new",
        element: <h1>Alta de directores</h1>,
      },
      {
        path: "/movies",
        element: <h1>Listado de peliculas</h1>,
      },
      {
        path: "/movies/new",
        element: <h1>Alta de peliculas</h1>,
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
