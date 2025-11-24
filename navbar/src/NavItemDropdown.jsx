function NavItemDropdown(props) {
  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {props.datos[0]}
        </a>
        <ul className="dropdown-menu">
          {props.datos.slice(1).map((item) => (
            <li>
              <a className="dropdown-item" href={item.url}>
                {item.titulo}
              </a>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
}

export default NavItemDropdown;
