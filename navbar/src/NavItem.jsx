function NavItem(props) {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link" href={props.url}>
          {props.titulo}
        </a>
      </li>
    </>
  );
}

export default NavItem;
