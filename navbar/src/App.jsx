
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NavBar from "./NavBar";

function App() {
  const opcionesMenu= [
    { url: "https:\\google.es", titulo: "Google"},
    { url: "https:\\youtube.com", titulo: "YouTube"},
    [ "Radios",
      { url: "https:\\cadenaser.com", titulo: "Cadena Ser"},
      { url: "https:\\ondacero.es", titulo: "Onda Cero"},
      { url: "https:\\radiole.com", titulo: "Radio Olé"},
    ],
    { url: "https:\\yahoo.es", titulo: "Yahoo"},
    { url: "https:\\marca.com", titulo: "Marca"},
    [ "TV",
      { url: "https:\\rtve.es", titulo: "RTVE"},
      { url: "https:\\telecinco.es", titulo: "Tele5"},
    ],
  ];

  return (
    <>
      <NavBar datos={opcionesMenu}/>
    </>
     
  )
}

export default App
