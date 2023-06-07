export const getPropietarios = async () => {
  const res = await fetch("http://localhost:8080/propietario");
  const data = await res.json();
  return data;
};