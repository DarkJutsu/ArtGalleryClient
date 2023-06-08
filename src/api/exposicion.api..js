export const getExposicion = async () => {
  const res = await fetch("http://localhost:8080/exposicion");
  const data = await res.json();
  return data;
};

export const addExposicion = async (datos) => {
  const res = await fetch(`http://localhost:8080/exposicion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const edExposicion = async (datos) => {
  const res = await fetch(`http://localhost:8080/exposicion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const delExposicion = async (id) => {
  const res = await fetch(`http://localhost:8080/exposicion/${id}`, {
    method: "DELETE",
  });
};
