function Card(props) {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.subtitle}
          </h6>
          <p className="card-text">
            {props.text}
          </p>
          <a href={props.href} className="card-link">
            {props.textoEnlace}
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
