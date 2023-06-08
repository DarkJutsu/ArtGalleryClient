export const getOferta = async () => {
  const res = await fetch("http://localhost:8080/oferta");
  const data = await res.json();
  return data;
};

export const addOferta = async (datos) => {
  const res = await fetch(`http://localhost:8080/oferta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const edOferta = async (datos) => {
  const res = await fetch(`http://localhost:8080/oferta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const delOferta = async (id) => {
  const res = await fetch(`http://localhost:8080/oferta/${id}`, {
    method: "DELETE",
  });
};
