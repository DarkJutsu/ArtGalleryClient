export const getPropietarios = async () => {
  const res = await fetch("http://localhost:8080/propietario");
  const data = await res.json();
  return data;
};

export const addAutor = async (datos) => {
  const res = await fetch(`http://localhost:8080/propietario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const edAutor = async (datos) => {
  const res = await fetch(`http://localhost:8080/propietario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
};

export const delAutor = async (id) => {
  const res = await fetch(`http://localhost:8080/propietario/${id}`, {
    method: "DELETE",
  });
};



