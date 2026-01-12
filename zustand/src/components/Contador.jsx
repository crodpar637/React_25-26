import { useState } from "react";
import useContadorStore from "../stores/useContadorStore";

const Contador = () => {
  const { count, usos, increase, decrease } = useContadorStore();
  const [contador, setContador] = useState(0);
  return (
    <>
      <div style={{ border: "1px black solid" }}>
        <div>
          <h5>Contador del store de Zustand: {count}</h5>
          <h5>Número de cambios del store de Zustand: {usos}</h5>
          <button onClick={increase}>➕ Incrementar</button>
          <button onClick={decrease}>➖ Decrementar</button>
        </div>
        <div>
          <h5>Contador local: {contador}</h5>
          <button onClick={() => setContador(contador + 1)}>
            ➕ Incrementar
          </button>
          <button onClick={() => setContador(contador - 1)}>
            ➖ Decrementar
          </button>
        </div>
      </div>
    </>
  );
};

export default Contador;
