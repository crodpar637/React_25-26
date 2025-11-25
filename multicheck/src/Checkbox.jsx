function Checkbox({ name, text, value, manejador }) {
  return (
    <>
      <input type="checkbox" name={name} value={value} onChange={manejador} />
      {text}
      <br/>
    </>
  );
}

export default Checkbox;
