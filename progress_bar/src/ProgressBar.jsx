function ProgressBar(props) {
  let clases =
    "progress-bar" +
    (props.striped ? " progress-bar-striped " : " ") +
    props.color;

  return (
    <>
      <div
        className="progress"
        role="progressbar"
        aria-label="Default striped example"
        aria-valuenow={props.porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={clases} style={{ width: props.porcentaje + "%" }}>
          {props.porcentaje + "%"}
        </div>
      </div>
    </>
  );
}

export default ProgressBar;
