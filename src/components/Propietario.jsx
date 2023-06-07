export function Propietario({ propie }) {
  return (
    <div>
      <h1>Autor</h1>
      <h2>{propie.nombre}</h2>
      <span>{propie.direccion}</span>
    </div>
  );
}
