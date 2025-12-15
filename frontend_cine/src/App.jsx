import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Inicio from "./components/Inicio";

import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [ // Todo esto se ve en el Outlet
      {index:true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/directors",
        element: <h1>Listado de directores</h1>,
      },
      {
        path: "/movies",
        element: <h1>Listado de peliculas</h1>,
      },
    ],
  },
]);
function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
