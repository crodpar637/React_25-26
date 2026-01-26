import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home.jsx"
import ErrorPage from "./pages/ErrorPage";
import VisorNotas from "./components/VisorNotas.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <ErrorPage />,
    children: [
      // Ruta raíz - Página de inicio
      { index: true, element: <h1>Página de inicio del examen</h1> },
      
      // Rutas de Ejercicios
      {
        path: "/ejercicio2",
        element: <VisorNotas/>,
      },
      {
        path: "/ejercicio3/:id",
        element:  <h1>Ejercicio3</h1>,
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
