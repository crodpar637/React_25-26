import { Link } from "react-router";

function Menu(){
    return (
        <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/adios"><li>Adios</li></Link>
            <Link to="/chistes"><li>Chistes</li></Link>  
        </ul>
    );
}

export default Menu;