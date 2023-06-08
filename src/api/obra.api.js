export const getObra = async () => {
  const res = await fetch("http://localhost:8080/obra");
  const data = await res.json();
  return data;
};

export const getObraId = async (id) => {
  const res = await fetch(`http://localhost:8080/obra/${id}`);
  const data = await res.json();
  return data;
};

export const addObra = async (datos) => {
  const res = await fetch(`http://localhost:8080/obra`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const edObra = async (datos) => {
  const res = await fetch(`http://localhost:8080/obra`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const delObra = async (id) => {
  const res = await fetch(`http://localhost:8080/obra/${id}`, {
    method: "DELETE",
  });
};
