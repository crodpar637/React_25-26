import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import VisorChistes from "./components/VisorChistes";
import Inicio from "./components/Inicio";
import Home from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [ // Todo esto se ve en el Outlet
      {index:true, Component: Inicio }, // Esto se ve en la ruta padre
      {
        path: "/adios",
        element: <h3>Adiós</h3>,
      },
      {
        path: "/chistes",
        Component: VisorChistes,
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
