export function Propietario({ propie }) {
  return (
    <div>
      <h1>Obra</h1>
      <h2>{propie.nombre}</h2>
      <span>{propie.direccion}</span>
    </div>
  );
}
