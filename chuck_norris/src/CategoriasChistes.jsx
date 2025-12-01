import { useState, useEffect } from "react";

function CategoriasChistes({ handler }) {
  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    async function fetch_categorias() {
      try {
        let response = await fetch(
          "https://api.chucknorris.io/jokes/categories"
        );

        let arrayCategorias = await response.json();

        // Actualizamos el array de categorias
        setCategorias(arrayCategorias);
        if (arrayCategorias.length > 0) {
          setCategoriaSeleccionada(arrayCategorias[0]);
          handler(arrayCategorias[0]);
        }
        // Ya no estamos cargando
        setIsLoading(false);
        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError("No se pudo conectar al servidor");
      }
       setIsLoading(false);
    }

    if (isLoading) fetch_categorias();
  }, [isLoading]);

  if (error != null) {
    return (
      <>
        <h1>{error}</h1>
        <button onClick={() => setIsLoading(true)}>Volver a intentarlo</button>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="App">
          <h1>Cargando...</h1>
        </div>
      ) : (
        <select
          name="categoriaChistes"
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            handler(e.target.value);
          }}
        >
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default CategoriasChistes;
