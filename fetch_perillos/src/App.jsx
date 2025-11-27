import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch_dog() {
      try {
        let response = await fetch("https://dog.ceo/api/breeds/image/random");

        let objeto_dog = await response.json();

        console.log(objeto_dog.message);
        // Actualizamos la imagen
        setImageUrl(objeto_dog.message);
        // Ya no estamos cargando
        setIsLoading(false);
        // Y no tenemos errores
        setError(null);
      } catch (e) {
        setError("No se pudo conectar al servidor");
        setIsLoading(false);
      }
    }

    if (isLoading) fetch_dog();
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
        <>
          <img src={imageUrl} />
          <button onClick={() => setIsLoading(true)}>Cargar otra foto</button>
        </>
      )}
    </>
  );
}

export default App;
