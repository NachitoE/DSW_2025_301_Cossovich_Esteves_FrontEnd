function Ejemplo() {
  const name = "Nacho";
  //Truthy or falsy
  if (name) {
    return <p>Hola {name}!</p>;
  }
  return <p>Hola Mundo!</p>;
}

export default Ejemplo;
