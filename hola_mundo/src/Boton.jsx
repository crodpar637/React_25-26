function Boton(props) {

    return ( 
        <button onClick={props.manejador}>Hiciste click {props.count} veces </button>
    );
}

export default Boton;