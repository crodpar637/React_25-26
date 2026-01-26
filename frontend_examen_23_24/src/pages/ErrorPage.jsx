import { Link, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

function ErrorPage() {
  // Hook para obtener información del error de la ruta
  const error = useRouteError();

  // Registrar error en consola para debugging
  console.error(error);

  return (
    <>
      {/* Barra de navegación */}
      <Navbar />
      {/* Mensaje de error */}
      <p>Lo sentimos, parece que ha ocurrido un error</p>

      {/* Detalles del error */}
      <strong>{error.statusText || error.message}</strong>

      {/* Botón para volver a inicio */}
      <Link to="/">Volver a la página de inicio</Link>
    </>
  );
}

export default ErrorPage;
