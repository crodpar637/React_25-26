import NavItem from "./NavItem";
import NavItemDropdown from "./NavItemDropdown";

function NavBar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.datos.map((item) =>       
                    Array.isArray(item) ? 
                    ( 
                        <NavItemDropdown datos={item} key={item[0]} />
                    ) 
                    :
                    (
                        <NavItem
                        url={item.url}
                        titulo={item.titulo}
                        key={item.titulo}
                        />
                    )
              )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
