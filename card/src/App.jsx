import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Card from "./Card.jsx";

function App() {
  const datos = [
    {
      title: "Mantequilla y pavo",
      subtitle: "Tostada de todos los días",
      text: "Son 2.50€",
      href: "https://google.es",
      textoEnlace: "Ve a google a buscar tu tostada",
    },
    {
      title: "Mantequilla y jamón",
      subtitle: "Tostada de los cumpleaños",
      text: "Son 3.50€",
      href: "https://google.es",
      textoEnlace: "Ve a google a buscar tu tostada",
    },
  ];

  return (
    <>
      {datos.map( tostada => 
        <Card {...tostada} key={tostada.title}/>
      )}
    </>
  );
}

export default App;
