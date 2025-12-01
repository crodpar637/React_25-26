import { useEffect, useState } from "react";
import CategoriasChistes from "./CategoriasChistes";

function VisorChistes() {
  const [textoChiste, setTextoChiste] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(categoria) {
    setCategoriaSeleccionada(categoria);
    setIsLoading(true);
  }

  useEffect(() => {
    async function fetchChiste() {
      try {
        let response = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${categoriaSeleccionada}`
        );

        let objetoChiste = await response.json();

        // Actualizamos el texto del chiste
        setTextoChiste(objetoChiste.value);

        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError("No se pudo conectar al servidor");
      }
      // Siempre dejamos de cargar
      setIsLoading(false);
    }
    if (isLoading && categoriaSeleccionada != '') fetchChiste();
  }, [isLoading,categoriaSeleccionada]);

  

  return (
    <>
      <h1>Hechos de Chuck Norris</h1>
      <CategoriasChistes handler={handleChange} />

      {isLoading ? <p>Cargando...</p> : <p>{textoChiste}</p>}

      <button onClick={() => setIsLoading(true)}>
        Cargar otro hecho de Chuck Norris
      </button>
    </>
  );
}

export default VisorChistes;
