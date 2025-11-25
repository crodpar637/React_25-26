/* 
datos = [ { name : "Check1", text: "Con más mozarella", value: "mozarella_plus"},
        { name : "Check2", text: "Con más tomate", value: "tomate_plus"},
 ] */

import { useState } from "react";
import Checkbox from "./Checkbox";

function Multicheck({ maxcheck, datos }) {
  const [countChecked, setCountChecked] = useState(0);

  function controlCheckbox(e) {
    // Si se ha marcado
    if (e.target.checked) {
      // Comprobar si pasamos el máximo
      if (countChecked + 1 > maxcheck) {
        e.target.checked = false;
      } else {
        setCountChecked(countChecked + 1);
      }
    } else {
      setCountChecked(countChecked - 1);
    }
  }

  return (
    <>
      <h5>Multicheck con máximo {maxcheck}</h5>
      {datos.map((item) => (
       
          <Checkbox
            name={item.name}
            text={item.text}
            value={item.value}
            manejador={controlCheckbox}
            key={item.name}
          />
         
      ))}
    </>
  );
}

export default Multicheck;
