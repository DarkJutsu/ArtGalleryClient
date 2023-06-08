import { useEffect, useState } from "react";

import { Card } from "primereact/card";
import { getExposicion } from "../api/exposicion.api.";
import { useNavigate } from "react-router-dom";

export function ExpoView() {
  const [expo, setExpo] = useState([]);

  const loadExpos = () => {
    getExposicion().then((res) => setExpo(res));
  };

  const nav = useNavigate();

  useEffect(() => {
    loadExpos();
  }, []);

  const formatFecha = (fecha) => {
    const fechaJava = fecha;
    const fechaJS = new Date(fechaJava);
    const dia = fechaJS.getDate();
    const mes = fechaJS.getMonth() + 1;
    const anio = fechaJS.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${anio}`;

    return fechaFormateada;
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 pt-3">
        {expo.map((expo, id) => (
          <Card
            title={expo.titulo}
            onClick={()=>{
              nav(`/view-expo/${expo.id}`);
            }}
            style={{ width: "25rem", marginBottom: "2em" }}
            className="cursor-pointer"
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              {expo.descripcion} <br />
              <span>
                De {formatFecha(expo.fechaInauguracion)} hasta{" "}
                {formatFecha(expo.fechaClausura)}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
