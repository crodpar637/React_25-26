import { useState } from 'react';
import Saludo from './Saludo.jsx';
import Despedida from './Despedida.jsx';


function App() {
  const [count, setCount] = useState(0);

  const handleClickIncrementar = () => {
    setCount(count + 1);
  };


  return (
    <>
      <h1>¡ Hola mundo !</h1>
      <p>Este es el valor del contador: { count } </p>
      <button onClick={handleClickIncrementar}>Incrementar</button>
      <button onClick={ () => setCount(count -1)}>Decrementar</button>
      <Saludo nombre="Juan" apellido="Ramos"/>
      <Saludo nombre="Inma" apellido="Ramos"/>
      <Saludo nombre="Carlos" apellido="Ramos"/>
      <Saludo nombre="Rosa" apellido="Ramos"/>
      <Saludo nombre="Pepe" />
      <Despedida nombre="Juan" apellido="Ramos"/>
    </>
  )
}

export default App;
